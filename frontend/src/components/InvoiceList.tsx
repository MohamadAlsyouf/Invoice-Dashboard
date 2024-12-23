import React, { useState } from "react";
import { formatCurrency, formatDate } from "../utils/formatters";
import { InvoiceModal } from "./InvoiceModal";

interface Invoice {
  id: string;
  vendor_name: string;
  amount: number;
  due_date: string;
  paid: boolean;
  description: string;
  user_id: string;
}

interface InvoiceListProps {
  invoices?: Invoice[];
}

export const InvoiceList = ({ invoices = [] }: InvoiceListProps) => {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(
    null
  );

  return (
    <>
      <tbody className="bg-white divide-y divide-gray-200">
        {invoices.map((invoice) => (
          <tr
            key={invoice.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => setSelectedInvoiceId(invoice.id)}
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {invoice.vendor_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {invoice.amount === 0 ? null : formatCurrency(invoice.amount)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {formatDate(invoice.due_date)}
            </td>
            <td className="px-6 py-4 text-sm text-gray-900">
              {invoice.description}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  invoice.paid
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {invoice.paid ? "Paid" : "Unpaid"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
      <InvoiceModal
        invoiceId={selectedInvoiceId}
        onClose={() => setSelectedInvoiceId(null)}
      />
    </>
  );
};
