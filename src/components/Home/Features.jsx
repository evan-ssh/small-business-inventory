import Image from 'next/image';
export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:py-28"
    >

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-24 h-2 w-2 rounded-full bg-red-500/50 blur-[1px] animate-drift-right" />
        <div className="absolute right-12 top-32 h-2.5 w-2.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-left animation-delay-1500" />
        <div className="absolute left-1/4 bottom-24 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating animation-delay-1500" />
        <div className="absolute right-1/4 bottom-16 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating-wide animation-delay-3000" />
        <div className="absolute left-13 bottom-40 h-1.5 w-1.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-right animation-delay-3000" />
        <div className="absolute right-20 bottom-28 h-2 w-2 rounded-full bg-red-500/35 blur-[1px] animate-drift-left animation-delay-4500" />
      </div>


      <div className="pointer-events-none absolute left-1/2 top-[62%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-white/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-72 rounded-full bg-red-500/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-20 py-3 text-lg font-semibold uppercase tracking-[0.45em] text-slate-200/80 shadow-[0_0_60px_rgba(255,255,255,0.06)] backdrop-blur-md">
            Features
          </span>
          

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Everything needed to manage <br></br>small-store inventory
          </h2>
          <div className="mt-8 flex justify-center">
            <Image 
              src="/Robot.png" 
              alt="StockPilot Robo" 
              width={800} 
              height={450} 
              className="rounded-2xl border border-white/10 shadow-2xl"/>
          </div>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            StockPilot helps small businesses track products, record sales,
            monitor stock levels, and understand what needs to be restocked.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
              📦
            </div>
            <h3 className="text-xl font-bold text-white">Product Management</h3>
            <p className="mt-3 leading-7 text-slate-400">
              Add and organize products with prices, categories, stock
              quantities, and reorder levels.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
              🧾
            </div>
            <h3 className="text-xl font-bold text-white">Sales Tracking</h3>
            <p className="mt-3 leading-7 text-slate-400">
              Record sold items and automatically update inventory levels after
              each sale.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
              ⚠️
            </div>
            <h3 className="text-xl font-bold text-white">Low-Stock Alerts</h3>
            <p className="mt-3 leading-7 text-slate-400">
              Quickly see products that are running low or out of stock before
              shelves are empty.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
              📊
            </div>
            <h3 className="text-xl font-bold text-white">Analytics Dashboard</h3>
            <p className="mt-3 leading-7 text-slate-400">
              View inventory value, best-selling products, sales totals, and
              low-stock trends.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
              ✨
            </div>
            <h3 className="text-xl font-bold text-white">AI Restock Assistant</h3>
            <p className="mt-3 leading-7 text-slate-400">
              Use AI to suggest which products should be reordered based on
              stock and sales activity.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
              🕘
            </div>
            <h3 className="text-xl font-bold text-white">Inventory History</h3>
            <p className="mt-3 leading-7 text-slate-400">
              Keep track of product changes, sales records, and restock activity
              over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}