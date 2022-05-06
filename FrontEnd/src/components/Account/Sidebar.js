import React, { Component } from "react";
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import { GreenButton } from "../Misc/Input/Buttons";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconBubble } from "../Misc/CustomComponents/IconBubble";
import { GreenCircle } from "../Misc/Input/LoadingCircle";
import GamePosts from "./GamePosts";
import { IconButton } from "@mui/material";
import "./Sidebar.css";
import DisplaySocials from "./DisplaySocials";

const Sidebar = ({ Accountdata }) => {
  const games = Accountdata.user.games;
  const socials = Accountdata.user.links;
  const friends = Accountdata.user.friends;
  const posts = Accountdata.user.posts;
  const friendsAmount = friends.filter(
    (x) => x.friend_status === "friends"
  ).length;
  const postsAmount = posts.length;
  const [showSidebar, setShowSidebar] = useState(true);

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
            <p>{Accountdata.user.username}</p>
            <IconButton className="sidebar-iconbutton">
              <ForwardToInboxIcon />
            </IconButton>
            <IconButton className="sidebar-iconbutton">
              <PersonAddIcon />
            </IconButton>
            <p>Posts: {postsAmount}</p>
            <p>Friends: {friendsAmount}</p>
          </div>
        </div>

        <div className="sidebar-socials">
          <p>Socials:</p>
          <p>
            {socials.map((item, i) => (
              <DisplaySocials socialInfo={item} key={i} />
            ))}
          </p>
        </div>

        <div className="account-bio">
          <p>{Accountdata.bio}</p>
        </div>

        <div className="account-favorites">
          <h2>Favorite Games</h2>
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
