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
          color: "black",
        },
        "& .MuiPaginationItem-root.Mui-selected": {
          backgroundColor: "black",
          color: "white",
        },
      }}
    />
  );
};

export default CustomPagination;
