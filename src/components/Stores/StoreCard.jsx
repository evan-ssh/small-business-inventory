import Link from "next/link";

function StoreMetric({ label, value, isAlert = false }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">
        {label}
      </p>

      <p
        className={`mt-1 text-sm font-bold ${
          isAlert ? "text-red-400" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default function StoreCard({ store }) {
  const storeId = store._id || store.id;

  const products = Number(store.products ?? 0);
  const activeUnits = Number(store.activeUnits ?? 0);
  const lowStock = Number(store.lowStock ?? 0);
  const teamMembers = Number(store.teamMembers ?? 1);
  const inventoryValue = Number(store.inventoryValue ?? 0);

  return (
    <article
      className={`group relative flex min-h-[27rem] flex-col overflow-hidden rounded-3xl border p-5 transition duration-300 hover:-translate-y-1 ${
        store.isActive
          ? "border-red-500/35 bg-gradient-to-br from-red-500/[0.12] via-red-500/[0.06] to-white/[0.025] shadow-xl shadow-red-950/20"
          : "border-white/10 bg-white/[0.025] shadow-lg shadow-black/10 hover:border-white/20 hover:bg-white/[0.04]"
      }`}
    >
      {store.isActive && (
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-500/10 blur-[70px]" />
      )}

      <div className="relative flex flex-1 flex-col">
        {/* Store heading */}
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-lg font-bold ${
              store.type === "Warehouse"
                ? "border-white/10 bg-white/5 text-slate-300"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            {store.type === "Warehouse" ? "W" : "S"}
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {store.isActive && (
              <span className="rounded-full border border-red-500/20 bg-red-500/15 px-3 py-1 text-[11px] font-semibold text-red-200">
                Active
              </span>
            )}

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
              {store.role || "Member"}
            </span>
          </div>
        </div>

        {/* Store information */}
        <div className="mt-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            {store.type || "Retail Store"}
          </p>

          <h3 className="mt-2 text-xl font-bold tracking-tight text-white">
            {store.name}
          </h3>

          <p className="mt-1.5 text-sm text-slate-400">
            {store.location || "No location provided"}
          </p>
        </div>

        {/* Main metrics */}
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-white/10 py-5">
          <StoreMetric
            label="Products"
            value={products.toLocaleString("en-CA")}
          />

          <StoreMetric
            label="Active Units"
            value={activeUnits.toLocaleString("en-CA")}
          />

          <StoreMetric
            label="Low Stock"
            value={`${lowStock} Items`}
            isAlert={lowStock > 0}
          />

          <StoreMetric
            label="Team"
            value={`${teamMembers} Members`}
          />
        </div>

        {/* Inventory value */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3.5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Inventory Value
          </span>

          <span className="text-lg font-bold text-white">
            $
            {inventoryValue.toLocaleString("en-CA", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-3 pt-5">
        <Link
            href={`/dashboard/${store._id}`}
            className={`flex-1 rounded-xl px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wider transition ${
                store.isActive
                ? "bg-red-600 text-white hover:bg-red-500"
                : "border border-white/10 bg-white/5 text-white hover:bg-white hover:text-slate-950"
            }`}
            >
            Open Workspace
            </Link>

          <button
            type="button"
            aria-label={`Manage ${store.name}`}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-bold text-slate-300 transition hover:bg-white hover:text-slate-950"
          >
            •••
          </button>
        </div>
      </div>
    </article>
  );
}