import React from "react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDate } from "../utils/formatters";
import { getInvoice } from "../api/api";

interface Invoice {
  id: string;
  vendor_name: string;
  amount: number;
  due_date: string;
  paid: boolean;
  description: string;
  user_id: string;
}

interface InvoiceModalProps {
  invoiceId: string | null;
  onClose: () => void;
}

export const InvoiceModal = ({ invoiceId, onClose }: InvoiceModalProps) => {
  const { data: invoice, isLoading } = useQuery({
    queryKey: ["invoice", invoiceId],
    queryFn: () => (invoiceId ? getInvoice(invoiceId) : null),
    enabled: !!invoiceId,
  });

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!invoiceId || !invoice) return null;
  if (isLoading) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={handleOverlayClick}
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Invoice Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <>
              <div className="text-lg">
                <label className="block font-medium text-gray-500">
                  Vendor
                </label>
                <p className="mt-1 text-gray-900">{invoice.vendor_name}</p>
              </div>

              <div>
                <label className="block font-medium text-gray-500">
                  Amount
                </label>
                <p className="mt-1 text-gray-900">
                  {formatCurrency(invoice.amount)}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-500">
                  Due Date
                </label>
                <p className="mt-1 text-gray-900">
                  {formatDate(invoice.due_date)}
                </p>
              </div>

              <div>
                <label className="block font-medium text-gray-500">
                  Description
                </label>
                <p className="mt-1 text-gray-900">{invoice.description}</p>
              </div>

              <div>
                <label className="block font-medium text-gray-500">
                  Status
                </label>
                <span
                  className={`inline-flex mt-1 px-2 py-1 font-semibold rounded-full ${
                    invoice.paid
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {invoice.paid ? "Paid" : "Unpaid"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
