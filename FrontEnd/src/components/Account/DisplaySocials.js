import React from "react";
import "./Sidebar.css";
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
    <span className="social-icons-spacing">
      <a
        className="social-icon"
        href={socialInfo.link_url}
        rel="noopener"
        target="_blank"
      >
        {IconMap[socialInfo.link_platform]}
      </a>
    </span>
  );
};

export default DisplaySocials;
