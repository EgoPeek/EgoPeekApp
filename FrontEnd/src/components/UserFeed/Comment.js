/**
 *  FileName: Comment.js
 *  Description: Comment component that is displayed under a users post 
 */
import React from 'react'
import './Comment.css'

const Comment = ({ commenter, ...props}) => {
    const {message, timestamp, user} = commenter
    const dateObj = new Date(timestamp)
    
    return (
        <div className='display-comment' {...props}>
            <div className='user-img'>
                user
            </div>
            <div className='comment-info'>
                <div className='comment-user'>
                    <p>{user.username}</p>
                    <p>{`${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`}</p>
                </div>
                <div className='comment-content'>
                    <p className='comment-msg'>{message}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment