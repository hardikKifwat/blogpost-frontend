import React from "react";
import Typography from "@mui/material/Typography";

interface InputLabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  shrink?: boolean;
  sx?: object;
}

const InputLabel: React.FC<InputLabelProps> = ({ htmlFor, children, shrink = false, sx }) => {
  return (
    <Typography
      component="label"
      htmlFor={htmlFor}
      variant="body2"
      sx={{
        display: "block",
        color: "#1a202c", // a dark gray for label text
        userSelect: "none",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

export default InputLabel;
