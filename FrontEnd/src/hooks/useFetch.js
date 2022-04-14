/**
 *  FileName: useFetch.js
 *  Description: Custom react hook that allows for an easy way to fetch something from the backend
 */
import { useEffect, useState } from 'react'
import axios from 'axios'

//custom hook that'll fetch a users feed
const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')

    useEffect(() => {
        const userFeed = async () => {
            try {
                const res = await axios.get(url, {headers: {Authorization: authHeader}})
                console.log(res)
                setData(res.data)
                setIsPending(false)
            } catch (e) {
                setError(e.message)
                setIsPending(false)
            }
        }
        userFeed();
    }, [url])

    return { data, isPending, error }
}

export default useFetch