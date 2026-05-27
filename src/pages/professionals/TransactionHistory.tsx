import React, { useEffect, useState } from "react";

// Helper function to generate 8-character alphanumeric transaction IDs
const generateTransactionRef = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Dummy transaction data with auto-generated references
    const dummyData = [
      {
        id: 1,
        date: "2025-11-01",
        type: "Withdrawal",
        amount: 500,
        status: "Completed",
      },
      {
        id: 2,
        date: "2025-11-05",
        type: "Withdrawal",
        amount: 300,
        status: "Pending",
      },
      {
        id: 3,
        date: "2025-11-10",
        type: "Deposit",
        amount: 200,
        status: "Completed",
      },
      {
        id: 4,
        date: "2025-11-12",
        type: "Withdrawal",
        amount: 450,
        status: "Failed",
      },
    ];

    // Add generated transaction reference
    const dataWithRefs = dummyData.map((tx) => ({
      ...tx,
      reference: generateTransactionRef(),
    }));

    setTransactions(dataWithRefs);
  }, []);

  return (
    <section className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Transaction History
      </h2>

      {transactions.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-sm">
          No transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-slate-800 shadow rounded-xl border border-gray-200 dark:border-slate-700">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Amount (ZAR)</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Transaction #</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr
                  key={tx.id}
                  className="border-b dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/40 transition"
                >
                  <td className="py-4 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {index + 1}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                    {tx.date}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    {tx.type}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-700 dark:text-gray-300">
                    R{tx.amount.toLocaleString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300"
                          : tx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">
                    {tx.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default TransactionHistory;
