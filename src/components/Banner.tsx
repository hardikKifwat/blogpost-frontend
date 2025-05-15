import * as React from "react";
import { Box, Typography, Stack } from "@mui/material";

const bannerImage = "/sea.jpg";

export default function Banner() {
  return (
    <Box
      sx={{
        position: "relative",
        height: "600px",
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "flex-start",
        paddingLeft: { xs: 3, md: 15 },
        paddingTop: { xs: 6, md: 14 },
      }}
    >
      <Box sx={{ maxWidth: { xs: "90%", md: 480 } }}>
        {/* Category Label */}
        <Box
          sx={{
            display: "inline-block",
            padding: "8px 10px",
            fontSize: 10,
            fontWeight: 700,
            fontFamily: "Inter",
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.20)",
            letterSpacing: 1,
            mb: 2,
            textTransform: "uppercase",
          }}
        >
          Adventure
        </Box>

        {/* Title */}
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: 700, lineHeight: 1.2, mb: 3 }}
        >
          Richard Norton
          <br />
          photorealistic rendering as
          <br />
          real photos
        </Typography>

        {/* Date and description */}
        <Typography
          variant="body2"
          sx={{
            color: "rgba(255, 255, 255, 0.7)",
            mb: 5,
            maxWidth: 380,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          1 Jan 2023 — Progressively incentivize cooperative systems through
          technically sound functionalities. The credibly productive seamless
          data.
        </Typography>

        {/* Pagination dots */}
        <Stack direction="row" spacing={2}>
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "white",
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.4)",
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}
