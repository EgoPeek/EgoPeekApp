import "./Account.css";
import "./Sidebar.js";
import React from "react";
import Sidebar from "./Sidebar";
import UserPost from "../Misc/CustomComponents/UserPost";
import Header from "../Misc/CustomComponents/Header";

const Account = () => {
  return (
    <div className="account-page">
      <div className="header-container">
        <Header />
      </div>
      <div className="account-main">
        <Sidebar />
        <div className="posts-container"></div>
      </div>
    </div>
  );
};

export default Account;
