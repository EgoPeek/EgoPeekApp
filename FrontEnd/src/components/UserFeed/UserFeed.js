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

const UserFeed = () => {
    const userID = window.localStorage.getItem('userID')
    const { data: post, isPending, error } = useFetch(`/api/v1/posts/feed/${userID}`)


    return (
        <div>
            <Header />
            <div className='user-feed-container'>
                <div className='user-feed'>
                    <CreatePost />    
                    {/* while the page is fetching post it'll just display loading sign */}
                    {isPending && <p>Loading...</p>}
                    {/* maps each post from API call to a userPost component */}
                    {post && post.map((item, i) => <UserPost post={item} key={i} />)}
                </div>

                <div className='friends-list'>
                    <h2>Friends</h2>
                    <Friend friendInfo='friend info' className='friend-card' />
                    <Friend friendInfo='friend info' className='friend-card' />
                    <Friend friendInfo='friend info' className='friend-card' />
                    <Friend friendInfo='friend info' className='friend-card' />
                    <Friend friendInfo='friend info' className='friend-card' />
                </div>
            </div>
        </div>
    )
}

export default UserFeed