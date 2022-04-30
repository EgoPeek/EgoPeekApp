/**
 *  Filename: ChatList.js
 *  Description: Lists all 'supported' games from egopeek that allow users to hop into chat rooms
 * 
 */
import React, { useState } from 'react'
import Header from '../Misc/CustomComponents/Header'
import env from '../../env.json'
import GameCard from './GameCard';
import './ChatList.css'

const imageMap = env.imageMap;

const ChatList = () => {
  const objKeys = Object.keys(imageMap)

  return (
    <>
      <Header />
      <div className='lfg-home-container'>
        <div className='lfg-home'>
          <div className='lfg-queue-header'>
            <h2>Looking to queue</h2>
            <span>Chat with other players!</span>
          </div>
          <div className='lfg-filter-settings'>

          </div>

          <div className='lfg-game-list'>
            <div className='lfg-list-details'>
              <span>game</span>
            </div>

            <div className='lfg-games'>
              {objKeys.map((gameTitle, i) => (
                <div className='lfg-game-wrapper'
                  style={{ backgroundColor: i % 2 == 0 ? '#24222F' : '#343143' }}
                >
                  <GameCard
                    gameImg={imageMap[gameTitle]}
                    gameTitle={gameTitle}

                    key={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatList