import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const SidebarIcon = ({ handleClick, isOpen }) => {
  return (
    <span onClick={handleClick}>{isOpen ? <CloseIcon /> : <MenuIcon />}</span>
  );
};
export default SidebarIcon;
