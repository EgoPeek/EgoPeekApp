/**
 *  FileName: CreatePost.js
 *  Description: File that'll redirect user to /submit when clicked,
 *      idk this is how reddit does it and works for them so I'm taking it.
 *      its 2am leave me alone
 */

import React from 'react'
import './CreatePost.css'
import { Link } from 'react-router-dom'
import { TextInputPost } from '../Misc/Input/TextFields'
import logo from '../../images/EGOPEEK.png'

const CreatePost = () => {
    const username = window.localStorage.getItem('userName')
    
    return (
        <div className='create-post'>
            <div className='create-post-img'>
            {/* clicking the logo takes you to your account page */}
                <Link to={`/account/${username}`}><img src={logo}></img></Link>
            </div>
            {/* clicking the submit box takes you to /submit */}
            <Link to='/submit' style={{width:'100%'}}><TextInputPost fullWidth size='small' label='Create a post'/></Link>
        </div>
    )
}

export default CreatePost