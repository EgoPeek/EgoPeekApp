import './Friend.css'
import React, { useState, useEffect } from 'react'
import EGOPEEKIMG from '../../images/EGOPEEK.png'


const Friend = ({friendInfo, ...props}) => {
    
    const { username, profile } = friendInfo
    // const {avatarUrl} = profile[0]

    return (
        <div className='user-friend' {...props}>
        {/* this user-icon should be the user bubble, this is temporary */}
            <div className='user-icon'>
                <img src={EGOPEEKIMG}></img>
            </div>
            <div className='friend-name'>
                <p>{username}</p>
            </div>
        </div>
    )
}

export default Friend