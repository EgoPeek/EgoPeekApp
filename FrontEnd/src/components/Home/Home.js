import React from "react";
/*import { useEffect } from "react"; */
import { GreenButton } from "../Misc/Buttons";
import "./Home.css";
import homeIMG from "../../images/Home.jpg";

const Home = () => {
  return (
    <div className="home">
      <h1> EgoPeek </h1>
      <div className="homeIMG-container">
        <img src={homeIMG} width="700rem" height="900rem"></img>
      </div>

      <GreenButton className="login-button" variant="outlined">
        Login
      </GreenButton>
      <GreenButton className="signup-button" variant="outlined">
        Sign Up
      </GreenButton>

      <div className="home-description">
        <span>
          {" "}
          Ego Peek is a Social Media app designed and Engineered by Kevin Gomez,
          Giovanni Toxqui, Nathan Bush, Samuel Martinez, Steve Flores, and Axel
          Lira. Our goal is to connect gamers from all around allowing anyone to
          share their highlights and keep up with the latest gaming news!{" "}
        </span>
      </div>

      <div className="home-intro">
        <h2> Discover content from the games you love! </h2>
      </div>
      <div className="home-intro2">
        <h3> Log in or Sign up below! </h3>
      </div>
    </div>
  );
};
export default Home;
