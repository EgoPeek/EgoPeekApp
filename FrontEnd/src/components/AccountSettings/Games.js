import React from 'react'
import { GreenButton } from '../Misc/Input/Buttons'

const Games = ({ userGames, isEditting }) => {
    const AddGames = () => {
        if (!isEditting) return <></>

        return (
            <div className='add-socials'>
                <GreenButton variant='outlined'>Add Games</GreenButton>
            </div>
        )
    }

    return (
        <div>
            {userGames.map((item, i) => {
                return (
                    !isEditting
                        ?
                        <div key={i}>
                            <p>{item.game_title}</p>
                        </div>
                        :
                        <select key={i} >
                            <option value='tocket league'>
                                {item.game_title}
                            </option>
                            <option value='tocket league'>
                                Rocket League
                            </option>
                            <option value='tocket league'>
                                game 2
                            </option>
                            <option value='tocket league'>
                                game 4
                            </option>
                        </select>
                )
            })}

        <AddGames />
            
        </div>
    )
}

export default Games