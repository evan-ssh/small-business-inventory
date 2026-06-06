export default function Footer(){
    return(
        <footer className="relative overflow-hidden bg-slate-950 px-4 pb-5 pt-13 sm:pb-2 sm:pt-20">
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-60 w-220 -translate-x-1/2 rounded-full bg-red-500/[0.07] blur-[110px]" />
        <div className="pointer-events-none absolute left-0 top-0 h-48 w-48 rounded-full bg-white/[0.02] blur-[80px]" />
        <div className="relative z-10 mx-auto">
        <div className="absolute left-8 top-20 h-2 w-2 rounded-full bg-red-500/50 blur-[1px] animate-drift-right" />
        <div className="absolute left-16 bottom-24 h-1.5 w-1.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-right animation-delay-3000" />
        <div className="absolute right-8 top-32 h-2.5 w-2.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-left animation-delay-1500" />
        <div className="absolute right-20 bottom-20 h-2 w-2 rounded-full bg-red-500/35 blur-[1px] animate-drift-left animation-delay-4500" />
          <div className="  shadow-xl shadow-black/20 backdrop-blur-md ">


            <div className="flex w-full items-center justify-between gap-6 sm:flex-row">
             <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 font-bold text-white shadow-md">
                  S
                </div>
                <span className="text-lg font-bold tracking-tight text-white">
                  StockPilot
                </span>
              </div>
              <p className="text-center text-sm font-medium text-slate-500 sm:text-right">
                ©2026 Smarter inventory planning.
              </p>
              
            </div>
          </div>
        </div>
      </footer>
    )
}