import React from "react";
import "./GamePosts.css";
import axios from "axios";

const GamePosts = ({ gameInfo }) => {
  return (
    <div className="curgames-edit">
      <div className="curgames-title">{gameInfo.game_title}</div>
      <div className="curgames-platform">{gameInfo.game_platform} </div>
    </div>
  );
};
export default GamePosts;
