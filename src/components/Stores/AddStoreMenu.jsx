"use client";

import { useState } from "react";

export default function AddStoreMenu({
  onClose,
  onStoreCreated,
}) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Retail Store",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Store name is required");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const response = await fetch("/api/stores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          location: formData.location.trim(),
          type: formData.type,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create store");
        return;
      }

      onStoreCreated(data);
      onClose();
    } catch (error) {
      console.error("Create store error:", error);
      setError("Failed to create store");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl shadow-black/50"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex items-start justify-between border-b border-white/10 bg-white/[0.02] p-6">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-300">
                New Workspace
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                Create a Store
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Add a retail location or warehouse workspace.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close add store menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Fields */}
          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="store-name"
                className="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Store Name
              </label>

              <input
                id="store-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Downtown Store"
                autoFocus
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500/50 focus:bg-white/[0.06]"
              />
            </div>

            <div>
              <label
                htmlFor="store-location"
                className="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Location
              </label>

              <input
                id="store-location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="City Centre"
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-red-500/50 focus:bg-white/[0.06]"
              />
            </div>

            <div>
              <label
                htmlFor="store-type"
                className="text-xs font-semibold uppercase tracking-wider text-slate-400"
              >
                Workspace Type
              </label>

              <select
                id="store-type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-red-500/50"
              >
                <option value="Retail Store">
                  Retail Store
                </option>

                <option value="Warehouse">
                  Warehouse
                </option>
              </select>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-white/[0.02] p-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-950/30 transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Creating..." : "Create Store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}