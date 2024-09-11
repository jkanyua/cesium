import { Form, useActionData, useNavigate } from "react-router-dom";
import { AuthContainer } from "./LoginPage";
import { AlertCircle } from "lucide-react";

// Reusable InputField component
const InputField = ({
  label,
  name,
  type = "text",
  placeholder,
  errorMessage,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  errorMessage?: string;
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 mb-2 mt-2 rounded relative"
          role="alert"
        >
          <ul className="list-disc list-inside">
            <li className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>{errorMessage}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export const SignupPage = () => {
  const navigate = useNavigate();
  const actionData = useActionData() as
    | { errors: { message: string; path: [string] }[] }
    | undefined;

  const getErrorForField = (fieldName: string) => {
    return actionData?.errors?.find((error) => error?.path?.includes(fieldName))
      ?.message;
  };

  return (
    <AuthContainer>
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <p className="mb-4">Create a new account</p>
      <Form method="post" replace>
        <InputField
          label="First Name"
          name="fname"
          placeholder="Enter your first name"
          errorMessage={getErrorForField("fname")}
        />
        <InputField
          label="Last Name"
          name="lname"
          placeholder="Enter your last name"
          errorMessage={getErrorForField("lname")}
        />
        <InputField
          label="Phone Number"
          name="phone"
          type="number"
          placeholder="Enter your phone number"
          errorMessage={getErrorForField("phone")}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="Enter your email"
          errorMessage={getErrorForField("email")}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          errorMessage={getErrorForField("password")}
        />
        <InputField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          errorMessage={getErrorForField("confirmPassword")}
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
            onClick={() => navigate("/")}
          >
            Back to Login
          </button>
        </div>
      </Form>
    </AuthContainer>
  );
};
