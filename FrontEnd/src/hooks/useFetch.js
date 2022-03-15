import { useEffect, useState } from 'react'
import axios from 'axios'

//custom hook that'll fetch a users feed

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const userFeed = async () => {
            try {
                const res = await axios.get(url)
                console.log(res)
                setIsPending(false)
                setData(res.data)
            } catch (e) {
                setIsPending(false)
                setError(e.message)
            }
        }
        userFeed();
    }, [url])

    return { data, isPending, error }
}

export default useFetch