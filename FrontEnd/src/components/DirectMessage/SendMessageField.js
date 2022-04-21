import React, { useEffect, useState } from 'react'
import { DarkTextInput } from '../Misc/Input/TextFields'
import SendIcon from '@mui/icons-material/Send';
import './SendMessage.css'
import { PurpleButton } from '../Misc/Input/Buttons';

const SendMessageField = ({ setUserMessage,value, sendMessage }) => {
  const [isDisabled, setIsDisabled] = useState(true)
  useEffect(() => {
    if(value === '')
      setIsDisabled(true)
    else
      setIsDisabled(false)
  }, [value])
  
  const updateMessage = (e) => {
    setUserMessage(e.target.value)
  }

  return (
    <div className='input-message'>
      <DarkTextInput value={value} onChange={updateMessage} size='small' autoComplete='off' label="send message" fullWidth />

      <PurpleButton onClick={sendMessage} disabled={isDisabled}>
        <SendIcon />
      </PurpleButton>
      {/* <span className='send-message' onClick={sendMessage}><SendIcon /></span> */}
    </div>
  )
}

export default SendMessageField