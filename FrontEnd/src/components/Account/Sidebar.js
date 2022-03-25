import React, { Component } from "react";
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Sidebar = ({ data }) => {
  const { data: Accountdata, isPending, error: AccountError } = data;

  const [showSidebar, setShowSidebar] = useState(true);

  const renderSidebar = () => {
    if (showSidebar == false) {
      return null;
    }

    /*const friendArray = [Accountdata.user.friends];
    const friendAmount = friendArray.length;*/

    return (
      <div className="sidebar">
        <div className="account-info">
          <div className="account-avatar">
            <span>pic</span>
          </div>
          <div className="name-container">
            <span>{isPending ? "..." : Accountdata.user.username}</span>
            <ForwardToInboxIcon />
            <PersonAddIcon />
            <div className="followers">
              <span>Friends:</span>
            </div>
            <div className="post-amount">
              <span>Posts: </span>
            </div>
          </div>
        </div>

        <div className="account-bio">
          <p>{isPending ? "..." : Accountdata.bio}</p>
        </div>

        <div className="account-favorites">
          <h1>Favorite Games</h1>
          <div className="favorite-spacing">
            <span>
              <p>game1</p>
              <p>game2</p>
              <p>game3</p>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-icon">
        <SidebarIcon isOpen={showSidebar} handleClick={toggleSidebar} />
      </div>
      {renderSidebar()}
    </div>
  );
};
export default Sidebar;
