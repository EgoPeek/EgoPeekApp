/* Component that handles updating user bio */
import React, { useState, useEffect } from "react";
import { TextInputStandard } from "../Misc/Input/TextFields";
import axios from "axios";
import { GreenButton } from "../Misc/Input/Buttons";

const AccountBio = ({ userBio, avatar, isEditting, userID }) => {
  const [newBio, setNewBio] = useState("");

  const saveBio = (event) => {
    setNewBio(event.currentTarget.value);
  };

  const updateBio = async () => {
    const payload = {
      user_id: userID,
      bio: newBio,
      avatar_path: avatar,
    };
    try {
      const response = await axios.put(`/api/v1/profiles/${userID}`, payload);
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
          <span>{userBio}</span>
        ) : (
          <>
            <TextInputStandard
              fullWidth
              label="Enter Bio"
              onChange={saveBio}
              defaultValue={userBio}
            />
            <GreenButton onClick={updateBio}>Submit Bio</GreenButton>
          </>
        )}
      </div>
    </div>
  );
};
export default AccountBio;