export default function InfoCard({label,value,subtext,isAlert}){
    return(
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition hover:border-red-400/20">
       <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
        {label}
      </span>
      
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`text-3xl font-bold tracking-tight ${isAlert ? 'text-red-400' : 'text-white'}`}>
          {value}
        </span>
        <span className={`text-xs font-mono ${isAlert ? 'text-red-400/70' : 'text-slate-500'}`}>
          {subtext}
        </span>
      </div>
    </div>
  );
    
}