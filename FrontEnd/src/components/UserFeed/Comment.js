/**
 *  FileName: Comment.js
 *  Description: Comment component that is displayed under a users post 
 */
import React from 'react'
import { useNavigate } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import { GreenCircle } from '../Misc/Input/LoadingCircle'
import './Comment.css'

const Comment = ({ commenter, ...props }) => {
    const { message, timestamp, user } = commenter
    const dateObj = new Date(timestamp)
    const { data, isPending, error } = useFetch('/api/v1/profiles/avatar/' + user.id)
    const navigate = useNavigate()

    return (
        <div className='display-comment' {...props}>
            {isPending
                ?
                <GreenCircle />
                :
                <IconBubble onClick={() => navigate('/account/' + user.username)}
                    imgStyle={{ height: '3.8rem', width: '3.8rem', marginRight: '15px' }}
                    userImgSrc={data.avatar_path}>
                </IconBubble>

            }
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