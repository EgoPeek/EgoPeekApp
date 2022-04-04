import React from "react";
import axios from "axios";

const imageMap = {
  "Rocket League": "/logo_images/RocketLeagueLogo.png",
  "CS:GO": "/logo_images/CSGOLogo.png",
  "Valorant": "/logo_images/ValorantLogo.png",
  "Rust": "/logo_images/RustLogo.png",
  "League of Legends": "/logo_images/LeagueLogo.png",
  "Terraria": "/logo_images/TerrariaLogo.png",
  "Rainbow Six Seige": "/logo_images/RainbowLogo.png",
  "Gang Beasts": "/logo_images/GangBeastsLogo.png",
  "Final Fantasy XIV": "/logo_images/FinalFantasyLogo.png",
};

const GamePosts = ({ gameInfo }) => {
  return (
    <div className="curgames">
      <img src={imageMap[gameInfo.game_title]} width="rem" height="90rem" />
      <p>Scroll no worky</p>
    </div>
  );
};
export default GamePosts;
