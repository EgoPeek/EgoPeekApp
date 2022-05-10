import React, { useState } from "react";
import axios from "axios";
import DisplayPost from "../UserFeed/DisplayPost";
import "./Discover.css";

const authHeader =
  window.localStorage.getItem("token_type") +
  " " +
  window.localStorage.getItem("token");

const ImagePreview = ({ post }) => {
  const {
    post_id,
    comments,
    liked_by,
    content_path_type,
    title,
    message,
    timestamp,
    user,
    video_url,
    image_url,
    hashtag_group,
  } = post;
  const userID = window.localStorage.getItem("userID");
  const username = window.localStorage.getItem("userName");
  const [showPost, setShowPost] = useState(false);
  const [likeCount, setLikeCount] = useState(liked_by?.length);
  const [timeout, setTimeout] = useState(false);
  const [userDidLike, setUserDidLike] = useState(() => {
    const liked = liked_by?.find((x) => x.user.id === parseInt(userID));
    return liked ? true : false;
  });

  const updateLikes = async () => {
    console.log(post_id);
    setTimeout(true);
    setUserDidLike(!userDidLike);

    if (userDidLike) {
      setLikeCount((prev) => prev - 1);
      try {
        const res = await fetch("/api/v1/likes/", {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Authorization: authHeader,
          },
          method: "DELETE",
          body: JSON.stringify({
            post_id: post_id,
            user_id: parseInt(userID),
            username: username,
          }),
        });
        const index = liked_by.findIndex((x) => x.user.id === parseInt(userID));
        liked_by.splice(index, 1);
      } catch (e) {
        console.log(e);
      }
    } else {
      setLikeCount((prev) => prev + 1);
      const obj = {
        user: {
          id: parseInt(userID),
          username: username,
        },
      };
      liked_by.push(obj);

      try {
        const res = await axios.post(
          "/api/v1/likes/",
          {
            post_id: post_id,
            user_id: userID,
            username: username,
          },
          { headers: { Authorization: authHeader } }
        );
      } catch (e) {
        console.log(e);
      }
    }
    setTimeout(false);
  };

  const closeDisplay = () => {
    setShowPost(false);
    // ACTUAL NIGHTMARE FUEL, I HATE EVERYONE
    document.getElementById("root").style.overflowY = "scroll";
  };

  const displayPost = (topic, e) => {
    setShowPost(true);
    console.log(topic);
    // THIS IS REALLY BAD DO NOT DO THIS EVER, NATE YOU DOG I SWEAR AXEL DON'T DO THIS
    document.getElementById("root").style.overflowY = "hidden";
  };

  return (
    <>
      {showPost && (
        <DisplayPost
          post={post}
          closeDisplay={closeDisplay}
          likePost={updateLikes}
          likeCount={likeCount}
          timeout={timeout}
          userDidLike={userDidLike}
        />
      )}
      <div>
        <img
          className="discover-preview-image"
          src={image_url}
          onClick={displayPost}
        ></img>
      </div>
    </>
  );
};

export default ImagePreview;
