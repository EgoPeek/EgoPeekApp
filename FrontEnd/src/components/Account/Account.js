/**
 * Filename: Account.js
 * Description: Allows user to view their own profile and friend profiles
 */
import "./Account.css";
import "./Sidebar.js";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UserPost from "../Misc/CustomComponents/UserPost";
import "../Misc/CustomComponents/UserPost";
import useFetch from "../../hooks/useFetch";
import Header from "../Misc/CustomComponents/Header";
import { GreenLoadingBar } from "../Misc/Input/LoadingBar";
import { useParams } from "react-router";
import axios from "axios";
import { PurpleSwitch } from "../Misc/Input/Switches";

const Account = ({ match, location }) => {
  const authHeader = window.localStorage.getItem("token_type") + " " + window.localStorage.getItem("token");
  const { username } = useParams();
  const {
    data: profile,
    isPending: profilePending,
    error: profileError,
  } = useFetch(`/api/v1/profiles/users/${username}`);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([])
  const [displayedPosts, setDisplayedPosts] = useState([])
  const [postsErr, setPostsErr] = useState(false);
  const [postPending, setPostPending] = useState(true);
  const [switchState, setSwitchState] = useState(false)
  const [switchText, setSwitchText] = useState('User Posts')

  const makeCall = async () => {
    try {
      const postRes = await axios.get("/api/v1/posts/all/" + profile.user.id, {
        headers: { Authorization: authHeader },
      });
      const likedPosts = await axios.get('/api/v1/posts/all/liked/' + profile.user.id, {
        headers: { Authorization: authHeader },
      })

      setLikedPosts([...likedPosts.data])
      setPosts([...postRes.data]);
      setDisplayedPosts([...postRes.data])
      setPostPending(false);
    } catch (err) {
      setPostsErr(true);
    }
  };

  useEffect(() => {
    setPostPending(true);
    setSwitchState(false)
    makeCall();
  }, [profile]);

  const toggleLikedPosts = () => {
    return (e) => {
      setSwitchState(!switchState)
      if (switchState) {
        setSwitchText("User Posts")
        setDisplayedPosts([...posts])
      } else {
        setSwitchText("Liked Posts")
        setDisplayedPosts([...likedPosts])
      }
    }
  }

  return (
    <div className="account-page">
      <Header />
      <div className="account-main">
        {!profilePending && <Sidebar Accountdata={profile} />}
        <div className="posts-container">
          {postPending
            ?
            <GreenLoadingBar />
            :
            <>
              <div>
                <PurpleSwitch color="primary" onChange={toggleLikedPosts()} />
                <label>{switchText
                }</label>
              </div>
              {displayedPosts.map((item, i) => <UserPost post={item} key={item.post_id} />)}
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Account;
