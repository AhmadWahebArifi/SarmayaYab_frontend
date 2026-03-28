import React from "react";

const Loader = ({
  message = "Initializing System...",
  showBackground = true,
  title = "SarmayaYab",
  subtitle = "Branch Inventory Management System",
}) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${
        showBackground ? "bg-surface/60 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      {/* Background Context (Mocked Screen Underlay) - only show if enabled */}
      {showBackground && (
        <div className="fixed inset-0 z-0 flex items-center justify-center opacity-40 grayscale pointer-events-none">
          <div className="w-full max-w-md p-10 bg-surface-container-lowest rounded-xl">
            <div className="h-8 w-32 bg-surface-container-highest mb-8"></div>
            <div className="space-y-4">
              <div className="h-12 bg-surface-container-highest w-full"></div>
              <div className="h-12 bg-surface-container-highest w-full"></div>
              <div className="h-12 bg-primary w-full mt-6"></div>
            </div>
          </div>
        </div>
      )}

      {/* Brand Identity Container */}
      <div className="flex flex-col items-center gap-12 text-center relative z-10">
        {/* Visual Anchor: Logo & Spinner */}
        <div className="relative flex items-center justify-center">
          {/* Precision Spinner */}
          <div className="absolute w-24 h-24 border-2 border-outline-variant/30 rounded-full"></div>
          <div className="absolute w-24 h-24 border-t-2 border-primary rounded-full animate-spin"></div>
          {/* Logo Inner Mark */}
          <div className="bg-primary-container w-16 h-16 rounded-lg flex items-center justify-center shadow-lg">
            <span
              className="material-symbols-outlined text-on-primary text-3xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              inventory_2
            </span>
          </div>
        </div>

        {/* Status Communication */}
        <div className="space-y-3">
          <h1 className="font-headline font-extrabold text-3xl tracking-tighter text-on-background">
            {title}
          </h1>
          <div className="flex flex-col items-center gap-4">
            {/* Progress Indicator */}
            <div className="w-48 h-1 bg-surface-container-highest overflow-hidden rounded-full">
              <div className="h-full bg-primary w-1/3 animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
            <p className="font-label text-sm font-medium tracking-widest text-on-surface-variant uppercase">
              {message}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Meta (Subtle) */}
      <div className="absolute bottom-12 flex items-center gap-2 text-on-primary-container font-label text-xs tracking-tight">
        <span className="material-symbols-outlined text-sm">shield</span>
        <span>Secure Authentication Protocol v4.2.0</span>
      </div>

      {/* Interactive Layering Background Effects */}
      <div className="fixed top-0 right-0 -z-10 w-1/2 h-1/2 bg-gradient-to-bl from-secondary-fixed/20 to-transparent blur-3xl"></div>
      <div className="fixed bottom-0 left-0 -z-10 w-1/2 h-1/2 bg-gradient-to-tr from-primary-fixed/10 to-transparent blur-3xl"></div>

      {/* Custom styles for animations */}
      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-spin {
          animation: spin 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
