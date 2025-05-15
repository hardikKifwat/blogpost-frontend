import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

const Input: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="dense"
      {...props}
      InputLabelProps={{
        shrink: false, // we manage label separately
        ...props.InputLabelProps,
      }}
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "8px",
          "& fieldset": {
            borderColor: "#e2e8f0", // subtle border color
          },
          "&:hover fieldset": {
            borderColor: "#cbd5e0", // slightly darker on hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "#7c4dff", // primary brand color on focus
            boxShadow: "0 0 0 2px rgba(124, 77, 255, 0.3)",
          },
        },
        "& .MuiOutlinedInput-input": {
          height: 40,
          padding: "0 14px", // Adjust left-right padding as needed
          boxSizing: "border-box",
          fontSize: 14,
          lineHeight: "40px", // vertically center text
        },
        color: "#2d3748",
        ...props.sx,
      }}
    />
  );
};

export default Input;
