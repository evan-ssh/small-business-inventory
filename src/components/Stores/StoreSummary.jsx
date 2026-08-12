function SummaryCard({
    label,
    value,
    subtext,
    isAlert = false,
  }) {
    return (
        <article className="rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 transition hover:border-white/20 hover:bg-white/[0.04]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          {label}
        </p>
  
        <div className="mt-1 flex items-baseline gap-2">
          <p
            className={`text-2xl font-bold tracking-tight ${
              isAlert ? "text-red-400" : "text-white"
            }`}
          >
            {value}
          </p>
  
          <p
            className={`text-[11px] ${
              isAlert ? "text-red-400/70" : "text-slate-500"
            }`}
          >
            {subtext}
          </p>
        </div>
      </article>
    );
  }
  
  export default function StoreSummary({
    storeCount,
    productCount,
    lowStockCount,
    inventoryValue,
  }) {
    return (
     <section className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Store Workspaces"
          value={storeCount}
          subtext="Locations"
        />
  
        <SummaryCard
          label="Products Managed"
          value={productCount.toLocaleString("en-CA")}
          subtext="Across All Stores"
        />
  
        <SummaryCard
          label="Low-Stock Items"
          value={lowStockCount}
          subtext="Need Attention"
          isAlert={lowStockCount > 0}
        />
  
        <SummaryCard
          label="Inventory Value"
          value={`$${inventoryValue.toLocaleString("en-CA")}`}
          subtext="CAD"
        />
      </section>
    );
  }