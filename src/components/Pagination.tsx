import React from "react";
import { Pagination, PaginationProps } from "@mui/material";

interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  count,
  page,
  onChange,
}) => {
  // Handler adapts MUI event signature to call onChange with page number
  const handleChange: PaginationProps["onChange"] = (event, value) => {
    onChange(value);
  };

  return (
    <Pagination
      count={count}
      page={page}
      onChange={handleChange}
      color="primary"
      size="large"
      showFirstButton
      showLastButton
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0",
        "& .MuiPaginationItem-root": {
          color: "black", // sets the text/icon color of pagination circles to black
        },
        // Optionally, to style the selected pagination item differently:
        "& .Mui-selected": {
          backgroundColor: "black", // black filled circle when selected
          color: "white", // white text/icon inside selected circle
        },
      }}
    />
  );
};

export default CustomPagination;
