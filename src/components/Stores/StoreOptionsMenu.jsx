"use client";

import { useEffect, useState } from "react";
import {deleteStoreAction,updateStoreAction} from "@/app/actions/store";

export default function StoreOptionsMenu({
  store,
  onClose,
  onUpdate,
}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
  });

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (store) {
      setFormData({
        name: store.name || "",
        location: store.location || "",
        type: store.type || "Retail Store",
      });
    }
  }, [store]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  }

  async function handleSave() {
    const name = formData.name.trim();

    if (!name) {
      setError("Store name is required.");
      return;
    }

    const actionFormData = new FormData();

    actionFormData.append("storeId", store._id);
    actionFormData.append("name", name);
    actionFormData.append(
      "location",
      formData.location.trim()
    );
    actionFormData.append(
      "type",
      formData.type.trim()
    );

    setIsSaving(true);
    setError("");

    try {
      const result = await updateStoreAction(
        actionFormData
      );

      if (!result.success) {
        setError(
          result.error || "Failed to update store."
        );
        return;
      }

      await onUpdate();
      onClose();
    } catch (error) {
      console.error("Update store failed:", error);
      setError("Failed to update store.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteStoreAction(store._id);

      if (!result.success) {
        setError(
          result.error || "Failed to delete store."
        );
        return;
      }

      await onUpdate();
      onClose();
    } catch (error) {
      console.error("Delete store failed:", error);
      setError("Failed to delete store.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/50">
        {!showEdit && !showDelete && (
          <>
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Workspace
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                {store.name}
              </h2>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowEdit(true)}
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
              >
                Edit Store
              </button>

              <button
                type="button"
                onClick={() => setShowDelete(true)}
                className="w-full rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-left text-sm font-semibold text-red-300 transition hover:bg-red-500 hover:bg-red-600 hover:text-white"
              >
                Delete Store
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
            >
              Cancel
            </button>
          </>
        )}

        {showEdit && (
          <>
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Edit Workspace
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                {store.name}
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Store Name
                </label>

                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Location
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Type
                </label>

                <input
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm font-medium text-red-400">
                {error}
              </p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowEdit(false);
                  setError("");
                }}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </>
        )}

        {showDelete && (
          <>
            <div className="mb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-300">
                Delete Workspace
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                Delete {store.name}?
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                This will permanently delete the
                workspace, its products, and its store
                memberships.
              </p>
            </div>

            {error && (
              <p className="mb-4 text-sm font-medium text-red-400">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDelete(false);
                  setError("");
                }}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}