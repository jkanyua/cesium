import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import { Navigation } from "./components/Navigation/Navigation";
import { loginAction, protectedLoader } from "./route-utils";
import { Login } from "./components/Auth/LoginPage";
import { HomePage } from "./components/Home/HomePage";

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
        path: "home",
        loader: protectedLoader,
        Component: HomePage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      return redirect("/");
    },
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
