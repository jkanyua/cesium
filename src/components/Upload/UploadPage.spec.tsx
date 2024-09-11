import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UploadPage } from "./UploadPage";
import { vi } from "vitest";

// Mock the useRecords hook
vi.mock("../../hooks/useRecords", () => ({
  useRecords: () => ({
    addRecord: vi.fn(),
  }),
}));

// Mock the Axios instance created in api
vi.mock("../../api", () => ({
  default: {
    post: vi.fn().mockResolvedValue({ data: {} }), // Mock 'post' as a resolved promise
  },
}));

describe("UploadPage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the upload page form", () => {
    render(<UploadPage />);

    expect(screen.getByText("Upload CSV/XLSX")).toBeInTheDocument();
    expect(screen.getByLabelText("Start Date")).toBeInTheDocument();
    expect(screen.getByLabelText("End Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Date Type")).toBeInTheDocument();
    expect(screen.getByText(/Click to upload/)).toBeInTheDocument();
  });

  it("shows an error message when no file is selected on upload", async () => {
    render(<UploadPage />);

    fireEvent.click(screen.getByText("Upload"));

    await waitFor(() => {
      expect(screen.getByText("Please select a file")).toBeInTheDocument();
    });
  });

  it("allows a user to select a valid CSV file", () => {
    render(<UploadPage />);

    const file = new File(["content"], "sample.csv", { type: "text/csv" });
    const input = screen.getByTestId("upload-file");

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText("Selected file: sample.csv")).toBeInTheDocument();
  });

  it("displays error when an invalid file type is selected", async () => {
    render(<UploadPage />);
    // Set date inputs
    fireEvent.change(screen.getByLabelText("Start Date"), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText("End Date"), {
      target: { value: "2024-12-31" },
    });

    const invalidFile = new File(["content"], "sample.txt", {
      type: "text/plain",
    });
    const input = screen.getByTestId("upload-file");

    fireEvent.change(input, { target: { files: [invalidFile] } });

    fireEvent.click(screen.getByText("Upload"));

    await waitFor(() => {
      expect(
        screen.getByText("Only CSV or XLSX files are allowed")
      ).toBeInTheDocument();
    });
  });
});
