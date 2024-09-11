import { CheckCircle, FileText, Plus } from "lucide-react";

export const UploadSuccess: React.FC = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <CheckCircle className="text-green-500 mr-2" size={24} />
        <p className="text-green-700 font-semibold text-lg">
          File uploaded successfully!
        </p>
      </div>
      <div className="space-y-4">
        <a
          href="/records"
          className="flex items-center justify-start w-full px-4 py-2 text-blue-600 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors duration-200"
        >
          <FileText className="mr-2" size={18} />
          View uploaded file records
        </a>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-green-50 text-gray-500">Or</span>
          </div>
        </div>
        <a
          href="/upload"
          className="flex items-center justify-start w-full px-4 py-2 text-blue-600 bg-white border border-blue-300 rounded hover:bg-blue-50 transition-colors duration-200"
        >
          <Plus className="mr-2" size={18} />
          Add another file record
        </a>
      </div>
    </div>
  );
};
