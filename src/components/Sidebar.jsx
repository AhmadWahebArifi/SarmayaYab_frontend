import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: "dashboard",
      path: "/",
    },
    {
      name: "Product Management",
      icon: "inventory_2",
      path: "/products",
    },
    {
      name: "Branch Management",
      icon: "storefront",
      path: "/warehouses",
    },
    {
      name: "Stock Requests",
      icon: "assignment_return",
      path: "/stock",
    },
    {
      name: "Reports & Analytics",
      icon: "analytics",
      path: "/reports",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-slate-100 dark:bg-slate-900
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="mb-8 px-4 pt-4">
            <h1 className="font-headline font-black text-slate-900 dark:text-white text-2xl tracking-tighter">
              Precision Curator
            </h1>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">
              Global Inventory
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                  className={
                    isActive
                      ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm rounded-md flex items-center gap-3 px-3 py-2.5 font-body text-sm font-medium transition-all"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md flex items-center gap-3 px-3 py-2.5 font-body text-sm font-medium transition-all"
                  }
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* User section */}
          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-1 px-3 pb-4 mt-4">
            <Link
              to="/settings"
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
              className={
                location.pathname === "/settings"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm rounded-md flex items-center gap-3 px-3 py-2.5 font-body text-sm font-medium transition-all"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md flex items-center gap-3 px-3 py-2.5 font-body text-sm font-medium transition-all"
              }
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </Link>

            <a
              href="#"
              className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md flex items-center gap-3 px-3 py-2.5 font-body text-sm font-medium transition-all"
            >
              <span className="material-symbols-outlined">contact_support</span>
              <span>Support</span>
            </a>

            <div className="mt-4 flex items-center gap-3 px-3 py-2">
              <img
                alt="Warehouse Admin"
                className="w-8 h-8 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBI905f-BG3RukGPC7sDhSZwrwkDMaTHzAU1mXVMg1H417PNx4VHzsIX4YaDz186YJQiwNewD7Ab6AGki4b12idzRHJFxbxljr7BBbTZ13Di6vaZLK3DOFQfTFUPifUTAJFXLSRm1quTeMdgD-gMXV-UOwDlbbNASTH8_8iRV97lIm-npQaibPZivUvEubjzQW4m_bRnkwSgHTzlx5mSD91RXbHaHYGHnfTGQ3FazwI-T932gnd8JS_2OrGZ4KZWBypmCt4BdoEYTHy"
              />
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  Admin User
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  Warehouse Lead
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
