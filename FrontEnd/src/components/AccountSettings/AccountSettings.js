import React from "react";
import { useState } from "react";
import "./AccountSettings.css";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import useFetch from "../../hooks/useFetch";
import UpdateGames from "./UpdateGame";
import { TextInputStandard } from "../Misc/Input/TextFields";
import axios from "axios";

const UserSettings = () => {
  const user_id = window.localStorage.getItem("userID");
  const { data, isPending, error } = useFetch(`/api/v1/profiles/${user_id}`);
  const [bio, setBio] = useState("");
  const [isEditing, setisEditing] = useState(false);

  const setEditingTrue = () => {
    setisEditing(true);
  };

  const updateProfile = async (newBio) => {
    setisEditing(false);
    const payload = {
      user_id: user_id,
      bio: newBio,
    };
    try {
      const response = await axios.put(`/api/v1/profiles/${user_id}`, payload);
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const saveBio = (event) => {
    setBio(event.currentTarget.value);
  };
  console.log(bio);

  return (
    <div className="usersettings">
      <div className="settings-left">
        <div className="editbtn-spacing">
          <button onClick={setEditingTrue}>Edit Profile</button>
        </div>
        <div className="avatar-container">
          <div className="avatar"></div>
          <div className="editavatar-btn">
            <button className="edit-btn">
              <EditIcon />
            </button>
          </div>
        </div>
        <div className="edit-bio">
          <h2>Bio</h2>
          <div className="settings-bio">
            <div className="update-bio">
              {isEditing ? (
                <TextInputStandard
                  style={{ width: "100%" }}
                  label="Enter Bio"
                  onChange={saveBio}
                  defaultValue={isPending ? "..." : data.bio}
                />
              ) : (
                <span className="profile-name">
                  {isPending ? "..." : data.bio}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="settings-main">
        <div className="settings-info">
          <div className="settings-name">
            <p>Name: {isPending ? "..." : data.user.username}</p>
          </div>
          <div className="settings-email">
            <p>Email: {isPending ? "..." : data.user.email}</p>
            <div className="edit-email"></div>
          </div>
          <p>Change Password</p>
          {isEditing ? (
            ((
              <TextInputStandard
                label="Enter New Password"
                onChange={saveBio}
              />
            ),
            (
              <TextInputStandard
                label="Enter New Password"
                onChange={saveBio}
              />
            ),
            (<TextInputStandard label="Enter New Password" />))
          ) : (
            <span></span>
          )}
        </div>
        <div className="edit-favorites">
          <h2>Edit Favorites</h2>
          <div className="game-change">
            {isEditing ? (
              <UpdateGames />
            ) : (
              <span className="profile-name">
                <p>Games</p>
              </span>
            )}
          </div>
        </div>
        <div className="settings-socials">
          <h2>Other Socials</h2>
          <div className="socials-spacing">
            <p>Instagram:</p>
            <p>Twitter:</p>
          </div>
        </div>
        <div className="savebtn-spacing">
          {isEditing ? (
            <button className="save-btn" onClick={() => updateProfile(bio)}>
              Save Changes
            </button>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </div>
  );
};
export default UserSettings;
