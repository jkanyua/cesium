import { Upload } from "lucide-react";

export const Navigation = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className={"min-h-screen bg-gray-100 text-gray-900"}>
      <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
        <div className="text-xl font-bold">CSV Manager</div>
        {
          // TODO: Hide if not authenticated
        }
        <button
          className="px-3 py-2 rounded hover:bg-blue-700"
          onClick={() => {}}
        >
          <Upload className="inline-block mr-2 h-4 w-4" /> Upload
        </button>
      </nav>
      <main className="container mx-auto mt-8 p-4">
        {children}
        {
          // TODO: Add Outlet
        }
      </main>
    </div>
  );
};
