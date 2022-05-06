import React from "react";
import "./DisplaySocials.css";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const IconMap = {
  Instagram: <InstagramIcon />,
  Twitter: <TwitterIcon />,
  Youtube: <YouTubeIcon />,
};

const DisplaySocials = ({ socialInfo }) => {
  return (
    <div>
      <a className="curr-socials" href={socialInfo.link_url}>
        {IconMap[socialInfo.link_platform]}
      </a>
    </div>
  );
};

export default DisplaySocials;
