import React, { useEffect } from 'react'
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import './MessageCard.css'
import useFetch from '../../hooks/useFetch'


const MessageCard = ({ messageInfo, highlighted, setDisplayedAvatar, ...props }) => {
  const userID = window.localStorage.getItem('userID')
  const { body, sent_time } = messageInfo.messages[messageInfo?.messages.length - 1]
  const sender = messageInfo.user1_id === parseInt(userID) ? messageInfo.user2_id : messageInfo.user1_id
  const dateObj = new Date(sent_time)
  const {data,isPending,error} = useFetch(`/api/v1/profiles/avatar/${sender}`)

  useEffect(() => {
    setDisplayedAvatar(data?.avatar_path)
  }, [isPending])
  

  return (
    <div className={`user-card ${highlighted && 'highlighted-dm'}`} {...props}>
      <div className='user-card-info'>
        <IconBubble userImgSrc={data?.avatar_path} imgStyle={{ height: '4.3rem', width: '4.3rem' }} />
        <div className='card-details'>
          <p>{data?.user.username}</p>
          <p>{body}</p>
          <div className='date-receieved'>
            <p>{`${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageCard