import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import IconButton from "@mui/material/IconButton";
import "./AddFriend.css";

const authHeader =
  window.localStorage.getItem("token_type") +
  " " +
  window.localStorage.getItem("token");

const AddFriend = ({ Profile }) => {
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState(false);
  const [stranger, setStranger] = useState(true);
  const [awaitingReply, setAwaitingReply] = useState(false);
  const [recievedRequest, setRecievedRequest] = useState(false);
  const [isPending, setIsPending] = useState(true);
  const userID = window.localStorage.getItem("userID");

  useEffect(() => {
    getStatus();
  }, []);

  useEffect(() => {
    checkStatus();
  }, [isPending]);

  const getStatus = async () => {
    try {
      const response = await axios.get(`/api/v1/friends/status/${userID}`, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      setFriends(response.data);
      setIsPending(false);
    } catch (e) {
      console.log(e);
    }
  };

  const checkStatus = () => {
    for (let i = 0; i < friends.length; i++) {
      if (Profile.user.username === friends[i].username) {
        if (friends[i].friend_status === "friends") {
          setFriend(true);
          setStranger(false);
        }
        if (friends[i].friend_status === "invite_sent") {
          setAwaitingReply(true);
          setStranger(false);
        }
        if (friends[i].friend_status === "invite_rec") {
          setRecievedRequest(true);
          setStranger(false);
        }
      }
    }
  };

  const sendRequest = async () => {
    const payload = {
      user_id: userID,
      friend_id: Profile.user.id,
      answer: "",
    };
    try {
      const response = await axios.post(`/api/v1/friends/requests`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      setStranger(false);
      setAwaitingReply(true);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteFriend = async () => {
    try {
      const res = await axios.delete(
        `/api/v1/friends/${userID}/${Profile.user.id}`,
        { headers: { Authorization: authHeader } }
      );
      console.log(res.data);
      setFriend(false);
      setStranger(true);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelRequest = async () => {
    const payload = {
      user_id: userID,
      friend_id: Profile.user.id,
      answer: "declined",
    };
    try {
      const response = await axios.put(`/api/v1/friends/responses`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      setAwaitingReply(false);
      setStranger(true);
    } catch (e) {
      console.log(e);
    }
  };

  const acceptRequest = async () => {
    const payload = {
      user_id: userID,
      friend_id: Profile.user.id,
      answer: "friends",
    };
    try {
      const response = await axios.put(`/api/v1/friends/responses`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      setRecievedRequest(false);
      setFriend(true);
    } catch (e) {
      console.log(e);
    }
  };

  if (friend) {
    return (
      <IconButton onClick={deleteFriend}>
        <PersonRemoveIcon className="sidebar-addfriend" />
      </IconButton>
    );
  }

  if (stranger) {
    return (
      <IconButton onClick={sendRequest}>
        <PersonAddIcon className="sidebar-addfriend" />
      </IconButton>
    );
  }

  if (awaitingReply) {
    return (
      <IconButton onClick={cancelRequest}>
        <PersonAddDisabledIcon className="sidebar-addfriend" />
      </IconButton>
    );
  }

  if (recievedRequest) {
    return (
      <IconButton onClick={acceptRequest}>
        <PersonAddIcon className="sidebar-addfriend" />
      </IconButton>
    );
  }
  return null;
};

export default AddFriend;
