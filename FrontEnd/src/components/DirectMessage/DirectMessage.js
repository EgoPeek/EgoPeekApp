import React from 'react'
import Header from '../Misc/CustomComponents/Header'
import { DarkTextInput } from '../Misc/Input/TextFields'
import MessageCard from './MessageCard'
import SendMessageField from './SendMessageField'
import './DirectMessage.css'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ChatMessage from '../Chat/ChatMessage'

const DirectMessage = () => {
  return (
    <>
      {/* contsins all users dms */}
      <Header />
      <div className='dm-container'>
        <div className='dm-feed'>
          <section className='dm-left-container'>
            <div className='dam-search-user'>
              <DarkTextInput size='small' label="Search User" InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: 'white' }} />
                )
              }} />
            </div>

            <div className='dm-users'>
              <MessageCard className='highlighted-dm' />
              <MessageCard />
              <MessageCard />
              <MessageCard />
              <MessageCard />
            </div>
          </section>

          {/* contains user messages */}
          <section className='dm-right-container'>
            <div className='dm-messages'>
              <SendMessageField />
              <ChatMessage isSelf={true} />
              <ChatMessage />
              <ChatMessage isSelf={true} />
              <ChatMessage />
              <ChatMessage />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default DirectMessage