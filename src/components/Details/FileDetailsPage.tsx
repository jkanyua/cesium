import { useState } from "react";
import { SortField } from "../../contexts/RecordContext";
import { useRecords } from "../../hooks/useRecords";
import {
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const FileDetailsPage = (): JSX.Element => {
  const {
    records,
    sortRecords,
    currentPage,
    setCurrentPage,
    recordsPerPage,
    setRecordsPerPage,
    totalPages,
  } = useRecords();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const handleSort = (field: SortField) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortRecords(field, newOrder);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Uploaded File Records</h1>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="recordsPerPage" className="mr-2">
              Records per page:
            </label>
            <select
              id="recordsPerPage"
              value={recordsPerPage}
              onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">
                  File Name
                  <button
                    data-testid="fileNameSort"
                    onClick={() => handleSort("fileName")}
                    className="ml-2"
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </th>
                <th className="py-2 px-4 border-b">
                  Upload Date
                  <button
                    onClick={() => handleSort("uploadDate")}
                    className="ml-2"
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </th>
                <th className="py-2 px-4 border-b">
                  Start Date
                  <button
                    onClick={() => handleSort("startDate")}
                    className="ml-2"
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </th>
                <th className="py-2 px-4 border-b">
                  End Date
                  <button
                    onClick={() => handleSort("endDate")}
                    className="ml-2"
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </th>
                <th className="py-2 px-4 border-b">
                  Date Type
                  <button
                    onClick={() => handleSort("dateType")}
                    className="ml-2"
                  >
                    <ArrowUpDown size={16} />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 border-b">{record.fileName}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(record.uploadDate).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border-b">{record.startDate}</td>
                  <td className="py-2 px-4 border-b">{record.endDate}</td>
                  <td className="py-2 px-4 border-b">{record.dateType}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded"
              >
                <ChevronsLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-2 py-1 border rounded"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="px-2 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                data-testid="nextPage"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded"
              >
                <ChevronRight size={16} />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-2 py-1 border rounded"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
