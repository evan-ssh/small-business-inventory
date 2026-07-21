"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const currPath = usePathname();
  const [user, setUser] = useState(null);  
  const isPath = (navPath) => currPath === navPath;

  useEffect(() => {
    async function loadSession() {
      const response = await fetch("/api/auth/session");
      const data = await response.json();
  
      setUser(data.user);
    }
    loadSession();
    }, []);

    return (
      <nav className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 px-8 py-4 backdrop-blur-md sm:px-10 lg:px-12">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <span className="text-lg font-bold text-white">S</span>
            </div>
  
            <span className="text-xl font-bold tracking-tight text-white">
              StockPilot
            </span>
          </Link>
  
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/" className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white">
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-red-500 transition-transform ${isPath('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
            {user && (
            <Link href="/dashboard" className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white">
              Dashboard
              <span className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-red-500 transition-transform ${isPath('/dashboard') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
             )}
            <Link href="/contact" className="group relative pb-1 text-sm font-medium text-slate-300 transition hover:text-white">
              Contact
              <span className={`absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-red-500 transition-transform ${isPath('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
            {user ? (
        <div className="flex items-center gap-3">
          {user.picture && (
            <img
              src={user.picture}
              alt={user.name || "User profile"}
              className="h-9 w-9 rounded-full border border-white/10 object-cover"
            />
          )}

          <a href="/api/auth/logout"className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950" >
            Sign out
          </a>
        </div>
              ) : (
            <Link href="/login" className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950">
              Login
            </Link>
            )}
            </div>
        </div>
      </nav>
    );
  }