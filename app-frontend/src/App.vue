

<template>
  <div id="app">
    <header>
      <div v-if="!hasToken">
        <p>
          <strong>Default page</strong>
        </p>
        <nav>
          <br />
          <RouterLink to="/auth/signin">Login</RouterLink>
        </nav>
      </div>

      <div v-else>
        <br />
        <button @click="LogoutCall">Logout</button>
      </div>
    </header>

    <RouterView />

    <footer>@ 2025 Le Formal Guillaume :3</footer>
  </div>
</template>

<script >
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import authGlobalState from './stores/authPinia'

export default {
  name: 'App',

  // methods: {
  //   async LogoutCall() {
  //     if (!this.isLoggedIn) {
  //         this.$router.push('/auth/signin');
  //         return;
  //     }
  //     const authGlobalStateRef = authGlobalState()
  //     await authGlobalStateRef.logout()
  //     this.$router.push('/auth/signin');
  //   }
  // },
  setup() {
    const router = useRouter()
    const authGlobalStateRef = authGlobalState()

    const hasToken = computed(() => !!authGlobalStateRef.accessToken)

    const LogoutCall = async () => {
      await authGlobalStateRef.logout()
      router.push('/auth/signin')
    }

    return {
      hasToken, 
      LogoutCall
    }

   }, 
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
