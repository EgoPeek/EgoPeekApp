/**
 * FileName: UserPost
 * Description: User Post component that can re re used where ever a post needs to be created
 */

import React from 'react'
import './UserPost.css'
import tempImage from '../../../images/Valorant.jpg'

// @post post object that gets passed through
const UserPost = ({ post }) => {
  return (
    <div className='userpost-main-container'>
      <div className='userpost-votes'>
        Likes
      </div>
      
      <div className='userpost-image'>
        <img src={tempImage}></img>
      </div>

      <div className='userpost-information'>
        <div className='post-title post-element'>
          <h2>title</h2>
        </div>

        <div className='post-user post-element'>
          <p>Posted by: userName</p>
        </div>

        <div className='date-posted post-element'>
          <p>3/15/22</p>
        </div>
      </div>
    </div>
  )
}

export default UserPost