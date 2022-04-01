import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import AddIcon from "@mui/icons-material/Add";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import GamePostsEditing from "../AccountSettings/GamePostsEditing";

const UpdateGames = ({
  Game,
  setGame,
  Platform,
  setPlatform,
  data,
  isPending,
}) => {
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

  let addFormFields = () => {
    setFormValues([...formValues, { gamePlatform: "", gameTitle: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const games = isPending ? "..." : data.user.games;

  return (
    <div className="select-favorites">
      <div className="socials-header">
        <h2>Edit Favorites</h2>
        <button className="button-add" onClick={() => addFormFields()}>
          <AddIcon />
        </button>
      </div>
      <span>
        {isPending
          ? "..."
          : games.map((item, i) => (
              <GamePostsEditing gameInfo={item} key={i} />
            ))}
      </span>

      <form>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
            <label>Game Title: </label>
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
            <label>Game Platform: </label>
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

            <button
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};
export default UpdateGames;
