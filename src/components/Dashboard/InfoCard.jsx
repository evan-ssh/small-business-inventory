export default function InfoCard({ label, value, subtext, isAlert }) {
  return (
    <div className={`rounded-2xl border backdrop-blur-md p-5 transition ${
      isAlert 
        ? 'border-red-500/20 bg-red-500/5 hover:border-red-500/30' 
        : 'border-white/10 bg-white/[0.03] hover:border-white/20'
    }`}>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
        {label}
      </span>
      
      <div className="mt-2 flex items-baseline justify-between">
        <span className={`text-2xl font-bold tracking-tight ${isAlert ? 'text-red-400' : 'text-white'}`}>
          {value}
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${isAlert ? 'text-red-400/80' : 'text-slate-500'}`}>
          {subtext}
        </span>
      </div>
    </div>
  );
}