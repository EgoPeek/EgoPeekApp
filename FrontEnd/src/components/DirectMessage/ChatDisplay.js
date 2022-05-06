/**
 *  Filename: ChatDisplay.js
 *  Description: Displays all chat messages between another user
 * 
 */
import React from 'react'
import useAvatar from '../../hooks/useAvatar'
import ChatMessage from '../Chat/ChatMessage'
import SendMessageField from './SendMessageField'

const ChatDisplay = ({ username, userMessage, setUserMessage, sendMessage, displayedMessages }) => {
  const userID = window.localStorage.getItem('userID')
  const {avatar} = useAvatar()
  console.log(displayedMessages)

  const enterEvent = (e) => {
    if(e.key ==='Enter'){
      sendMessage()
    }
  }

  return (
    <>
      <div className='dm-chat-header'>
        <span style={{ textDecorationLine: 'underline' }}>
          {username}
        </span>
      </div>
      <SendMessageField onKeyDown={enterEvent} value={userMessage} setUserMessage={setUserMessage} sendMessage={sendMessage} />
      <div className='dm-chat-messages'>
        {displayedMessages.messages.map((item, i) => {
          const dateObj = new Date(item.sent_time);
          const date = `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`
          console.log(item)

          return (
            <ChatMessage
              avatar={item.sender.id === parseInt(userID) ? avatar : displayedMessages.avatarPath}
              username={item.sender.username}
              body={item.body}
              isSelf={item.sender.id === parseInt(userID)}
              msgKey={i}
              time={date} key={i} />)
        }).reverse()}
      </div>

    </>);
}

export default ChatDisplay