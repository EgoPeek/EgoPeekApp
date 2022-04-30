/**
 *  Filename: TitleMessage.js
 *  Description: Splash screen that tells a user to create a new dm if there's nothing there
 * 
 */
import React, { useState } from 'react'
import { PurpleButton } from '../Misc/Input/Buttons'
import './TitleMessage.css'

const TitleMessage = ({ openPopUp, ...props }) => {
    return (<div className='dm-select-message' {...props}>
        <div className='dm-title-container'>
            <div className='dm-title'>
                <span>Select a message</span>
            </div>
            <div className='dm-subheading'>
                <span>Choose from existing conversation or create a new one!</span>
            </div>
            <div className='dm-start-chat'>
                <PurpleButton onClick={openPopUp} variant='contained' size='large' sx={{ fontWeight: 550 }}>New Chat</PurpleButton>
            </div>
        </div>
    </div>);
}

export default TitleMessage