import React from 'react'
import ChatMessage from './ChatMessage';


const ChatWindow = ({ messages, username }) => {
    return <div className='chat-window'>
        {
            
            messages.map((msg, index) => {
                return <ChatMessage
                    key={index}
                    msgKey={index}
                    body={msg.message.body}
                    username={msg.message.username}
                    isSelf={username === msg.message.username}
                    time={msg.time}
                    avatar={msg.avatar_path} />
            })
        }
    </div>
}
export default ChatWindow