/**
 *  FileName: UserFeed
 *  Description: Home screen for a logged in user, displays users follows, friends, and post activity
 */


import React from 'react'
import Header from '../Misc/CustomComponents/Header'
import '../Misc/CustomComponents/UserPost'
import './UserFeed.css'
import UserPost from '../Misc/CustomComponents/UserPost'

const UserFeed = () => {



    return (
        <div>
            <Header />

            <div className='user-feed-container'>
                <div className='user-feed'>
                    <UserPost post='post-information'/>
                </div>

                <div className='friends-list'>

                </div>
            </div>
        </div>
    )
}

export default UserFeed