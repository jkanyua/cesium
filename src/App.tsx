import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { loginAction, protectedLoader, signupAction } from "./route-utils";
import { Login } from "./components/Auth/LoginPage";
import { HomePage } from "./components/Home/HomePage";
import { SignupPage } from "./components/Auth/SignupPage";
import { UploadPage } from "./components/Upload/UploadPage";
import { FileDetailsPage } from "./components/Details/FileDetailsPage";
import { RecordsProvider } from "./contexts/RecordContext";

const NotFoundPage = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
    <p className="mb-4">The page you are looking for does not exist.</p>
    <a href="/home" className="text-blue-500 hover:underline">
      Go back to Home
    </a>
  </div>
);

function clearLocalStorage(): void {
  localStorage.removeItem("token");
}

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      return { user: localStorage.getItem("name") };
    },
    Component: Navigation,
    children: [
      {
        index: true,
        action: loginAction,
        loader: () => {
          if (localStorage.getItem("token")) {
            return redirect("home");
          }
          return null;
        },
        Component: Login,
      },
      {
        path: "signup",
        action: signupAction,
        loader: () => {
          if (localStorage.getItem("token")) {
            return redirect("home");
          }
          return null;
        },
        Component: SignupPage,
      },
      {
        path: "home",
        loader: protectedLoader,
        Component: HomePage,
      },
      {
        path: "upload",
        loader: protectedLoader,
        Component: UploadPage,
      },
      {
        path: "records",
        loader: protectedLoader,
        Component: FileDetailsPage,
      },
      {
        path: "logout",
        async loader() {
          clearLocalStorage();
          return redirect("/");
        },
      },
      // Catch-all route for unsupported paths (404 page)
      {
        path: "*",
        Component: NotFoundPage,
      },
    ],
  },
]);

function App() {
  return (
    <RecordsProvider>
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </RecordsProvider>
  );
}

export default App;
