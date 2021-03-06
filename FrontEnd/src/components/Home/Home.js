/**
 *  FileName: Home.js
 *  Description: React component that displays the home page and gives a brief description of what our app is,
 *    allows users to register or sign up
 *
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GreenButton } from "../Misc/Input/Buttons";
import "./Home.css";
import Slideshow from "./Slideshow";
import { Photo } from "./Slideshow";
import EGOPEEKLOGO from '../../images/EGOPEEK_CLEAR.png'
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();

  //don't worry about this I just didn't want to mess with the footer so I pulled a little sneaky
  useEffect(() => {
    document.body.style.backgroundColor = "#24222F";
    return () => {
      document.body.style.backgroundColor = "#171621";
    };
  }, []);

  //redirects to register page
  const redirectToRegister = () => {
    navigate("/register");
  };
  //redirects to login page
  const redirectToLogin = () => {
    navigate("/login");
  };

  return (
    <>

      <div className="home">
        <div className="home-container">
          <div className="home-left">
            <div className="home-header">
              <img src={EGOPEEKLOGO} />
              <h1>EgoPeek</h1>
            </div>
            <div className="home-info">
              <h2>Discover content from the games you love!</h2>
              <h3>Log in or Sign up below!</h3>

              <div className="home-button-spacing">
                <GreenButton
                  className="login-button"
                  variant="outlined"
                  onClick={redirectToLogin}
                >
                  Login
                </GreenButton>
                <GreenButton
                  className="signup-button"
                  variant="outlined"
                  onClick={redirectToRegister}
                >
                  Sign up
                </GreenButton>
              </div>
            </div>
          </div>
          <div className="home-right">
            <div className="home-img-spacing">
              <Slideshow />
            </div>
          </div>
        </div>
      </div >
      <Footer />
    </>
  );
};
export default Home;
