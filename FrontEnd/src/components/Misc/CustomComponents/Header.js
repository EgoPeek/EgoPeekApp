/**
 *  FileName: Header.js
 *  Description: Header for EgoPeek, displays Home, looking to queue, discover, contact, and user profile page
 */

import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'


const Header = () => {
    return (
        <div className='header'>
        
            <div className='header-information'>
                <div className='header-title'>
                    <h1>EgoPeek</h1>
                </div>
                <Link to='/#' className='header-item'><p>Home</p></Link>
                <Link to="/#" className='header-item'><p> Looking to Queue</p></Link>
                <Link to='/#' className='header-item'><p> Discover </p></Link>
                <Link to='/#' className='header-item'><p> Contact </p></Link>
            </div>
            {/* custom user profile thing will go here */}
            <div className='header-user-profile'>
                user
            </div>
        </div>
    )
}

export default Header