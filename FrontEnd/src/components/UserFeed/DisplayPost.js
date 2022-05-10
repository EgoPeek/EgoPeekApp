/**
 *  FileName: DisplayPost.js
 *  Description: Displays an overlay on the desired post that wants to be viewed
 */
import React, { useState } from 'react'
import { GreenButton } from '../Misc/Input/Buttons'
import { TextInputStandard } from '../Misc/Input/TextFields'
import CloseIcon from '@mui/icons-material/Close';
import Comment from './Comment'
import './DisplayPost.css'
import { Button } from '@mui/material';
import axios from 'axios';
import { IconBubble } from '../Misc/CustomComponents/IconBubble';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router';
import { GreenCircle } from '../Misc/Input/LoadingCircle';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import { MenuDropDown, MenuItem } from '../Misc/Input/MenuDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import useTokenID from '../../hooks/useTokenID';
import { Link } from 'react-router-dom';


const FILETYPES_IMG = [
    '.png',
    '.gif',
    '.jpg',
    '.webp',
]
const FILETYPES_VIDEO = [
    '.mp4',
    '.quicktime'
]


const DisplayPost = ({ post, closeDisplay, likePost, likeCount, timeout, userDidLike, ...props }) => {
    const { post_id, comments, liked_by, content_path_type, title, message, timestamp, user, video_url, image_url, hashtag_group } = post
    const { data: avatarData, isPending: avatarIsPending, error: avatarError } = useFetch(`/api/v1/profiles/${user.id}`)
    const author = user.username
    const hashtags = hashtag_group !== null ? hashtag_group.hashtags : []
    const isVideo = video_url !== ""
    const navigate = useNavigate()
    const dateObj = new Date(timestamp)
    const [comment, setComment] = useState('')
    const [isExternalImage, setIsExternalImage] = useState(false)
    const { data: validUserID, isPending: validUserIDIsPending, error: validUserIDError } = useTokenID()
    const userOwnsPost = validUserID === user.id

    const showImgFullScreen = (e) => {
        navigate()
    }

    const addComment = async () => {
        if (comment === '') return;

        const body = {
            user_id: validUserID,
            message: comment,
            post_id: post_id
        }
        const headers = { headers: { Authorization: window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token') } }
        try {
            const res = await axios.post('/api/v1/comments/', body, headers)
            const newComment = res.data
            const s = []
            comments.splice(0, 0, newComment)
            setComment('')
            console.log(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    const enterEvent = (e) => {
        if (e.key === 'Enter') {
            addComment()
            console.log('key')
        }
    }

    const deletePost = async () => {
        // redundancy to check if user actually owns the post
        // again gets checked by the auth key to triple check
        if (!userOwnsPost) return
        const headers = { headers: { Authorization: window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token') } }

        try {
            const res = await axios.delete(`/api/v1/posts/${validUserID}/${post_id}`, headers)
            navigate('/', { replace: true })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='display-post-container' {...props}>
            <div className='display-post-buffer'>
                <div className='display-post'>

                    <div className='close-button' onClick={closeDisplay}>
                        <Button sx={{ color: 'white' }} startIcon={<CloseIcon />}>Close</Button>
                    </div>
                    <div className='post-title'>
                        <HeartSwitch defaultChecked={userDidLike} onChange={likePost} disabled={timeout} />
                        <h1>{title}</h1>
                    </div>
                    <div className='display-top-half'>

                        <div className='display-post-content'>
                            {/* content_path_type === 'external' ?
                                    FILETYPES_IMG.filter(x => image_url.match(x)).length > 0 ?
                                        <img src={image_url}></img> :
                                        <video src={video_url}></video>
                                    : */}
                            {
                                isVideo
                                    ?
                                    <Link to={video_url} target="_blank">
                                        <video src={video_url} controls muted></video>
                                    </Link>
                                    :
                                    <Link to={image_url} target="_blank">
                                        <img src={image_url}></img>
                                    </Link>
                            }
                        </div>
                        <div className='display-content-info'>
                            {/* checks if the current user is the owner and displays the settings*/}
                            {userOwnsPost &&
                                <div className='post-settings'>
                                    <MenuDropDown>
                                        <MenuItem MenuIcon={<DeleteIcon />} onClick={deletePost}>Delete Post</MenuItem>
                                    </MenuDropDown>
                                </div>
                            }
                            <div className='display-content-user-info'>
                                <div>

                                    {avatarIsPending
                                        ?
                                        <GreenCircle sx={{ marginRight: '15px' }} />
                                        :
                                        <IconBubble onClick={() => navigate(`/account/${author}`)} imgStyle={{ height: '4rem', width: '4rem', marginRight: '1rem' }} userImgSrc={avatarData.avatar_path}>
                                        </IconBubble>
                                    }
                                </div>

                                <div className='post-info'>

                                    <div className='post-info-details'>
                                        <p>
                                            Author: {author}
                                        </p>
                                    </div>
                                    <div className='post-info-details'>
                                        <p>
                                            Like Count: {likeCount}
                                        </p>
                                    </div>
                                    <div className='post-info-details'>
                                        <p>
                                            Comments: {comments.length}
                                        </p>
                                    </div>
                                    <div className='post-info-details'>
                                        <p>
                                            posted: {`${dateObj.getFullYear()}/${dateObj.getMonth()+1}/${dateObj.getDate()}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='content-description'>
                                <div className='content-description-info'>
                                    {message}
                                </div>
                                <div className='description-tags'>
                                    TAGS:
                                    <div className='tag-grouping'>
                                        {hashtags.map((item, i) => <p key={i}>#{item.hashtag_label}</p>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='post-create-comment'>
                        <TextInputStandard value={comment} onKeyPress={enterEvent} onChange={e => setComment(e.target.value)} autoComplete='off' fullWidth size='small' variant='outlined' placeholder='Type a comment'></TextInputStandard>
                        <GreenButton onClick={addComment} variant='outlined'>Submit</GreenButton>
                    </div>
                    <div className='display-comments-container'>
                        {comments.map((item, i) => <Comment commenter={item} key={i} />)}

                    </div>
                </div>
            </div>

        </div>
    )
}

export default DisplayPost