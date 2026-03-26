import React, { useState, useEffect } from "react";
import { useDarkMode } from "../contexts/DarkModeProvider";
import Loader from "./Loader";

const SupportPage = () => {
  const { darkMode } = useDarkMode();
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Simulate loading support data
    const timer = setTimeout(() => {
      setTickets([
        {
          id: 1,
          subject: "Stock Request Issue",
          status: "Open",
          priority: "High",
          date: "2024-03-26",
        },
        {
          id: 2,
          subject: "Product Catalog Question",
          status: "Resolved",
          priority: "Medium",
          date: "2024-03-25",
        },
        {
          id: 3,
          subject: "Branch Access Problem",
          status: "In Progress",
          priority: "High",
          date: "2024-03-24",
        },
      ]);
      setLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader message="Loading Support..." showBackground={false} />;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Support Center
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Get help with your inventory management system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <span className="text-red-600 dark:text-red-400 text-2xl">
                🎯
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Open Tickets
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <span className="text-yellow-600 dark:text-yellow-400 text-2xl">
                ⏳
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                In Progress
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <span className="text-green-600 dark:text-green-400 text-2xl">
                ✅
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Resolved
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                1
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 text-2xl">
                📊
              </span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Tickets
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {tickets.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Tickets
            </h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Create New Ticket
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      {ticket.subject}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === "Open"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : ticket.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {ticket.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        ticket.priority === "High"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          : ticket.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Created on {ticket.date}
                  </p>
                </div>
                <button className="px-3 py-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Help
          </h3>
          <div className="space-y-3">
            <a
              href="#"
              className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                📚 User Guide
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Complete documentation for all features
              </p>
            </a>
            <a
              href="#"
              className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                🎥 Video Tutorials
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Step-by-step video guides
              </p>
            </a>
            <a
              href="#"
              className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                ❓ FAQ
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Frequently asked questions
              </p>
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Support
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <span className="text-blue-600 dark:text-blue-400">📧</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Email Support
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  support@sarmayayab.com
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                <span className="text-green-600 dark:text-green-400">📞</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Phone Support
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <span className="text-purple-600 dark:text-purple-400">💬</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Live Chat
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Available 9AM-5PM EST
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
