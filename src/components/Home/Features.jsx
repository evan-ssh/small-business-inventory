import Image from "next/image";

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:py-28"
    >
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-24 h-2 w-2 rounded-full bg-red-500/50 blur-[1px] animate-drift-right" />
        <div className="absolute right-12 top-32 h-2.5 w-2.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-left animation-delay-1500" />
        <div className="absolute left-1/4 bottom-24 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating animation-delay-1500" />
        <div className="absolute right-1/4 bottom-16 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating-wide animation-delay-3000" />
        <div className="absolute left-13 bottom-40 h-1.5 w-1.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-right animation-delay-3000" />
        <div className="absolute right-20 bottom-28 h-2 w-2 rounded-full bg-red-500/35 blur-[1px] animate-drift-left animation-delay-4500" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-[55%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-red-500/10 blur-[140px]" />

      <div className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-white/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-6 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-red-300 shadow-[0_0_40px_rgba(239,68,68,0.08)] backdrop-blur-md">
            StockPilot Features
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Everything your store needs
            <br />
            to stay in control
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            StockPilot brings inventory management, barcode scanning, team
            access, transaction tracking, and AI-powered recommendations into
            one simple workspace.
          </p>
        </div>

        {/* Product visual */}
        <div className="relative mx-auto mt-14 max-w-5xl">
          <div className="absolute -inset-4 rounded-[2rem] bg-red-500/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-2 shadow-2xl shadow-black/40 backdrop-blur-md sm:p-3">
            <Image
              src="/Robot.png"
              alt="StockPilot AI assistant"
              width={800}
              height={450}
              className="w-full rounded-[1.5rem] border border-white/10 object-cover"
            />
          </div>
        </div>

        {/* Feature grid */}
        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {/* Inventory */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                📦
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                Core
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Complete Inventory Control
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Create, edit, search, and manage products from one centralized
              dashboard with quantities, prices, SKUs, categories, and stock
              status.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                Products
              </span>

              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                Search
              </span>

              <span className="rounded-lg bg-white/5 px-2.5 py-1 text-[10px] font-medium text-slate-400">
                CRUD
              </span>
            </div>
          </div>

          {/* Barcode Scanner */}
          <div className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.10] to-white/[0.03] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/40">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                  📱
                </div>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-300">
                  Scanner
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                Barcode Scanning
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Quickly identify inventory using your device camera and
                barcode scanner, making it easier to find products without
                manually searching through the inventory.
              </p>

              <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-lg">
                  ▥
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Fast Lookup
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Scan → identify → manage
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Monitoring */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                ⚠️
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                Monitoring
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Smart Stock Monitoring
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Quickly identify depleted and low-stock products so you can see
              what needs attention before inventory becomes a problem.
            </p>

            <div className="mt-5 rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-red-300">
                Critical Shortages
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Important stock problems are highlighted directly on the
                dashboard.
              </p>
            </div>
          </div>

          {/* Transactions */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                🔄
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                Activity
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Inventory Transactions
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Keep track of inventory movement and monthly transaction
              activity while keeping product quantities synchronized with
              changes made in the workspace.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-white/5">
                <div className="h-2 w-2/3 rounded-full bg-red-500/60" />
              </div>

              <span className="text-[10px] font-semibold text-slate-500">
                Activity
              </span>
            </div>
          </div>

          {/* Dashboard Metrics */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                📊
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                Dashboard
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              At-a-Glance Metrics
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              See the most important information about your store without
              digging through separate reports or pages.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/5 p-2 text-center">
                <p className="text-sm font-bold text-white">Units</p>
                <p className="text-[9px] text-slate-500">
                  Active
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-2 text-center">
                <p className="text-sm font-bold text-white">
                  Activity
                </p>
                <p className="text-[9px] text-slate-500">
                  Monthly
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-2 text-center">
                <p className="text-sm font-bold text-white">
                  $
                </p>
                <p className="text-[9px] text-slate-500">
                  Net Value
                </p>
              </div>
            </div>
          </div>

          {/* AI */}
          <div className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.10] to-white/[0.03] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/40">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />

            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                  ✨
                </div>

                <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-red-300">
                  AI Powered
                </span>
              </div>

              <h3 className="text-xl font-bold text-white">
                Smart Restock Assistant
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                Let StockPilot analyze your inventory and recommend which
                products may need attention based on stock levels and recent
                transaction activity.
              </p>

              <div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Smart Analysis
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Recommendations are generated from your actual inventory
                  data rather than a separate demo.
                </p>
              </div>
            </div>
          </div>

          {/* Team Permissions */}
          <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-xl shadow-black/20 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-red-400/30 hover:bg-white/[0.07]">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                👥
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                Teams
              </span>
            </div>

            <h3 className="text-xl font-bold text-white">
              Team Access & Permissions
            </h3>

            <p className="mt-3 leading-7 text-slate-400">
              Invite members to your store workspace and control exactly what
              they can do with inventory using view, create, update, and
              delete permissions.
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-white ring-2 ring-slate-950">
                  A
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-white ring-2 ring-slate-950">
                  B
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500/20 text-[9px] font-bold text-red-300 ring-2 ring-slate-950">
                  +
                </div>
              </div>

              <span className="text-[10px] font-medium text-slate-500">
                Controlled workspace access
              </span>
            </div>
          </div>
        </div>

        {/* Feature Summary */}
        <div className="mt-20 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl shadow-black/20 backdrop-blur-md">
          <div className="grid md:grid-cols-3">

            <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-400">
                01
              </p>

              <h3 className="mt-3 text-lg font-bold text-white">
                Know your inventory
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep products, quantities, prices, SKUs, stock status, and
                inventory value organized in one workspace.
              </p>
            </div>

            <div className="border-b border-white/10 p-7 md:border-b-0 md:border-r">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-400">
                02
              </p>

              <h3 className="mt-3 text-lg font-bold text-white">
                Move faster
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use barcode scanning, search, and inventory transactions to
                quickly find products and keep stock information up to date.
              </p>
            </div>

            <div className="p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-400">
                03
              </p>

              <h3 className="mt-3 text-lg font-bold text-white">
                Make smarter decisions
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Monitor stock activity and use StockPilot's AI assistant to
                turn inventory data into practical restocking recommendations.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}