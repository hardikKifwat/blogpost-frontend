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
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  image: string;
  category: string;
  categoryColor: string;
}

interface BlogCardsProps {
  posts: BlogPost[];
}

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
          id,
          author,
          date,
          title,
          description,
          image,
          category,
          categoryColor,
        }) => (
          <Card
            key={id}
            component="article"
            sx={{
              width: 420,
              height: 444,
              boxShadow: "none",
              borderRadius: 2,
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              ":hover": { boxShadow: 3 },
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="160"
              image={image}
              alt={title}
              sx={{ borderRadius: "8px 8px 0 0" }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                p: 2,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontWeight: 500, display: "block", mb: 0.5 }}
              >
                {author} • {date}
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
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
              <Chip
                label={category}
                size="small"
                sx={{
                  bgcolor: categoryColor,
                  color: "black",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  width: "fit-content",
                  mt: 'auto'
                }}
              />
            </CardContent>
          </Card>
        )
      )}
    </Box>
  );
}
