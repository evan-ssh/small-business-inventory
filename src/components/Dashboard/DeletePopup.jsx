"use client";

import { useState } from "react";

export default function DeletePopup({ product, onCancel, onConfirm }) {
  const [deleteInput, setDeleteInput] = useState("");
  const [errMsg, setErr] = useState("");

async function handleSubmit() {
  if(deleteInput === ""){
    setErr("Input product name above")
    return;
  }

    if (deleteInput !== product.description) {
      setErr("Product name does not match.");
      return;
    }

    const result = await onConfirm(product);

    if (!result.success) {
      setErr(result.error);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40">
        <h3 className="text-xl font-bold text-white">
          Delete product?
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Would you like to delete{" "}<span className="font-semibold text-white">{product.description}?</span><br /> Type the product name exactly to confirm.
        </p>

        <input type="text" value={deleteInput} onChange={(e) => {
            setDeleteInput(e.target.value);
            setErr("");
          }}
          placeholder={product.description}
          className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
        />

        {errMsg && (
          <p className="mt-3 text-sm font-medium text-red-400">
            {errMsg}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950">
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-500">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}