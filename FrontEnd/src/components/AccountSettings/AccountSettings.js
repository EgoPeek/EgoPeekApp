/* Main component rendering the account page */
import React, { useEffect, useState } from "react";
import Credentials from "./Credentials";
import useFetch from "../../hooks/useFetch";
import Games from "./Games";
import Socials from "./Socials";
import Bio from "./Bio";
import { GreenButton } from "../Misc/Input/Buttons";
import "./AccountSettings.css";
import Header from "../Misc/CustomComponents/Header";
import AvatarUpload from "./AvatarUpload";
import { GreenCircle } from "../Misc/Input/LoadingCircle";
import useAvatar from "../../hooks/useAvatar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const AccountSettings = () => {
  const user_id = window.localStorage.getItem("userID");
  const { data, isPending, error } = useFetch(`/api/v1/profiles/${user_id}`);
  const [user, setUser] = useState([]);
  const [games, setGames] = useState([]);
  const [socials, setSocials] = useState([]);
  const [bio, setBio] = useState([]);
  const [isEditting, setIsEditting] = useState(false);
  const { avatar, updateAvatarCache } = useAvatar();

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/interests`;
    navigate(path);
  };

  useEffect(() => {
    const user = !isPending
      ? { username: data.user.username, email: data.user.email }
      : {};
    const games = !isPending ? data.user.games : [];
    const social = !isPending ? data.user.links : [];
    const bio = !isPending ? data.bio : "...";
    const avatar = !isPending ? data.avatar_path : "/";

    setSocials(social);
    setGames(games);
    setBio(bio);
    setUser(user);
  }, [isPending]);

  if (error) return <></>;

  return (
    <div className="idk">
      <Header />
      <div className="usersettings">
        <div className="left-side-profile">
          <div className="settings-edit-icon">
            <AvatarUpload
              avatar={avatar}
              user_id={user_id}
              userBio={bio}
              setAvatar={updateAvatarCache}
              isEditting={isEditting}
            />
            <GreenButton
              sx={{ marginTop: "1rem" }}
              variant="outlined"
              onClick={() => setIsEditting(!isEditting)}
            >
              {!isEditting ? "Edit Profile" : "Toggle Edit"}
            </GreenButton>
          </div>

          <div className="user-bio">
            <Bio
              avatar={avatar}
              userBio={bio}
              setBio={setBio}
              userID={user_id}
              isEditting={isEditting}
            />
          </div>

          <div className="settings-interests">
            <GreenButton onClick={routeChange} variant="outlined">
              Adjust Interests
            </GreenButton>
          </div>
        </div>

        <div className="right-side-settings">
          <div className="user-credentials">
            <Credentials userCredentials={user} isEditting={isEditting} />
          </div>
          <div className="user-games">
            <Games
              setUserGames={setGames}
              userGames={games}
              isEditting={isEditting}
              user_id={user_id}
            />
          </div>
          <div className="user-socials">
            <Socials
              setUserSocials={setSocials}
              userSocials={socials}
              isEditting={isEditting}
              user_id={user_id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
