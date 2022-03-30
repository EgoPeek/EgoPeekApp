import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './IconBubble.css'

export const IconBubble = ({imgStyle, userImgSrc, ...props }) => {
    const [open, setOpen] = useState(false)



    return (
        <div tabIndex={0} className='bubble-icon' onFocus={()=>{setOpen(true)}} onBlur={()=>setOpen(false)}>
            <div className='bubble-img-container'>
                <img style={imgStyle} src="/user_avatars/valorant-logo-FAB2CA0E55-seeklogo.com_FXIXdtiJxv.png" className='bubble-img'></img>
            </div>
            <div className={`dropdown-list ${open && 'show'}`}>
                {props.children}
            </div>
        </div>
    )
}

export const MenuItem = ({ MenuIcon,redirect, method, ...props }) => {
    return (
        <div className='item-dropdown' onMouseDown={()=>{method()}}>
            <Link to={redirect} className='menu-item'>
                <span className='menu-logo'>{MenuIcon}</span>
                {props.children}
            </Link>
        </div>
    )
}
