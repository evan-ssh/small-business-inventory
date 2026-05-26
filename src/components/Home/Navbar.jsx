export default function Navbar() {
    return (
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <span className="text-lg font-bold text-white">S</span>
            </div>
  
            <span className="text-xl font-bold tracking-tight text-white">
              StockPilot
            </span>
          </a>
  
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#home"
              className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Home
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-100 rounded-full bg-red-500 transition-transform" />
            </a>
  
            <a
              href="#features"
              className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Features
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 rounded-full bg-red-500 transition-transform group-hover:scale-x-100" />
            </a>
  
            <a
              href="#dashboard"
              className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 rounded-full bg-red-500 transition-transform group-hover:scale-x-100" />
            </a>
  
            <a
              href="#pricing"
              className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Pricing
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 rounded-full bg-red-500 transition-transform group-hover:scale-x-100" />
            </a>
  
            <a
              href="#contact"
              className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white"
            >
              Contact
              <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 rounded-full bg-red-500 transition-transform group-hover:scale-x-100" />
            </a>
  
            <a
              href="/login"
              className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950"
            >
              Login
            </a>
          </div>
        </div>
      </nav>
    );
  }