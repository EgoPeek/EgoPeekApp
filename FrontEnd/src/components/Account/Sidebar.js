import React, { Component } from "react";
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconBubble } from "../Misc/CustomComponents/IconBubble";
import { GreenCircle } from "../Misc/Input/LoadingCircle";

const Sidebar = ({ Accountdata }) => {
  const friends = Accountdata.user.friends;
  const posts = Accountdata.user.posts;
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
          <IconBubble
            userImgSrc={Accountdata.avatar_path}
            imgStyle={{ width: "140px", height: "140px" }}
          />

          <div className="name-container">
            <span>{Accountdata.user.username}</span>
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
          <p>{Accountdata.bio}</p>
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
