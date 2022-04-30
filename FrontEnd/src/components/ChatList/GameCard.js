import React from 'react'
import { useNavigate } from 'react-router'
import './GameCard.css'

const GameCard = ({ gameTitle, gameImg, ...props }) => {
    const formatName = gameTitle.toLowerCase().split(' ').join('')
    const navigate = useNavigate();
    const goToChat = (e) => {
        e.preventDefault()
        navigate(`/chat/${formatName}`)
    }

    return (
        <div className='lfg-game-card' {...props} onClick={goToChat}>
            <span className='lfg-game-info'>{gameTitle}</span>
            <img className='lfg-game-img' src={gameImg}></img>
        </div>
    )
}

export default GameCard