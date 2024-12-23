import React from "react";

export function Home() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome to Invoice Dashboard
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Your all-in-one solution for invoice management and tracking
          </p>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Ready to get started? Click on the Invoices button in the header to
            manage your invoices.
          </p>
        </div>
      </div>
    </div>
  );
}
