import axios from 'axios'
import { useEffect, useState } from 'react'
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import './MessageCard.css'


const MessageCard = ({ messageInfo, highlighted, setDisplayedAvatar, ...props }) => {
  const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')

  const [avatarPath, setAvatarPath] = useState(messageInfo.avatarPath)
  const [friendName, setFriendName] = useState('')
  const source = axios.CancelToken.source()
  const axiosConfig = {
    cancelToken : source.token
  }
  // const { avatarPath,friendName } = messageInfo
  const userID = window.localStorage.getItem('userID')
  const { body, sent_time } = messageInfo?.messages[messageInfo?.messages.length - 1] || ""
  const dateObj = new Date(sent_time)

  useEffect(() => {
    if (avatarPath === undefined || friendName === undefined) {
      setInfo()
    }

    return()=>{
      if(source)
       source.cancel("API CALLS ABORTED, component unmounted")
    }
  }, [])

  useEffect(() => {
    setFriendName(messageInfo.friendName)
    setAvatarPath(messageInfo.avatarPath)
  }, [messageInfo])



  const setInfo = async () => {
    const otherID = messageInfo.user1_id === parseInt(userID) ? messageInfo.user2_id : messageInfo.user1_id
    try {
      const res = await axios.get(`/api/v1/profiles/avatar/${otherID}`, {headers: { Authorization: authHeader }, axiosConfig })
      const data = res.data;
      messageInfo['avatarPath'] = data.avatar_path;
      messageInfo['friendName'] = data.user.username
      setAvatarPath(data.avatar_path)
      setFriendName(data.user.username)
    } catch (e) {
      console.log(e) 
    }
  }

  return (
    <div className={`user-card ${highlighted && 'highlighted-dm'}`} onClick={() => setDisplayedAvatar(avatarPath)} {...props}>
      <div className='user-card-info'>
        <IconBubble userImgSrc={avatarPath} imgStyle={{ height: '4.3rem', width: '4.3rem' }} />
        <div className='card-details'>
          <p className='card-friendname'>{friendName}</p>
          <p className='card-body'>{body}</p>
          <div className='date-receieved'>
            <p>{`${dateObj.getFullYear()}/${dateObj.getMonth() + 1}/${dateObj.getDate()}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageCard