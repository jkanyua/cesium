import { LoaderFunctionArgs, redirect } from "react-router-dom";

import { z } from "zod";

import "../api/mock";
import api from "../api";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // Validate email format
  password: z.string().min(6, "Password must be at least 6 characters long"), // Ensure password has a minimum length
});

export async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const creds = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Sign in and redirect to the home if successful.
  try {
    loginSchema.parse(creds);
    const response = await api.post<{
      user: { token: string; firstName: string };
    }>("/login", creds);
    localStorage.setItem("token", response.data.user.token);
    localStorage.setItem("name", response.data.user.firstName);
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

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/home");
}

export function protectedLoader({ request }: LoaderFunctionArgs) {
  if (!localStorage.getItem("token")) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/?" + params.toString());
  }
  return null;
}
