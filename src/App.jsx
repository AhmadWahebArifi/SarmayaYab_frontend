import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeContext";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Set initial state based on screen size
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on window resize to desktop if it was closed
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <DarkModeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <div
            className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
              sidebarOpen ? "lg:ml-0" : "lg:ml-0"
            }`}
          >
            <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={sidebarOpen} />

            <main className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route
                  path="/analytics"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Analytics</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Analytics page content goes here
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/portfolio"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Portfolio</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Portfolio page content goes here
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Transactions</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Transactions page content goes here
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Settings</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Settings page content goes here
                      </p>
                    </div>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
