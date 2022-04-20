/**
 *  FileName: useToken.js
 *  Description: Custom react hook that allows for an easy way to decode current JWT token and return encoded userID
 */
import { useEffect, useState } from 'react'
import axios from 'axios'

const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')

// custom hook that will fetch the userID associated with the current token
const useToken = async (go) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const validateUser = async () => { 
            try {
                const response = await axios.get(`/api/v1/users/me/`, {headers: {Authorization: authHeader}})
                setData(response.data.id)
                setIsPending(false)
                // return response.data.id
            } catch (error) {
                setError(error.message)
                setIsPending(false)
            }
        }
        validateUser();
    }, [go])

    console.log(data, isPending, error, 'DATA FROM HOOK')
    return { data, isPending, error }
}

export default useToken