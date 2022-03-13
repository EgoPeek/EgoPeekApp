import "./Account.css";
import React, { Component } from "react";
import Sidebar from "./Sidebar";
import Header from "../Misc/CustomComponents/Header";

class Account extends Component {
  render() {
    return (
      <div className="account-page">
        {/*<Header />*/}
        <div className="account-main">
          <Sidebar />
          <div className="posts-container">
            <div className="posts">
              <span>posts go here</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
