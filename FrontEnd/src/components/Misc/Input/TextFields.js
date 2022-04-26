/* 
    filename: Buttons.js
    description: custom textfield for log in screen
*/

import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { deepPurple, green, purple } from "@mui/material/colors";

//updated version of using mui styles
export const TextInputStandard = styled(TextField)(() => ({
  color: "white",
  fieldset: "white",
  label: {
    color: "grey",
  },
  "& label.Mui-focused": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: green[400],
    },
    "&.Mui-focused fieldset": {
      borderColor: green[400],
    },
    input: {
      color: "white",
      backgroundColor: "#171621",
    },
  },
}));

export const TextInputPurple = styled(TextField)(() => ({
  color: "white",
  fieldset: "white",
  backgroundColor: "#171621",

  label: {
    color: "grey",
  },
  "& label.Mui-focused": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: deepPurple[400],
    },
    "&.Mui-focused fieldset": {
      borderColor: deepPurple[400],
    },
    input: {
      color: "white",
      backgroundColor: "#171621",
    },
  },
}));

export const DarkTextInput = styled(TextField)(() => ({
  color: "white",
  fieldset: "white",
  backgroundColor: "#171621",

  label: {
    color: "grey",
  },
  "& label.Mui-focused": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: 'white',
    },
    "&.Mui-focused fieldset": {
      borderColor: 'white',
    },
    input: {
      color: "white",
      backgroundColor: "#171621",
    },
  },
}));


export const TextInputPost = styled(TextField)(() => ({
  color: "white",
  fieldset: "white",
  label: {
    color: "grey",
  },
  "& label.Mui-focused": {
    color: "white",
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
    input: {
      color: "white",
      background: "#171621",
    },
  },
}));
