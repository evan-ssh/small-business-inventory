export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-slate-950 px-8 pt-24 pb-0 sm:px-12 sm:pt-28 sm:pb-0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-20 h-2 w-2 rounded-full bg-red-500/50 blur-[1px] animate-drift-right" />
        <div className="absolute left-16 bottom-24 h-1.5 w-1.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-right animation-delay-3000" />
        <div className="absolute right-8 top-32 h-2.5 w-2.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-left animation-delay-1500" />
        <div className="absolute right-20 bottom-20 h-2 w-2 rounded-full bg-red-500/35 blur-[1px] animate-drift-left animation-delay-4500" />
        <div className="absolute left-1/3 top-16 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating animation-delay-1500" />
        <div className="absolute right-1/3 bottom-16 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating-wide animation-delay-3000" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[130px]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.45em] text-slate-200/80 shadow-[0_0_60px_rgba(255,255,255,0.06)] backdrop-blur-md">
          Smart inventory for small business
        </span>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Smart inventory and restock planning for small businesses.
        </h1>

        <p className="max-w-3xl text-lg leading-9 text-slate-400 sm:text-xl">
          Plan orders with confidence, reduce waste, and keep stock levels
          optimized with a clean dashboard and intelligent alerts.
        </p>
      </div>
    </section>
  );
}