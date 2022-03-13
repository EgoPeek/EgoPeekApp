import React, { Component } from "react";

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
          <span>pic</span>
          <span>Name</span>
          <span>links?</span>
          <span></span>
        </div>

        <div className="account-bio">
          <span>bio goes here but its a short one</span>
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
        {this.renderSidebar()}
        <div className="sidebar-icon">
          {/*<SidebarIcon
            isOpen={this.state.isOpen}
            handleClick={this.toggleSidebar}
    />*/}
        </div>
      </div>
    );
  }
}
