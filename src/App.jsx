import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeProvider";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import Sidebar from "./components/Sidebar";
import AdminDashboard from "./components/AdminDashboard";
import ProductCatalog from "./components/ProductCatalog";
import BranchManagement from "./components/BranchManagement";
import StockRequests from "./components/StockRequests";
import Login from "./components/Login";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AuthProvider>
      <DarkModeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <RequireAuth>
                  <div className="min-h-screen bg-surface flex">
                    <Sidebar
                      isOpen={sidebarOpen}
                      toggleSidebar={toggleSidebar}
                      closeSidebar={closeSidebar}
                    />

                    <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out lg:ml-64">
                      <header className="lg:hidden sticky top-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
                        <div className="h-14 px-4 flex items-center">
                          <button
                            type="button"
                            onClick={toggleSidebar}
                            className="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                            aria-label="Open sidebar"
                          >
                            <span className="material-symbols-outlined">
                              menu
                            </span>
                          </button>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            SarmayaYab
                          </span>
                        </div>
                      </header>

                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<AdminDashboard />} />
                          <Route
                            path="/products"
                            element={<ProductCatalog />}
                          />
                          <Route
                            path="/warehouses"
                            element={<BranchManagement />}
                          />
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
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
