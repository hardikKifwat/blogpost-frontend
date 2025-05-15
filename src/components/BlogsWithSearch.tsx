"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { toast } from "react-toastify";
import BlogCards, { BlogPost } from "./BlogCards";
import CustomPagination from "./Pagination";
import { fetchApi } from "@/apiHandler/page";

type BlogState = {
  search: string;
  page: number;
  posts: BlogPost[];
  totalPages: number;
  loading: boolean;
};

interface BlogApiResponse {
  status: number;
  error: boolean;
  message: string;
  data: BlogPost[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export default function BlogWithSearch() {
  const [state, setState] = useState<BlogState>({
    search: "",
    page: 1,
    posts: [],
    totalPages: 1,
    loading: false,
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const queryParams = new URLSearchParams({
          search: state.search,
          page: state.page.toString(),
          limit: "6", // number of items per page
        });

        // fetchApi is assumed to return the parsed JSON response

        const response = await fetchApi<BlogApiResponse>(
          `blogs/get-blogs?${queryParams.toString()}`
        );

        if (!response.error) {
          setState((prev) => ({
            ...prev,
            posts: response.data,
            totalPages: response.pagination.totalPages,
            loading: false,
          }));
        } else {
          toast.error(response.message || "Failed to fetch blogs");
          setState((prev) => ({
            ...prev,
            posts: [],
            totalPages: 1,
            loading: false,
          }));
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Server error while fetching blogs");
        setState((prev) => ({
          ...prev,
          posts: [],
          totalPages: 1,
          loading: false,
        }));
      }
    };

    fetchBlogs();
  }, [state.search, state.page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setState((prev) => ({
      ...prev,
      search: newSearch,
      page: 1, // reset to page 1 on new search
    }));
  };

  const handlePageChange = (newPage: number) => {
    setState((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleAddClick = () => {
    toast.info("Coming soon!");
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
        <Box display="flex" alignItems="center">
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", letterSpacing: 1, fontFamily: "Lora" }}
          >
            Blogs
          </Typography>
          <Box
            component="span"
            sx={{
              display: "inline-block",
              borderBottom: 2,
              borderColor: "black",
              ml: 2,
              width: 30,
            }}
          />
        </Box>

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
            value={state.search}
            onChange={handleSearchChange}
            sx={{
              minWidth: 200,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "& .MuiOutlinedInput-input": {
                  height: 40,
                  padding: "0 14px",
                  boxSizing: "border-box",
                  fontSize: 14,
                  lineHeight: "40px",
                },
              },
            }}
          />

          <Button
            variant="contained"
            color="primary"
            disableElevation
            onClick={handleAddClick}
            sx={{
              whiteSpace: "nowrap",
              fontWeight: "bold",
              px: 3,
              width: 100,
              backgroundColor: "#6941C6",
              borderRadius: "30px",
              padding: "12px 0",
              height: "40px",
              fontSize: "12px",
              lineHeight: "40px",
              letterSpacing: "0%",
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              "&:hover": {
                backgroundColor: "#6d28d9",
              },
            }}
          >
            + Add
          </Button>
        </Stack>
      </Box>

      {state.loading && (
        <Typography sx={{ mb: 2 }} align="center">
          Loading...
        </Typography>
      )}

      {state.posts.length === 0 ? (
        <Typography textAlign={"center"} variant="h6">
          {" "}
          No blog found
        </Typography>
      ) : (
        <BlogCards posts={state.posts} />
      )}

      <CustomPagination
        count={state.totalPages}
        page={state.page}
        onChange={handlePageChange}
      />
    </Box>
  );
}
