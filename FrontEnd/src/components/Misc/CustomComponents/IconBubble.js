/**
 *  FileName: IconBubble.js
 *  Description: Modular drop down menu that is used all throughout the site, allows for different implementations
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './IconBubble.css'
import EGOPEEKIMG from '../../../images/EGOPEEK.png'


export const IconBubble = ({ imgStyle, userImgSrc, listStyles, ...props }) => {
    const [open, setOpen] = useState(false)
    const userImg = userImgSrc ? userImgSrc : EGOPEEKIMG


    return (
        <div className='bubble-icon' {...props}>
            <div className='bubble-img-container' >
                <img
                    tabIndex={0}
                    style={imgStyle}
                    src={userImg}
                    className='bubble-img'
                    onFocus={() => { setOpen(true) }}
                    onBlur={() => setOpen(false)}
                ></img>
            </div>
            <div className={`dropdown-list ${!open && 'show'}`}>
                {props.children}
            </div>
        </div>
    )
}

export const MenuItem = ({ MenuIcon, redirect, method, ...props }) => {
    return (
        <div className='item-dropdown' onClick={method}>
            <Link to={redirect} {...props} className='menu-item'>
                <span className='menu-logo'>{MenuIcon}</span>
                {props.children}
            </Link>
        </div>
    )
}
