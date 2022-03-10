import React, { useEffect, useState } from 'react'
import axios from 'axios'

//custom hook that'll fetch a users feed

const useFetchFeed = () => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const data = axios.get('/api/v1/somethingUserFeed')


    }, [])

    return data
}

export default useFetchFeed