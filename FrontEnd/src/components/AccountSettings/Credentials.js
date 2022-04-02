import React from 'react'

const Credentials = ({ userCredentials, isEditting }) => {
    return (
        <div>
            <div>
                <p>{userCredentials.username}</p>
                <p>{userCredentials.email}</p>
            </div>

        </div>
    )
}

export default Credentials