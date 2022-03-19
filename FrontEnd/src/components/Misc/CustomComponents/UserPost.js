/**
 * FileName: UserPost
 * Description: User Post component that can re re used where ever a post needs to be created
 */

import React, { useState,useEffect } from 'react'
import './UserPost.css'
import tempImage from '../../../images/Valorant.jpg'
import env from '../../../env.json'
import axios from 'axios'
const imgReference = env.imgReference

// @post post object that gets passed through
const UserPost = ({post,className}) => {
  const {comments, image_url, timestamp, user,title} = post
  const dateObj = new Date(timestamp)


  return (
    <div className={`userpost-main-container ${className}` }>
      <div className='userpost-votes'>
        Likes
      </div>
      
      <div className='userpost-image'>
        <img src={`${imgReference}${image_url}`}></img>
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