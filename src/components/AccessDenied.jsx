import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body text-on-surface antialiased overflow-hidden min-h-screen relative">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md transition-all duration-200 ease-in-out">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tighter text-slate-950 dark:text-slate-50 font-headline">SarmayaYab</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a 
            onClick={() => navigate('/dashboard')}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-headline font-bold tracking-tight cursor-pointer"
          >
            Dashboard
          </a>
          <a 
            onClick={() => navigate('/products')}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-headline font-bold tracking-tight cursor-pointer"
          >
            Inventory
          </a>
          <a 
            onClick={() => navigate('/reports')}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-headline font-bold tracking-tight cursor-pointer"
          >
            Reports
          </a>
          <a 
            onClick={() => navigate('/settings')}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors font-headline font-bold tracking-tight cursor-pointer"
          >
            Settings
          </a>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-md transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined text-slate-950 dark:text-slate-50" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              notifications
            </span>
          </button>
          <button className="p-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-md transition-all duration-200 ease-in-out">
            <span className="material-symbols-outlined text-slate-950 dark:text-slate-50" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
              help_outline
            </span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/20">
            <div className="w-full h-full bg-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-sm">person</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden pt-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[60%] bg-surface-container-low rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-surface-container-high rounded-full blur-[100px] opacity-30 pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-12 gap-0 overflow-hidden rounded-xl shadow-[0px_12px_32px_rgba(25,28,30,0.06)] bg-surface-container-lowest">
          {/* Visual Anchor Panel */}
          <div className="md:col-span-5 relative min-h-[300px] md:min-h-[500px] overflow-hidden flex flex-col justify-end p-8">
            <div className="absolute inset-0 z-0">
              <div className="w-full h-full bg-gradient-to-br from-primary to-primary-container opacity-90"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-surface-container-lowest/10 backdrop-blur-md flex items-center justify-center border border-white/10">
                  <span 
                    className="material-symbols-outlined text-white text-3xl" 
                    style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
                  >
                    lock
                  </span>
                </div>
                <span className="text-white/60 font-headline font-bold uppercase tracking-widest text-[10px]">Access Control</span>
              </div>
              <h2 className="text-white font-headline text-4xl font-extrabold tracking-tighter leading-none mb-2">Unauthorized Entry</h2>
              <p className="text-white/70 text-sm max-w-xs font-body leading-relaxed">System protocols have restricted this node. Verified credentials required for inventory access.</p>
            </div>
          </div>

          {/* Content Panel */}
          <div className="md:col-span-7 p-8 md:p-16 flex flex-col justify-center bg-surface-container-lowest">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container text-on-error-container mb-6">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                  security
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase font-label">Error Code: 403_RESTRICTED</span>
              </div>
              <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tighter mb-4 leading-tight">Access Denied.</h1>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed">
                You do not have the required permissions to view this section. This area is reserved for administrative-level clearance within <span className="text-primary font-semibold">SarmayaYab</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-on-primary px-8 py-4 rounded-md font-headline font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary-container/20"
                style={{ background: 'linear-gradient(135deg, #000000 0%, #111c2d 100%)' }}
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                  dashboard
                </span>
                Return to Dashboard
              </button>
              <button
                onClick={() => navigate('/help')}
                className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant px-8 py-4 rounded-md font-headline font-bold flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                  contact_support
                </span>
                Contact Administrator
              </button>
            </div>

            {/* Subtle Informational Footer */}
            <div className="mt-16 pt-8 border-t border-outline-variant/10">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-on-surface-variant/40" style={{ fontVariationSettings: "'FILL' 0, 'wght' 300" }}>
                  info
                </span>
                <p className="text-[11px] text-on-surface-variant/60 font-body uppercase tracking-wider leading-relaxed">
                  If you believe this is an error, please verify your session token or consult the organizational hierarchy settings in the primary terminal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccessDenied;
