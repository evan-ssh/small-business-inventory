"use client";

export default function AccountSidebar({ user, selectedInventory, onClose }) {
  return (
    <div className="fixed inset-0 z-[60]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close sidebar"
        className="absolute inset-0 bg-black/50"
      />

      <aside className="absolute right-0 top-0 flex h-full w-96 flex-col border-l border-white/10 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
              <span className="text-lg font-bold text-white">S</span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">StockPilot</h2>
              <p className="text-xs text-slate-400">Workspace Menu</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm text-white transition hover:bg-white hover:text-slate-950"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-6 rounded-3xl border border-red-500/25 bg-red-500/10 p-5 shadow-lg shadow-red-950/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-red-300">
                  Current Inventory
                </p>

                <h3 className="mt-3 text-xl font-bold text-white">
                  {selectedInventory.name}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {selectedInventory.type}
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-200">
                  Active
                </span>

                <button
                  type="button"
                  className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white hover:text-slate-950"
                >
                  Switch
                </button>
              </div>
            </div>

              

          </div>

          <div className="mb-6">
            

            <div className="flex flex-col gap-2">
              <button
                type="button"
                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Products / Assets
              </button>

              <button
                type="button"
                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Low Stock Review
              </button>

              <button
                type="button"
                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                AI Inventory Insights
              </button>

              <button
                type="button"
                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Reports
              </button>

              <button
                type="button"
                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                Team Access
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-4">
          <div className="relative mb-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
            <div className="account-red-wave absolute inset-0" />

            <div className="relative z-10 flex items-center gap-3">
              {user.picture && (
                <img
                  src={user.picture}
                  alt={user.name || "User profile"}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full border border-red-400/40 object-cover shadow-lg shadow-red-950/40"
                />
              )}

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-bold text-white">
                    {user.name}
                  </p>

                  <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.9)]" />
                </div>

                <p className="truncate text-xs text-slate-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <a
            href="/api/auth/logout"
            className="block rounded-2xl bg-red-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-red-500"
          >
            Sign out
          </a>
        </div>
      </aside>
    </div>
  );
}