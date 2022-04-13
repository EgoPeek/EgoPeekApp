import React from 'react'
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import './MessageCard.css'

const MessageCard = ({...props}) => {
  return (
    <div className='user-card' {...props}>
      <div className='user-card-info'>
        <IconBubble imgStyle={{ height: '4.3rem', width: '4.3rem' }} />
        <div className='card-details'>
          <p>Name</p>
          <p>preview</p>
          <div className='date-receieved'>
            <p>2/28/2000</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageCard