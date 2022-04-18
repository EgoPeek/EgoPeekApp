/**
 *  FileName: UserFeed
 *  Description: Home screen for a logged in user, displays users friends, and receieve posts from other users
 */

import Header from '../Misc/CustomComponents/Header'
import '../Misc/CustomComponents/UserPost'
import './UserFeed.css'
import UserPost from '../Misc/CustomComponents/UserPost'
import useFetch from '../../hooks/useFetch'
import CreatePost from './CreatePost'
import { GreenLoadingBar } from '../Misc/Input/LoadingBar';
import FriendsList from './FriendsList'
import axios from 'axios'

const UserFeed = () => {
    const userID = window.localStorage.getItem('userID')
    const { data: post, isPending: postPending, error: postError } = useFetch(`/api/v1/posts/feed/${userID}`)
    const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')
    

    const PostList = ({posts,err}) => {
        if (err || postPending) return <></>
        
        return posts.map((item, i) => <UserPost post={item} key={i}/>)
    }

    return (
        <div>
            <Header />
            <div className='user-feed-container'>
                <div className='user-feed'>
                    <CreatePost />
                    {/* while the page is fetching post it'll just display loading sign */}
                    {(postPending || postError) && <GreenLoadingBar />}
                    {/* maps each post from API call to a userPost component */}
                    <PostList posts={post} err={postError} pending={postPending}/>
                </div>

                {/* friends list component broken out to prevent re rendering of post list */}
                <FriendsList />
            </div>
        </div>
    )
}



export default UserFeed