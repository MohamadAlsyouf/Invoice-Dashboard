import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import type { RootState } from "../store";

export function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1
            className="text-2xl font-semibold text-gray-800 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Invoice Dashboard
          </h1>
          <nav>
            {isAuthenticated ? (
              <div className="flex gap-4">
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
