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

  useEffect(() => {
    if(Hashtags){
      createPreviewDiscoverFeed()
    }
  }, [Hashtags])



  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const createPreviewDiscoverFeed = async () => {
    const payload = {
      hashtags: [Hashtags],
    };
    try {
      const response = await axios.post(`/api/v1/discover/selected`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      setPosts(prev => [...prev, ...response.data]);
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
      <a className="clickable-text" onClick={togglePopup}>
        {Hashtags}
      </a>
      <div className="discover-preview">
        <img className="discover-preview-image" src={posts[0]?.image_url}></img>
        <img className="discover-preview-image" src={posts[1]?.image_url}></img>
        <img className="discover-preview-image" src={posts[2]?.image_url}></img>
      </div>
    </div>
  );
};

export default DiscoverComponent;
