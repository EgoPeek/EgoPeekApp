import { useEffect, useState, useRef } from "react";
import React from "react";
import "./Slideshow.css";
import homeIMG from "../../images/Valorant_poster.jpg";
import homeIMG2 from "../../images/CSGO_Home.jpg";
import homeIMG3 from "../../images/league_poster.jpg";
import homeIMG4 from "../../images/rocket_league_poster.jpg";

const images = [homeIMG, homeIMG2,homeIMG3,homeIMG4];
const delay = 4000;

const Slideshow = () => {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div
        className="slideshowSlider"
        style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        <img className="home-img" src={homeIMG}></img>
        <img className="home-img" src={homeIMG2}></img>
        <img className="home-img" src={homeIMG3}></img>
        <img className="home-img" src={homeIMG4}></img>
      </div>

      <div className="slideshowDots">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`slideshowDot${index === idx ? " active" : ""}`}
            onClick={() => {
              setIndex(idx);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
