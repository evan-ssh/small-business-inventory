import InvRow from "./InvRow"; 

export default function InventoryTable({ products, onEdit, totalUnits, transactions }) {
    return (
        <div className="overflow-x-auto">
          
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-xs font-semibold uppercase tracking-wider text-slate-400">
                        <th className="p-4 pl-6">Description</th>
                        <th className="p-4">SKU Code</th>
                        <th className="p-4">Product Type</th>
                        <th className="p-4">Qty</th>
                        <th className="p-4">$ / Unit</th>
                        <th className="p-4 pr-6 text-right">Status</th>
                        <th className="p-4 pr-6 text-right"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                    {products.map((item) => (
                        <InvRow key={item._id} product={item} onEdit={onEdit} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}