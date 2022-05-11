import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <footer className='home-footer'>
      <div className='about-container'>
        <div className='footer-row '>
          <div className='footer-about footer-box'>
            <h1>About</h1>
            <p className="text-justify">
              EgoPeek is a mock social media site created by a group of students who currently attend CSUSB.
              Our goal was to connect people with a passion for gaming. Similar to other Social Media Platforms
              EgoPeek allows users to create posts, connect with friends, and personalize their own feed. Our 
              <s><i><strong style={{fontSize:'1.5rem'}}>"very"</strong></i></s>
              sophisticated algorithm knows exactly what type of content to provide every user based on their chosen interests.
            </p>
          </div>
          <div className='footer-link footer-box'>
            <h1>Links</h1>
            <a href='https://github.com/EgoPeek/EgoPeekApp'>Github</a>
            <a href='/about'>Developers</a>
            <a>Twitter</a>
            <a>Instagram</a>
            <a>Facebook</a>
          </div>
        </div>
        <hr />
      </div>

      <div className='about-container'>
        <div className='footer-info footer-box'>
          <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by EgoPeek</p>
          <p>All games depicted within EgoPeek are in no way affiliated</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer