"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputLabel from "@/components/InputLabel";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createApi } from "@/apiHandler/page";
import Link from "next/link";

interface FieldConfig {
  id: keyof FormDataState;
  label: string;
  placeholder: string;
  type: string;
  validate: (value: string) => string;
}

interface FormDataState {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: boolean;
  message: string;
  data: {
    token: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      phoneNumber: string;
      password: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}

export default function SignInFlex() {
  const router = useRouter();

  const [form, setForm] = useState<FormDataState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<FormDataState>>({});
  const [loading, setLoading] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "email",
      label: "Email",
      placeholder: "you@example.com",
      type: "email",
      validate: (val: string) =>
        !val.trim()
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
          ? "Invalid email format"
          : "",
    },
    {
      id: "password",
      label: "Password",
      placeholder: "********",
      type: "password",
      validate: (val: string) =>
        !val.trim()
          ? "Password is required"
          : val.length < 6
          ? "Minimum 6 characters"
          : "",
    },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<FormDataState> = {};
    let valid = true;

    for (const field of fields) {
      const error = field.validate(form[field.id]);
      if (error) {
        newErrors[field.id] = error;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setLoading(true);
    try {
      const response = await createApi<LoginResponse>("auth/login", form);
      if (response?.status === 200) {
        typeof window !== "undefined" &&
          localStorage.setItem("token", response.data.token);
        typeof window !== "undefined" &&
          localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Logged in successfully");
        router.push("/");
      } else {
        toast.error("Login failed: " + response.message);
      }
    } catch (err) {
      toast.error("Something went wrong while logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        height: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Left: Form */}
      <Box
        sx={{
          flex: 1,
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
          fontWeight="bold"
          sx={{ fontFamily: "Lora", fontSize: "20px", }}
        >
          Welcome Back 👋
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          fontSize={"12px"}
        >
          Shape Your Thoughts. Sign in to share and explore insightful blogs.
        </Typography>

        <form onSubmit={handleSubmit}>
          {fields.map(({ id, label, placeholder, type }) => (
            <Box key={id} mb={2}>
              <InputLabel htmlFor={id}>{label}</InputLabel>
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={form[id]}
                onChange={handleChange}
                error={!!errors[id]}
              />
              {errors[id] && (
                <Typography color="error" fontSize={12}>
                  {errors[id]}
                </Typography>
              )}
            </Box>
          ))}

          <Button type="submit" sx={{ mt: 2 }} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={1}
          sx={{ textAlign: "center" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            style={{
              fontWeight: "bold",
              color: "#000",
              textDecoration: "none",
            }}
          >
            Sign Up
          </Link>
        </Typography>
      </Box>

      {/* Right: Image */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          p: { xs: 0, md: 3 },
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
