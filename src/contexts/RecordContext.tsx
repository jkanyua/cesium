import React, { createContext, useState, useEffect } from "react";

interface UploadRecord {
  fileName: string;
  uploadDate: string;
  startDate: string;
  endDate: string;
  dateType: string;
}

export type SortField = keyof UploadRecord;
type SortOrder = "asc" | "desc";

interface RecordsContextType {
  records: UploadRecord[];
  addRecord: (record: UploadRecord) => void;
  sortRecords: (field: SortField, order: SortOrder) => void;
  currentPage: number;
  setCurrentPage: (page: React.SetStateAction<number>) => void;
  recordsPerPage: number;
  setRecordsPerPage: (count: number) => void;
  totalPages: number;
}

export const RecordsContext = createContext<RecordsContextType | undefined>(
  undefined
);

export const RecordsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [records, setRecords] = useState<UploadRecord[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  useEffect(() => {
    const storedRecords = localStorage.getItem("uploadRecords");
    if (storedRecords) {
      setRecords(JSON.parse(storedRecords));
    }
  }, []);

  const addRecord = (record: UploadRecord) => {
    const newRecords = [...records, record];
    setRecords(newRecords);
    localStorage.setItem("uploadRecords", JSON.stringify(newRecords));
  };

  const sortRecords = (field: SortField, order: SortOrder) => {
    const sortedRecords = [...records].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
    setRecords(sortedRecords);
  };

  const totalPages = Math.ceil(records.length / recordsPerPage);

  const contextValue: RecordsContextType = {
    records: records.slice(
      (currentPage - 1) * recordsPerPage,
      currentPage * recordsPerPage
    ),
    addRecord,
    sortRecords,
    currentPage,
    setCurrentPage,
    recordsPerPage,
    setRecordsPerPage,
    totalPages,
  };

  return (
    <RecordsContext.Provider value={contextValue}>
      {children}
    </RecordsContext.Provider>
  );
};
