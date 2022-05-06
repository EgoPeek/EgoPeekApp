/**
 *  Filename: useAvatar.js
 *  description: fetches the user avatar from cache or fetches a new one 
 */

import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useAvatar = () => {
    const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')


    const [avatar, setAvatar] = useState('')
    const [error, setError] = useState(false)
    const [isPending, setIsPending] = useState(true)
    const userID = window.localStorage.getItem('userID')

    const fetchNewAvatar = async () => {
        console.log('NEW AVATAR')
        try {
            const res = await axios.get(`/api/v1/profiles/avatar/${userID}`, { headers: { Authorization: authHeader } })
            const data = res.data
            console.log(data)
            if (data.avatar_path === null) {
                window.localStorage.setItem('avatar', '')
                setAvatar('')
            } else {
                window.localStorage.setItem('avatar', data.avatar_path)
                setAvatar(data.avatar_path)
            }
            setIsPending(false)
        } catch (e) {
            setError(true)
            console.log(e)
        }
    }
    const updateAvatarCache = (newAvatar) => {
        window.localStorage.setItem('avatar', newAvatar)
        setAvatar(newAvatar)
    }

    useEffect(() => {
        const avatarUrl = window.localStorage.getItem('avatar')
        if (!avatarUrl || avatarUrl === '') {
            fetchNewAvatar()
        } else {
            setAvatar(avatarUrl)
            setIsPending(false)
        }

    }, [])

    return { avatar, updateAvatarCache, fetchNewAvatar, isPending, error }
}

export default useAvatar