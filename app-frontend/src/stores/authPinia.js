import { defineStore } from "pinia";
import axios from 'axios';

const authGlobalState = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null
    }), 
    getters: {
        isLoggedIn(state) {
            return !!state.accessToken;
        },
    },

    actions: {
        //global get data and clean
        /**
         * @param {string} refreshToken
         * @param {string} accessToken
         * @param {string} username
         * @param {string} password
         * @param {string} name
         */
        setTokens(refreshToken, accessToken) {
            this.accessToken = accessToken
            this.refreshToken = refreshToken
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)
        },
        clearTokens() {
            this.accessToken = null
            this.refreshToken = null
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        },

        //async front auth method
        async signin(username, password) {
            try {
                const res = await axios({
                    method: 'post', 
                    url: 'http://localhost:4000/auth/signin',
                    data: {username, password}
                });
                const { accessToken, refreshToken } = res.data
                this.setTokens(accessToken, refreshToken)

            } catch (error) {
                console.log("error login front pinia =>", error)
            }
        },
        async signup(username, password, name) {
            try {
                const res = await axios({
                    method: 'post', 
                    url: 'http://localhost:4000/auth/signup',
                    data: {name, username, password}
                });
                const { accessToken, refreshToken } = res.data
                this.setTokens(accessToken, refreshToken)
                
            } catch (error) {
                console.log("error login front pinia =>", error)
            }
        },
        async logout() {
            try {
             if (this.accessToken) {
                await axios({
                    method: 'get', 
                    url: 'http://localhost:4000/auth/logout',
                    headers: { Authorization: `Bearer ${this.accessToken}` }
                })
             }
                
            } catch (error) {
                console.log("error login front pinia =>", error)
            } finally {
                this.clearTokens()
            }
        }
    }
})

export default authGlobalState;