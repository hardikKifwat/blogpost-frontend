"use client";

import React from "react";
import { ToastContainer, ToastContainerProps } from "react-toastify";
import { useMediaQuery } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

const GlobalToastContainer: React.FC = () => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const toastStyles: ToastContainerProps["style"] = {
    width: isSmallScreen ? "90%" : undefined,
    left: isSmallScreen ? "5%" : undefined,
    zIndex: 9999,
  };

  return (
    <ToastContainer
      limit={1}
      autoClose={2000}
      position="top-right"
      style={toastStyles}
    />
  );
};

export default GlobalToastContainer;
