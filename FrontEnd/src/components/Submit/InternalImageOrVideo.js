import React, { useEffect, useRef, useState } from 'react'
import { GreenButton } from '../Misc/Input/Buttons'
import './Submit.css'
import { TextareaAutosize } from '@mui/material'

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

const InternalImageOrVideo = ({
    maxFileSizeInBytes,
    setFiles,
    files,
    setBlob,
    blob,
    setImageDescription,
    videoElem,
    ...otherProps
}) => {
    const [hoverToShow, setHoverToShow] = useState(false)

    const removeImg = () => {
        setFiles([])
        setBlob('')
        setHoverToShow(false)
    }

    return (
        <div>
            {files.length <= 0 ?
                <FileUpload files={files} setFiles={setFiles} setBlob={setBlob}/>
                :
                <div className='complete-upload'>
                    <div className='upload-container'>
                        <div className='hover-container' onClick={removeImg} >
                            {hoverToShow && <h2 className='img-hover-message'>click to remove</h2>}
                            {FILETYPES_IMG.includes(files[0].type) &&
                                <img onMouseOver={() => setHoverToShow(true)} onMouseLeave={() => { setHoverToShow(false) }}
                                    src={blob}
                                    className="uploaded-img-src"></img>
                            }
                            {FILETYPES_VIDEO.includes(files[0].type) &&
                                <video ref={videoElem} controls onMouseOver={() => setHoverToShow(true)} onMouseLeave={() => { setHoverToShow(false) }}
                                    className="uploaded-img-src" src={blob}>
                                    </video>
                            }
                        </div>
                    </div>
                    <div className='uploaded-img-textfield'>
                        <TextareaAutosize
                            aria-label="empty textarea"
                            placeholder="Text"
                            className="textPost-textField upload-text-field"
                            style={{ height: '100%' }}
                            onChange={(e)=>{
                                setImageDescription(e.target.value)
                            }}
                        />
                    </div>

                </div>
            }
        </div>
    )
}


export const FileUpload = ({ files, setFiles,setBlob }) => {
    const fileUpload = useRef(null)
    const uploadBox = useRef(null)
    const [dragging, setDragging] = useState(false)
    let counter = 0;

    useEffect(() => {
        const div = uploadBox.current
        if (div === null) { return };
        div.addEventListener('dragenter', handleDragIn)
        div.addEventListener('dragleave', handleDragOut)
        div.addEventListener('dragover', handleDrag)
        div.addEventListener('drop', handleDrop)
        return () => {
            const div = uploadBox.current
            if (div === null) return
            div.removeEventListener('dragenter', handleDragIn)
            div.removeEventListener('dragleave', handleDragOut)
            div.removeEventListener('dragover', handleDrag)
            div.removeEventListener('drop', handleDrop)
        }

    }, [])


    const onUploadButnClick = () => {
        fileUpload.current.click();
    }
    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        counter++;
        setDragging(true)
    }
    const handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        counter--;
        if (counter > 0) return
        setDragging(false)
    }

    const fileChange = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.target.files[0]
        setFiles([file])
        setBlob(URL.createObjectURL(file))
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const fileList = e.dataTransfer.files
        setFiles([fileList[0]])
        setBlob(URL.createObjectURL(fileList[0]))
        //creating a change to setFiles to setFiles([...files,...listFiles])
        //will allow users to drag and drop multiple pictures

        // e.dataTransfer.clearData()
        setDragging(false)
        counter = 0

    }

    return (
        <div className={`file-upload ${dragging && 'dragging-state'}`} ref={uploadBox}>
            <div className='file-text'>
                <input type="file" className='custom-file-input' ref={fileUpload} onChange={fileChange}></input>
                Drag and drop image or
                <GreenButton variant='outlined' onClick={onUploadButnClick}>Upload</GreenButton>
            </div>
        </div>
    )
}


export default InternalImageOrVideo