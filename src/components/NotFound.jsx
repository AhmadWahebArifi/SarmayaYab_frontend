import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-hidden min-h-screen relative">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50" style={{ backgroundColor: 'rgba(247, 249, 251, 0.8)', backdropFilter: 'blur(12px)' }}>
        <div className="flex justify-between items-center w-full px-8 h-16">
          <div className="flex items-center gap-2">
            <span className="text-xl font-headline font-extrabold tracking-tighter text-on-surface">SarmayaYab</span>
          </div>
          <div className="flex items-center gap-6">
            <a className="text-sm font-label font-medium text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              Help Center
            </a>
            <a className="text-sm font-label font-medium text-on-surface-variant hover:text-on-surface transition-colors" href="#">
              System Status
            </a>
          </div>
        </div>
      </header>

      <main className="relative h-screen flex items-center justify-center px-6">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary-container/20 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-container/10 rounded-full blur-[120px]"></div>
        </div>

        {/* Central 404 Canvas */}
        <div className="relative z-10 w-full max-w-4xl text-center">
          {/* Large Subtle 404 Indicator */}
          <div className="relative mb-[-4rem] md:mb-[-8rem]">
            <h1 
              className="font-headline font-extrabold text-[12rem] md:text-[24rem] leading-none tracking-tighter select-none"
              style={{ color: 'transparent', WebkitTextStroke: '1px rgba(25, 28, 30, 0.08)' }}
            >
              404
            </h1>
          </div>

          {/* Content Module */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-1 bg-primary mb-12 rounded-full"></div>
            <h2 className="font-headline font-bold text-3xl md:text-5xl tracking-tight text-on-surface mb-6">
              The page you're looking for doesn't exist
            </h2>
            <p className="font-body text-lg text-on-surface-variant max-w-xl mx-auto mb-10 leading-relaxed">
              The inventory path you requested has been moved, archived, or never existed in the current system. Please verify the URL or return to the main workspace.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-on-primary px-8 py-4 rounded-md font-label font-semibold text-sm tracking-wide shadow-xl shadow-primary/10 hover:opacity-90 transition-all flex items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #000000 0%, #111c2d 100%)' }}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                  dashboard
                </span>
                Return to Dashboard
              </button>
              <button 
                onClick={() => navigate('/inventory')}
                className="bg-surface-container-highest text-on-surface px-8 py-4 rounded-md font-label font-semibold text-sm tracking-wide hover:bg-surface-container-high transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}>
                  search
                </span>
                Search Inventory
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Graphic / Subtle Branding Anchor */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-50">
          <div className="h-[1px] w-12 bg-outline-variant/30"></div>
          <span className="font-label text-xs uppercase tracking-[0.2em] text-outline">SarmayaYab Branch Inventory Management</span>
          <div className="h-[1px] w-12 bg-outline-variant/30"></div>
        </div>
      </main>

      {/* Visual Accent Element */}
      <div className="fixed right-0 top-0 bottom-0 w-24 border-l border-outline-variant/10 hidden lg:flex flex-col justify-center items-center pointer-events-none">
        <div className="rotate-90 origin-center whitespace-nowrap">
          <span className="font-label text-[10px] text-outline tracking-[0.4em] uppercase">
            Error Code: ERR_OBJECT_NOT_FOUND_IN_INVENTORY
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
