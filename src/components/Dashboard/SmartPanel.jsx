"use client";

import { useState } from "react";

export default function SmartPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 flex w-full flex-col items-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex w-fit items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-10 py-4 transition hover:border-red-400/30 hover:bg-white/[0.05]"
        >
          <span className="text-lg transition-transform group-hover:scale-110">✨</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 transition group-hover:text-white">
            Generate Smart Analysis
          </span>
        </button>
      ) : (
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 ease-in-out">

          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  Smart AI Analysis
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  Insights based on your current workspace inventory
                </p>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
            >
              Close
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            

           
            <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-5 md:col-span-2">
             
              <p className="text-sm leading-relaxed text-slate-300">
               
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}