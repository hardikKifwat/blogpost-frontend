"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputLabel from "@/components/InputLabel";

export default function SignInFlex() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        height: { xs: "138vh", md: "100vh" },
        width: "100%",
        // overflow: "hidden",
      }}
    >
      {/* Left side: form */}
      <Box
        sx={{
          flex: "1 1 50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: { xs: 4, md: 10 },
          my: { xs: 2, md: 0 },
          bgcolor: "#fff",
          height: "100vh",
        }}
      >
        <Typography
          variant="h6"
          component="h1"
          fontWeight="bold"
          sx={{ userSelect: "none", fontFamily: "Lora", fontSize: "20px" }}
        >
          Sign UP
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} fontSize={"12px"}>
          Join the Conversation. Sign up to share and explore insightful blogs.
        </Typography>

        <form>
          <InputLabel htmlFor="password">Full Name</InputLabel>
          <Input id="password" type="password" placeholder="0987654321" />

          <InputLabel htmlFor="password" sx={{ mt: 2 }}>
            Phone Number
          </InputLabel>
          <Input id="password" type="password" placeholder="0987654321" />

          <InputLabel htmlFor="email" sx={{ mt: 2 }}>
            Email
          </InputLabel>
          <Input id="email" type="email" placeholder="shalini@gmail.com" />
          <InputLabel htmlFor="password" sx={{ mt: 2 }}>
            Password
          </InputLabel>
          <Input id="password" type="password" placeholder="***********" />
          <InputLabel htmlFor="password" sx={{ mt: 2 }}>
            Confirm Password
          </InputLabel>
          <Input id="confirmPassword" type="password" placeholder="" />

          <Button type="submit" sx={{ mt: 4 }}>
            Sign Up
          </Button>
        </form>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          sx={{ userSelect: "none", textAlign: "center" }}
        >
          Don't you have an account?{" "}
          <Link
            href="/signup"
            underline="hover"
            sx={{ fontWeight: "bold", cursor: "pointer", color: "#000" }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* Right side: image */}
      <Box
        sx={{
          flex: "1 1 50%",
          position: "relative",
          p: { xs: 0, md: 3 }, // padding instead of margin
          boxSizing: "border-box",
          m: 3,
        }}
      >
        <Image
          src="/sunset.jpg"
          alt="Sunset"
          fill
          style={{
            objectFit: "cover",
            borderRadius: "24px",
          }}
          priority
        />
      </Box>
    </Box>
  );
}
