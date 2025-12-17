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
                  path="/users"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">
                        User & Role Management
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage users, roles, and permissions
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/products"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Product Management</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage products, categories, and pricing
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/warehouses"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">
                        Warehouse Management
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage warehouses and storage locations
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/stock"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Stock Management</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Track stock movements and inventory levels
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/suppliers"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">
                        Supplier Management
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage supplier information and relationships
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/purchases"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">
                        Purchase Management
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Handle purchase orders and goods receipt
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/sales"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Sales Management</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage sales orders and distribution
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/transfers"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">
                        Transfer Management
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Handle inter-warehouse transfers
                      </p>
                    </div>
                  }
                />
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
                  path="/notifications"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">
                        Notifications & Alerts
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        Manage system notifications and alerts
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/audit"
                  element={
                    <div className="p-6">
                      <h1 className="text-2xl font-bold">Audit & Logs</h1>
                      <p className="text-gray-600 dark:text-gray-400">
                        View audit trails and system logs
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
