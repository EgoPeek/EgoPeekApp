import React, { Component } from "react";
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Sidebar = ({ data }) => {
  const {
    data: Accountdata,
    isPending: AccountisPending,
    error: Accounterror,
  } = data;
  const friends = AccountisPending ? "..." : Accountdata.user.friends;
  const posts = AccountisPending ? "..." : Accountdata.user.posts;
  const friendsAmount = friends.length;
  const postsAmount = posts.length;
  const [showSidebar, setShowSidebar] = useState(true);

  const renderSidebar = () => {
    if (showSidebar == false) {
      return null;
    }

    return (
      <div className="sidebar">
        <div className="account-info">
          <div className="account-avatar">
            <span>pic</span>
          </div>
          <div className="name-container">
            <span>{AccountisPending ? "..." : Accountdata.user.username}</span>
            <ForwardToInboxIcon />
            <PersonAddIcon />
            <div className="followers">
              <span>Friends: {friendsAmount}</span>
            </div>
            <div className="post-amount">
              <span>Posts: {postsAmount}</span>
            </div>
          </div>
        </div>

        <div className="account-bio">
          <p>{AccountisPending ? "..." : Accountdata.bio}</p>
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
