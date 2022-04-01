import React from "react";

const Socials = ({ gameInfo, isEditing }) => {
  const Editing = isEditing;

  return (
    <div className="curgames-edit">
      <span className="curgames-title">{gameInfo.game_title}</span>
      <span className="curgames-platform">{gameInfo.game_platform}</span>
      {isEditing ? <button>delete</button> : null}
    </div>
  );
};
export default Socials;
