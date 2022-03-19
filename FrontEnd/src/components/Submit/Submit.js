/**
 *  Filename: Submit.js
 *  Description: Redirects user to submit a post on EgoPeek allowing options such as,
 *      uploading video, uploading image, or uploading an external source
 */


import React, { useState } from 'react'
import Header from '../Misc/CustomComponents/Header'
import { TextInputPost, TextInputStandard } from '../Misc/Input/TextFields'
import { TextareaAutosize } from '@mui/material'
import { GreenButton } from '../Misc/Input/Buttons'
import InternalImageOrVideo from './InternalImageOrVideo'
import axios from 'axios'

import './Submit.css'

const FILETYPES_IMG = [
    'image/png',
    'image/gif',
    'image/jpeg',
    'image/webp',
]
const FILETYPES_VIDEO = [
    'video/mp4',
    'video/quicktime'
]

const Submit = () => {
    const [tagName, setTagName] = useState('')
    const [tagList, setTagList] = useState([])
    const [highLighted, setHighLighted] = useState(1)
    const [files, setFiles] = useState([])
    const [blob, setBlob] = useState(null)
    const [urlLink, setUrlLink] = useState('')
    const [description, setDescription] = useState('')
    const [imageDescription, setImageDescription] = useState('')
    const [title, setTitle] = useState('')


    const addTag = (e) => {
        e.preventDefault()
        if (tagName === '') return;
        if (tagList.find(x => x === tagName)) return;

        setTagList([...tagList, tagName])
        setTagName('')
    }
    const removeTag = (tag) => {
        if (tagList.find(x => x === tag)) {
            setTagList(tagList.filter(x => x !== tag))
        }
    }
    const titleChange = (e) => {
        const title = e.target.value
        setTitle(title)
    }

    const postExternalSource = async () => {
        const body = {
            user_id: window.localStorage.getItem('userID'),
            title: title,
            image_url: urlLink,
            video_url: urlLink,
            content_path_type: 'external',
            message: ''
        }

        try{
            const res = await axios.post('/api/v1/posts/',body)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }

    }

    const postMessage = async ()=> {
        const body = {
            user_id: window.localStorage.getItem('userID'),
            title: title,
            image_url: '',
            video_url: '',
            content_path_type: 'internal',
            message: description
        }

        try{
            const res = await axios.post('/api/v1/posts/',body)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    const postInternalSource = async () => {
        const file = files[0]
        let videoPath = ''
        let imagePath = ''

        const formData = new FormData()
        if (FILETYPES_IMG.includes(file.type)) {
            formData.append('image', file)
            // hit image endpoint
            try {

                const res = await axios.post('/api/v1/posts/images', formData, {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                })
                console.log(res)
                imagePath = res.data.relative_image_path;
            } catch (err) {
                console.log(err)
            }

        } else if (FILETYPES_VIDEO.includes(file.type)) {
            //hit video endpoint
            formData.append('video', file)
            try {

                const res = await axios.post('/api/v1/posts/videos', formData, {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data'
                    },
                })
                console.log(res)
                videoPath = res.data.relative_video_path;
            } catch (err) {
                console.log(err)
            }
        }

        const body = {
            user_id: window.localStorage.getItem('userID'),
            image_url: imagePath,
            video_url: videoPath,
            content_path_type: 'internal',
            title: title,
            message: imageDescription
        }

        try{
            const res = await axios.post('/api/v1/posts/',body)
            console.log(res.data)
        }catch(err){
            console.log(err)
        }

    }

    // probably add error handling or something before being able to post
    const onButtonSubmit = ()=>{
        if(highLighted===1){
            //1 is text post
            postMessage()
        }else if(highLighted === 2){
            //2 is source post
            postInternalSource()
        }else if(highLighted === 3){
            // 3 is url post
            postExternalSource()
        }
    }

    return (
        <div>
            <Header />
            <div className='submit-container'>
                <div className='submit-form'>
                    <div className='submit-container-title'>
                        <h2>Create a post</h2>
                    </div>

                    <div className='create-post-container'>

                        <div className='post-options'>

                            <div onClick={() => setHighLighted(1)} className={`${highLighted === 1 && 'highlighted'} post-option `}>
                                <p>Text Post</p>
                            </div>

                            <div onClick={() => setHighLighted(2)} className={`${highLighted === 2 && 'highlighted'} post-option`}>
                                <p>Images & Video</p>
                            </div>

                            <div onClick={() => setHighLighted(3)} className={`${highLighted === 3 && 'highlighted'} post-option`}>
                                <p>link</p>
                            </div>

                        </div>

                        <div className='post-information'>

                            <div className='post-title'>
                                <TextInputPost size='small' label='Title' fullWidth onChange={titleChange} />
                            </div>

                            <div className='post-body'>
                                {highLighted === 1 && <TextPost setDescription={setDescription} />}
                                {highLighted === 2 && <InternalImageOrVideo files={files} setFiles={setFiles} blob={blob} setBlob={setBlob} setImageDescription={setImageDescription}/>}
                                {highLighted === 3 && <ExternalLink setUrlLink={setUrlLink} />}

                                <div className='submit-post'>
                                    <GreenButton variant='outlined' fullWidth  onClick={onButtonSubmit}>Submit</GreenButton>

                                </div>
                            </div>

                            <div className='select-tags'>
                                <form action="" onSubmit={addTag} className='input-tag-name'>
                                    <TextInputStandard value={tagName} label="add tag" onChange={(e) => setTagName(e.target.value)} size="small" />

                                    <GreenButton variant='outlined' type='submit'>Add Tag</GreenButton>
                                </form>
                                <div className='tags-tagList'>
                                    {tagList.map((x, i) => <Tag removeTag={removeTag} title={x} key={i} />)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const TextPost = ({ setDescription }) => {

    return (
        <div className='textPost'>
            <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Text"
                className="textPost-textField"
                onChange={(e) => {
                    const info = e.target.value
                    setDescription(info)
                }}
            />
        </div>
    )
}

const Tag = ({ title, removeTag }) => {
    return (
        <div className='textPost-tag tag' onClick={() => removeTag(title)}>
            <p>{title}</p>
        </div>
    )
}



const ExternalLink = ({ setUrlLink }) => {

    return (
        <div>
            <TextareaAutosize
                placeholder='Post URL link'
                className='textPost-textField'
                style={{ height: '117px', minHeight: '0', resize: 'none' }}
                onChange={(e) => {
                    const url = e.target.value
                    setUrlLink(url)
                }}
            />
        </div>
    )
}

export default Submit