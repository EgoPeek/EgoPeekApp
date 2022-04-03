import React from "react";

const Socials = ({ socialsInfo }) => {
  return (
    <div className="curgames-edit">
      <span className="curgames-title">{socialsInfo.link_platform}</span>
      <span className="curgames-platform">{socialsInfo.link_username}</span>
    </div>
  );
};
export default Socials;
