"use client";
import { useState } from "react";
import { getAccountBalance } from "../../utils/api";

export default function AccountBalance() {
  const [accountId, setAccountId] = useState<number | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const handleCheckBalance = async () => {
    try {
      const response = await getAccountBalance(accountId?.toString() || "");
      setBalance(response.balance);
    } catch (error: any) {
      setBalance(null);
      alert("Error: " + error.response.data.message || 'Error while fetching balance');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Check Account Balance</h2>
      <div className="mb-4">
        <label htmlFor="accountId" className="block text-sm font-semibold">
          Account ID
        </label>
        <input
          type="number"
          id="accountId"
          className="w-full px-4 py-2 border rounded-md"
          value={accountId || ""}
          onChange={(e) => setAccountId(Number(e.target.value))}
        />
      </div>
      <button
        onClick={handleCheckBalance}
        className="px-6 py-2 bg-blue-500 text-white rounded-md"
      >
        Check Balance
      </button>

      {balance && <div className="mt-4">${balance}</div>}
    </div>
  );
}
