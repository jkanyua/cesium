import { Upload, LogOut, CircleUser, Home } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Outlet, useNavigate, useRouteLoaderData } from "react-router-dom";

const subscribeToLocalStorage = (callback: () => void) => {
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("storage", callback);
  };
};

// Get the current login status from localStorage
const getSnapshot = () => localStorage.getItem("token") !== null;

export const Navigation = (): JSX.Element => {
  const { user } = useRouteLoaderData("root") as { user: string | null };
  const navigate = useNavigate();
  const isLoggedIn = useSyncExternalStore(subscribeToLocalStorage, getSnapshot);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <div className="text-xl font-bold">CSV Manager</div>
        {isLoggedIn && (
          <div className="flex text-xl font-bold gap-1">
            <CircleUser /> {user}
          </div>
        )}
        <div className="flex space-x-4">
          {isLoggedIn && (
            <>
              <button
                className="px-3 py-2 rounded hover:bg-blue-700"
                onClick={() => navigate("/home")}
              >
                <Home className="inline-block mr-2 h-4 w-4" /> Home
              </button>
              <button
                className="px-3 py-2 rounded hover:bg-blue-700"
                onClick={() => navigate("/upload")}
              >
                <Upload className="inline-block mr-2 h-4 w-4" /> Upload
              </button>

              <button
                className="px-3 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  localStorage.removeItem("name");
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              >
                <LogOut className="inline-block mr-2 h-4 w-4" /> LogOut
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="container mx-auto mt-8 p-4">
        <Outlet />
      </main>
    </div>
  );
};
