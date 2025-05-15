"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Banner from "./Banner";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const user = JSON.parse(
    (typeof window !== "undefined" && localStorage.getItem("user")) || "{}"
  );
  const router = useRouter();

  const handleLogout = () => {
    typeof window !== "undefined" && localStorage.removeItem("token");
    typeof window !== "undefined" && localStorage.removeItem("user");
    router.push("/sign-in");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          boxShadow: "none",
          height: 56,
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "56px !important",
            paddingLeft: { xs: 2, sm: 4, md: 10 },
            paddingRight: { xs: 2, sm: 4, md: 10 },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: "white",
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            Blogs
          </Typography>

          {user?.fullName ? (
            <Box display="flex" alignItems="center">
              <Typography
                sx={{
                  color: "#000",
                  fontWeight: 600,
                  fontSize: 14,
                  paddingX: 3,
                  textTransform: "capitalize",
                }}
              >
                Hello,
                <br /> {user.fullName}
              </Typography>
              <Logout
                sx={{ cursor: "pointer", color: "#000" }}
                onClick={handleLogout}
              />
            </Box>
          ) : (
            <Link href="/login">
              <Button
                variant="outlined"
                sx={{
                  color: "#000",
                  borderColor: "white",
                  borderRadius: "20px",
                  textTransform: "none",
                  background: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  height: 32,
                  paddingX: 3,
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderColor: "white",
                  },
                }}
              >
                Sign In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      {/* Padding so Banner isn't hidden behind navbar */}
      <Banner />
    </Box>
  );
}
