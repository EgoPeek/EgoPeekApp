/**
 *  FileName: Header.js
 *  Description: Header for EgoPeek, displays Home, looking to queue, discover, contact, and user profile page
 */

import React, { useReducer, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { IconBubble, MenuItem } from './IconBubble'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../../hooks/useAuth';
import useFetch from '../../../hooks/useFetch';
import { CircularProgress } from '@mui/material';
import { GreenCircle } from '../Input/LoadingCircle';
import axios from 'axios';


const Header = () => {
    const userName = window.localStorage.getItem('userName')
    const userID = window.localStorage.getItem('userID')

    const avatar = async () => {
        const avatar = window.localStorage.getItem('avatarUrl')
        if (avatar !== null) return avatar
        else {
            try {
                const res = await axios.get(`/api/v1/profiles/avatar/${userID}`)
                console.log(res)
                window.localStorage.setItem('avatarUrl', res.data.avatar_path)
                return res.data
            } catch (err) {
                window.localStorage.setItem('avatarUrl', null)
                return null
            }
        }
    }

    const { logout } = useAuth();

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
            {
                !avatar
                    ? <GreenCircle />
                    :
                    <IconBubble imgStyle={{ height: '6rem', width: '6rem' }} userImgSrc={avatar.avatar_path}>
                        <MenuItem MenuIcon={<AccountBoxIcon />} redirect={`/account/${userName}`}>Profile</MenuItem>
                        <MenuItem MenuIcon={<SettingsIcon />} redirect='/settings'>Settings</MenuItem>
                        <MenuItem MenuIcon={<InboxIcon />} redirect='#'>Messages</MenuItem>
                        <MenuItem MenuIcon={<LogoutIcon />} method={() => {
                            logout();
                        }} redirect="/home">Log Out</MenuItem>
                    </IconBubble>
            }
        </div>
    )
}

export default Header