
/**
 *  FileName: MenuDropDown.js
 *  Description: Modular drop down menu that is used all throughout the site, allows for different implementations
 */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './MenuIcon.css'
import MenuIcon from '@mui/icons-material/Menu';


export const MenuDropDown = ({ ...props }) => {
    const [open, setOpen] = useState(false)


    return (
        <div className='dropdown-menu' {...props}>
            <div className='menu-container' >
                <span
                className='menu-img'
                    tabIndex={0}
                    onFocus={() => { setOpen(true) }}
                    onBlur={() => setOpen(false)}
                ><MenuIcon /></span>
            </div>
            <div className={`menu-list ${!open && 'show'}`}>
                {props.children}
            </div>
        </div>
    )
}

export const MenuItem = ({ MenuIcon, redirect, ...props }) => {
    return (
        <div className='item-dropdown' {...props}>
            <div className='menu-item'>
                <span className='menu-logo'>{MenuIcon}</span>
                {props.children}
            </div>
        </div>
    )
}




export default MenuDropDown