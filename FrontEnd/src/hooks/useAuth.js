// import { useState, useEffect } from 'react'
import axios from "axios"

const useAuth = () => {
    const auth = window.localStorage.getItem('auth')

    //checks for valid login
    const checkForValidEmail = async (email, password) => {
        //json body
        const data = {
            username: email,
            password: password
        }

        //verifys user input correct details for login
        try {
            //hits API endpoint
            const res = await axios.post('/api/v1/login', data)
            console.log(res)
            //converts it to json   
            return {...res.data, success:res.status===200}
        } catch (e) {
            console.log(e)
            return e
        }
    }

    return {
        async login(email, password) {
            const res = await checkForValidEmail(email, password)
            // adds the userID userName and auth token into the window localstorage
            if (res.success) {
                window.localStorage.setItem('auth', true)
                window.localStorage.setItem('userID',res.user_id)
                window.localStorage.setItem('userName',res.username)
            }
            return res
        },
        register() {

        },
        logout() {
            window.localStorage.setItem('auth', false)
        },
        isAuthenticated() {
            return auth === 'true'
        }
    }
}

export default useAuth