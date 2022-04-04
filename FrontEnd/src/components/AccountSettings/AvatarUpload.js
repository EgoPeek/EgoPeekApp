import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { IconBubble } from "../Misc/CustomComponents/IconBubble";
import './AvatarUpload.css'
import { GreenButton } from "../Misc/Input/Buttons";

const AvatarUpload = ({
  avatar_path,
  user_id,
  userBio,
  isEditting,
  avatar,
}) => {
  const [file, setFile] = useState(null);
  const fileSomethingidk = useRef(null);

  const fileChangedHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadHandler = async () => {
    let imagePath = "";
    const fd = new FormData();
    console.log(fd);
    console.log(file);
    fd.append("avatar", file);
    console.log(fd);
    const { res, error } = await postFormData("/api/v1/profiles/avatars", fd);
    console.log(res);
    imagePath = res.data.relative_avatar_path;
    avatarrandom(imagePath, user_id, userBio);
  };

  return (
    <div>
      <input
        style={{
          display: "none",
        }}
        type="file"
        onChange={fileChangedHandler}
        ref={fileSomethingidk}
      />
      <div className="avatar-container">

        <IconBubble 
          userImgSrc={avatar}
          imgStyle={{ height: "150px", width: "150px" }}
          onClick={() => {
            const idk = fileSomethingidk.current;
            idk.click();
          }}
        > 
        </IconBubble>
        <EditIcon className="avatar-edit-icon"/>
        {!isEditting ? null : <GreenButton onClick={uploadHandler}>Upload</GreenButton>}
      </div>
    </div>
  );
};

const avatarrandom = async (avatar_path, user_id, userBio) => {
  const payload = {
    user_id: user_id,
    bio: userBio,
    avatar_path: avatar_path,
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

const postFormData = async (url, formData) => {
  let res = null;
  let error = null;

  try {
    const response = await axios.post(url, formData, {
      headers: {
        accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    res = response;
  } catch (err) {
    error = err;
  }
  return { res, error };
};

export default AvatarUpload;
