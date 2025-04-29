import { useEffect, useState } from "react";
import { getTransactions } from "../../utils/api";
import { FiltersType, TransactionType } from "../../utils/types";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [filters, setFilters] = useState<FiltersType>({
    accountId: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchFilteredTransactions();
  }, []);

  const fetchFilteredTransactions = async () => {
    try {
      const response = await getTransactions(filters);
      setTransactions(response.data);
    } catch (error) {
      alert("Error fetching transactions" + error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Transactions</h2>

      {/* Filters */}
      <div className="mb-4">
        <label htmlFor="accountId" className="mr-2">
          Account ID
        </label>
        <input
          type="text"
          id="accountId"
          name="accountId"
          value={filters.accountId}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        />
        <label htmlFor="startDate" className="ml-4 mr-2">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        />
        <label htmlFor="endDate" className="ml-4 mr-2">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border p-2 rounded-md"
        />
        <button
          onClick={fetchFilteredTransactions}
          className="ml-4 bg-blue-500 text-white p-2 rounded-md"
        >
          Apply Filters
        </button>
      </div>

      {/* Transaction List */}
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Transaction ID</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Account ID</th>
            <th className="border px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border px-4 py-2">{transaction.id}</td>
              <td className="border px-4 py-2">{transaction.description}</td>
              <td className="border px-4 py-2">{transaction.date}</td>
              <td className="border px-4 py-2">
                {transaction.entries.map((entry: any) => (
                  <div key={entry.id}>{entry.account.id}</div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {transaction.entries.map((entry: any) => (
                  <div key={entry.id}>{entry.amount}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
