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
                    <p className='comment-reply'>reply</p>
                </div>
            </div>
        </div>
    )
}

export default Comment