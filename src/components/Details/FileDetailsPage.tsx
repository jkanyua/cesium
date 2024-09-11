import { useRecords } from "../../hooks/useRecords";

export const FileDetailsPage = (): JSX.Element => {
  const { records } = useRecords();

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">File Records</h2>
      <p className="mb-4">View details of uploaded CSV records</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                File name
              </th>
              <th scope="col" className="px-6 py-3">
                Start date
              </th>
              <th scope="col" className="px-6 py-3">
                End date
              </th>
              <th scope="col" className="px-6 py-3">
                Upload date
              </th>
              <th scope="col" className="px-6 py-3">
                Date Type
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {record.fileName}
                  </th>
                  <td className="px-6 py-4">{record.startDate}</td>
                  <td className="px-6 py-4">{record.endDate}</td>
                  <td className="px-6 py-4">{record.uploadDate}</td>
                  <td className="px-6 py-4">{record.dateType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
