"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';



export default function LoginPage() {


  const router = useRouter();
  

  const  loadDashboard = async (e) => {
    
    e.preventDefault();
    
    const username = e.target.user.value;
    const password = e.target.password.value;

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {"Content-Type": "application/json"
      },
      body: JSON.stringify({username,password})
    });

    const data = await response.json();

    if(data.valid){
      router.push('/dashboard');
    }else{
      alert("Invalid Credentials")
    }
    
  }





  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans pt-17">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
          Sign in
          </h2>
          <p className="text-sm text-slate-400">
          Access your central inventory management and supply chain network.<br></br>Don't have an account? <Link href="/Register" className = "text-white underline hover:text-slate-300 transition"> Register </Link> 
          </p>
        </div>


        <form onSubmit={loadDashboard} className="space-y-6">

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2"> Username or Email</label>
            <input name="user" type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-white/30 focus:bg-white/10"/>
          </div>

         
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
            <input name="password" type="password" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-white/30 focus:bg-white/10"/>
          </div>

          <button type="submit" className="w-full rounded-xl  bg-white px-4 py-3 text-sm font-semibold text-slate-950 shadow transition hover:bg-slate-200">Sign In</button>
        </form>

      </div>
    </div>
  );
}