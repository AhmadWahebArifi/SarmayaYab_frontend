import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeProvider";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./components/AdminDashboard";
import ProductCatalog from "./components/ProductCatalog";
import BranchManagement from "./components/BranchManagement";
import StockRequests from "./components/StockRequests";

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
        <div className="min-h-screen bg-surface flex">
          <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

          <div
            className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
              sidebarOpen ? "lg:ml-0" : "lg:ml-0"
            }`}
          >
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/products" element={<ProductCatalog />} />
                <Route path="/warehouses" element={<BranchManagement />} />
                <Route path="/stock" element={<StockRequests />} />
                <Route
                  path="/reports"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">
                        Reports & Analytics
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        View reports and analytics
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
                        System configuration and settings
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
