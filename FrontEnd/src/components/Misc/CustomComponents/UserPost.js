/**
 * FileName: UserPost
 * Description: User Post component that can re re used where ever a post needs to be created
 */

import React, { useState, useEffect } from 'react'
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import './UserPost.css'
import env from '../../../env.json'
import EGOPEEKIMG from '../../../images/EGOPEEK.png'
import DisplayPost from '../../UserFeed/DisplayPost'
import axios from 'axios';
const imgReference = env.imgReference

// @post post object that gets passed through
const UserPost = ({ post, ...props }) => {
  const userID = window.localStorage.getItem('userID')
  const username = window.localStorage.getItem('userName')
  const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')


  const { image_url, timestamp, user, title, content_path_type, like_count, liked_by, post_id } = post

  const [likeCount, setLikeCount] = useState(liked_by.length)
  const [userDidLike, setUserDidLike] = useState(() => {
    const liked = liked_by.find(x => x.user.id === parseInt(userID))
    return liked ? true : false
  })
  const [imageUrl, setImageUrl] = useState('')
  const [showPost, setShowPost] = useState(false)
  const dateObj = new Date(timestamp)
  const [timeout, setTimeout] = useState(false)

  // set imageUrl and videoUrl based on whether it's a link or an uploaded file
  useEffect(() => {

    if (content_path_type === 'external') {
      setImageUrl(image_url)
    } else {
      setImageUrl(imgReference + image_url)
    }
    return () => {
      document.getElementById('root').style.overflowY = 'scroll'
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

  const updateLikes = async () => {
    console.log(post_id)
    setTimeout(true)
    setUserDidLike(!userDidLike)

    if (userDidLike) {
      setLikeCount(prev => prev - 1)
      try {
        const res = await fetch('/api/v1/likes/', {
          headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'Authorization': authHeader

          },
          method: 'DELETE',
          body: JSON.stringify({
            post_id: post_id,
            user_id: parseInt(userID),
            username: username
          })
        })
        const index = liked_by.findIndex(x => x.user.id === parseInt(userID))
        liked_by.splice(index,1)
      } catch (e) {
        console.log(e)
      }
    }
    else {
      setLikeCount(prev => prev + 1)
      const obj = {
        user: {
          id: parseInt(userID),
          username: username
        }
      }
      liked_by.push(obj)

      try {
        const res = await axios.post('/api/v1/likes/', {
          post_id: post_id,
          user_id: userID,
          username: username
        }, { headers: { Authorization: authHeader } })
      } catch (e) {
        console.log(e)
      }
    }
    setTimeout(false)
  }

  return (
    <>
      {showPost && <DisplayPost post={post}
        closeDisplay={closeDisplay}
        likePost={updateLikes}
        likeCount={likeCount}
        timeout={timeout}
        userDidLike={userDidLike}

      />}

      <div className='userpost-main-container' {...props} onClick={displayPost}>
        <div className='userpost-votes' onClick={(e) => e.stopPropagation()}>
          <p>{likeCount}</p>
          <HeartSwitch checked={userDidLike} onChange={updateLikes} disabled={timeout} size="md" />
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
            <p>posted: {`${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPost