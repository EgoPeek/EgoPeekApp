/**
 *  FileName: UserFeed
 *  Description: Home screen for a logged in user, displays users friends, and receieve posts from other users
 */

import { useState } from 'react'
import Header from '../Misc/CustomComponents/Header'
import '../Misc/CustomComponents/UserPost'
import './UserFeed.css'
import UserPost from '../Misc/CustomComponents/UserPost'
import useFetch from '../../hooks/useFetch'
import CreatePost from './CreatePost'
import DisplayPost from './DisplayPost'
import { GreenLoadingBar } from '../Misc/Input/LoadingBar';
import FriendsList from './FriendsList'

const UserFeed = () => {
    const userID = window.localStorage.getItem('userID')
    const { data: post, isPending: postPending, error: postError } = useFetch(`/api/v1/posts/feed/${userID}`)


    const PostList = () => {
        if (postError) return <></>

        if (post) return post.map((item, i) => <UserPost onClick={() => displayPost(item)} post={item} key={i} />)
        else return <></>
    }

    return (
        <div>
            <Header />
            <div className='user-feed-container'>
                <div className='user-feed'>
                    <CreatePost />
                    {/* while the page is fetching post it'll just display loading sign */}
                    {(postPending || postError)  && <GreenLoadingBar />}
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