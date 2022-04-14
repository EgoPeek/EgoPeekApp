import React from 'react'
import { DarkTextInput } from '../Misc/Input/TextFields'
import SendIcon from '@mui/icons-material/Send';
import './SendMessage.css'

const SendMessageField = () => {
  return (
    <div className='input-message'>
        <DarkTextInput size='small' fullWidth/>
        <span className='send-message'><SendIcon /></span>
    </div>
  )
}

export default SendMessageField