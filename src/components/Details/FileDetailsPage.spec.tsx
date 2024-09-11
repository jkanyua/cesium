import { render, screen, fireEvent } from "@testing-library/react";
import { FileDetailsPage } from "../Details/FileDetailsPage";
import { useRecords } from "../../hooks/useRecords";
import { vi, describe, it, expect, beforeEach } from "vitest";
import type { MockedFunction } from "vitest";

// Mock the RecordsContext
vi.mock("../../hooks/useRecords");

const mockUseRecords = useRecords as MockedFunction<typeof useRecords>;
const mockSetRecordsPerPage = vi.fn();
const mockSortRecords = vi.fn();

describe("FileDetailsPage", () => {
  beforeEach(() => {
    mockUseRecords.mockReturnValue({
      records: [
        {
          fileName: "test1.csv",
          uploadDate: "2023-01-01T00:00:00.000Z",
          startDate: "2023-01-01",
          endDate: "2023-01-31",
          dateType: "dd/mm/yyy",
        },
        {
          fileName: "test2.csv",
          uploadDate: "2023-02-01T00:00:00.000Z",
          startDate: "2023-02-01",
          endDate: "2023-02-28",
          dateType: "dd/mm/yyy",
        },
      ],
      sortRecords: mockSortRecords,
      currentPage: 1,
      setCurrentPage: vi.fn(),
      recordsPerPage: 10,
      setRecordsPerPage: mockSetRecordsPerPage,
      totalPages: 1,
      addRecord: vi.fn(),
    });
  });

  const renderComponent = () => render(<FileDetailsPage />);

  it("renders without crashing", () => {
    renderComponent();
    expect(screen.getByText("Uploaded File Records")).toBeInTheDocument();
  });

  it("displays the correct number of records", () => {
    renderComponent();
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // 2 data rows + 1 header row
  });

  it("allows changing records per page", () => {
    renderComponent();
    const select = screen.getByLabelText("Records per page:");
    fireEvent.change(select, { target: { value: "20" } });
    expect(mockSetRecordsPerPage).toHaveBeenCalledWith(20);
  });

  it("toggles sort order", () => {
    renderComponent();
    const select = screen.getByTestId("fileNameSort");

    fireEvent.click(select);
    expect(mockSortRecords).toHaveBeenCalledWith("fileName", "asc");

    fireEvent.click(select);
    expect(mockSortRecords).toHaveBeenCalledWith("fileName", "desc");
  });

  it("displays correct pagination information", () => {
    mockUseRecords.mockReturnValue({
      records: [
        {
          fileName: "test1.csv",
          uploadDate: "2023-01-01T00:00:00.000Z",
          startDate: "2023-01-01",
          endDate: "2023-01-31",
          dateType: "dd/mm/yyy",
        },
        {
          fileName: "test2.csv",
          uploadDate: "2023-02-01T00:00:00.000Z",
          startDate: "2023-02-01",
          endDate: "2023-02-28",
          dateType: "dd/mm/yyy",
        },
        {
          fileName: "test3.csv",
          uploadDate: "2023-02-01T00:00:00.000Z",
          startDate: "2023-02-01",
          endDate: "2023-02-28",
          dateType: "dd/mm/yyy",
        },
        {
          fileName: "test4.csv",
          uploadDate: "2023-02-01T00:00:00.000Z",
          startDate: "2023-02-01",
          endDate: "2023-02-28",
          dateType: "dd/mm/yyy",
        },
        {
          fileName: "test5.csv",
          uploadDate: "2023-02-01T00:00:00.000Z",
          startDate: "2023-02-01",
          endDate: "2023-02-28",
          dateType: "dd/mm/yyy",
        },
        {
          fileName: "test6.csv",
          uploadDate: "2023-02-01T00:00:00.000Z",
          startDate: "2023-02-01",
          endDate: "2023-02-28",
          dateType: "dd/mm/yyy",
        },
      ],
      sortRecords: mockSortRecords,
      currentPage: 1,
      setCurrentPage: vi.fn(),
      recordsPerPage: 5,
      setRecordsPerPage: mockSetRecordsPerPage,
      totalPages: 2,
      addRecord: vi.fn(),
    });
    renderComponent();
    expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();
  });
});
