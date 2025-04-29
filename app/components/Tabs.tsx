"use client";
import { useMemo, useState } from "react";
import TransactionList from "./TransactionList";
import AccountBalance from "./AccountBalance";
import CreateTransaction from "./CreateTransaction";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("form");
  const tabs = useMemo(
    () => [
      { name: "Create Transaction", value: "form" },
      { name: "View Transactions", value: "list" },
      { name: "Account Balance", value: "balance" },
    ],
    []
  );

  return (
    <div className="w-full max-w-3xl mx-auto h-full overflow-y-auto">
      <div className="flex justify-around mb-4">
        {tabs.map((tab) => (
          <button
            onClick={() => setActiveTab(tab.value)}
            className={`py-2 px-6 ${
              activeTab === tab.value ? "bg-blue-500 text-white" : "bg-gray-200"
            } rounded-md`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div
        className="border p-6 rounded-md bg-white shadow-lg"
        style={{ minHeight: "800px" }}
      >
        {activeTab === "form" && <CreateTransaction />}
        {activeTab === "list" && <TransactionList />}
        {activeTab === "balance" && <AccountBalance />}
      </div>
    </div>
  );
}
