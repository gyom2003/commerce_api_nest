<template>
    <div class="login-page">
      <div class="login-container">
        <transition name="fade">
          <div
            v-if="!registerActive"
            class="form-box"
            key="sign-in"
          >
            <h1>Sign In</h1>
            <form class="login-form" @submit.prevent="signIn">
              <input
                type="email"
                placeholder="Email"
                v-model.trim="emailLogin"
              />
              <input
                type="password"
                placeholder="Password"
                v-model.trim="passwordLogin"
              />
              <button type="submit">Sign In</button>
            </form>
            <p>
              Don't have an account?
              <a href="#" @click="toggleRegister">Sign up here</a>
            </p>
          </div>

          <div
            v-else
            class="form-box"
            key="sign-up"
          >
            <h1>Sign Up</h1>
            <form class="login-form" @submit.prevent="signUp">
                <input
                    type="name"
                    placeholder="Name"
                    v-model.trim="nameReg"
              />
              <input
                type="email"
                placeholder="Email"
                v-model.trim="emailReg"
              />
              <input
                type="password"
                placeholder="Password"
                v-model.trim="passwordReg"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                v-model.trim="confirmReg"
              />
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?
              <a href="#" @click="toggleRegister">Sign in here</a>
            </p>
          </div>
        </transition>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  //import { response } from 'express';
  
  export default {
    name: 'LoginComponent',
    data() {
      return {
        registerActive: false,
  
        // ign In
        emailLogin: '',
        passwordLogin: '',
  
        //Sign Up
        emailReg: '',
        nameReg: '',
        passwordReg: '',
        confirmReg: '',
      };
    },
    methods: {
      // Bascule entre login et register
      toggleRegister() {
        this.registerActive = !this.registerActive;
        // Petit reset si besoin
        // this.clearFields();
      },
  
      signIn() {
        if (!this.emailLogin || !this.passwordLogin) {
          return alert('Please enter Email and Password');
        }
  
        const signinData = {
          username: this.emailLogin,
          password: this.passwordLogin,
        };
        axios({
            method: 'post', 
            url: 'http://localhost:4000/auth/signin',
            headers: {}, 
            data: signinData
        })
        .then(response => {
            console.log("signin with success =>", response.data)
            const tokenRef = response.data.accessToken
            localStorage.setItem('accessToken', tokenRef)
            this.$router.push('/home');
        })
        .catch((error) => {
            console.log("erreur request sign in =>", error)
        })
      },
  
      signUp() {
        if (!this.emailReg || !this.passwordReg || !this.confirmReg) {
          return alert('Please fill all fields');
        }
        if (this.passwordReg !== this.confirmReg) {
          return alert('Passwords do not match');
        }
  
        const signupData = {
            name: this.nameReg,
            username: this.emailReg,
            password: this.passwordReg,
        };
        axios({
            method: 'post', 
            url: 'http://localhost:4000/auth/signup',
            headers: {}, 
            data: signupData
        })
        .then(response => {
            console.log("signin with success =>", response.data)
            const tokenRef = response.data.accessToken
            localStorage.setItem('accessToken', tokenRef)
            this.$router.push('/home');
        })
        .catch((error) => {
            console.log("erreur request sign in =>", error)
        })
        // axios
        //   .post('http://localhost:4000/auth/signup', signupData)
        //   .then((res) => {
        //     console.log('SignUp success:', res.data);
        //   })
        //   .catch((err) => {
        //     console.error('SignUp error:', err.response?.data || err);
        //   });
      },
  
      clearFields() {
        this.emailLogin = '';
        this.passwordLogin = '';
        this.emailReg = '';
        this.passwordReg = '';
        this.confirmReg = '';
      },
    },
  };
  </script>
  
  <style>
  .login-page {
    height: 100vh;
    background: url('https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
      no-repeat center center;
    background-size: cover;
  
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-container {
    background-color: rgba(255, 255, 255, 0.9);
    width: 350px;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    position: relative;
    overflow: hidden;
  }
  
  .form-box {
    text-align: center;
  }
  
  /* ----- Formulaires ----- */
  .login-form {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  
  .login-form input {
    margin-bottom: 0.75rem;
    padding: 0.5rem;
    font-size: 1rem;
  }
  
  .login-form button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 0.75rem;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 4px;
    margin-top: 0.5rem;
  }
  
  .login-form button:hover {
    background-color: #0056b3;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.4s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
  
  .form-box p {
    margin-top: 1rem;
  }
  
  .form-box a {
    color: #007bff;
    text-decoration: none;
  }
  .form-box a:hover {
    text-decoration: underline;
  }
  </style>
  