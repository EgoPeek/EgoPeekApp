/**
 * Filename: Dropdown.js
 * Description: Renders a dropdown with options to select
 */
import React from "react";
import "./AccountSettings.js";
import { useState } from "react";
import "./AccountSettings.css";

const Dropdown = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={onChange} className="gametitle-dropdown">
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
