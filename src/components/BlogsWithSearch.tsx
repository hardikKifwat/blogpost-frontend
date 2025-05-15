"use client";
import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import BlogCards, { BlogPost } from "./BlogCards";
import CustomPagination from "./Pagination";

const blogPostsData: BlogPost[] = [
  {
    id: 1,
    author: "Alec Whitten",
    date: "1 Jan 2023",
    title: "Bill Walsh leadership lessons",
    description:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    image: "/mountains.jpg",
    category: "Leadership",
    categoryColor: "#a78bfa",
  },
  {
    id: 2,
    author: "Demi Wilkinson",
    date: "1 Jan 2023",
    title: "PM mental models",
    description:
      "Mental models are simple expressions of complex processes or relationships.",
    image: "/team-meeting.jpg",
    category: "Product",
    categoryColor: "#bfdbfe",
  },
  {
    id: 3,
    author: "Candice Wu",
    date: "1 Jan 2023",
    title: "What is Wireframing?",
    description:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
    image: "/workspace.jpg",
    category: "Design",
    categoryColor: "#a78bfa",
  },
];

export default function BlogWithSearch() {
  const [page, setPage] = useState(1);

  const totalPages = 10;

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Additional logic (e.g. fetch new data) can go here
  };
  return (
    <Box sx={{ px: { xs: 2, md: 10 }, py: 5 }}>
      {/* Header + Search + Add Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
          Blogs{" "}
          <Box
            component="span"
            sx={{ borderBottom: 1, borderColor: "black", ml: 1, width: 30 }}
          />
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flexWrap="wrap"
          sx={{ flexGrow: { xs: 1, md: 0 } }}
        >
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{ minWidth: 200 }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ whiteSpace: "nowrap", fontWeight: "bold", px: 3 }}
          >
            + Add
          </Button>
        </Stack>
      </Box>

      <Box>
        <BlogCards posts={blogPostsData} />
        <CustomPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
