import React from "react";
import axios from "axios";
import env from '../../env.json'

const imageMap = env.imageMap;

const GamePosts = ({ gameInfo }) => {
  return (
    <div className="curgames">
      <img src={imageMap[gameInfo.game_title]} width="rem" height="90rem" />
    </div>
  );
};
export default GamePosts;
