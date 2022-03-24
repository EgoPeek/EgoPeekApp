import React from 'react'
import './Comment.css'

const Comment = ({ commenter, ...props}) => {
    return (
        <div className='display-comment' {...props}>
            <div className='user-img'>
                user
            </div>
            <div className='comment-info'>
                <div className='comment-user'>
                    <p>Alfie</p>
                    <p>2/28/2000</p>
                </div>
                <div className='comment-content'>
                    <p className='comment-msg'>This is a comment under a user post </p>
                    <p className='comment-reply'>reply</p>
                </div>
            </div>
        </div>
    )
}

export default Comment