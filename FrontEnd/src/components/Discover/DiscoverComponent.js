import React, { useState, useEffect } from "react";
import axios from "axios";
import { GreenLoadingBar } from "../Misc/Input/LoadingBar";
import UserPost from "../Misc/CustomComponents/UserPost";
import "./Discover.css";
import Popup from "./Popup";
import ImagePreview from "./ImagePreview";


const DiscoverComponent = ({ Hashtags }) => {
  const authHeader =
    window.localStorage.getItem("token_type") +
    " " +
    window.localStorage.getItem("token");
  const [post, setPost] = useState([]);
  const [postErr, setPostErr] = useState(false);
  const [postPending, setPostPending] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Hashtags) {
      createPreviewDiscoverFeed();
    }
  }, [Hashtags]);

  const createPreviewDiscoverFeed = async () => {
    const payload = {
      hashtags: [Hashtags],
    };
    try {
      const response = await axios.post(`/api/v1/discover/selected`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      setPost((prev) => [...prev, ...response.data]);
      setPostPending(false);
    } catch (e) {
      console.log(e);
      setPostErr(true);
    }
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="discover-container">
      {isOpen && (
        <Popup
          content={
            <div>
              {postPending ? (
                <GreenLoadingBar />
              ) : (
                post.map((item, i) => <UserPost post={item} key={i} />)
              )}
            </div>
          }
          handleClose={togglePopup}
        />
      )}

      <a className="clickable-text" onClick={togglePopup}>
        {Hashtags}
      </a>

      <div className="discover-preview">
        {post.slice(0, 3).map((item, i) => (
          <ImagePreview post={item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default DiscoverComponent;
