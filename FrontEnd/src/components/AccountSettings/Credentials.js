/* Renders Name and Email on settings page */
import React from "react";

const Credentials = ({ userCredentials, isEditting }) => {
  return (
    <div>
      <div>
        <h3>Name: {userCredentials.username}</h3>
        <h3>Email: {userCredentials.email}</h3>
      </div>
    </div>
  );
};

export default Credentials;
