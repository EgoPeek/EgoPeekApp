import React from 'react'
import './UserFeed.css'
import CircularProgress from '@mui/material/CircularProgress';
import { Friend, PendingFriendRequest, ReceivingFriendRequest, Stranger } from './Friend'
import useFetch from '../../hooks/useFetch'
import { TextInputStandard } from '../Misc/Input/TextFields'
import { useEffect, useRef, useState } from 'react'
import { get } from '../../util'

const FriendsList = () => {
    const userID = window.localStorage.getItem('userID')
    const { data: friendsData, isPending: friendsPending, error: friendsError } = useFetch(`/api/v1/friends/status/${userID}`)
    const friendInput = useRef(null)
    const [searchFriend, setSearchFriend] = useState('')
    const [searchFriendError, setSearchFriendError] = useState(false)
    const [friendData, setFriendData] = useState([])
    const [friends, setFriends] = useState([])
    useEffect(() => {
        setFriends(!friendsPending ? friendsData : [])
    }, [friendsPending])
    

    // handles when a user hits enter to search for another user
    const handleEnter = async (e) => {
        if (e.key !== 'Enter') return
        if (searchFriend === '') return

        // finds the user in the local friends array 
        const filteredFriends = friends.filter(x => x.username.toLowerCase() === searchFriend.toLowerCase())
        if (filteredFriends.length > 0) {
            console.log('found')
            setFriendData([filteredFriends[0]])
        } else {
            // pings the api to check if that user exists
            const { res, error } = await get(`/api/v1/friends/search/${searchFriend}`)
            if (error) {
                console.log('user does not exist', error)
                setSearchFriendError(true)
                return
            }
            const data = res.data;
            console.log(data)
            setFriendData([
                {
                    "user_id": data.id,
                    "username": data.username,
                    "avatar_path": data.profile[0].avatar_path,
                    "friend_status": ""
                }
            ])
        }
    }

    // whena user starts typing to search for a friend
    // friendError gets switched to false when user is typing
    const searchingForFriends = (e) => {
        const val = e.target.value
        if (val === '') setFriendData([])
        setSearchFriend(val)
        setSearchFriendError(false)
    }


    const DisplayFriends = () => {
        

        const updateFriendStatus = (newStatus, index) => {
            const newArr = [...friends]
            newArr[index].friend_status = newStatus
            setFriends(newArr)
        }
        const moveUserFromSearchToFriends = (newStatus, index) => {
            const newArr = [...friendData]
            newArr[0].friend_status = newStatus
            setFriends([...friends,...newArr])
            setSearchFriend('')
            setFriendData([])
        }
        const typeOfFriend = (list,updateFunction) => {
            return list.map((item, i) => {
                //it'll be something like this when nate adds that stuff
                // different states a friend can be in
                // friends, searched user(NOT FRIENDS OR SENT INVITE), pending friend request, and receiving friend request
                if (item.friend_status === 'friends') return <Friend updateStatus={updateFunction} friendInfo={item} key={i} index={i} />
                else if (item.friend_status === 'invite_rec') return <ReceivingFriendRequest updateStatus={updateFunction} friendInfo={item} key={i} index={i} />
                else if (item.friend_status === 'invite_sent') return <PendingFriendRequest updateStatus={updateFunction} friendInfo={item} key={i} index={i} />
                else return <Stranger updateStatus={updateFunction} friendInfo={item} key={i} index={i} />

            })
        }

        /* maps each friend from API call to a Friend component */
        /**this is kind of nasty but it checks if a user is searching for a user */
        //if user is searching for friend it switches to is searching, one enter is hit
        //friendData gets populated and searching gets switched to the actual friend data 
        if (friendsError) return <p>error</p>
        if (!searchFriend) {
            if (friends.length > 0) return typeOfFriend(friends,updateFriendStatus)
            else return <p>There are no friends?</p>
        } else {
            if (searchFriendError) return <p>User does not exists</p>

            else if (friendData.length === 0) return <p>Searching...</p>
            else return typeOfFriend(friendData,moveUserFromSearchToFriends)
        }
    }

    return (
        <div className='friends-list'>
            <h2>Friends</h2>
            <div className='search-friends'>
                <TextInputStandard autoComplete='off' value={searchFriend} onKeyPress={handleEnter} onChange={searchingForFriends} label="search or add friends" size='small' />
            </div>
            {/* while the page is fetching friends it'll just display loading sign */}
            {friendsPending ? <CircularProgress color="success" />
                :
                <DisplayFriends />
            }
        </div>
    )
}

export default FriendsList