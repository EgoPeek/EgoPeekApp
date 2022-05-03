import React, { useState } from "react";
import Header from "../Misc/CustomComponents/Header";
import "./Discover.css";
import DiscoverComponent from "./DiscoverComponent";
import useFetch from "../../hooks/useFetch";
import Search from "./Search";

const Discover = () => {
  const count = "4";
  const { data, isPending, error } = useFetch(`/api/v1/hashtags/top/${count}`);
  const topHashtags = !isPending ? data : "...";

  return (
    <div className="discover">
      <Header />

      <Search />

      <div className="discover-top">
        <div className="discover-spacing">
          <DiscoverComponent Hashtags={topHashtags[0]} />
        </div>
        <div className="discover-spacing">
          <DiscoverComponent Hashtags={topHashtags[1]} />
        </div>
      </div>

      <div className="discover-top">
        <div className="discover-spacing">
          <DiscoverComponent Hashtags={topHashtags[2]} />
        </div>
        <div className="discover-spacing">
          <DiscoverComponent Hashtags={topHashtags[3]} />
        </div>
      </div>
    </div>
  );
};

export default Discover;
