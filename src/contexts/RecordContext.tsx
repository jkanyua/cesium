import React, { createContext, useState, useEffect } from "react";

interface UploadRecord {
  fileName: string;
  uploadDate: string;
  startDate: string;
  endDate: string;
  dateType: string;
}

interface RecordsContextType {
  records: UploadRecord[];
  addRecord: (record: UploadRecord) => void;
}

export const RecordsContext = createContext<RecordsContextType | undefined>(
  undefined
);

export const RecordsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [records, setRecords] = useState<UploadRecord[]>([]);

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

  return (
    <RecordsContext.Provider value={{ records, addRecord }}>
      {children}
    </RecordsContext.Provider>
  );
};
