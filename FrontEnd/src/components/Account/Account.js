import "./Account.css";
import "./Sidebar.js";
import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Posts from "./Posts";
import Header from "../Misc/CustomComponents/Header";

class Account extends Component {
  render() {
    return (
      <div className="account-page">
        {/*<Header />*/}
        <div className="account-main">
          <Sidebar />
          <Posts />
        </div>
      </div>
    );
  }
}

export default Account;
