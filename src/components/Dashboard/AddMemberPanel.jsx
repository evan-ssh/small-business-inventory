"use client";

import { useState } from "react";

export default function AddMemberPanel({
  storeId,
  onClose,
  onMemberAdded,
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("staff");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/stores/${storeId}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add member.");
      }

      if (onMemberAdded) {
        onMemberAdded(data.member);
      }

      onClose();
    } catch (err) {
      setError(err.message || "Failed to add member.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Access Control
            </p>

            <h3 className="mt-1 text-lg font-bold text-white">
              Add Store Member
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-red-400/30">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              User Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="colleague@example.com"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-red-400/30">
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Role Permission
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
            >
              <option value="staff">
                Staff (View & Scan Inventory)
              </option>

              <option value="manager">
                Manager (Manage Products & Members)
              </option>
            </select>
          </div>

          <div className="mt-6 flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-red-500 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}