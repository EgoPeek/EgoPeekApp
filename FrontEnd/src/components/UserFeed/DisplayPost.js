import React, { useState } from 'react'
import { GreenButton } from '../Misc/Input/Buttons'
import { TextInputStandard } from '../Misc/Input/TextFields'
import CloseIcon from '@mui/icons-material/Close';
import Comment from './Comment'
import './DisplayPost.css'
import { Button } from '@mui/material';
import axios from 'axios';

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


const DisplayPost = ({ post, closeDisplay, ...props }) => {
    const { post_id, comments, like_count, content_path_type, title, message, timestamp, user, video_url, image_url, hashtag_group } = post
    const hashtags = hashtag_group.hashtags
    const isVideo = video_url !== ""

    const dateObj = new Date(timestamp)
    const [comment, setComment] = useState('')
    const [isExternalImage, setIsExternalImage] = useState(false)
    const userID = window.localStorage.getItem('userID')

    const addComment = async () => {
        if (comment === '') return;

        const body = {
            user_id: userID,
            message: comment,
            post_id: post_id
        }
        try {
            const res = await axios.post('/api/v1/comments/', body)
            const newComment = res.data
            comments.push(newComment)
            console.log(res.data)
            setComment('')
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
                    <h1>{title}</h1>
                    <div className='display-top-half'>
                        <div className='display-post-content'>

                            {
                                content_path_type === 'external' ?
                                    FILETYPES_IMG.filter(x => image_url.match(x)).length > 0 ?

                                        <img src={image_url}></img> :
                                        <video src={video_url}></video>
                                    :
                                    isVideo ?
                                        <video src={video_url} controls></video>
                                        :
                                        <img src={image_url}></img>
                            }
                        </div>
                        <div className='display-content-info'>
                            <div className='display-content-user-info'>
                                <div className='display-user'>
                                    {/* this div is gonna be a user component that kevin makes */}
                                    user
                                </div>

                                <div className='post-info'>
                                    <div className='post-info-details'>
                                        <p>
                                            Like Count: {like_count}0
                                        </p>
                                    </div>
                                    {/* <div className='content-dislikes'>
                                THIS DOESN'T EXIST IT'LL BE FOR V2
                            </div> */}
                                    <div className='post-info-details'>
                                        <p>
                                            Comments: {comments.length}
                                        </p>
                                    </div>
                                    <div className='post-info-details'>
                                        <p>
                                            posted: {`${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`}
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
                        <TextInputStandard onChange={(e) => { setComment(e.target.value) }} autoComplete='off' fullWidth size='small' variant='outlined' placeholder='Type a comment'></TextInputStandard>
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