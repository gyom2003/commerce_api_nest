

<template>
  <div id="app">
    <header v-if="!isLoggedIn">
      <p>
        <strong>Default page</strong>
      </p>
      <nav>
        <RouterLink v-if="hasRefreshToken" to="/home">Go to Home</RouterLink>
        <br />
        <RouterLink to="/auth/signin">Login</RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer>@ 2025 Le Formal Guillaume :3</footer>
  </div>
</template>

<script >
import axios from 'axios';
//import { response } from 'express';
import { ref } from 'vue';

export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: localStorage.getItem('accessToken'),
      hasRefreshToken: ref(false)
    }
  },
  setup() {
    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
         console.log("pas de token d'accès =>", token) 
        }

       axios({
        method: 'get', 
        url: 'http://localhost:4000/auth/me', 
        headers: { Authorization: `Bearer ${token}` }
       })
       .then(response => {
          console.log("response from auth me", response.data)
          this.hasRefreshToken = response.data.hasRefreshToken
       })
      } catch (err) {
        console.error(err);
      }
    // onMounted(async () => {
    // })
  }, 
  //methods: {
    // checkAuthStatus() {
    //   try {
    //     const accessToken = localStorage.getItem('accessToken')
    //     if (!accessToken) {
    //       this.isLoggedIn = false
    //       this.hasRefreshToken = false
    //       return;
    //     }

    //     //get sur notre endpoint recup refresh selon id
    //     const res = axios.get('http://localhost:4000/auth/me', {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`
    //       }
    //     })
    //     this.hasRefreshToken = res.data.hasRefreshToken
    //     this.isLoggedIn = true

    //   } catch (error) {
    //     console.log("error auth check =>", error)
    //     this.isLoggedIn = false
    //     this.hasRefreshToken = false
    //   }
    // }
  //}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
