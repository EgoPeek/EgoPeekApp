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

const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')

const Account = ({ match, location }) => {
  const { username } = useParams();
  const {
    data: profile,
    isPending: profilePending,
    error: profileError,
  } = useFetch(`/api/v1/profiles/users/${username}`);
  const [posts, setPosts] = useState([]);
  const [postsErr, setPostsErr] = useState(false);
  const [postPending, setPostPending] = useState(true);

  const makeCall = async (username) => {
    try {
      const res = await axios.get("/api/v1/posts/all/" + profile.user.id, {headers: {Authorization: authHeader}});
      setPosts(res.data);
      setPostPending(false);
    } catch (err) {
      setPostsErr(true);
    }
  };
  

  useEffect(() => {
    setPostPending(true)
    makeCall();
  }, [profilePending,profile]);

  return (
    <div className="account-page">
      <div className="header-container">{<Header />}</div>
      
      <div className="account-main">
        {!profilePending && <Sidebar Accountdata={profile} />}
        <div className="posts-container">
          {postPending ? (
            <GreenLoadingBar />
          ) : (
            posts.map((item, i) => <UserPost post={item} key={i} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
