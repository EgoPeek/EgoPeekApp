import React, { useEffect, useState } from 'react'
import { IconBubble } from '../Misc/CustomComponents/IconBubble'
import Credentials from './Credentials';
import EditIcon from "@mui/icons-material/Edit";
import useFetch from '../../hooks/useFetch';
import Games from './Games';
import Socials from './Socials';
import { GreenButton } from '../Misc/Input/Buttons';


const AccountSettings = () => {
    const user_id = window.localStorage.getItem("userID");
    const { data, isPending, error } = useFetch(`/api/v1/profiles/${user_id}`);
    const [user, setUser] = useState([])
    const [games, setGames] = useState([])
    const [socials, setSocials] = useState([])
    const [isEditting, setIsEditting] = useState(false)
    


    useEffect(() => {
        const user = !isPending ? { username: data.user.username, email: data.user.email } : {}
        const games = !isPending ? data.user.games : []
        const social = !isPending ? data.user.links : []
        
        setSocials(social)
        setGames(games)
        setUser(user)
    }, [isPending])

    

    return (
        <div className="usersettings">
            <div className='left-side-profile'>
                <IconBubble onClick={()=>setIsEditting(!isEditting)} userImgSrc={'/'} imgStyle={{ height: '150px', width: '150px' }} />
                <div className='user-bio'>

                </div>
                <div className='settings-edit-icon'>
                    <EditIcon />
                </div>
            </div>

            <div className='right-side-settings'>
                <div className='user-credentials'>
                    <Credentials userCredentials={user} isEditting={isEditting}/>
                </div>
                <div className='user-games'>
                    <Games userGames={games} isEditting={isEditting}/>
                </div>  
                <div className='user-socials'>
                    <Socials userSocials={socials} isEditting={isEditting}/>
                </div>
                <GreenButton variant='outlined'>Submit</GreenButton>
            </div>
        </div>
    )
}

export default AccountSettings