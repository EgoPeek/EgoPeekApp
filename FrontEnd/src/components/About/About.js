import React from 'react'
import Header from '../Misc/CustomComponents/Header'
import './About.css'
import MemberCard from './MemberCard'
import steve from '../../images/steve.jpg'
import kevin from '../../images/kevin.jpg'
import nate from '../../images/nate.jpg'
import sam from '../../images/sam.jpg'
import axel from '../../images/axel.jpg'
import gio from '../../images/gio.jpg'
import EGOPEEK from '../../images/EGOPEEK.png'

const descriptions = {
    steve:'Computer science major attending CSUSB',
    nate:'Computer Science major - CSUSB. Hoping to touch grass again someday.',
    sam:'I would say I outdid myself, but I’m always this good. So I simply did myself.',
    kevin:'live laugh love',
    gio:'I’m Giovanni and I am 21 years old. Attending CSUSB and majoring in Computer Systems',
    axel:'This is fine.'
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
                    <MemberCard description={descriptions.axel}
                        memberName={'Axel'}
                        email={'axel@gmail.com'}
                        imgSrc={axel}
                        jobTitle={'Software Engineer (Frontend)'}
                        github={'https://github.com/Axel-LiraR'}
                    />
                    <MemberCard description={descriptions.nate}
                        memberName={'Nate Bush'}
                        email={'natebush707@gmail.com'}
                        imgSrc={nate}
                        jobTitle={'Software Engineer (Backend)'}
                        github={'https://github.com/natebush707'}
                    />
                    <MemberCard description={descriptions.sam}
                        memberName={'Sam'}
                        email={'sam100299@gmail.com'}
                        imgSrc={sam}
                        jobTitle={'Software Engineer (Backend)'}
                        github={'https://github.com/SamMC55'}
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
                        imgSrc={gio}
                        jobTitle={'Project Assistant Manager'}
                        github={'https://github.com/SteveF42'}
                    />
                </div>
            </div>
        </>
    )
}

export default About