import React, { useState, useEffect} from 'react'
import { messageHandlerCallback, send, startSocket } from './socket'
import { GreenButton } from "../Misc/Input/Buttons";
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import Header from '../Misc/CustomComponents/Header'
import './Chat.css'


function Chat() {

    const userID = window.localStorage.getItem('userID')
    const username = window.localStorage.getItem('userName')
    const [messages, setMessages] = useState([])

    useEffect(() => {
        startSocket(userID)
    }, [])

    const messageReceived = (newMessage) => {
        console.log('Message received...')
        console.log('Old Messages: ', messages)

        newMessage = JSON.parse(newMessage)
        const newMessages = messages.concat(newMessage)

        console.log('New Messages: ', newMessages)
        setMessages(newMessages)
    }

    messageHandlerCallback(messageReceived)

    const messageSent = (newMessage) => {
        const payload = {
            username: username,
            body: newMessage,
            userID: userID
        }
        console.log('Sending message: ', payload)
        send(JSON.stringify(payload))
    }

    const ChatMessage = ({body, username, avatar, isSelf, time, msgKey}) => {
        if (isSelf) {
            return (<div className='my-chat-bubble'>
                <div className='my-chat-message' style={{textAlign: 'right'}} key={msgKey}>
                    {time}    {username}<br/>{body}
                    </div>
                    <IconBubble className='bubble' imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={avatar}></IconBubble>
            </div>
            )
            
        }
        return (<div className='other-chat-bubble'>
            <IconBubble className='bubble' imgStyle={{ height: '3rem', width: '3rem' }} userImgSrc={avatar}></IconBubble>
            <div className={'other-chat-message'} style={{textAlign: 'left'}} key={msgKey}>
            {time}    {username}<br/>{body}
            </div>
        </div>)
    }

    const ChatWindow = ({messages, username}) => {
        return <div className='chat-window'>
            {
                messages.map((msg, index) => {
                    return <ChatMessage msgKey={index} body={msg.message.body} username={msg.message.username} isSelf={username === msg.message.username} time={msg.time} avatar={msg.avatar_path} />
                })
            }
        </div>
    }

    const ChatInput = ({onSend}) => {
        const text = React.createRef()

        const sendMessage = () => {
            onSend && onSend(text.current.value)
            text.current.value = ""
        }

        const sendMessageEnterKey = (eve) => {
            if (eve.keyCode === 13) {
                sendMessage()
            }
        }

        return (<div className='text-bar'>
            <input className='text-bar-input' type='text' ref={text} onKeyDown={sendMessageEnterKey}/>
            <GreenButton className="send-button" variant="outlined" onClick={sendMessage}>
                Send
            </GreenButton>
        </div>)
    }

    return (
        <div>
            <Header />
            <div className = 'Chat' >
                <div className = 'papa-container'>
                <div className = 'title'>CHAT BITCHES</div>
                <ChatWindow messages={messages} username={username}/>
                <ChatInput onSend={messageSent}/>
                </div>
            </div>
        </div>
    )

} export default Chat;