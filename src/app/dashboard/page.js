export default function Dashboard() {
    return (
      <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-hidden p-4 sm:p-8 lg:p-12">
        
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-red-500/5 blur-[150px]" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-red-500/[0.03] blur-[140px]" />
        </div>
  
        <div className="relative z-10 mx-auto max-w-7xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono tracking-wider text-slate-300">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                StockPilot Operational Core
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Inventory Workspace
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Centralized monitoring matrix for small-store assets and real-time supplies.
              </p>
            </div>
  
            <div className="flex items-center gap-3">
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-200 transition hover:bg-white/10">
                Export Audit
              </button>
              <button className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 shadow transition hover:bg-slate-200">
                + New Asset
              </button>
            </div>
          </div>
  
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-red-400/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Total Active SKUs</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">842</span>
                <span className="text-xs text-emerald-400 font-mono">Stable</span>
              </div>
            </div>
  
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-red-400/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Critical Shortages</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-red-400">3 Items</span>
                <span className="text-xs text-red-400/70 font-mono">Alert</span>
              </div>
            </div>
  
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-red-400/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Fulfilled Logs</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">129</span>
                <span className="text-xs text-slate-500 font-mono">This Month</span>
              </div>
            </div>
  
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-red-400/20">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Net Inventory Value</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight">$24,910</span>
                <span className="text-xs text-slate-500 font-mono">USD</span>
              </div>
            </div>
  
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl overflow-hidden">
            
            <div className="p-6 border-b border-white/10 bg-white/[0.01] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">Stock Ledger</h2>
                <p className="text-xs text-slate-400 mt-0.5">Comprehensive view of current store inventory and reorder boundaries.</p>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Query asset tracking index..." 
                  disabled
                  className="w-full sm:w-64 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2 text-xs text-slate-400 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <th className="p-4 pl-6">Product Description</th>
                    <th className="p-4">SKU Code</th>
                    <th className="p-4">Category Matrix</th>
                    <th className="p-4">Stock Level</th>
                    <th className="p-4 pr-6 text-right">System Evaluation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 pl-6 font-medium text-white">Premium Electronics Chassis</td>
                    <td className="p-4 font-mono text-xs text-slate-400">SKU-9082-XL</td>
                    <td className="p-4 text-slate-300">Hardware Components</td>
                    <td className="p-4 font-semibold text-slate-200">412 Units</td>
                    <td className="p-4 pr-6 text-right">
                      <span className="inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        Optimal
                      </span>
                    </td>
                  </tr>
  
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 pl-6 font-medium text-white">High-Capacity Storage Node</td>
                    <td className="p-4 font-mono text-xs text-slate-400">SKU-1104-MD</td>
                    <td className="p-4 text-slate-300">Storage Arrays</td>
                    <td className="p-4 font-semibold text-slate-200">14 Units</td>
                    <td className="p-4 pr-6 text-right">
                      <span className="inline-block rounded-md border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400">
                        Low Stock
                      </span>
                    </td>
                  </tr>
  
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 pl-6 font-medium text-white">Cryogenic Processing Core</td>
                    <td className="p-4 font-mono text-xs text-slate-400">SKU-4485-CR</td>
                    <td className="p-4 text-slate-300">Thermal Control</td>
                    <td className="p-4 font-semibold text-slate-400">0 Units</td>
                    <td className="p-4 pr-6 text-right">
                      <span className="inline-block rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-400">
                        Depleted
                      </span>
                    </td>
                  </tr>
  
                  <tr className="hover:bg-white/[0.01] transition-colors">
                    <td className="p-4 pl-6 font-medium text-white">Standard Optical Bus Interface</td>
                    <td className="p-4 font-mono text-xs text-slate-400">SKU-7731-HG</td>
                    <td className="p-4 text-slate-300">Networking Kits</td>
                    <td className="p-4 font-semibold text-slate-200">89 Units</td>
                    <td className="p-4 pr-6 text-right">
                      <span className="inline-block rounded-md border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                        Optimal
                      </span>
                    </td>
                  </tr>
  
                </tbody>
              </table>
            </div>
          </div>
  
     
          <div className="rounded-xl border border-dashed border-white/10 p-5 text-center text-xs font-mono text-slate-500 bg-white/[0.005]">
            System Standby // Core Data Arrays Configured. Ready for Next.js App Router Endpoint Mapping.
          </div>
  
        </div>
      </div>
    );
  }