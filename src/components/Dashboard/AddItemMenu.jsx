"use client";

import { useState } from "react";
import AddItemFields from "./AddItemFields";

function getStatusFromQty(qty) {
  if (qty <= 0) {
    return "Depleted";
  }

  if (qty < 20) {
    return "Low Stock";
  }

  return "Optimal";
}

export default function AddItemMenu({ onClose }) {
  const [formData, setFormData] = useState({
    description: "",
    sku: "",
    type: "",
    qty: "0",
    price: "0",
  });

  const [errMsg, setErr] = useState("");

  const qtyNumber = Number(formData.qty || 0);
  const calculatedStatus = getStatusFromQty(qtyNumber);

  function handleChange(e) {
    const {name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErr("");
  }

  function handleSave(e) {
    e.preventDefault();

    if (!formData.description.trim()) {
      setErr("Product description is required.");
      return;
    }

    const newProduct = {
      description: formData.description.trim(),
      sku: formData.sku.trim(),
      type: formData.type.trim(),
      qty: Number(formData.qty || 0),
      price: Number(formData.price || 0),
      status: calculatedStatus,
      transactionsThisMonth: 0,

    };

    console.log("Frontend create only for now:", newProduct);

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40">
        <form onSubmit={handleSave}>
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                New Asset
              </p>

              <h2 className="mt-1 text-lg font-bold text-white">
                Create Inventory Product
              </h2>
            </div>
          </div>

          <AddItemFields
            currFormValues={formData}
            calculatedStatus={calculatedStatus}
            onChange={handleChange}
          />

          {errMsg && (
            <p className="px-6 pb-4 text-sm font-medium text-red-400">
              {errMsg}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] p-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-red-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}