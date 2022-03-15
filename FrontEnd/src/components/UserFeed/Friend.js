import React from 'react'
import './Friend.css'

const Friend = ({friendInfo, className}) => {

    return (
        <div className={`user-friend ${className}`}>
            <div className='user-icon'>
                <img src='friend-img'></img>
            </div>
            <div className='friend-name'>
                <p>Alfifdsaasdfsadfdsafdsae</p>
            </div>
        </div>
    )
}

export default Friend