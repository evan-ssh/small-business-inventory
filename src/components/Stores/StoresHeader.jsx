import Link from "next/link";

export default function StoresHeader() {
  return (
    <header className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
          <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" />

          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-red-200">
        Management
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Manage Your Stores
        </h1>

       
      </div>

      <div className="flex flex-wrap gap-3">
       

       
      </div>
    </header>
  );
}