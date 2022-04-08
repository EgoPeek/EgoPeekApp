import React from 'react'
import { GreenButton } from "../Misc/Input/Buttons";

const ChatInput = ({ onSend }) => {
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
        <input className='text-bar-input' type='text' ref={text} onKeyDown={sendMessageEnterKey} />
        <GreenButton className="send-button" variant="outlined" onClick={sendMessage}>
            Send
        </GreenButton>
    </div>)
}

export default ChatInput