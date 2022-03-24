/**
 * FileName: UserPost
 * Description: User Post component that can re re used where ever a post needs to be created
 */

import React, { useState, useEffect } from 'react'
import './UserPost.css'
import env from '../../../env.json'
const imgReference = env.imgReference

// @post post object that gets passed through
const UserPost = ({ post, ...props }) => {
  const { comments, image_url, timestamp, user, title, content_path_type } = post
  const dateObj = new Date(timestamp)
  const [imageUrl, setImageUrl] = useState('')

  // set imageUrl and videoUrl based on whether it's a link or an uploaded file
  useEffect(() => {


    if (content_path_type === 'external') {
      setImageUrl(image_url)
    } else {
      setImageUrl(imgReference + image_url)
    }
  }, [])


  return (
    <div className='userpost-main-container' {...props}>
      <div className='userpost-votes'>
        Likes
      </div>

      <div className='userpost-image'>

        <img src={imageUrl}></img>

      </div>

      <div className='userpost-information'>
        <div className='post-title post-element'>
          <h2>{title}</h2>
        </div>

        <div className='post-user post-element'>
          <p>Author: {user.username}</p>
        </div>

        <div className='date-posted post-element'>
          <p>posted: {`${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()}`}</p>
        </div>
      </div>
    </div>
  )
}

export default UserPost