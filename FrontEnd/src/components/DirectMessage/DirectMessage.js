import './DirectMessage.css'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../Misc/CustomComponents/Header'
import { DarkTextInput } from '../Misc/Input/TextFields'
import MessageCard from './MessageCard'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import SearchIcon from '@mui/icons-material/Search';
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate, useParams } from 'react-router'
import axios from 'axios'
import TitleMessage from './TitleMessage'
import ChatDisplay from './ChatDisplay'
import NewThreadList from './NewThreadList';
import { PurpleIconButton } from '../Misc/Input/Buttons';



const DirectMessage = ({ props }) => {
  const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')
  const userID = window.localStorage.getItem('userID')
  const clientUsername = window.localStorage.getItem('userName')
  const { username: friendUsername } = useParams()
  const { state: locationParams } = useLocation()
  const navigate = useNavigate()
  const [clientheight, setClientheight] = useState(0)
  const headerHeight = useRef(null)
  const { data: friendData, isPending: friendsPending, error: friendsError } = useFetch(`/api/v1/friends/status/${userID}`)
  const { data: userThreads, isPending: threadsPending, error: threadsError } = useFetch(`/api/v1/messages/threads/all/${userID}`)
  const [dms, setDms] = useState([])
  const [displayedMessages, setDisplayedMessages] = useState({})
  const [userMessage, setUserMessage] = useState('')
  const [displayedAvatar, setDisplayedAvatar] = useState('')
  const [displayThreadPopUp, setDisplayThreadPopUp] = useState(false)

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
    setUserNames(userThreads)
    setDms(userThreads)
  }, [threadsPending])

  const setUserNames = () => {
    userThreads.forEach(item => {
      const otherID = item.user1_id === parseInt(userID) ? item.user2_id : item.user1_id
      const index = item.messages.findIndex(x => x.sender.id === otherID)
      const friendName = item.messages[index]?.sender.username;
      item['friendName'] = friendName
    })
  }

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
      const otherName = thread.friendName

      navigate('/message/' + otherName, { replace: true })
      setDisplayedMessages(thread)
    }
  }
  const openUserThread = (otherID, myID) => {
    return (e) => {
      e.preventDefault()
      setDisplayThreadPopUp(false)
      const exists = dms.filter(x => x.user1_id == otherID || x.user2_id === otherID)
      console.log(exists)
      if (exists.length > 0) {
        setMessages(exists[0])(e)
      } else {
        createNewUserThread(otherID, myID)
      }
    }
  }

  const displayPostEvent = () => {
    setDisplayThreadPopUp(!displayThreadPopUp)
  }
  const userSearching = (e) => {
    const value = e.target.value
    if (value === '') {
      setDms(userThreads)
      return
    }

    const filteredUsers = userThreads.filter(x => x.friendName?.match(value))
    console.log(filteredUsers)
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
      const msg = formatObj(res, clientUsername)
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
              <PurpleIconButton onClick={displayPostEvent}><ForwardToInboxIcon /></PurpleIconButton>
            </div>
            {/* user cards on the left */}
            <div className='dm-users'>
              {dms.map((dm, i) => <MessageCard
                messageInfo={dm}
                highlighted={dm.thread_id === displayedMessages.thread_id}
                onClick={setMessages(dm)}
                setDisplayedAvatar={setDisplayedAvatar}
                key={i} />)}
            </div>
          </section>

          {/* contains user messages */}
          <section className='dm-right-container'>
            {displayThreadPopUp && <NewThreadList friendsList={friendData} createThread={openUserThread} displayPostEvent={displayPostEvent} />}
            <div className='dm-message-container'>
              {/* dms with chosen user */}
              {displayedMessages?.messages ?
                <ChatDisplay displayedMessages={displayedMessages} userMessage={userMessage} setUserMessage={setUserMessage} sendMessage={sendMessage} />
                :
                <TitleMessage openPopUp={displayPostEvent} />
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