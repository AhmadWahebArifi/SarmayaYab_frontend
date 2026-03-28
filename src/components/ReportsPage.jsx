import React, { useState, useEffect } from "react";
import { useDarkMode } from "../contexts/DarkModeProvider";
import Loader from "./Loader";

const ReportsPage = () => {
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Simulate loading reports data with 3-second delay
    const timer = setTimeout(() => {
      setReports([
        {
          id: 1,
          name: "Stock Summary Report",
          type: "Inventory",
          date: "2024-03-26",
        },
        {
          id: 2,
          name: "Request Analytics",
          type: "Analytics",
          date: "2024-03-26",
        },
        {
          id: 3,
          name: "Branch Performance",
          type: "Performance",
          date: "2024-03-25",
        },
      ]);
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader message="Loading Reports..." showBackground={false} />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View and generate inventory reports and analytics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 text-2xl">
                📊
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Reports
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {reports.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                📈
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generated Today
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                2
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <span className="text-purple-600 dark:text-purple-400 text-2xl">
                🎯
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Scheduled
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                5
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Reports
          </h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    {report.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {report.type} • {report.date}
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
