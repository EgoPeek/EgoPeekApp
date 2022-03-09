import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { GreenButton } from "../Misc/Buttons";
import "./Home.css";
import homeIMG from "../../images/Home.jpg";

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.backgroundColor = '#24222F'
    return () => {
      document.body.style.backgroundColor = "#171621"
    }
  }, [])

  const redirectToRegister = () => {
    navigate('/register')
  }
  const redirectToLogin = () => {
    navigate('/login')
  }

  return (
    <div className="home">
      <div className="home-header">
        <h1>EgoPeek</h1>
      </div>

      <div className="home-container">

        <div className="home-left">
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
