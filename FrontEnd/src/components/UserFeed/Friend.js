/**
 *  FileName: Friend
 *  Description: Friend component which are added to the friends list
 */
import './Friend.css'
import React, { useState, useEffect } from 'react'
import { IconBubble, MenuItem } from '../Misc/CustomComponents/IconBubble'
import InboxIcon from '@mui/icons-material/Inbox'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PendingIcon from '@mui/icons-material/Pending';
import { post } from '../../util';
import axios from 'axios';



export const Friend = ({ friendInfo, updateStatus,index, ...props }) => {

    const { username, avatar_path: userImg, friend_status } = friendInfo
    // const {avatarUrl} = profile[0]

    return (
        <div className='user-friend' {...props}>
            {/* this user-icon should be the user bubble, this is temporary */}
            <IconBubble imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={userImg}>
                <MenuItem redirect='#' MenuIcon={<InboxIcon />}>Message</MenuItem>
                <MenuItem redirect={`/${username}`} MenuIcon={<AccountBoxIcon />}>Profile</MenuItem>
                <MenuItem redirect='#' MenuIcon={<PersonRemoveAlt1Icon />} method={() => { deleteFriend(friendInfo); updateStatus('',index)}}>Remove Friend</MenuItem>
            </IconBubble>
            <div className='friend-name'>
                <p>{username}</p>
            </div>
        </div>
    )
}
export const Stranger = ({ friendInfo,updateStatus,index, ...props }) => {

    const { username, profile } = friendInfo
    const userImg = profile === null ? profile[0].avatar_path : '/'

    // const {avatarUrl} = profile[0]

    return (
        <div className='user-friend' {...props}>
            {/* this user-icon should be the user bubble, this is temporary */}
            <IconBubble imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={userImg}>
                <MenuItem redirect={`/${username}`} MenuIcon={<AccountBoxIcon />}>Profile</MenuItem>
                <MenuItem redirect='#' MenuIcon={<PersonAddIcon />} method={() => { sendRequest(friendInfo); updateStatus('invite_sent',index) }} >Add Friend</MenuItem>
            </IconBubble>
            <div className='friend-name'>
                <p>{username}</p>
            </div>
        </div>
    )
}

export const PendingFriendRequest = ({ friendInfo,updateStatus,index, ...props }) => {

    const { username, profile } = friendInfo
    const userImg = profile === null ? profile[0].avatar_path : '/'

    // const {avatarUrl} = profile[0]

    return (
        <div className='user-friend' {...props}>
            {/* this user-icon should be the user bubble, this is temporary */}
            <IconBubble imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={userImg}>
                <MenuItem redirect={`/${username}`} MenuIcon={<AccountBoxIcon />}>Profile</MenuItem>
                <MenuItem redirect='#' MenuIcon={<PendingIcon />} method={() => { updateFriendStatus(friendInfo, 'declined'); updateStatus('',index) }}>Cancel Request</MenuItem>
            </IconBubble>
            <div className='friend-name'>
                <p>{username} <span style={{ fontSize: '0.8rem' }}>pending</span></p>
            </div>
        </div>
    )
}
export const ReceivingFriendRequest = ({ friendInfo,updateStatus,index, ...props }) => {

    const { username, profile } = friendInfo
    const userImg = profile === null ? profile[0].avatar_path : '/'

    // const {avatarUrl} = profile[0]

    return (
        <div className='user-friend' {...props}>
            {/* this user-icon should be the user bubble, this is temporary */}
            <IconBubble imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={userImg}>
                <MenuItem redirect={`/${username}`} MenuIcon={<AccountBoxIcon />}>Profile</MenuItem>
                <MenuItem redirect='#' MenuIcon={<PersonAddIcon />} method={() => { updateFriendStatus(friendInfo, 'friends'); updateStatus('friends',index) }}>Accept Friend</MenuItem>
                <MenuItem redirect='#' MenuIcon={<PersonRemoveAlt1Icon />} method={() => { updateFriendStatus(friendInfo, 'declined'); updateStatus('',index) }}>Decline Friend</MenuItem>
            </IconBubble>
            <div className='friend-name'>

                <p>{username} <span style={{ fontSize: '0.8rem' }}>Request</span></p>
            </div>
        </div>
    )
}

const sendRequest = async (userInfo) => {
    const userID = window.localStorage.getItem('userID')

    const body = {
        user_id: userID,
        friend_id: userInfo.user_id,
    }
    console.log(body)
    const { res, error } = await post('/api/v1/friends/requests', body)
    if (error) {
        console.log(error)
        return
    }
    console.log(res)
}

const updateFriendStatus = async (userInfo, status) => {
    const userID = window.localStorage.getItem('userID')
    const body = {
        user_id: userID,
        friend_id: userInfo.user_id,
        answer: status
    }

    try {
        const res = await axios.put('/api/v1/friends/responses', body)
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}
const deleteFriend = async (userInfo) => {
    const userID = window.localStorage.getItem('userID')
    try {
        const res = await axios.delete(`/api/v1/friends/${userID}/${userInfo.user_id}`)
        console.log(res.data)
    } catch (err) {
        console.log(err)
    }
}

export default Friend