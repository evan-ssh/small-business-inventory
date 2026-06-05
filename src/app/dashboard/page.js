"use client";
import {useState, useEffect} from "react";
import InfoCard from "../../components/dashboard/InfoCard";
import InventoryTable from "../../components/dashboard/InventoryTable";

export default function Dashboard() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        fetch('/api/products')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((err) => console.error("Failed to fetch products:", err));
    }
    useEffect(() => {
        fetchProducts();
    }, []);
 

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-hidden pt-24 pb-4 px-4 sm:pt-28 sm:pb-8 sm:px-8 lg:pt-32 lg:pb-12 lg:px-12">
        
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-red-500/5 blur-[150px]" />
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />
          <div className="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-red-500/[0.03] blur-[140px]" />
        </div>
  
        <div className="relative z-10 mx-auto max-w-7xl space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 gap-4">
            <div>
              
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Inventory
              </h1>
             
            </div>
            <div className="flex items-center gap-3">
              <button className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 shadow transition hover:bg-slate-200">
                + New Asset
              </button>
            </div>
          </div>
  
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            
            <InfoCard label="Total Active Units" value="842" status="Stable" />
            <InfoCard label="Critical Shortages" value="3 Items" status="Alert" isAlert={true} />
            <InfoCard label="Transactions" value="129" status="This Month" />
            <InfoCard label="Net Value" value="$24,910" status="CAD"></InfoCard>
  
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md shadow-2xl overflow-hidden">
            
            <div className="p-6 border-b border-white/10 bg-white/[0.01] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white">Stock</h2>
    
              </div>
              <div className="relative">
              <button onClick={fetchProducts}className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-slate-700">
                Refresh table
                </button>
                <input 
                  type="text" 
                  placeholder="Search Inventory..." 
                  disabled
                  className="w-full sm:w-64 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2 text-xs text-slate-400 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <InventoryTable products={products}></InventoryTable>
              
            </div>
          </div>
        </div>
    );
  }