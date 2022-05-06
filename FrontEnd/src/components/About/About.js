import React from 'react'
import Header from '../Misc/CustomComponents/Header'
import './About.css'
import MemberCard from './MemberCard'
import steve from '../../images/steve.jpg'
import kevin from '../../images/kevin.jpg'
import nate from '../../images/nate.jpg'
import sam from '../../images/sam.jpg'
import EGOPEEK from '../../images/EGOPEEK.png'

const descriptions = {
    steve:'Computer science major attending CSUSB',
    nate:'You really clicked on that? Go touch grass, nerd.',
    sam:'I\'m a bozo lmaooooo',
    kevin:'live laugh love',
    gio:'Are u adding a pic & description for each person?'
}

const About = () => {
    return (
        <>
            <Header />
            <div className='about-us'>
                <h2 style={{textAlign:'center'}}>EGOPEEK Devs</h2>
                <div className='about-members row'>
                    <MemberCard description={descriptions.steve}
                        memberName={'Steve Flores'}
                        email={'stevewflores43@gmail.com'}
                        imgSrc={steve}
                        jobTitle={'Software Engineer (Frontend)'}
                        github={'https://github.com/SteveF42'}
                    />
                    <MemberCard description={descriptions.nate}
                        memberName={'Nate'}
                        email={'nate@gmail.com'}
                        imgSrc={nate}
                        jobTitle={'Software Engineer (Backend)'}
                        github={'https://github.com/SteveF42'}
                    />
                    <MemberCard description={descriptions.sam}
                        memberName={'Sam'}
                        email={'sam@gmail.com'}
                        imgSrc={sam}
                        jobTitle={'Software Engineer (Backend)'}
                        github={'https://github.com/SteveF42'}
                    />
                    <MemberCard description={descriptions.kevin}
                        memberName={'Kevin'}
                        email={'kevin@gmail.com'}
                        imgSrc={kevin}
                        jobTitle={'Project Manager (CEO)'}
                        github={'https://github.com/SteveF42'}
                    />
                    <MemberCard description={descriptions.gio}
                        memberName={'Giovanni'}
                        email={'Giovanni@gmail.com'}
                        imgSrc={EGOPEEK}
                        jobTitle={'Project Assistant Manager'}
                        github={'https://github.com/SteveF42'}
                    />
                </div>
            </div>
        </>
    )
}

export default About