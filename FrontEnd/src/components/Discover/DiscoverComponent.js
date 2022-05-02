import React, { useState, useEffect } from "react";
import axios from "axios";
import { GreenLoadingBar } from "../Misc/Input/LoadingBar";
import UserPost from "../Misc/CustomComponents/UserPost";
import "./Discover.css";
import Popup from "./Popup";

const authHeader =
  window.localStorage.getItem("token_type") +
  " " +
  window.localStorage.getItem("token");

const DiscoverComponent = ({ Hashtags }) => {
  const [posts, setPosts] = useState([]);
  const [postsErr, setPostsErr] = useState(false);
  const [postPending, setPostPending] = useState(true);
  const [postPreview, setPostPreview] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const createDiscoverFeed = async () => {
    togglePopup();
    const payload = {
      hashtags: [Hashtags],
    };
    try {
      const response = await axios.post(`/api/v1/discover/selected`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      setPosts(response.data);
      setPostPending(false);
    } catch (e) {
      console.log(e);
      setPostsErr(true);
    }
  };

  return (
    <div>
      {isOpen && (
        <Popup
          content={
            <>
              <div className="discover-all">
                {postPending ? (
                  <GreenLoadingBar />
                ) : (
                  posts.map((item, i) => <UserPost post={item} key={i} />)
                )}
              </div>
            </>
          }
          handleClose={togglePopup}
        />
      )}
      <a className="clickable-text" onClick={createDiscoverFeed}>
        {Hashtags}
      </a>
      <div className="discover-preview"></div>
    </div>
  );
};

export default DiscoverComponent;
