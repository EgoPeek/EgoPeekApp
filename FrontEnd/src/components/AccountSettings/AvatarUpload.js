import React, { useRef, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { IconBubble } from "../Misc/CustomComponents/IconBubble";
import './AvatarUpload.css'
import useAvatar from "../../hooks/useAvatar";


const AvatarUpload = ({
  setAvatar,
  user_id,
  userBio,
  isEditting,
  avatar,
}) => {
  const fileSomethingidk = useRef(null);
  const {updateAvatarCache} = useAvatar()
  const authHeader = window.localStorage.getItem('token_type') + " " + window.localStorage.getItem('token')
  
  const fileChangedHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.target.files[0]
    setAvatar(URL.createObjectURL(file))
    uploadHandler(file)
  };

  const uploadHandler = async (file) => {
    const fd = new FormData();
    fd.append("avatar", file);
    const { res, error } = await postFormData("/api/v1/profiles/avatars", fd);
    if (error) return
    console.log(res);
    const imagePath = res.data.relative_avatar_path;
    setAvatar(imagePath)
    updateAvatarCache(imagePath)
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
        />
        <EditIcon className="avatar-edit-icon" />
      </div>
    </div >
  );
};

const avatarrandom = async (avatar_path, user_id, userBio) => {
  const payload = {
    user_id: user_id,
    bio: userBio,
    avatar_path: avatar_path,
  };
  try {
    const response = await axios.put(`/api/v1/profiles/${user_id}`, payload, { headers: { Authorization: authHeader } });
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
        Authorization: authHeader
      },
    });
    res = response;
  } catch (err) {
    error = err;
  }
  return { res, error };
};

export default AvatarUpload;
