
import Link from "next/link";



export default function LoginPage() {


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 font-sans pt-17">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
          Sign in or create an Account
          </h2>
          <p className="text-sm text-slate-400">
          Access your central inventory management and supply chain network. 
          </p>
        </div>
        <a
            href="/api/auth/google"
            className="mx-auto flex h-12 w-full max-w-sm items-center justify-center gap-3 rounded-full border border-[#747775] bg-white px-5 text-[15px] font-medium text-[#1F1F1F] shadow-sm transition hover:bg-[#F8F9FA] hover:shadow-md active:bg-[#F1F3F4]"
          >
            <img
              src="/googleIcon.png"
              alt="Google"
              className="h-5 w-5"
            />
            <span>Sign in with Google</span>
          </a>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-slate-400 underline hover:text-white"
          >
            Back to home
          </Link>
       </div>       
      </div>
    </div>
  );
}