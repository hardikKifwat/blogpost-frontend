import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

interface ButtonPropsExtended extends ButtonProps {}

const Button: React.FC<ButtonPropsExtended> = (props) => {
  const { sx, children, type = "submit", ...rest } = props;

  return (
    <MuiButton
      type={type}
      fullWidth
      disableElevation
      variant="contained"
      sx={{
        backgroundColor: "#6941C6", // black background
        borderRadius: "30px",
        padding: "12px 0", // vertical padding
        height: "40px", // fixed height
        fontWeight: 600,
        fontSize: "12px", // change to "18px" if needed
        lineHeight: "40px", // vertically center text
        letterSpacing: "0%",
        textTransform: "none",
        fontFamily: "Inter, sans-serif",
        "&:hover": {
          backgroundColor: "#6d28d9", // darker purple hover
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
