"use client";

import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Link,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export interface BlogPost {
  _id: string;
  author: {
    _id: string;
    fullName: string;
    email: string;
  };
  blog_image_url: string;
  category_name: {
    _id: string;
    name: string;
  };
  content: string;
  createdAt: string;
  title: string;
  updatedAt: string;
}

const baseUrl = "http://localhost:8000";

interface BlogCardsProps {
  posts: BlogPost[];
}

const categoryColors: Record<string, string> = {
  Leadership: "#F9F5FF",
  Product: "#F0F9FF",
  Design: "#F9F5FF",
  "Software Development": "#ECFDF3",
  Podcasts: "#F9F5FF",
  // Add more categories here if needed
};
const categoryTextColors: Record<string, string> = {
  Leadership: "#6941C6",
  Product: "#026AA2",
  Design: "#6941C6",
  "Software Development": "#027A48",
  Podcasts: "#6941C6",
  // Add more categories here if needed
};

export default function BlogCards({ posts }: BlogCardsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: "32px",
        justifyContent: { xs: "center", md: "flex-start" },
      }}
    >
      {posts.map(
        ({
          _id,
          author,
          createdAt,
          title,
          content,
          blog_image_url,
          category_name,
        }) => {
          // Format the date (optional)
          const formattedDate = new Date(createdAt).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "short",
              year: "numeric",
            }
          );

          return (
            <Card
              key={_id}
              component="article"
              sx={{
                width: 420,
                height: 444,
                boxShadow: "none",
                borderRadius: 2,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={
                  blog_image_url
                    ? `${baseUrl}${blog_image_url}`
                    : "/placeholder.jpg"
                }
                alt={title}
                sx={{ borderRadius: "8px 8px 0 0" }}
              />

              <CardContent
                sx={{
                  flexGrow: 1,
                  p: 0,
                  py: 2,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    fontWeight: 500,
                    display: "block",
                    mb: 0.5,
                    textTransform: "capitalize",
                  }}
                >
                  {author.fullName} • {formattedDate}
                </Typography>
                <Link
                  href="#"
                  underline="none"
                  sx={{
                    fontWeight: "bold",
                    fontSize: 18,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: "text.primary",
                    ":hover": { color: "primary.main" },
                  }}
                >
                  {title} <OpenInNewIcon sx={{ fontSize: 18 }} />
                </Link>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1 }}
                >
                  {content.length > 150
                    ? content.slice(0, 150) + "..."
                    : content}
                </Typography>
                <Chip
                  label={category_name?.name || "Unknown"}
                  size="small"
                  sx={{
                    bgcolor:
                      categoryColors[category_name?.name || ""] || "#ddd",
                    color:
                      categoryTextColors[category_name?.name || ""] || "#ddd",
                    fontSize: 12,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    width: "fit-content",
                    mt: 1,
                  }}
                />
              </CardContent>
            </Card>
          );
        }
      )}
    </Box>
  );
}
