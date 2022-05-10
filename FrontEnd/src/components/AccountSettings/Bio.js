/* Component that handles updating user bio */
import React, { useState } from "react";
import { TextInputStandard } from "../Misc/Input/TextFields";
import axios from "axios";
import { GreenButton } from "../Misc/Input/Buttons";
import "./AccountSettings.css";

const authHeader =
  window.localStorage.getItem("token_type") +
  " " +
  window.localStorage.getItem("token");

const AccountBio = ({ setBio, userBio, avatar, isEditting, userID }) => {
  const [newBio, setNewBio] = useState("");

  const saveBio = (event) => {
    setNewBio(event.currentTarget.value);
  };

  const updateBio = async () => {
    setBio(newBio);
    const payload = {
      user_id: userID,
      bio: newBio,
      avatar_path: avatar,
    };
    try {
      const response = await axios.put(`/api/v1/profiles/${userID}`, payload, {
        headers: { Authorization: authHeader },
      });
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  return (
    <div>
      <h2>Bio</h2>
      <div>
        {!isEditting ? (
          <span className="bio-styling">{userBio}</span>
        ) : (
          <>
            <TextInputStandard
              fullWidth
              label="Enter Bio"
              onChange={saveBio}
              defaultValue={userBio}
              inputProps={{ maxLength: 200 }}
            />
            <div className="submit-bio">
              <GreenButton onClick={updateBio} variant="outlined">
                Save New Bio
              </GreenButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default AccountBio;
