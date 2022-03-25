// import { useState, useEffect } from 'react'
import axios from "axios"
import { useEffect } from "react";

// putting this here for now for Steve's reference, not sure where it should live
// auth bearer token handling to persist through page refresh/redirect, but drop token on logout/window close



/*
// declare window.localStorage variables
const [authToken, setAuthToken] = useState(null);
const [authTokenType, setAuthTokenType] = useState(null);
const [username, setUsername] = useState('')
const [userId, setUserId] = useState('')

// store session data in window.localStorage
useEffect(() => {
    setAuthToken(window.localStorage.getItem('authToken'))
    setAuthTokenType(window.localStorage.getItem('authTokenType'))
    setUsername(window.localStorage.getItem('username'))
    setUserId(window.localStorage.getItem('userId'))
}, [])

// retrieve session data if dependency changes, otherwise remove them
useEffect(() => {
    authToken
        ? window.localStorage.setItem('authToken', authToken)
        : window.localStorage.removeItem('authToken')
    authTokenType
        ? window.localStorage.setItem('authTokenType', authTokenType)
        : window.localStorage.removeItem('authTokenType')
    username
        ? window.localStorage.setItem('username', username)
        : window.localStorage.removeItem('username')
    userId
        ? window.localStorage.setItem('userId', userId)
        : window.localStorage.removeItem('userId')
}, [authToken, authTokenType, userId])

// now, when API call is made, parse response body and call setAuthToken, etc 
*/


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
            
            // NOTE: pretty sure my auth snippet from above should live here, but ask Steve

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