import { useState, useEffect } from 'react'

const useAuth = () => {
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        //check if user is logged in through an API call, or cookie in the browser
        setAuth(true)
    }, [])

    //check if authed from 
    return {
        auth,
    }
}

export default useAuth