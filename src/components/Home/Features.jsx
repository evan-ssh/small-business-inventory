export default function Features() {
    return (
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex rounded-full bg-blue-100 px-6 py-2 text-sm font-semibold uppercase tracking-[0.4em] text-blue-700 shadow-md shadow-blue-200/60">
  Features
</span>
  
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl ">
            Everything needed to manage<br></br>small-store inventory.
          </h2>
  
          <p className="mt-4 text-lg leading-8 text-slate-600">
            StockPilot helps small businesses track products, record sales,
            monitor stock levels, and understand what needs to be restocked.
          </p>
        </div>
  
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
              📦
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              Product Management
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Add and organize products with prices, categories, stock quantities,
              and reorder levels.
            </p>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
              🧾
            </div>
            <h3 className="text-xl font-bold text-slate-950">Sales Tracking</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Record sold items and automatically update inventory levels after
              each sale.
            </p>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
              ⚠️
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              Low-Stock Alerts
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Quickly see products that are running low or out of stock before
              shelves are empty.
            </p>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
              📊
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              Analytics Dashboard
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              View inventory value, best-selling products, sales totals, and
              low-stock trends.
            </p>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
              ✨
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              AI Restock Assistant
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Use AI to suggest which products should be reordered based on stock
              and sales activity.
            </p>
          </div>
  
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-xl">
              🕘
            </div>
            <h3 className="text-xl font-bold text-slate-950">
              Inventory History
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Keep track of product changes, sales records, and restock activity
              over time.
            </p>
          </div>
        </div>
      </section>
    );
  }