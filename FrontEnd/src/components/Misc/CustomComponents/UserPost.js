/**
 * FileName: UserPost
 * Description: User Post component that can re re used where ever a post needs to be created
 */

import React, { useState, useEffect } from 'react'
import './UserPost.css'
import env from '../../../env.json'
import EGOPEEKIMG from '../../../images/EGOPEEK.png'
import DisplayPost from '../../UserFeed/DisplayPost'
const imgReference = env.imgReference

// @post post object that gets passed through
const UserPost = ({ post, ...props }) => {
  const { comments, image_url, timestamp, user, title, content_path_type } = post
  const [imageUrl, setImageUrl] = useState('')
  const [showPost, setShowPost] = useState(false)
  const dateObj = new Date(timestamp)

  // set imageUrl and videoUrl based on whether it's a link or an uploaded file
  useEffect(() => {


    if (content_path_type === 'external') {
      setImageUrl(image_url)
    } else {
      setImageUrl(imgReference + image_url)
    }
  }, [])

  const displayPost = (topic, e) => {
    setShowPost(true)
    console.log(topic)
    // THIS IS REALLY BAD DO NOT DO THIS EVER, NATE YOU DOG I SWEAR AXEL DON'T DO THIS
    document.getElementById('root').style.overflowY = 'hidden'
  }

  // closes overlay
  const closeDisplay = () => {
    setShowPost(false)
    // ACTUAL NIGHTMARE FUEL, I HATE EVERYONE
    document.getElementById('root').style.overflowY = 'scroll'
  }


  return (
    <>
      {showPost && <DisplayPost post={post} closeDisplay={closeDisplay} />}

      <div className='userpost-main-container' {...props} onClick={displayPost}>
        <div className='userpost-votes'>
          Likes
        </div>

        <div className='userpost-image'>

          <img src={imageUrl === '' ? EGOPEEKIMG : imageUrl}></img>

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
    </>
  )
}

export default UserPost