import React from "react";
import "./GamePosts.css";

const GamePosts = ({ gameInfo, isEditing }) => {
  const Editing = isEditing;

  return (
    <div className="curgames-edit">
      <span className="curgames-title">{gameInfo.game_title} </span>
      <span className="curgames-platform">{gameInfo.game_platform} </span>
      {/*{Editing ? <button>delete</button> : null}*/}
    </div>
  );
};
export default GamePosts;
