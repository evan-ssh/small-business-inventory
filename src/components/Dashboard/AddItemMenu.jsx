"use client";

import { useState,useEffect,useActionState } from "react";
import AddItemFields from "./AddItemFields";
import {productAction } from "@/app/actions/products";

function getStatusFromQty(qty) {
  if (qty <= 0) {
    return "Depleted";
  }

  if (qty < 20) {
    return "Low Stock";
  }

  return "Optimal";
}

export default function AddItemMenu({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    description: "",
    sku: "",
    type: "",
    qty: "0",
    price: "0",
  });


  const [actionState, formAction, isPending] = useActionState(
    productAction,
    {success: false,error: "",} 
  );

  const qtyNumber = Number(formData.qty || 0);
  const calculatedStatus = getStatusFromQty(qtyNumber);

  useEffect(() => {
    if (actionState.success) {
      onAdd();
      onClose();
    }
  }, [actionState.success, onAdd, onClose]);


  function handleChange(e) {
    const {name, value } = e.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40">
        <form action={formAction}>
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

          {actionState.error &&(
            <p className="px-6 pb-4 text-sm font-medium text-red-400">
              {actionState.error}
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
              disabled={isPending}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
            {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 