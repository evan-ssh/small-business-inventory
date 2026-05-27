export default function ContactCard() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-slate-950 px-4 py-24 sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-20 h-2 w-2 rounded-full bg-red-500/50 blur-[1px] animate-drift-right" />
        <div className="absolute right-16 top-32 h-2.5 w-2.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-left animation-delay-1500" />
        <div className="absolute left-1/4 bottom-24 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating animation-delay-1500" />
        <div className="absolute right-1/4 bottom-16 h-2 w-2 rounded-full bg-red-400/35 blur-[1px] animate-floating-wide animation-delay-3000" />
        <div className="absolute left-16 bottom-40 h-1.5 w-1.5 rounded-full bg-red-500/40 blur-[1px] animate-drift-right animation-delay-3000" />
        <div className="absolute right-20 bottom-28 h-2 w-2 rounded-full bg-red-500/35 blur-[1px] animate-drift-left animation-delay-4500" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-1/3 bottom-0 h-180 w-220 rounded-full bg-red-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-white/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-md sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-white/10 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.45em] text-slate-200/80 shadow-[0_0_60px_rgba(255,255,255,0.06)] backdrop-blur-md">
                Contact
              </span>

              <h2 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Ready to simplify your
                <span className="block bg-gradient-to-r from-white via-slate-200 to-red-300 bg-clip-text text-transparent">
                  inventory workflow?
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                StockPilot is designed for small businesses that need a cleaner
                way to track products, monitor stock levels, and make smarter
                restock decisions.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="mailto:contact@stockpilot.com"
                  className="rounded-full bg-red-500 px-7 py-3 text-center text-base font-bold text-white shadow-lg shadow-red-500/25 transition hover:-translate-y-0.5 hover:bg-red-400"
                >
                  Contact Us
                </a>

                <a
                  href="#features"
                  className="rounded-full border border-white/15 bg-white/10 px-7 py-3 text-center text-base font-bold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950"
                >
                  View Features
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-xl shadow-black/20">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-red-500/10 text-xl shadow-lg shadow-red-500/10">
                  ✉️
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Get in touch
                  </h3>
                  <p className="text-sm text-slate-400">
                    Questions, demos, or feedback
                  </p>
                </div>
              </div>

              <form className="mt-6 space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:bg-white/[0.07] focus:ring-4 focus:ring-red-500/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    rows="4"
                    placeholder="Tell us what you need help with..."
                    className="mt-2 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-red-400/50 focus:bg-white/[0.07] focus:ring-4 focus:ring-red-500/10"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-red-500 px-7 py-3 text-center text-base font-bold text-white shadow-lg shadow-red-500/25 transition hover:-translate-y-0.5 hover:bg-red-400"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}