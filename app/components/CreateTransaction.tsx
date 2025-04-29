"use client";
import { useState } from "react";
import { createTransaction } from "../../utils/api";

export default function CreateTransaction() {
  const [description, setDescription] = useState<string>("");
  const [entries, setEntries] = useState<
    { accountId: number | null; amount: number }[]
  >([{ accountId: null, amount: 0 }]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddEntry = () => {
    setEntries([...entries, { accountId: null, amount: 0 }]);
  };

  const handleRemoveEntry = (index: number) => {
    const newEntries = entries.filter((_, i) => i !== index);
    setEntries(newEntries);
  };

  const handleEntryChange = (index: number, key: string, value: any) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [key]: value };
    setEntries(newEntries);
    setErrorMessage("");
  };

  const validateTransaction = () => {
    let totalDebit = 0;
    let totalCredit = 0;
    const uniqueAccounts = new Set();

    for (const entry of entries) {
      if (entry.amount > 0) {
        totalDebit += entry.amount;
      } else {
        totalCredit += Math.abs(entry.amount);
      }
      if (!entry.accountId || entry.accountId.toString().trim() === "") {
        setErrorMessage("Each entry must have a valid Account ID.");
        return false;
      }
      if (entry.amount === 0) {
        setErrorMessage("Each entry must have a non-zero amount.");
        return false;
      }
      uniqueAccounts.add(entry.accountId);
    }

    if (totalDebit !== totalCredit) {
      setErrorMessage("The total debits and credits must be equal.");
      return false;
    }

    if (uniqueAccounts.size < 2) {
      setErrorMessage("A transaction involves atleast 2 accounts");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTransaction()) {
      return;
    }

    const transactionData = {
      description,
      date: new Date().toISOString(),
      entries,
    };

    try {
      await createTransaction(transactionData);
      alert("Transaction created successfully!");
      setDescription("");
      setEntries([{ accountId: null, amount: 0 }]);
    } catch (error: any) {
      alert(error.response.data.message || "Error while creating transaction");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <input
            type="text"
            id="description"
            className="w-full px-4 py-2 border rounded-md"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrorMessage("");
            }}
            required
          />
        </div>

        <h3 className="font-semibold mb-2">Entries</h3>
        {entries.map((entry, index) => (
          <div key={index} className="mb-4 flex items-center">
            <div className="flex-1 mr-2">
              <label
                htmlFor={`accountId-${index}`}
                className="block text-sm font-semibold"
              >
                Account ID
              </label>
              <input
                type="text"
                id={`accountId-${index}`}
                className="w-full px-4 py-2 border rounded-md"
                value={entry.accountId ?? ""}
                onChange={(e) =>
                  handleEntryChange(index, "accountId", e.target.value)
                }
                required
              />
            </div>
            <div className="flex-1 mr-2">
              <label
                htmlFor={`amount-${index}`}
                className="block text-sm font-semibold"
              >
                Amount
              </label>
              <input
                type="number"
                id={`amount-${index}`}
                className="w-full px-4 py-2 border rounded-md"
                value={entry.amount}
                onChange={(e) =>
                  handleEntryChange(index, "amount", Number(e.target.value))
                }
                required
              />
            </div>
            {entries.length > 1 && (
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleRemoveEntry(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          className="mb-4 px-6 py-2 bg-gray-300 text-black rounded-md"
          onClick={handleAddEntry}
        >
          Add Entry
        </button>

        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}

        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
