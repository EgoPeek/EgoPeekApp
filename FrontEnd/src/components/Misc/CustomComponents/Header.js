/**
 *  FileName: Header.js
 *  Description: Header for EgoPeek, displays Home, looking to queue, discover, contact, and user profile page
 */

import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom'
import { IconBubble,MenuItem } from './IconBubble'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../../hooks/useAuth';

const Header = () => {
    const userName = window.localStorage.getItem('userName')
    const {logout} = useAuth();

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
            <IconBubble imgStyle={{height:'6rem',width:'6rem'}} userImgSrc={''}>
                <MenuItem MenuIcon={<AccountBoxIcon/>} redirect={`/${userName}`}>Account</MenuItem>
                <MenuItem MenuIcon={<SettingsIcon/>} redirect='/settings'>Settings</MenuItem>
                <MenuItem MenuIcon={<InboxIcon/>} redirect='#'>Messages</MenuItem>
                <MenuItem MenuIcon={<LogoutIcon/>} method={()=> logout()} redirect="#">Log Out</MenuItem>
            </IconBubble>
        </div>
    )
}

export default Header