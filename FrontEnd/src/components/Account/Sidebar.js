import React, { Component } from "react";
import { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconBubble } from "../Misc/CustomComponents/IconBubble";
import GamePosts from "./GamePosts";
import { IconButton } from "@mui/material";
import "./Sidebar.css";
import DisplaySocials from "./DisplaySocials";
import { useNavigate } from "react-router";
import AddFriend from "./AddFriend";

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

  let navigate = useNavigate();
  const messageUser = () => {
    let path = `/message/${Accountdata.user.username}`;
    navigate(path);
  };

  const renderSidebar = () => {
    if (showSidebar === false) {
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
            <div className="sidebar-names">
              <p>{Accountdata.user.username}</p>
              <IconButton onClick={messageUser}>
                <ForwardToInboxIcon className="sidebar-iconbutton" />
              </IconButton>
              <AddFriend Profile={Accountdata} />
            </div>
            <div className="sidebar-metrics">
              <p>Posts: {postsAmount}</p>
              <p>Friends: {friendsAmount}</p>
            </div>
          </div>
        </div>

        <div className="sidebar-socials">
          <p>Socials:</p>
          {socials.map((item, i) => (
            <DisplaySocials socialInfo={item} key={i} />
          ))}
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
