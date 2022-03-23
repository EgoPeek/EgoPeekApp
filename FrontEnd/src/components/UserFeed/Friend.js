import './Friend.css'
import React, { useState, useEffect } from 'react'
const baseUrl = 'http://localhost:5000'


const Friend = ({friendInfo, className}) => {
    
    const { username, profile } = friendInfo
    const [avatarUrl, setAvatarUrl] = useState('')
    
    useEffect(() => {
        setAvatarUrl(baseUrl + profile[0].avatar_path)
      }, [])

    console.log(avatarUrl)
    return (
        <div className={`user-friend ${className}`}>
            <div className='user-icon'>
                <img src={avatarUrl}></img>
            </div>
            <div className='friend-name'>
                <p>{username}</p>
            </div>
        </div>
    )
}

export default Friend