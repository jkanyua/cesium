import { AlertCircle } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { Form, useActionData, useLocation } from "react-router-dom";

export const Login = () => {
  const actionData = useActionData() as
    | { errors: { message: string }[] }
    | undefined;
  const [errorKey, setErrorKey] = useState(0);

  useEffect(() => {
    if (actionData && actionData.errors) {
      setErrorKey((prevKey) => prevKey + 1);
    }
  }, [actionData]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  return (
    <AuthContainer>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <p className="mb-4">Enter your credentials to access your account</p>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        {actionData && actionData.errors && (
          <div
            key={errorKey}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-10 rounded relative animate-fade-out"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <ul className="mt-2 list-disc list-inside">
              {actionData.errors.map((error, index) => (
                <li key={index} className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span>{error.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </Form>
    </AuthContainer>
  );
};

export const AuthContainer = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {children}
    </div>
  );
};
