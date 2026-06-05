export default function InvRow({ product }){
    const getStatusStyle = (status) => {
        if(status === "Optimal"){
            return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400';
        }else if(status ==="Low Stock"){
            return 'border-amber-500/20 bg-amber-500/10 text-amber-400';
        }else{
            return 'border-red-500/20 bg-red-500/10 text-red-400';
        }

    }

    return (
        <tr className="hover:bg-white/[0.01] transition-colors">
          <td className="p-4 pl-6 font-medium text-white">{product.description}</td>
          <td className="p-4 font-mono text-xs text-slate-400">{product.sku}</td>
          <td className="p-4 text-slate-300">{product.type}</td>
          <td className="p-4 font-semibold text-slate-200">{product.qty} Units</td>
          <td className="p-4 pr-6 text-right">
            <span className={`inline-block rounded-md border px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(product.status)}`}>
              {product.status} 
            </span>
          </td>
        </tr>
      
    );
}