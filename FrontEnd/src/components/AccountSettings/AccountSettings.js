import React from "react";
import { useState } from "react";
import "./AccountSettings.css";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import UpdateGames from "./UpdateGame";
import { TextInputStandard } from "../Misc/Input/TextFields";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

const UserSettings = () => {
  const user_id = window.localStorage.getItem("userID");
  const { data, isPending, error } = useFetch(`/api/v1/profiles/${user_id}`);

  const [bio, setBio] = useState(isPending ? "..." : data.bio);
  const [isEditing, setisEditing] = useState(false);
  const [formValues, setFormValues] = useState([{ platform: "", name: "" }]);

  /*logic to check if user is editing profile */
  const setEditingTrue = () => {
    setisEditing(true);
    setBio(isPending ? "..." : data.bio);
  };

  /* Updates profile in database */
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

  /* logic for updating socials */
  const socialsChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { platform: "", name: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    alert(JSON.stringify(formValues));
  };

  /* handles logic to update Bio */
  const saveBio = (event) => {
    setBio(event.currentTarget.value);
  };

  console.log(formValues);

  return (
    <div className="usersettings">
      {/* renders editbtn, avatar, and bio */}
      <div className="settings-left">
        <div className="editbtn-spacing">
          <button onClick={setEditingTrue}>Edit Profile</button>
        </div>
        {/* avatar and edit avatar btn */}
        <div className="avatar-container">
          <div className="avatar"></div>
          <div className="editavatar-btn">
            <button className="edit-btn">
              <EditIcon />
            </button>
          </div>
        </div>
        {/* Bio and edit bio */}
        <div className="edit-bio">
          <h2>Bio</h2>
          <div className="settings-bio">
            <div className="update-bio">
              {isEditing ? (
                <TextInputStandard
                  fullWidth
                  label="Enter Bio"
                  onChange={saveBio}
                  defaultValue={isPending ? "..." : data.bio}
                />
              ) : (
                <span className="update-bio">
                  {isPending ? "..." : data.bio}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* renders Name, Email, Favorite games, and Socials */}
      <div className="settings-main">
        <div className="settings-info">
          <p>Name: {isPending ? "..." : data.user.username}</p>
          <p>Email: {isPending ? "..." : data.user.email}</p>
          {isEditing ? <button>Change Password</button> : <span></span>}
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

        {/* renders Socials */}
        <div className="update-socials">
          <div className="socials-header">
            <h2>Other Socials</h2>
            {isEditing ? (
              <button className="button-add" onClick={() => addFormFields()}>
                <AddIcon />
              </button>
            ) : null}
          </div>
          {isEditing ? (
            <>
              <span>Current Socials</span>
              <form onSubmit={handleSubmit}>
                {formValues.map((element, index) => (
                  <div className="socialform-inline" key={index}>
                    <div className="socialform-platform">
                      <label>platform: </label>
                      <input
                        type="text"
                        name="platform"
                        value={element.platform || ""}
                        onChange={(e) => socialsChange(index, e)}
                      />
                    </div>
                    <div className="socialform-name">
                      <label>Username: </label>
                      <input
                        type="text"
                        name="name"
                        value={element.name || ""}
                        onChange={(e) => socialsChange(index, e)}
                      />
                    </div>
                    {index ? (
                      <button
                        className="button remove"
                        onClick={() => removeFormFields(index)}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                ))}
              </form>
            </>
          ) : (
            <span>Current Socials</span>
          )}
        </div>

        {/* renders save changes btn */}
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
