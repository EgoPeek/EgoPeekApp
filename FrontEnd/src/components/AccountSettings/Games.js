/* Allows user to add or delete games from profile */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { GreenButton } from "../Misc/Input/Buttons";
import "./Games.css";

const Games = ({ userGames, setUserGames, isEditting, user_id, setGames }) => {
  const [newGame, setNewGame] = useState([]);

  useEffect(() => {
    setNewGame([])
  }, [isEditting])

  const deleteGame = async (game_id) => {
    try {
      const response = await axios.delete(`/api/v1/games/${game_id}`);
      console.log(response);
      setUserGames(userGames.filter(x => x.game_id !== game_id))
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const createGame = async (game_title, user_id) => {
    game_title.forEach(async (item) => {
      if(item.game_title === 'Select') return

      const payload = {
        user_id: user_id,
        game_title: item.game_title,
      };
      try {
        const response = await axios.post(`/api/v1/games/`, payload);
        console.log(response);
        setUserGames((prevState) => [...prevState, response.data])
      } catch (e) {
        console.log(e);
      }
    });
    setNewGame([])
  };

  const createNewBody = () => {
    const body = {
      game_title: "Select",
    };
    return body;
  };

  const addGame = () => {
    setNewGame([...newGame, createNewBody()]);

  };

  const changeGame = (event, i) => {
    const val = event.target.value;
    newGame[i].game_title = val;
  };

  const removeGame = (key) => {
    setNewGame(newGame.filter((item, i) => i !== key));
  };

  const AddGames = () => {
    return (
      <div className="add-games">
        <div>
          {newGame.map((item, i) => {
            return (
              <div key={i}>
                <select
                  onChange={(e) => changeGame(e, i)}
                  key={i}
                  className="settings-dropdown"
                  defaultValue="Select"
                >
                  <option value="Current">{item.game_title}</option>
                  <option value="Rocket League">Rocket League</option>
                  <option value="CS:GO">CS:GO</option>
                  <option value="Valorant">Valorant</option>
                  <option value="Rust">Rust</option>
                  <option value="League of Legends">League of Legends</option>
                  <option value="Terraria">Terraria</option>
                  <option value="Rainbow Six Seige">Rainbow Six Seige</option>
                  <option value="Gang Beasts">Gang Beasts</option>
                  <option value="Final Fantasy XIV">Final Fantasy XIV</option>
                </select>
                <GreenButton
                  onClick={() => {
                    removeGame(i);
                  }}
                >
                  Remove
                </GreenButton>
              </div>
            );
          })}
        </div>
        {!isEditting ? (
          <></>
        ) : (
          <div className="game-btns-spacing">
            <GreenButton
              variant="outlined"
              onClick={() => {
                createGame(newGame, user_id);
              }}
            >
              Save New Games
            </GreenButton>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="games-header">
        <h2>Favorite Games</h2>
        <div className="add-btn-spacing">
          {isEditting &&
            <GreenButton onClick={addGame} variant="outlined">
              Add Games
            </GreenButton>
          }
        </div>
      </div>
      <div className="account-games">
        {userGames.map((item, i) => {
          return !isEditting ? (
            <div key={i}>
              <p>{item.game_title}</p>
            </div>
          ) : (
            <div className="gametitle-spacing" key={i}>
              <p>{item.game_title}</p>
              <GreenButton
                size="small"
                onClick={() => {
                  deleteGame(item.game_id);
                }}
              >
                Delete
              </GreenButton>
            </div>
          );
        })}

        <AddGames />
      </div>
    </div>
  );
};

export default Games;
