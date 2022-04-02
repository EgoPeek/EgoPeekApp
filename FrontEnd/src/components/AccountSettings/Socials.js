import React, { useState } from 'react'
import { GreenButton } from '../Misc/Input/Buttons'
import { TextInputStandard } from '../Misc/Input/TextFields'

const Socials = ({ userSocials, isEditting }) => {
    const [newSocials, setNewSocials] = useState([])


    const createNewBody = () => {
        const body = {
            link_platform: '', link_username: '', link_url: ''
        }
        return body
    }

    const addSocialLink = () => {
        setNewSocials([...newSocials, createNewBody()])
    }
    const removeSocials = (key) => {
        setNewSocials(newSocials.filter((item, i) => i !== key))
    }

    const AddSocials = () => {
        const changePlatform = (event, i) => {
            const val = event.target.value
            newSocials[i].link_platform = val
        }
        const changeUsername = (event, i) => {
            const val = event.target.value
            newSocials[i].link_username = val
        }
        const changeUrl = (event, i) => {
            const val = event.target.value
            newSocials[i].link_url = val
        }

        if (!isEditting) return <></>

        return (
            <div className='add-socials'>
                <GreenButton onClick={addSocialLink} variant='outlined'>Add Socials</GreenButton>
                <div>
                    {newSocials.map((item, i) => {
                        return (
                            <div key={i}>
                                <TextInputStandard onChange={(e) => changePlatform(e, i)} defaultValue={item.link_platform} autoComplete='off' label='platform' size='small' />
                                <TextInputStandard onChange={(e) => changeUsername(e, i)} defaultValue={item.link_username} autoComplete='off' label='username' size='small' />
                                <TextInputStandard onChange={(e) => changeUrl(e, i)} defaultValue={item.link_url} autoComplete='off' label='url' size='small' />
                                <GreenButton onClick={() => { removeSocials(i) }}>Remove</GreenButton>
                            </div>

                        )
                    })}
                </div>
            </div>
        )
    }


    return (
        <div>
            {userSocials.map((item, i) => {
                return (
                    !isEditting
                        ?
                        <div key={i}>
                            <p>{item.link_platform}</p>
                            <p>{item.link_username}</p>
                            <p>{item.link_url}</p>
                        </div>
                        :
                        <div key={i}>
                            <TextInputStandard autoComplete='off' defaultValue={item.link_platform} label='platform' size='small' />
                            <TextInputStandard autoComplete='off' defaultValue={item.link_username} label='username' size='small' />
                            <TextInputStandard autoComplete='off' defaultValue={item.link_url} label='url' size='small' />
                        </div>
                )
            })}
            <AddSocials />
        </div>
    )
}

export default Socials