import axios from "axios";
import type { AuthResponse, Invoice, LoginCredentials } from "../types";

const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", credentials);
  return response.data;
};

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await api.get<Invoice[]>("/invoices");
  return response.data;
};

export const getInvoice = async (id: string): Promise<Invoice> => {
  const response = await api.get<Invoice>(`/invoices/${id}`);
  return response.data;
};

export const getInvoiceTotal = async () => {
  const response = await api.get("/invoices/total");
  return response.data;
};
