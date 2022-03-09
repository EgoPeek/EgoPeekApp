import React from "react";
import { GreenButton } from "../Misc/Buttons";
import "./Home.css";
import homeIMG from "../../images/Home.jpg";
import { FormControl } from "@mui/material";

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <h1>EgoPeek</h1>
      </div>

      <div className="home-left">
        <div className="home-info">
          <h2>Discover content from the games you love!</h2>
          <h3>Log in or Sign up below!</h3>
        </div>

        <div className="home-button">
          <div className="button-spacing">
            <GreenButton className="login-button" variant="outlined">
              Login
            </GreenButton>
            <GreenButton className="signup-button" variant="outlined">
              Sign up
            </GreenButton>
          </div>
        </div>
      </div>

      <div className="home-right">
        <div className="home-Img">
          <img src={homeIMG} width="100%" height="950rem"></img>
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
