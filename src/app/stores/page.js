"use client";

import { useEffect, useState } from "react";

import StoresHeader from "@/components/Stores/StoresHeader";
import StoreSummary from "@/components/Stores/StoreSummary";
import StoreCard from "@/components/Stores/StoreCard";
import AddStoreMenu from "@/components/Stores/AddStoreMenu";

function normalizeStore(store, index = 0) {
  return {
    ...store,
    id: store._id,
    products: store.products ?? 0,
    activeUnits: store.activeUnits ?? 0,
    lowStock: store.lowStock ?? 0,
    teamMembers: store.teamMembers ?? 1,
    inventoryValue: store.inventoryValue ?? 0,
    isActive: index === 0,
  };
}

export default function StoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddStoreMenu, setShowAddStoreMenu] = useState(false);

  const loadStores = async () => {
    try {
      setError("");
  
      const response = await fetch("/api/stores", {
        cache: "no-store",
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setError(data.error || "Failed to load stores");
        return;
      }
  
      const normalizedStores = data.map((store, index) =>
        normalizeStore(store, index)
      );
  
      setStores(normalizedStores);
    } catch (error) {
      console.error("Failed to load stores:", error);
      setError("Failed to load stores");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadStores();
  }, []);

  function handleStoreCreated(store) {
    setStores((currentStores) => [
      ...currentStores,
      normalizeStore(store, currentStores.length),
    ]);
  }

  const totalProducts = stores.reduce(
    (total, store) => total + store.products,
    0
  );

  const totalLowStock = stores.reduce(
    (total, store) => total + store.lowStock,
    0
  );

  const totalInventoryValue = stores.reduce(
    (total, store) => total + store.inventoryValue,
    0
  );

  return (
    <>
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-16 pt-28 text-white sm:px-8 lg:px-12">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-red-500/[0.06] blur-[150px]" />

        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-white/[0.04] blur-[160px]" />

        <div className="absolute left-1/3 top-1/2 h-96 w-96 rounded-full bg-red-500/[0.025] blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <StoresHeader />

        <StoreSummary
          storeCount={stores.length}
          productCount={totalProducts}
          lowStockCount={totalLowStock}
          inventoryValue={totalInventoryValue}
        />

        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">
                Your Locations
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                Store Workspaces
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Select and manage the inventory workspace for each business
                location.
              </p>
            </div>

            <div className="flex flex-col items-start gap-2 sm:items-end">
            <button
            type="button"
            onClick={() => setShowAddStoreMenu(true)}
            className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-red-950/30 transition hover:-translate-y-0.5 hover:bg-red-500"
            >
            + Add Store
            </button>

              <p className="text-xs text-slate-500">
                {stores.length}{" "}
                {stores.length === 1 ? "workspace" : "workspaces"} available
              </p>
            </div>
          </div>

          {loading && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-8 text-center text-sm text-slate-400">
              Loading store workspaces...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-200">
              {error}
            </div>
          )}

          {!loading && !error && stores.length === 0 && (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
              <h3 className="text-lg font-bold text-white">
                No store workspaces yet
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Create your first store to begin managing inventory.
              </p>
            </div>
          )}

          {!loading && !error && stores.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {stores.map((store) => (
                <StoreCard
                  key={store._id}
                  store={store}
                  onUpdate={loadStores}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
    {showAddStoreMenu && (
      <AddStoreMenu
        onClose={() => setShowAddStoreMenu(false)}
        onStoreCreated={handleStoreCreated}
      />
    )}
    </>

  );
}