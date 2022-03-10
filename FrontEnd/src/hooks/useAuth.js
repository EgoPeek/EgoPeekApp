// import { useState, useEffect } from 'react'

const useAuth = (key) => {
    const auth = window.localStorage.getItem('auth')
    return {
        login(){
            window.localStorage.setItem('auth',true)
        },
        logout(){
            window.localStorage.setItem('auth',false)
        },
        isAuthenticated(){
            return auth === 'true'
        }
    }
}

export default useAuth