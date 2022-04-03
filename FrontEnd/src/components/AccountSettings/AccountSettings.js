/* Main component rendering the account page */
import React, { useEffect, useState } from "react";
import { IconBubble } from "../Misc/CustomComponents/IconBubble";
import Credentials from "./Credentials";
import EditIcon from "@mui/icons-material/Edit";
import useFetch from "../../hooks/useFetch";
import Games from "./Games";
import Socials from "./Socials";
import Bio from "./Bio";
import { GreenButton } from "../Misc/Input/Buttons";
import { TextInputStandard } from "../Misc/Input/TextFields";
import "./AccountSettings.css";

const AccountSettings = () => {
  const user_id = window.localStorage.getItem("userID");
  const { data, isPending, error } = useFetch(`/api/v1/profiles/${user_id}`);
  const [user, setUser] = useState([]);
  const [games, setGames] = useState([]);
  const [socials, setSocials] = useState([]);
  const [bio, setBio] = useState([]);
  const [isEditting, setIsEditting] = useState(false);
  const [avatar, setAvatar] = useState([]);

  useEffect(() => {
    const user = !isPending
      ? { username: data.user.username, email: data.user.email }
      : {};
    const games = !isPending ? data.user.games : [];
    const social = !isPending ? data.user.links : [];
    const bio = !isPending ? data.bio : "...";
    const avatar = !isPending ? data.avatar_path : "...";

    setSocials(social);
    setGames(games);
    setBio(bio);
    setUser(user);
    setAvatar(avatar);
  }, [isPending]);

  return (
    <div className="usersettings">
      <div className="left-side-profile">
        <div className="settings-edit-icon">
          <EditIcon />
        </div>
        <IconBubble
          onClick={() => setIsEditting(!isEditting)}
          userImgSrc={avatar}
          imgStyle={{ height: "150px", width: "150px" }}
        />
        <div className="user-bio">
          <Bio
            avatar={avatar}
            userBio={bio}
            userID={user_id}
            isEditting={isEditting}
          />
        </div>
      </div>

      <div className="right-side-settings">
        <div className="user-credentials">
          <Credentials userCredentials={user} isEditting={isEditting} />
        </div>
        <div className="user-games">
          <Games userGames={games} isEditting={isEditting} user_id={user_id} />
        </div>
        <div className="user-socials">
          <Socials
            userSocials={socials}
            isEditting={isEditting}
            user_id={user_id}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
