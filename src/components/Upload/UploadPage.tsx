import React, { useReducer, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { z } from "zod";

import api from "../../api";
import { UploadSuccess } from "./UploadSuccess";
import { useRecords } from "../../hooks/useRecords";

// Zod schema for file validation
const fileSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .refine(
      (file) =>
        [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
        ].includes(file.type),
      "Only CSV or XLSX files are allowed"
    ),
});

// Zod schema for form validation
const formSchema = z.object({
  startDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid start date"),
  endDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid end date"),
  dateType: z.enum(["yyyy-mm-dd", "mm/dd/yyyy", "dd.mm.yyyy"]),
});

// Zod schema for the entire upload process
const uploadSchema = formSchema.extend({
  file: fileSchema.shape.file,
});

interface State {
  startDate: string;
  endDate: string;
  dateType: string;
  file: File | null;
  error: string;
  isUploading: boolean;
  uploadSuccess: boolean;
}

// Define action types
type Action =
  | { type: "SET_START_DATE"; payload: string }
  | { type: "SET_END_DATE"; payload: string }
  | { type: "SET_DATE_TYPE"; payload: string }
  | { type: "SET_FILE"; payload: File }
  | { type: "SET_ERROR"; payload: string }
  | { type: "SET_IS_UPLOADING"; payload: boolean }
  | { type: "SET_UPLOAD_SUCCESS"; payload: boolean }
  | { type: "RESET_FORM" };

// Define the reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_DATE_TYPE":
      return { ...state, dateType: action.payload };
    case "SET_FILE":
      return { ...state, file: action.payload, error: "" };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_IS_UPLOADING":
      return { ...state, isUploading: action.payload };
    case "SET_UPLOAD_SUCCESS":
      return { ...state, uploadSuccess: action.payload };
    case "RESET_FORM":
      return { ...initialState };
    default:
      return state;
  }
};

// Initial state
const initialState: State = {
  startDate: "",
  endDate: "",
  dateType: "mm/dd/yyyy",
  file: null,
  error: "",
  isUploading: false,
  uploadSuccess: false,
};

export const UploadPage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { addRecord } = useRecords();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      dispatch({ type: "SET_FILE", payload: selectedFile });
    }
  };

  const handleUpload = async () => {
    if (!state.file) {
      dispatch({ type: "SET_ERROR", payload: "Please select a file" });
      return;
    }

    try {
      uploadSchema.parse({
        file: state.file,
        startDate: state.startDate,
        endDate: state.endDate,
        dateType: state.dateType,
      });
      dispatch({ type: "SET_IS_UPLOADING", payload: true });

      // Simulating file upload and processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await api.post("/api/upload", {
        file: state.file,
        startDate: state.startDate,
        endDate: state.endDate,
        dateType: state.dateType,
      });

      // Store the record
      addRecord({
        fileName: state.file.name,
        uploadDate: new Date().toISOString(),
        startDate: state.startDate,
        endDate: state.endDate,
        dateType: state.dateType,
      });

      dispatch({ type: "SET_UPLOAD_SUCCESS", payload: true });
      dispatch({ type: "SET_IS_UPLOADING", payload: false });
    } catch (err) {
      if (err instanceof z.ZodError) {
        dispatch({ type: "SET_ERROR", payload: err.errors[0].message });
      } else {
        dispatch({
          type: "SET_ERROR",
          payload: "An error occurred during upload.",
        });
      }
      dispatch({ type: "SET_IS_UPLOADING", payload: false });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Upload CSV/XLSX</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="startDate"
        >
          Start Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="startDate"
          type="date"
          value={state.startDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_START_DATE", payload: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="endDate"
        >
          End Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="endDate"
          type="date"
          value={state.endDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            dispatch({ type: "SET_END_DATE", payload: e.target.value })
          }
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dateType"
        >
          Date Type
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="dateType"
          value={state.dateType}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            dispatch({
              type: "SET_DATE_TYPE",
              payload: e.target.value,
            })
          }
        >
          {
            // Comment: Not sure what meant by "Date Type (dropdown)"
            // adding date format values for now
          }
          <option value="yyyy-mm-dd" selected>
            yyyy-mm-dd
          </option>
          <option value="mm/dd/yyyy">mm/dd/yyyy</option>
          <option value="dd.mm.yyyy">dd.mm.yyyy</option>
        </select>
      </div>
      <div className="flex items-center justify-center w-full mb-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              (only CSV or XLSX files allowed) and file size (max 5MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      {state.file && <p className="mb-4">Selected file: {state.file.name}</p>}
      {state.error && <p className="text-red-500 mb-4">{state.error}</p>}
      {state.uploadSuccess && <UploadSuccess />}
      <button
        className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${state.isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
        type="button"
        onClick={handleUpload}
        disabled={state.isUploading}
      >
        {state.isUploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};
