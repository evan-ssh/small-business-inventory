"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import AddItemFields from "./AddItemFields";
import { productAction } from "@/app/actions/products";


export default function AddItemMenu({
  storeId,
  onClose,
  onAdd,
}) {
  const [formData, setFormData] = useState({
    description: "",
    sku: "",
    type: "",
    qty: "0",
    threshold: 10,
    price: "0",
  });

  const [actionState, formAction, isPending] =
    useActionState(productAction, {
      success: false,
      error: "",
    });


  useEffect(() => {
    if (actionState.success) {
      onAdd();
      onClose();
    }
  }, [actionState.success, onAdd, onClose]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm">
      <div className="flex min-h-full items-center justify-center p-4">
      <div className="my-8 flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40">
        <form action={formAction} className="flex min-h-0 flex-col">
          
          <input
            type="hidden"
            name="storeId" 
            value={storeId || ""}
          />

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
          <div className="flex-1 overflow-y-auto">
          <AddItemFields
            currFormValues={formData}
            onChange={handleChange}
          />
          
          {actionState.error && (
            <p className="px-6 pb-4 text-sm font-medium text-red-400">
              {actionState.error}
            </p>
          )}
        </div>

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
              disabled={isPending || !storeId}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}