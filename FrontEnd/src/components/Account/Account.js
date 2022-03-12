import React from "react";
import "./Account.css";
import Header from "../Misc/CustomComponents/Header";

const Account = () => {
  return (
    <div className="account">
      {/*<div className="header">
        <Header />
  </div>*/}

      <div className="account-container">
        <div className="account-hamburger">
          <div className="account-info">
            <span>account pic, contact, etc</span>
          </div>

          <div className="account-bio">
            <h1>bio goes here</h1>
          </div>

          <div className="account-favorites">
            <h1>Favorite Games</h1>
            <div className="favorite-spacing">
              {/* import favorite games */}
              <span>
                <p>game1</p>
                <p>game2</p>
                <p>game3</p>
              </span>
            </div>
          </div>
        </div>

        <div className="posts-container">
          <div className="posts">
            <span>posts go here</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Account;
