export default function Hero() {
    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 px-8 py-14 sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-8 top-20 h-2 w-2 rounded-full bg-red-500/50 blur-[1px] animate-drift-right" />
        <div className="absolute left-16 bottom-24 h-1.5 w-1.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-right animation-delay-3000" />
        <div className="absolute right-8 top-32 h-2.5 w-2.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-left animation-delay-1500" />
        <div className="absolute right-20 bottom-20 h-2 w-2 rounded-full bg-red-500/35 blur-[1px] animate-drift-left animation-delay-4500" />
        <div className="absolute left-1/3 top-16 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating animation-delay-1500" />
        <div className="absolute right-1/3 bottom-16 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating-wide animation-delay-3000" />
        </div>
  
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-slate-200/80 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            Smart inventory for small business
          </span>
  
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            StockPilot
            <span className="block mt-4 text-xl font-medium text-slate-300">
              Smart inventory and restock planning for small businesses.
            </span>
          </h1>
  
          <p className="max-w-xl text-base leading-8 text-slate-400">
            Plan orders with confidence, reduce waste, and keep stock levels optimized with a clean dashboard and intelligent alerts.
          </p>
        </div>
      </section>
    )
  }