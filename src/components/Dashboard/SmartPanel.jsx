"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function SmartPanel() {
  const params = useParams();
  const storeId = params.storeId;

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error, setError] = useState("");

  const handleReport = async () => {
    setIsOpen(true);
    if (analysisData) return; 

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/ai/analysis/${storeId}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate analysis");
      }

      setAnalysisData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 flex w-full flex-col items-center">
      {!isOpen ? (
        <button
          onClick={handleReport}
          className="group flex w-fit items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-10 py-4 transition hover:border-red-400/30 hover:bg-white/[0.05]"
        >
          <span className="text-lg transition-transform group-hover:scale-110">✨</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 transition group-hover:text-white">
          View Smart Panel 
          </span>
        </button>
      ) : (
        <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-300 ease-in-out">

          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                  View Smart Panel 
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                    Based on current store's inventory
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
            {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent"></div>
              <p className="mt-3 text-xs text-slate-400">Evaluating inventory levels and formulating AI insights...</p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-xs text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && analysisData && (
            <div className="space-y-6">
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Stock Health & Restocking Actions
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {analysisData.inventoryAnalysis?.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-white">{item.product}</span>
                          <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                            item.currentStatus === "Low Stock" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                            item.currentStatus === "Depleted" ? "bg-red-500/10 text-red-400 border border-red-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}>
                            {item.currentStatus}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mb-3">{item.reason}</p>
                      </div>
                      <div className="border-t border-white/5 pt-3 mt-2 flex items-center justify-between text-xs">
                        <span className="text-red-400 font-medium">{item.recommendedAction}</span>
                        {item.suggestedQuantity > 0 && (
                          <span className="text-slate-300 font-mono">+{item.suggestedQuantity} items</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Suggested Store Expansion
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {analysisData.newProductRecommendations?.map((suggestion, index) => (
                    <div key={index} className="rounded-2xl border border-red-500/20 bg-red-500/5 p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-white text-sm">💡 {suggestion.suggestedItem}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-slate-300">
                            {suggestion.category}
                            </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-2">{suggestion.rationale}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
