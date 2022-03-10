import React from 'react'

import Header from '../Misc/CustomComponents/Header'
import '../Misc/CustomComponents/UserPost'
import './UserFeed.css'

const UserFeed = () => {
    
    
    
    return (
        <div>
            <Header />

            <div className='user-feed-container'>
                <div className='user-feed'>

                </div>

                <div className='friends-list'>

                </div>
            </div>
        </div>
    )
}

export default UserFeed