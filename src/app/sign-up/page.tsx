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
  validate: (value: string, form?: FormDataState) => string;
}

interface FormDataState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
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
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<FormDataState>>({});
  const [loading, setLoading] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "fullName",
      label: "Full Name",
      placeholder: "John Doe",
      type: "text",
      validate: (val: string) => (!val.trim() ? "Full name is required" : ""),
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      placeholder: "9876543210",
      type: "tel",
      validate: (val: string) =>
        !val.trim()
          ? "Phone number is required"
          : !/^\d{10}$/.test(val)
          ? "Phone number must be 10 digits"
          : "",
    },
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
    {
      id: "confirmPassword",
      label: "Confirm Password",
      placeholder: "********",
      type: "password",
      validate: (val: string, form?: FormDataState) =>
        !val.trim()
          ? "Confirm password is required"
          : val !== form?.password
          ? "Passwords do not match"
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
      const error = field.validate(form[field.id], form);
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
      // Prepare payload for registration API (exclude confirmPassword)
      const payload = {
        fullName: form.fullName.trim(),
        phoneNumber: form.phoneNumber.trim(),
        email: form.email.toLowerCase().trim(),
        password: form.password,
      };

      const response = await createApi<LoginResponse>("auth/register", payload);
      if (response?.status === 200) {
        toast.success("Registration successful");
        router.push("/sign-in");
      } else {
        toast.error("Registration failed: " + response.message);
      }
    } catch (err) {
      toast.error("Something went wrong while registering");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        height: { xs: "145vh", md: "100vh" },
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
          sx={{ fontFamily: "Lora", fontSize: "20px", mb: 1 }}
        >
          Sign Up
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          fontSize={"12px"}
        >
          Join the Conversation. Sign up to share and explore insightful blogs.
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
                <Typography color="error" fontSize={12} mb={1}>
                  {errors[id]}
                </Typography>
              )}
            </Box>
          ))}

          <Button type="submit" sx={{ mt: 4 }} disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <Typography
          variant="body2"
          color="text.secondary"
          mt={2}
          sx={{ textAlign: "center" }}
        >
          Already have an account?{" "}
          <Link
            href="/sign-in"
            style={{
              fontWeight: "bold",
              color: "#000",
              textDecoration: "none",
            }}
          >
            Sign In
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
