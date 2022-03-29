import React from "react";
import { useState } from "react";
import Dropdown from "./Dropdown";

const UpdateGames = () => {
  /*const [platform, setplatform] = useState("Enter platform");
  const [platformName, setplatformName] = useState("Username");
  const [linkPlatform, setlinkPlatform] = useState("user url:optional");*/
  const [Game1, setGame1] = useState("Game1");
  const [Game2, setGame2] = useState("Game2");
  const [Game3, setGame3] = useState("Game3");

  const handleGame1Change = (event) => {
    setGame1(event.target.value);
  };

  const handleGame2Change = (event) => {
    setGame2(event.target.value);
  };

  const handleGame3Change = (event) => {
    setGame3(event.target.value);
  };

  const games = [Game1, Game2, Game3];
  console.log(games);

  return (
    <div className="select-favorites">
      <Dropdown
        options={[
          { id: 1, label: "Rocket League", value: "Rocket League" },
          { id: 2, label: "Valorant", value: "Valorant" },
          { id: 3, label: "CS:GO", value: "CS:GO" },
        ]}
        value={Game1}
        onChange={handleGame1Change}
      />
      <Dropdown
        options={[
          { id: 1, label: "Rocket League", value: "Rocket League" },
          { id: 2, label: "Valorant", value: "Valorant" },
          { id: 3, label: "CS:GO", value: "CS:GO" },
        ]}
        value={Game2}
        onChange={handleGame2Change}
      />
      <Dropdown
        options={[
          { id: 1, label: "Rocket League", value: "Rocket League" },
          { id: 2, label: "Valorant", value: "Valorant" },
          { id: 3, label: "CS:GO", value: "CS:GO" },
        ]}
        value={Game3}
        onChange={handleGame3Change}
      />
    </div>
  );
};
export default UpdateGames;
