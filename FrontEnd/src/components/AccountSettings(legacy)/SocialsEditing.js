import React from "react";
import axios from "axios";

const Socials = ({ socialsInfo }) => {
  const user_id = window.localStorage.getItem("userID");
  const link_id = socialsInfo.link_id;

  const deleteSocial = async () => {
    const payload = {
      user_id: user_id,
      link_id: link_id,
    };
    try {
      const response = await axios.delete(`/api/v1/links/${link_id}`, payload);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  return (
    <div className="curgames-edit">
      <span className="curgames-title">{socialsInfo.link_platform}</span>
      <span className="curgames-platform">{socialsInfo.link_username}</span>
      <button onClick={deleteSocial}>Delete</button>
    </div>
  );
};
export default Socials;
