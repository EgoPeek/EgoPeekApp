import React from "react";
import "./AccountSettings.js";
import { useState } from "react";
import "./AccountSettings.css";

const Dropdown = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="account-dropdown">
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
