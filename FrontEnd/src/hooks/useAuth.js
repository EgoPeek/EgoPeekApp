/**
 *  File name: useAuth.js
 *  Description: Custom react hook that allows easy access of logging a user in/ verifying user/ and logging them out
 */
// import { useState, useEffect } from 'react'
import axios from "axios"
import { useEffect } from "react";
import { useNavigate } from "react-router";

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
    const navigate = useNavigate();

    //checks for valid login
    const checkForValidUser = async (username, password) => {

        // FormData body for oauth2
        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        // verifies user input correct details for login
        try {
            //hits API endpoint
            const res = await axios.post('/api/v1/login', formData)
            console.log(res)
            //converts it to json   
            return {...res.data, success:res.status===200}
        } catch (e) {
            console.log(e)
            return e
        }
    }

    return {
        async login(username, password) {
            const res = await checkForValidUser(username, password)
            
            // NOTE: pretty sure my auth snippet from above should live here, but ask Steve

            // adds the userID userName and auth token into the window localstorage
            if (res.success) {
                window.localStorage.setItem('auth', true)
                window.localStorage.setItem('token', res.access_token)
                window.localStorage.setItem('token_type', res.token_type)
                window.localStorage.setItem('userID',res.user_id)
                window.localStorage.setItem('userName',res.username)
            }
            return res
        },
        register() {
 
        },
        logout() {
            window.localStorage.removeItem('auth')
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('token_type')
            window.localStorage.removeItem('userID')
            window.localStorage.removeItem('userName')
            window.localStorage.removeItem('avatar')
            navigate('/')
        },
        isAuthenticated() {
            return auth === 'true'
        }
    }
}

export default useAuth