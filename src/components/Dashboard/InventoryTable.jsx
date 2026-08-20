"use client";

import { useState } from "react";
import InvRow from "./InvRow";

export default function InventoryTable({
  products,
  onEdit,
  totalUnits,
  transactions,
  netValue,
  searchWord,
  setSearchWord,
  onRefresh,
  onPlaceOrder,
}) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (!onRefresh) return;

    setRefreshing(true);

    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.02] p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <h2 className="text-sm font-bold text-white">Stock</h2>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <span className="text-slate-500">Total Units:</span>
            <span className="text-white">{totalUnits}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <span className="text-slate-500">Transactions:</span>
            <span className="text-white">{transactions}</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider">
            <span className="text-slate-500">Net Value:</span>
            <span className="text-white">
              ${Number(netValue).toLocaleString("en-CA")} CAD
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={onPlaceOrder}
            className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-red-500"
          >
            + Place Order
          </button>

          <div className="relative">
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder="Search inventory..."
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 pr-10 text-xs text-white outline-none transition placeholder:text-slate-500 focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10 sm:w-56"
            />

            <svg
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            aria-label="Refresh Inventory"
            title="Refresh Inventory"
            className="flex items-center justify-center rounded-xl bg-transparent p-2.5 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={refreshing ? "animate-spin" : ""}
            >
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="p-4 pl-6">Description</th>
              <th className="p-4">SKU Code</th>
              <th className="p-4">Product Type</th>
              <th className="p-4">Qty</th>
              <th className="p-4">$ / Unit</th>
              <th className="p-4 pr-6 text-right">Status</th>
              <th className="p-4 pr-6 text-right"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5 text-sm">
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="p-10 text-center text-xs uppercase tracking-wider text-slate-500"
                >
                  No inventory items found.
                </td>
              </tr>
            ) : (
              products.map((item) => (
                <InvRow
                  key={item._id}
                  product={item}
                  onEdit={onEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}