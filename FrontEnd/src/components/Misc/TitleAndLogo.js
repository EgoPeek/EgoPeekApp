import React from 'react'
import { Link } from 'react-router-dom'
import './TitleAndLogo.css'

const TitleAndLogo = () => {
    return (
        <div className="title-and-logo">
            <Link to='/' className='company-title'> <h2>EgoPeek</h2> </Link>
            <img src="/EGOPEEK.png" width="70rem" height="70rem"></img>
        </div>
    )
}

export default TitleAndLogo