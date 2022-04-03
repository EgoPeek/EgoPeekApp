import React from "react";
import axios from "axios";
import "./GamePosts.css";

const GamePosts = ({ gameInfo }) => {
  return (
    <div className="curgames-edit">
      <div className="curgames-title">{gameInfo.game_title}</div>
    </div>
  );
};
export default GamePosts;
