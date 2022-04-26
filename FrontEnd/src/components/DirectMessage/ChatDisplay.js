import React from 'react'
import ChatMessage from '../Chat/ChatMessage'
import SendMessageField from './SendMessageField'

const ChatDisplay = ({ userMessage, setUserMessage, sendMessage, displayedMessages }) => {
  const userID = window.localStorage.getItem('userID')
  console.log(displayedMessages)

  return (
    <>
      <div className='dm-chat-header'>
        <span>
          {displayedMessages.friendName}
        </span>
      </div>
      <SendMessageField value={userMessage} setUserMessage={setUserMessage} sendMessage={sendMessage} />
      <div className='dm-chat-messages'>
        {displayedMessages.messages.map((item, i) => {
          const dateObj = new Date(item.sent_time);
          const date = `${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`

          return (
            <ChatMessage
              avatar={item.sender.id === parseInt(userID) ? '' : item.avatarPath}
              body={item.body}
              isSelf={item.sender.id === parseInt(userID)}
              msgKey={i}
              username={item.sender.username}
              time={date} key={i} />)
        }).reverse()}
      </div>

    </>);
}

export default ChatDisplay