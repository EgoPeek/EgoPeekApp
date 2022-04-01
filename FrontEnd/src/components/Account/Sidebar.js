import React, { Component } from "react";
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GamePosts from "../AccountSettings/GamePosts";

const Sidebar = ({ profile }) => {
  const friends = profile.user.friends;
  const posts = profile.user.posts;
  const friendsAmount = friends.filter(
    (x) => x.friend_status === "friends"
  ).length;
  const postsAmount = posts.length;
  const [showSidebar, setShowSidebar] = useState(true);

  const games = profile.user.games;

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
            <span>{profile.user.username}</span>
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
          <p>{profile.bio}</p>
        </div>

        <div className="account-favorites">
          <h1>Favorite Games</h1>
          <div className="favorite-spacing">
            <span>
              {games.map((item, i) => (
                <GamePosts gameInfo={item} key={i} />
              ))}
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
