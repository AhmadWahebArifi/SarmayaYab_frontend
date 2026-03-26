import React, { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import { useLoader } from "../contexts/LoaderProvider";

const Login = () => {
  const { user, login } = useAuth();
  const { showLoader, hideLoader } = useLoader();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || "/dashboard";

  if (user) {
    return <Navigate to={from} replace />;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    showLoader("Authenticating with SarmayaYab...", true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your email/password.";
      setError(message);
    } finally {
      hideLoader();
    }
  };

  return (
    <div
      className="bg-surface font-body text-on-surface antialiased min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "radial-gradient(circle, #e0e3e5 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Login Container */}
      <main className="w-full max-w-[440px]">
        {/* Brand Identity Header */}
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center justify-center w-14 h-14 bg-primary rounded-xl mb-4"
            style={{
              background: "linear-gradient(135deg, #000000 0%, #111c2d 100%)",
            }}
          >
            <span
              className="material-symbols-outlined text-white text-3xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              account_balance_wallet
            </span>
          </div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface">
            SarmayaYab
          </h1>
          <p className="font-label text-sm text-on-surface-variant tracking-wide mt-2 uppercase">
            Branch Inventory Management System
          </p>
        </div>

        {/* Login Card */}
        <section className="bg-surface-container-lowest p-8 md:p-10 rounded-xl border border-outline-variant/20">
          <header className="mb-8">
            <h2 className="font-headline text-xl font-bold text-on-surface mb-1">
              Welcome back
            </h2>
            <p className="text-on-surface-variant text-sm">
              Enter your credentials to access the inventory system.
            </p>
          </header>

          {error ? (
            <div className="mb-6 text-sm text-on-error bg-error-container border border-error rounded-lg p-3">
              {error}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">
                    mail
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-3 bg-surface-container-highest border-none rounded-sm text-on-surface focus:ring-0 focus:bg-surface-container-high placeholder-outline/50 transition-colors duration-200"
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="text-xs font-semibold text-primary hover:text-on-primary-container transition-colors"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline text-lg">
                    lock
                  </span>
                </div>
                <input
                  className="block w-full pl-10 pr-3 py-3 bg-surface-container-highest border-none rounded-sm text-on-surface focus:ring-0 focus:bg-surface-container-high placeholder-outline/50 transition-colors duration-200"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                className="h-4 w-4 text-primary border-outline-variant rounded focus:ring-0"
                id="remember-me"
                name="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <label
                className="ml-2 block text-sm text-on-surface-variant font-medium"
                htmlFor="remember-me"
              >
                Remember this device for 30 days
              </label>
            </div>

            {/* Action Button */}
            <button
              className="w-full py-4 px-6 text-on-primary font-headline font-bold rounded-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              type="submit"
              style={{
                background: "linear-gradient(135deg, #000000 0%, #111c2d 100%)",
              }}
            >
              Sign In
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Secondary Action */}
          <footer className="mt-8 pt-8 border-t border-outline-variant/10 text-center">
            <p className="text-sm text-on-surface-variant">
              Need technical assistance?{" "}
              <a
                className="font-semibold text-primary hover:underline"
                href="#"
              >
                Contact Support
              </a>
            </p>
          </footer>
        </section>

        {/* Compliance/Security Footer */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 px-2">
          <div className="flex items-center gap-2 opacity-60">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
            >
              verified_user
            </span>
            <span className="text-[10px] font-label font-bold uppercase tracking-[0.2em]">
              AES-256 Encrypted Connection
            </span>
          </div>
          <nav className="flex gap-4 text-[10px] font-label font-bold uppercase tracking-[0.1em] text-on-surface-variant/60">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Security
            </a>
          </nav>
        </div>
      </main>

      {/* Decorative Bottom-Right Graphic */}
      <div className="fixed bottom-0 right-0 p-12 opacity-5 pointer-events-none hidden lg:block">
        <span className="material-symbols-outlined text-[320px]">
          grid_view
        </span>
      </div>
    </div>
  );
};

export default Login;
