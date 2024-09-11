import { useContext } from "react";
import { RecordsContext } from "../contexts/RecordContext";

export const useRecords = () => {
  const context = useContext(RecordsContext);
  if (context === undefined) {
    throw new Error("useRecords must be used within a RecordsProvider");
  }
  return context;
};
