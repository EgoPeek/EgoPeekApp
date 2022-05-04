/**
 *  FileName: Comment.js
 *  Description: Comment component that is displayed under a users post 
 */
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useAvatar from '../../hooks/useAvatar'
import { get } from '../../util'
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import { GreenCircle } from '../Misc/Input/LoadingCircle'
import './Comment.css'

const Comment = ({ commenter, ...props }) => {
    const userID = window.localStorage.getItem('userID')
    const username = window.localStorage.getItem('userName')
    const { message, timestamp, user } = commenter
    const dateObj = new Date(timestamp)

    const [data, setData] = useState({})
    const [isPending, setIsPending] = useState(true)
    const { avatar } = useAvatar()

    const getProfile = async () => {
        const {res,error} = await get('/api/v1/profiles/avatar/' + user.id)
        setData(res.data)
        setIsPending(false)
    }

    useEffect(() => {
        if (parseInt(userID) !== user.id) {
            getProfile()
        }
    }, [])



    const navigate = useNavigate()

    return (
        <div className='display-comment' {...props}>
            {parseInt(userID) === user.id
                ?
                <IconBubble onClick={() => navigate('/account/' + username)}
                    imgStyle={{ height: '3.8rem', width: '3.8rem', marginRight: '15px' }}
                    userImgSrc={avatar}>
                </IconBubble>
                :
                isPending
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