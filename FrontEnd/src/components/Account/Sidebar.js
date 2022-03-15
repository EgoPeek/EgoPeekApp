import React, { Component } from "react";
import SidebarIcon from "./SidebarIcon";

export default class Sidebar extends Component {
  state = {
    isOpen: true,
  };

  renderSidebar = () => {
    if (!this.state.isOpen) {
      return null;
    }

    return (
      <div className="sidebar">
        <div className="account-info">
          <div className="account-avatar">
            <span>pic</span>
          </div>
          <span>Name</span>
          <span>links?</span>
          <span></span>
        </div>

        <div className="account-bio">
          <p>
            I am a pro Valorant player stuck in silver because my teammates play
            with their monitors off. If you're a scrub don't add me. This is
            text to see how the bio size will behave
          </p>
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

  toggleSidebar = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <div className="sidebar-container">
        <div className="sidebar-icon">
          <SidebarIcon
            isOpen={this.state.isOpen}
            handleClick={this.toggleSidebar}
          />
        </div>
        {this.renderSidebar()}
      </div>
    );
  }
}
