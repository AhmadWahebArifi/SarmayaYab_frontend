import React, { useState, Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { DarkModeProvider } from "./contexts/DarkModeProvider";
import { AuthProvider, useAuth } from "./contexts/AuthProvider";
import { LoaderProvider } from "./contexts/LoaderProvider";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import { preloadAllComponents } from "./utils/preloadUtils";
import "./i18n"; // Initialize i18n
import "./styles/direction.css"; // RTL/LTR direction styles

// Lazy load components
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));
const InventoryDashboard = lazy(
  () => import("./components/InventoryDashboard"),
);
const ProductCatalog = lazy(() => import("./components/ProductCatalog"));
const BranchManagement = lazy(() => import("./components/BranchManagement"));
const StockRequestsList = lazy(() => import("./components/StockRequestsList"));
const StockRequestForm = lazy(() => import("./components/StockRequestForm"));
const ReportsPage = lazy(() => import("./components/ReportsPage"));
const SettingsPage = lazy(() => import("./components/SettingsPage"));
const SupportPage = lazy(() => import("./components/SupportPage"));
const Login = lazy(() => import("./components/Login"));
const NotFound = lazy(() => import("./components/NotFound"));

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Start preloading components after initial mount
  useEffect(() => {
    preloadAllComponents();
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AuthProvider>
      <LoaderProvider>
        <DarkModeProvider>
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  <Suspense
                    fallback={<LoadingSpinner text="Loading login..." />}
                  >
                    <Login />
                  </Suspense>
                }
              />
              <Route
                path="/access-denied"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Access Denied</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      You don't have permission to access this page.
                    </p>
                  </div>
                }
              />
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

                      <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out main-content">
                        <header className="lg:hidden sticky top-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur border-b border-gray-200 dark:border-gray-700">
                          <div className="h-14 px-4 flex items-center">
                            <button
                              type="button"
                              onClick={toggleSidebar}
                              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 mobile-menu-toggle"
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
                          <Suspense
                            fallback={
                              <LoadingSpinner text="Loading dashboard..." />
                            }
                          >
                            <Routes>
                              <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                              />
                              <Route
                                path="/dashboard"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading dashboard..." />
                                    }
                                  >
                                    <InventoryDashboard />
                                  </Suspense>
                                }
                              />
                              <Route
                                path="/products"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading product catalog..." />
                                    }
                                  >
                                    <ProtectedRoute
                                      allowedRoles={[
                                        "admin",
                                        "warehouse_staff",
                                      ]}
                                    >
                                      <ProductCatalog />
                                    </ProtectedRoute>
                                  </Suspense>
                                }
                              />
                              <Route
                                path="/warehouses"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading branch management..." />
                                    }
                                  >
                                    <ProtectedRoute
                                      allowedRoles={[
                                        "admin",
                                        "warehouse_staff",
                                      ]}
                                    >
                                      <BranchManagement />
                                    </ProtectedRoute>
                                  </Suspense>
                                }
                              />
                              <Route
                                path="/stock"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading stock requests..." />
                                    }
                                  >
                                    <StockRequestsList />
                                  </Suspense>
                                }
                              />
                              <Route
                                path="/stock/new"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading request form..." />
                                    }
                                  >
                                    <StockRequestForm />
                                  </Suspense>
                                }
                              />
                              <Route
                                path="/reports"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading reports..." />
                                    }
                                  >
                                    <ReportsPage />
                                  </Suspense>
                                }
                              />
                              <Route
                                path="/settings"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading settings..." />
                                    }
                                  >
                                    <SettingsPage />
                                  </Suspense>
                                }
                              />
                              <Route
                                path="/support"
                                element={
                                  <Suspense
                                    fallback={
                                      <LoadingSpinner text="Loading support..." />
                                    }
                                  >
                                    <SupportPage />
                                  </Suspense>
                                }
                              />
                              <Route path="*" element={<NotFound />} />
                            </Routes>
                          </Suspense>
                        </main>
                      </div>
                    </div>
                  </RequireAuth>
                }
              />
            </Routes>
          </Router>
        </DarkModeProvider>
      </LoaderProvider>
    </AuthProvider>
  );
};

export default App;
