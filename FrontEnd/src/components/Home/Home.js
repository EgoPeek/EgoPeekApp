/**
 *  FileName: Home.js
 *  Description: React component that displays the home page and gives a brief description of what our app is,
 *    allows users to register or sign up
 * 
 */

import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { GreenButton } from "../Misc/Input/Buttons";
import "./Home.css";
import homeIMG from "../../images/Home.jpg";

const Home = () => {
  const navigate = useNavigate()

  //don't worry about this I just didn't want to mess with the footer so I pulled a little sneaky
  useEffect(() => {
    document.body.style.backgroundColor = '#24222F'
    return () => {
      document.body.style.backgroundColor = "#171621"
    }
  }, [])

  //redirects to register page
  const redirectToRegister = () => {
    navigate('/register')
  }
  //redirects to login page
  const redirectToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="home">

      <div className="home-container">

        <div className="home-left">
          <div className="home-header">
            <h1>EgoPeek</h1>
          </div>
          <div className="home-info">
            <h2>Discover content from the games you love!</h2>
            <h3>Log in or Sign up below!</h3>

            <div className="home-button-spacing">
              <GreenButton className="login-button" variant="outlined" onClick={redirectToLogin}>
                Login
              </GreenButton>
              <GreenButton className="signup-button" variant="outlined" onClick={redirectToRegister}>
                Sign up
              </GreenButton>
            </div>
          </div>
        </div>
        <div className="home-right">
          <div className="home-img-spacing">
            <img className="home-img" src={homeIMG}></img>
          </div>
        </div>
      </div>

      <div className="home-footer">
        <div className="footer-description">
          <span>
            {" "}
            EgoPeek is a Social Media app designed and engineered by Kevin
            Gomez, Giovanni Toxqui, Nathan Bush, Samuel Martinez, Steve Flores,
            and Axel Lira. Our goal is to connect gamers from all around
            allowing anyone to share their highlights and keep up with the
            latest gaming news.{" "}
          </span>
        </div>
      </div>
    </div>
  );
};
export default Home;
