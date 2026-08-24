"use client";

import Link from "next/link";

export default function AccountSidebar({
  user,
  selectedInventory,
  onClose,
}) {
  if (!user) return null;

  const menuItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Stores",
      href: "/stores",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ];

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close sidebar"
        className="absolute inset-0 bg-black/50"
      />

      {/* Sidebar */}
      <aside className="absolute right-0 top-0 z-10 flex h-full w-full max-w-sm flex-col border-l border-white/10 bg-slate-950 shadow-2xl sm:w-96">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-white">
                Menu
              </h2>

              <p className="text-xs text-slate-400"></p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close workspace menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-sm text-white transition hover:bg-white hover:text-slate-950"
          >
            ✕
          </button>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Account */}
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
