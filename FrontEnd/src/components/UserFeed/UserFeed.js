/**
 *  FileName: UserFeed
 *  Description: Home screen for a logged in user, displays users follows, friends, and post activity
 */


import Header from '../Misc/CustomComponents/Header'
import '../Misc/CustomComponents/UserPost'
import './UserFeed.css'
import UserPost from '../Misc/CustomComponents/UserPost'
import Friend from './Friend'
import useFetch from '../../hooks/useFetch'
import CreatePost from './CreatePost'
import { TextInputStandard } from '../Misc/Input/TextFields'
import DisplayPost from './DisplayPost'
import { useState } from 'react'

const UserFeed = () => {
    const userID = window.localStorage.getItem('userID')
    const { data: post, isPending, error } = useFetch(`/api/v1/posts/feed/${userID}`)
    const [showPost, setShowPost] = useState(false)
    const [postInfo, setPostInfo] = useState(null)
    const { data: friends, isPending: friendsPending, error: friendsError } = useFetch(`/api/v1/friends/list/${userID}`)

    const displayPost = (topic, e) => {
        setPostInfo(topic)
        setShowPost(true)
        console.log(topic)
    }

    const closeDisplay = () => { 
        setShowPost(false)
     }

    return (
        <div>
            <Header />
            {showPost && <DisplayPost post={postInfo} closeDisplay={closeDisplay}/>}
            <div className='user-feed-container'>
                <div className='user-feed'>
                    <CreatePost />
                    {/* while the page is fetching post it'll just display loading sign */}
                    {isPending && <p>Loading...</p>}
                    {/* maps each post from API call to a userPost component */}
                    {post && post.map((item, i) => <UserPost onClick={() => displayPost(item)} post={item} key={i} />)}
                </div>

                <div className='friends-list'>
                    <h2>Friends</h2>
                    <div className='search-friends'>
                        <TextInputStandard label="search or add friends" size='small' />
                    </div>
                    {/* while the page is fetching friends it'll just display loading sign */}
                    {friendsPending && <p>Loading...</p>}
                    {/* maps each friend from API call to a Friend component */}
                    {friends && friends.map((item, i) => <Friend friendInfo={item} key={i} />)}
                </div>
            </div>
        </div>
    )
}

export default UserFeed