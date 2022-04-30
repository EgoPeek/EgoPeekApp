/**
 *  Filename: NewThreadList.js
 *  Description: Menu that shows a users friends and allows them to create a new message from it
 * 
 */
import React from 'react'
import { TextInputPurple } from '../Misc/Input/TextFields'
import './NewThreadList.css'
import SearchIcon from '@mui/icons-material/Search';
import { IconBubble } from '../Misc/CustomComponents/IconBubble';
import { PurpleIconButton } from '../Misc/Input/Buttons';
import Close from '@mui/icons-material/Close';


const NewThreadList = ({ friendsList, createThread, displayPostEvent }) => {
  const userID = window.localStorage.getItem('userID')

  return (
    <div className='dm-newthread-container'>
      <div className='dm-thread-list'>
        <div className='dm-top-window'>
          <div className='dm-close-button'>
            <PurpleIconButton onClick={displayPostEvent}>
              <Close />
            </PurpleIconButton>
          </div>
          <span className='dm-window-header'>
            👋 Say hi to a friend!
          </span>
        </div>
        <div>
          <TextInputPurple size='small'
            label='Search for a friend'
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: 'white' }} />
              )
            }} fullWidth />
        </div>
        <div className='dm-thread-friends'>
          {friendsList.map((friend, i) => (
            friend.friend_status === 'friends' &&
            <div className='dm-friend-card' onClick={createThread(friend.user_id, userID,friend.username)} key={i}>
              <IconBubble imgStyle={{ height: '3.5rem', width: '3.5rem', marginRight: '0.8rem' }}
                userImgSrc={friend.avatar_path} />
              <span>{friend.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewThreadList