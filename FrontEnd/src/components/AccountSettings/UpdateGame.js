import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const UpdateGames = ({ Game, setGame, Platform, setPlatform }) => {
  const user_id = window.localStorage.getItem("userID");
  const [formValues, setFormValues] = useState([
    { gameTitle: "", gamePlatform: "" },
  ]);

  const handleGameChange = (event, setGame) => {
    setGame(event.target.value);
  };

  const handlePlatformChange = (event, setPlatform) => {
    setPlatform(event.target.value);
  };

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { gamePlatform: "", gameTitle: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  let handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <div className="select-favorites">
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Game Platform</label>
            <Dropdown
              options={[
                { id: 1, label: "None", value: null },
                { id: 2, label: "Rocket League", value: "Rocket League" },
                { id: 3, label: "Valorant", value: "Valorant" },
                { id: 4, label: "CS:GO", value: "CS:GO" },
              ]}
              value={Game}
              onChange={(e) => handleGameChange(e, setGame)}
            />
            <label>Game Title: </label>
            <Dropdown
              options={[
                { id: 1, label: "None", value: null },
                { id: 2, label: "PS5", value: "PS5" },
                { id: 3, label: "XBOX1", value: "XBOX1" },
                { id: 4, label: "PC", value: "PC" },
              ]}
              value={Platform}
              onChange={(e) => handlePlatformChange(e, setPlatform)}
            />
            {index ? (
              <button
                type="button"
                className="button remove"
                onClick={() => removeFormFields(index)}
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <button
            className="button add"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button>
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default UpdateGames;
