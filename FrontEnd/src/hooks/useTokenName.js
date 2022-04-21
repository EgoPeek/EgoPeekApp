/**
 *  FileName: useToken.js
 *  Description: Custom react hook that allows for an easy way to decode current JWT token and return encoded username
 */
import { useEffect, useState } from 'react'
import axios from 'axios'

// custom hook that will fetch the username associated with the current token
const useTokenName = () => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const headers = {headers: {Authorization: window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')}}
        const validateUsername = async () => { 
            try {
                const response = await axios.get(`/api/v1/users/me/`, headers)
                setData(response.data.username)
                setIsPending(false)
            } catch (error) {
                setError(error.message)
                setIsPending(false)
            }
        }
        validateUsername();
    }, [])

    return { data, isPending, error }
}
export default useTokenName