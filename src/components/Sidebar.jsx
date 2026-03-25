import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeProvider";
import { useAuth } from "../contexts/AuthProvider";
import {
  Home,
  Inventory,
  Warehouse,
  RequestQuote,
  Assessment,
  Settings,
  Support,
  Menu,
  Close,
  Person,
} from "@mui/icons-material";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { isDarkMode } = useDarkMode();
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/products", icon: Inventory, label: "Product Catalog" },
    { path: "/warehouses", icon: Warehouse, label: "Branch Management" },
    { path: "/stock", icon: RequestQuote, label: "Stock Requests" },
    { path: "/reports", icon: Assessment, label: "Reports" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">
              SarmayaYab
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isOpen ? (
              <Close className="w-5 h-5 text-gray-500" />
            ) : (
              <Menu className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar();
                  }
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link
            to="/support"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive("/support")
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => {
              if (window.innerWidth < 1024) {
                toggleSidebar();
              }
            }}
          >
            <Support className="w-5 h-5" />
            <span className="font-medium">Support</span>
          </Link>

          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Person className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.role || "Unknown"}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-2 w-full text-xs text-left text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
