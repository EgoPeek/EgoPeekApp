import React from 'react'
import { GreenButton } from '../Misc/Input/Buttons'
import { TextInputStandard } from '../Misc/Input/TextFields'
import CloseIcon from '@mui/icons-material/Close';
import Comment from './Comment'
import './DisplayPost.css'
import {Button } from '@mui/material';

const DisplayPost = ({ post, closeDisplay, ...props }) => {
    const { comments, like_count, content_path_type, title, message, timestamp, user, video_url, image_url } = post
    const isVideo = video_url === ""

    const dateObj = new Date(timestamp) 

    return (
        <div className='display-post-container' {...props}>
            <div className='display-post-buffer'>

                <div className='display-post'>

                    <div className='close-button' onClick={closeDisplay}>
                        <Button sx={{color:'white'}} startIcon={<CloseIcon/>}>Close</Button>
                    </div>
                    <h1>{title}</h1>
                    <div className='display-top-half'>
                        <div className='display-post-content'>
                            {isVideo ?
                                <img src={image_url}></img>
                                :
                                <video src={video_url} controls></video>
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
                                            Like Count: {like_count}
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='post-create-comment'>
                        <TextInputStandard autoComplete='off' fullWidth size='small' variant='outlined' placeholder='Type a comment'></TextInputStandard>
                        <GreenButton variant='outlined'>Submit</GreenButton>
                    </div>
                    <div className='display-comments-container'>
                        <Comment commenter='user-info' />
                        <Comment commenter='user-info' />
                        <Comment commenter='user-info' />
                        <Comment commenter='user-info' />
                        <Comment commenter='user-info' />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default DisplayPost