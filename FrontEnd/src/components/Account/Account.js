import "./Account.css";
import "./Sidebar.js";
import React from "react";
import Sidebar from "./Sidebar";
import Posts from "../Misc/CustomComponents/UserPost";
import Header from "../Misc/CustomComponents/Header";

const Account = () => {
  return (
    <div className="account-page">
      <Header />
      <div className="account-main">
        <Sidebar />
        <div className="posts-container">
          <Posts />
        </div>
      </div>
    </div>
  );
};

export default Account;
