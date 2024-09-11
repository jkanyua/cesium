import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { z } from "zod";

import "../api/mock";
import api from "../api";

// Schema to validate login form input
const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // Validate email format
  password: z.string().min(6, "Password must be at least 6 characters long"), // Ensure password has a minimum length
});

// Schema to validate signup form input
const signupSchema = z
  .object({
    email: z.string().email("Invalid email address"), // Email must be a valid email
    fname: z.string().min(1, "First name cannot be empty"), // First name must not be empty
    lname: z.string().min(1, "Last name cannot be empty"), // Last name must not be empty
    password: z.string().min(6, "Password must be at least 6 characters long"), // Password length
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
    phone: z
      .string()
      .regex(/^\d+$/, "Phone must be numeric")
      .max(12, "Phone number mustn't be more than 12 digits"), // Phone number must contain digits only and less than 12 digits
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match", // Custom error message
    path: ["confirmPassword"], // This applies to confirmPassword field
  });

// Custom error class for handling password-related errors
class PasswordError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

// Login action to handle form submission, validation, and API call
export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const creds = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Attempt to log in and redirect to home if successful
  try {
    // Validate login form data using loginSchema
    loginSchema.parse(creds);
    const response = await api.post<{
      user: { password: string; firstName: string; email: string };
    }>("/login", creds);

    // Check if the provided credentials match those stored in localStorage
    if (
      response.data.user.password === localStorage.getItem("password") &&
      response.data.user.email === localStorage.getItem("email")
    ) {
      // set token used in protectedLoader function
      localStorage.setItem("token", crypto.randomUUID());
    } else {
      throw new PasswordError("Invalid login info");
    }
  } catch (error) {
    // Check if the error is a ZodError and extract the details
    if (error instanceof z.ZodError) {
      return {
        errors: error.errors,
      };
    }

    if (error instanceof PasswordError) {
      return {
        errors: [{ message: [error.message] }],
      };
    }

    // Handle other unexpected errors
    return {
      errors: [{ message: ["An unexpected error occurred"] }],
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/home");
}

export async function signupAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const signupFormData = Object.fromEntries(formData.entries());

  // Signup and redirect to the login page if successful.
  try {
    signupSchema.parse(signupFormData);
    const response = await api.post<{
      user: {
        password: string;
        email: string;
        fname: string;
      };
    }>("/signup", signupFormData);

    // Yikes! Save the plain text password in localstorage
    // 🤞🏻😱👀🙏🏾
    localStorage.setItem("password", response.data.user.password);
    localStorage.setItem("email", response.data.user.email);
    localStorage.setItem("name", response.data.user.fname);
    return redirect("/");
  } catch (error) {
    // Check if the error is a ZodError and extract the details
    if (error instanceof z.ZodError) {
      return {
        errors: error.errors,
      };
    }
    // Handle other unexpected errors
    return {
      errors: ["An unexpected error occurred"],
    };
  }
}

// Loader to protect routes by requiring authentication via token
export function protectedLoader({ request }: LoaderFunctionArgs) {
  if (!localStorage.getItem("token")) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/?" + params.toString());
  }
  return null;
}
