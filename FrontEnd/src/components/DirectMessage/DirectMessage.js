import React, { useEffect, useRef, useState } from 'react'
import Header from '../Misc/CustomComponents/Header'
import { DarkTextInput } from '../Misc/Input/TextFields'
import MessageCard from './MessageCard'
import SendMessageField from './SendMessageField'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SearchIcon from '@mui/icons-material/Search';
import ChatMessage from '../Chat/ChatMessage'
import './DirectMessage.css'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate, useParams } from 'react-router'
import axios from 'axios'

const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')


const DirectMessage = ({ props }) => {
  const userID = window.localStorage.getItem('userID')
  const clientUsername = window.localStorage.getItem('username')
  const { username: friendUsername } = useParams()
  const { state: locationParams } = useLocation()
  const navigate = useNavigate()
  const [clientheight, setClientheight] = useState(0)
  const headerHeight = useRef(null)
  const { data: userThreads, isPending: threadsPending, error: threadsError } = useFetch(`/api/v1/messages/threads/all/${userID}`)
  const [dms, setDms] = useState([])
  const [displayedMessages, setDisplayedMessages] = useState({})
  const [userMessage, setUserMessage] = useState('')
  const [displayedAvatar, setDisplayedAvatar] = useState('')

  useEffect(() => {
    setClientheight(headerHeight.current?.clientHeight)

  }, [])

  useEffect(() => {
    if (!userThreads) return


    // double checks if there is forsure information there and that a user was redirected after clicking "dm user on a friend Icon or something"
    const friendID = locationParams?.friendID
    if (friendID && friendUsername) {
      const friendDMs = userThreads.filter(x => x.user1_id === friendID || x.user2_id === friendID)
      console.log(friendDMs)
      if (friendDMs.length === 0) {
        createNewUserThread(friendID, userID)
      } else {
        setDisplayedMessages(...friendDMs)
      }
      // console.log(friendDMs, 'FOUND DMS')
    }

    setDms([...userThreads])
  }, [threadsPending])

  // creates a new thread if a user clicks on a user that they've never had a thread with
  const createNewUserThread = async (otherID, myID) => {
    try {
      const body = {
        sender_id: myID,
        receiver_id: otherID,
        body: ''
      }
      const res = await axios.post('/api/v1/messages/', body, { headers: { Authorization: authHeader } })
      const msg = formatObj(res, clientUsername)
      setDisplayedMessages(msg)
    } catch (e) {
      console.log(e)
    }
  }

  // weird curry function that I learned about
  // sets what messages to display from the dms array
  // displays the user in the search bar, idk I tried doing something, it didn't work lmao
  const setMessages = (thread) => {
    return (e) => {
      e.preventDefault()
      const i = thread.messages.findIndex(x=>x.sender.id !== parseInt(userID))
      const otherName = thread.messages[i].sender.username

      navigate('/message/'+otherName, { replace: true })
      setDisplayedMessages(thread)
    }
  }
  const userSearching = (e) => {
    const value = e.target.value
    if (value === '') {
      setDms(userThreads)
      return
    }

    const filteredUsers = userThreads.filter(x => x.messages[0].sender.username.match(value))
    setDms(filteredUsers)
  }


  const sendMessage = async () => {
    if (!displayedMessages?.thread_id) return

    const body = {
      thread_id: displayedMessages.thread_id,
      sender_id: userID,
      body: userMessage
    }
    const headers = {
      headers: {
        Authorization: authHeader
      }
    }
    try {
      const res = await axios.post('/api/v1/messages/replies', body, headers)
      const msg = formatObj(res, friendUsername)
      displayedMessages?.messages.push(msg)
      setUserMessage('')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {/* contsins all users dms */}
      <div ref={headerHeight} style={{ height: 'auto' }}>
        <Header />
      </div>
      <div className='dm-container'>
        <div className='dm-feed' style={{ height: `calc(100% - ${clientheight}px)` }}>
          <section className='dm-left-container'>
            {/* search bar to look for users */}
            <div className='dam-search-user'>
              <DarkTextInput
                onChange={userSearching}
                size='small'
                label="Search User"
                autoComplete='off'
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ color: 'white' }} />
                  )
                }} />
              <span><ForwardToInboxIcon fontSize='large' /></span>
            </div>

            <div className='dm-users'>
              {dms.map((dm, i) => <MessageCard
                messageInfo={dm}
                highlighted={dm.thread_id === displayedMessages.thread_id}
                onClick={setMessages(dm)}
                setDisplayedAvatar={setDisplayedAvatar}
                index={i}
                key={i} />)}
            </div>
          </section>

          {/* contains user messages */}
          <section className='dm-right-container'>
            <div className='dm-message-container'>
              {displayedMessages?.messages ?
                <>
                  <SendMessageField value={userMessage} setUserMessage={setUserMessage} sendMessage={sendMessage} />
                  <div className='dm-chat-messages'>
                    {
                      displayedMessages.messages.map((item, i) => <ChatMessage
                        avatar={item.sender.id === parseInt(userID) ? '' : displayedAvatar}
                        body={item.body}
                        isSelf={item.sender.id === parseInt(userID)}
                        msgKey={i}
                        username={item.sender.username}
                        time={item.sent_time}
                        key={i}
                      />).reverse()
                    }
                  </div>
                </>
                :
                <p>Select a message or create a new thread!</p>
              }
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

const formatObj = (obj, username) => {
  const msg = {
    sender: {
      id: obj.data.sender_id,
      username: username
    },
    ...obj.data
  }
  return msg;
}

export default DirectMessage