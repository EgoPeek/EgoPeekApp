/**
 *  FileName: UserFeed
 *  Description: Home screen for a logged in user, displays users follows, friends, and post activity
 */


import Header from '../Misc/CustomComponents/Header'
import '../Misc/CustomComponents/UserPost'
import './UserFeed.css'
import CircularProgress from '@mui/material/CircularProgress';
import UserPost from '../Misc/CustomComponents/UserPost'
import Friend from './Friend'
import useFetch from '../../hooks/useFetch'
import CreatePost from './CreatePost'
import { TextInputStandard } from '../Misc/Input/TextFields'
import DisplayPost from './DisplayPost'
import { useEffect, useRef, useState } from 'react'
import BorderLinearProgress from '../Misc/Input/LoadingBar';
import {get} from '../../util'

const UserFeed = () => {
    const userID = window.localStorage.getItem('userID')
    const { data: post, isPending: postPending, error: postError  } = useFetch(`/api/v1/posts/feed/${userID}`)
    const { data: friends, isPending: friendsPending, error: friendsError } = useFetch(`/api/v1/friends/list/${userID}`)
    const [showPost, setShowPost] = useState(false)
    const [postInfo, setPostInfo] = useState(null)
    const friendInput = useRef(null)
    const [searchFriend, setSearchFriend] = useState('')
    const [friendData, setFriendData] = useState([])

    useEffect(() => {
        const textBox = friendInput.current
        textBox.addEventListener('keypress', handleEnter)

        return () => {
            textBox.removeEventListener('keypress', handleEnter)
        }
    }, [friends, searchFriend])



    // handles when a user hits enter to search for another user
    const handleEnter = async (e) => {
        if (e.key !== 'Enter') return

        // finds the user after in search bar
        if (friends.find(x => x.username.toLowerCase() === searchFriend.toLowerCase())) {
            console.log('found')
        } else {
            const {res, error} = await get(`/api/v1/friends/search/${searchFriend}`)
            if(error) return
            const data = res.data;
            console.log(data)
            console.log(friends)
            setFriendData([data])
        }

    }

    // whena user starts typing to search for a friend
    const searchingForFriends = (e) => {
        const val = e.target.value
        if (val === '') setFriendData([])
        setSearchFriend(val)
    }

    // adds overlay with post description 
    const displayPost = (topic, e) => {
        setPostInfo(topic)
        setShowPost(true)
        console.log(topic)
        // THIS IS REALLY BAD DO NOT DO THIS EVER, NATE YOU DOG I SWEAR AXEL DON'T DO THIS
        document.getElementById('root').style.overflowY = 'hidden'
    }

    // closes overlay
    const closeDisplay = () => {
        setShowPost(false)
        // ACTUAL NIGHTMARE FUEL, I HATE EVERYONE
        document.getElementById('root').style.overflowY = 'scroll'
    }


    const FriendsList = () => {
        /* maps each friend from API call to a Friend component */
        /**this is kind of nasty but it checks if a user is searching for a user */
        //if user is searching for friend it switches to is searching, one enter is hit
        //friendData gets populated and searching gets switched to the actual friend data 
        if(friendsError) return(<p>error</p>)
        if (!searchFriend) {
            if (friends.length > 0) return friends.map((item, i) => <Friend friendInfo={item} key={i} />)
            else return <p>There are no friends?</p>
        } else {
            if (friendData.length === 0) return <p>Searching...</p>
            else return friendData.map((item,i)=><Friend friendInfo={item} key={i}/>)
        }
    }

    const PostList = () =>{
        if(postError) return<p>error</p>

        if(post)return post.map((item, i) => <UserPost onClick={() => displayPost(item)} post={item} key={i} />)
        else return <></>
    }

    return (
        <div>
            <Header />
            {showPost && <DisplayPost post={postInfo} closeDisplay={closeDisplay} />}
            <div className='user-feed-container'>
                <div className='user-feed'>
                    <CreatePost />
                    {/* while the page is fetching post it'll just display loading sign */}
                    {postPending && <BorderLinearProgress />}
                    {/* maps each post from API call to a userPost component */}
                    <PostList />
                </div>

                <div className='friends-list'>
                    <h2>Friends</h2>
                    <div className='search-friends'>
                        <TextInputStandard value={searchFriend} autoComplete='off' ref={friendInput} onChange={searchingForFriends} label="search or add friends" size='small' />
                    </div>
                    {/* while the page is fetching friends it'll just display loading sign */}
                    {friendsPending ? <CircularProgress color="success" />
                        :
                        <FriendsList />
                    }
                </div>
            </div>
        </div>
    )
}



export default UserFeed