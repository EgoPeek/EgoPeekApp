import React from "react";
import "./GamePosts.css";
import axios from "axios";

const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')

const GamePosts = ({ gameInfo }) => {
  const user_id = window.localStorage.getItem("userID");
  const game_id = gameInfo.game_id;

  const deleteGame = async () => {
    const payload = {
      user_id: user_id,
      game_id: game_id,
    };
    try {
      const response = await axios.delete(`/api/v1/games/${game_id}`, payload, {headers: {Authorization: authHeader}});
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  return (
    <div className="curgames-edit">
      <div className="curgames-title">{gameInfo.game_title}</div>
      <div className="curgames-platform">{gameInfo.game_platform} </div>
      <button onClick={deleteGame}>Delete Game</button>
    </div>
  );
};
export default GamePosts;
