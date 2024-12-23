import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import type { RootState } from "../store";
import { AltametricsLogo } from "./AltametricsLogo";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1
            className="text-2xl flex flex-row items-center gap-2 font-semibold text-gray-800 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <AltametricsLogo />
            Invoice Dashboard
          </h1>
          <nav>
            {isAuthenticated ? (
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 border-b-2 transition-colors ${
                    location.pathname === "/"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => navigate("/")}
                >
                  Home
                </button>
                <button
                  className={`px-4 py-2 border-b-2 transition-colors ${
                    location.pathname === "/invoices"
                      ? "border-blue-500 text-gray-900"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                  onClick={() => navigate("/invoices")}
                >
                  Invoices
                </button>
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
