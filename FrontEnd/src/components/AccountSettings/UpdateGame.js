import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const UpdateGames = () => {
  const [Game1, setGame1] = useState("");
  const [Game2, setGame2] = useState("");
  const [Game3, setGame3] = useState("");

  const handleGame1Change = (event) => {
    setGame1(event.target.value);
  };

  const handleGame2Change = (event) => {
    setGame2(event.target.value);
  };

  const handleGame3Change = (event) => {
    setGame3(event.target.value);
  };

  console.log(Game1, Game2, Game3);

  return (
    <div className="select-favorites">
      <Dropdown
        options={[
          { id: 1, label: "None", value: "None" },
          { id: 2, label: "Rocket League", value: "Rocket League" },
          { id: 3, label: "Valorant", value: "Valorant" },
          { id: 4, label: "CS:GO", value: "CS:GO" },
        ]}
        value={Game1}
        title={Game1}
        onChange={handleGame1Change}
      />
      <Dropdown
        options={[
          { id: 1, label: "None", value: "None" },
          { id: 2, label: "Rocket League", value: "Rocket League" },
          { id: 3, label: "Valorant", value: "Valorant" },
          { id: 4, label: "CS:GO", value: "CS:GO" },
        ]}
        value={Game2}
        title={Game2}
        onChange={handleGame2Change}
      />
      <Dropdown
        options={[
          { id: 1, label: "None", value: "None" },
          { id: 2, label: "Rocket League", value: "Rocket League" },
          { id: 3, label: "Valorant", value: "Valorant" },
          { id: 4, label: "CS:GO", value: "CS:GO" },
        ]}
        value={Game3}
        title={Game3}
        onChange={handleGame3Change}
      />
    </div>
  );
};
export default UpdateGames;
