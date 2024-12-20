import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Invoices } from "./pages/Invoices";
import { useSelector } from "react-redux";
import type { RootState } from "./store";

const queryClient = new QueryClient();

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/invoices"
                element={
                  <PrivateRoute>
                    <Invoices />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/invoices" />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
