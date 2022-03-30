/**
 *  FileName: UserFeed
 *  Description: Home screen for a logged in user, displays users friends, and receieve posts from other users
 */

import { useState, useEffect } from 'react'
import Header from '../Misc/CustomComponents/Header'
import '../Misc/CustomComponents/UserPost'
import './UserFeed.css'
import UserPost from '../Misc/CustomComponents/UserPost'
import useFetch from '../../hooks/useFetch'
import CreatePost from './CreatePost'
import DisplayPost from './DisplayPost'
import BorderLinearProgress from '../Misc/Input/LoadingBar';
import FriendsList from './FriendsList'

const UserFeed = () => {
    const userID = window.localStorage.getItem('userID')
    const { data: post, isPending: postPending, error: postError } = useFetch(`/api/v1/posts/feed/${userID}`)
    const [showPost, setShowPost] = useState(false)
    const [postInfo, setPostInfo] = useState(null)

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


    const PostList = () => {
        if (postError) return <p>error</p>

        if (post) return post.map((item, i) => <UserPost onClick={() => displayPost(item)} post={item} key={i} />)
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

                {/* friends list component broken out to prevent re rendering of post list */}
                <FriendsList />
            </div>
        </div>
    )
}



export default UserFeed