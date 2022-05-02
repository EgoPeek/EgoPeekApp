/* allows user to add and remove external social links */
import React, { useEffect, useState } from "react";
import { GreenButton } from "../Misc/Input/Buttons";
import { TextInputStandard } from "../Misc/Input/TextFields";
import axios from "axios";
import "./Socials.css";

const authHeader =
  window.localStorage.getItem("token_type") +
  " " +
  window.localStorage.getItem("token");

const Socials = ({ userSocials, setUserSocials, isEditting, user_id }) => {
  const [newSocials, setNewSocials] = useState([]);
  useEffect(() => {
    setNewSocials([]);
  }, [isEditting]);

  const createNewBody = () => {
    const body = {
      link_platform: "",
      link_username: "",
      link_url: "",
    };
    return body;
  };

  const addSocialLink = () => {
    setNewSocials([...newSocials, createNewBody()]);
  };

  const removeSocials = (key) => {
    setNewSocials(newSocials.filter((item, i) => i !== key));
  };

  const deleteSocials = async (link_id) => {
    try {
      const response = await axios.delete(`/api/v1/links/${link_id}`, {
        headers: { Authorization: authHeader },
      });
      setUserSocials(userSocials.filter((x) => x.link_id !== link_id));
      console.log(response);
      return response.data;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  const createSocial = async (newSocials, user_id) => {
    newSocials.forEach(async (item) => {
      if (
        item.link_platform === "" ||
        item.link_username === "" ||
        item.link_url === ""
      )
        return;

      const payload = {
        user_id: user_id,
        link_platform: item.link_platform,
        link_username: item.link_username,
        link_url: item.link_url,
      };
      try {
        const response = await axios.post(`/api/v1/links/`, payload, {
          headers: { Authorization: authHeader },
        });
        console.log(response);
        setUserSocials((prevState) => [...prevState, response.data]);
        return response.data;
      } catch (e) {
        console.log(e);
        return e;
      }
    });
    setNewSocials([]);
  };

  const AddSocials = () => {
    const changePlatform = (event, i) => {
      const val = event.target.value;
      newSocials[i].link_platform = val;
    };
    const changeUsername = (event, i) => {
      const val = event.target.value;
      newSocials[i].link_username = val;
    };
    const changeUrl = (event, i) => {
      const val = event.target.value;
      newSocials[i].link_url = val;
    };

    if (!isEditting) return <></>;

    return (
      <div className="add-socials">
        <div>
          {newSocials.map((item, i) => {
            return (
              <div key={i} className="socials-new-input">
                <TextInputStandard
                  onChange={(e) => changePlatform(e, i)}
                  defaultValue={item.link_platform}
                  autoComplete="off"
                  label="platform"
                  size="small"
                />
                <TextInputStandard
                  onChange={(e) => changeUsername(e, i)}
                  defaultValue={item.link_username}
                  autoComplete="off"
                  label="username"
                  size="small"
                />
                <TextInputStandard
                  onChange={(e) => changeUrl(e, i)}
                  defaultValue={item.link_url}
                  autoComplete="off"
                  label="url"
                  size="small"
                />
                <GreenButton
                  onClick={() => {
                    removeSocials(i);
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
          <GreenButton
            onClick={() => {
              createSocial(newSocials, user_id);
            }}
            variant="outlined"
          >
            Save Socials
          </GreenButton>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="links-header">
        <h2>External Links</h2>
        <div className="add-btn-spacing">
          {!isEditting ? null : (
            <GreenButton onClick={addSocialLink} variant="outlined">
              Add Social
            </GreenButton>
          )}
        </div>
      </div>

      <div className="socials-spacing">
        {userSocials.map((item, i) => {
          return !isEditting ? (
            <div className="display-socials" key={i}>
              <p className="platform-spacing">Platform: {item.link_platform}</p>
              <p className="username-spacing">Username: {item.link_username}</p>
              <p className="url-spacing">Url: {item.link_url}</p>
            </div>
          ) : (
            <div className="links-spacing-edit" key={i}>
              <p className="platform-spacing">Platform: {item.link_platform}</p>
              <p className="username-spacing">Username: {item.link_username}</p>
              <p className="url-spacing">Url: {item.link_url}</p>
              <GreenButton
                onClick={() => {
                  deleteSocials(item.link_id);
                }}
              >
                Delete
              </GreenButton>
            </div>
          );
        })}
      </div>
      <AddSocials />
    </div>
  );
};

export default Socials;
