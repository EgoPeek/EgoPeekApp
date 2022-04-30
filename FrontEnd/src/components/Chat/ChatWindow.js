import React from 'react'
import ChatMessage from './ChatMessage';


const ChatWindow = ({ messages, username, ...props }) => {
    return <div className='chat-window' {...props}>
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