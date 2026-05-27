import React, { useState } from "react";

const Withdrawals = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [status, setStatus] = useState("");

  const handleWithdraw = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setStatus("Please enter a valid amount.");
      return;
    }

    if (!accountNumber || !bankName) {
      setStatus("Please provide your bank details.");
      return;
    }

    // Simulate withdrawal request
    setStatus(`Withdrawal of R${Number(amount).toLocaleString()} requested successfully!`);

    // Clear form
    setAmount("");
    setAccountNumber("");
    setBankName("");
  };

  return (
    <section className="p-6 bg-gray-50 dark:bg-slate-900 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Request Withdrawal
      </h2>

      <form
        onSubmit={handleWithdraw}
        className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md max-w-md mx-auto"
      >
        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Amount (ZAR)
          </label>
          <input
            type="number"
            min="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount to withdraw"
          />
        </div>

        {/* Bank Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Bank Name
          </label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your bank name"
          />
        </div>

        {/* Account Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Account Number
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your account number"
          />
        </div>

        {/* Submit */}
       <button
        type="submit"
        className="w-full py-2 px-4 text-white font-medium rounded-lg transition-colors
                    bg-blue-600 hover:bg-purple-500
                    border-2 border-transparent 
                    relative overflow-hidden"
        >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50 rounded-lg pointer-events-none"></span>
            <span className="relative z-10">Request Withdrawal</span>
        </button>


        {/* Status message */}
        {status && (
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-200">
            {status}
          </p>
        )}
      </form>
    </section>
  );
};

export default Withdrawals;
