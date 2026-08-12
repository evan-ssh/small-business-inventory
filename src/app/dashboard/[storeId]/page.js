"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import InfoCard from "../../../components/Dashboard/InfoCard";
import InventoryTable from "../../../components/Dashboard/InventoryTable";
import EditMenu from "../../../components/Dashboard/EditMenu";
import AddItemMenu from "../../../components/Dashboard/AddItemMenu";

function countActiveUnits(products) {
  return products.reduce(
    (total, product) => total + Number(product.qty),
    0
  );
}

function countShortages(products) {
  return products.filter((product) => {
    return (
      product.status === "Low Stock" ||
      product.status === "Depleted"
    );
  }).length;
}

function getNetVal(products) {
  return products.reduce(
    (total, product) =>
      total + Number(product.price) * Number(product.qty),
    0
  );
}

function countMonthlyTransactions(products) {
  return products.reduce(
    (total, product) =>
      total + Number(product.transactionsThisMonth ?? 0),
    0
  );
}

function searchProducts(products, searchWord) {
  const search = searchWord.toLowerCase().trim();

  if (!search) {
    return products;
  }

  return products.filter((product) => {
    return (
      product.description?.toLowerCase().includes(search) ||
      product.sku?.toLowerCase().includes(search) ||
      product.type?.toLowerCase().includes(search) ||
      product.status?.toLowerCase().includes(search)
    );
  });
}

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId;

  const [products, setProducts] = useState([]);
  const [selectedItem, setSelected] = useState(null);
  const [showAddMenu, setAddMenuVisible] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const totalActiveUnits = countActiveUnits(products);
  const shortageCount = countShortages(products);
  const netValue = getNetVal(products);
  const monthlyTransactions =
    countMonthlyTransactions(products);

  const filteredProducts = searchProducts(
    products,
    searchWord
  );

  const fetchProducts = useCallback(async () => {
    if (!storeId) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/products?storeId=${storeId}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            `Error loading products: ${response.status}`
        );
      }

      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(error.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-4 pt-24 font-sans text-white sm:px-8 sm:pb-8 sm:pt-28 lg:px-12 lg:pb-12 lg:pt-32">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-red-500/5 blur-[150px]" />

          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/5 blur-[120px]" />

          <div className="absolute left-1/3 top-1/2 h-[30rem] w-[30rem] rounded-full bg-red-500/[0.03] blur-[140px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl space-y-8">
          {/* Dashboard heading */}
          <div className="flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-300">
                Store Workspace
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Inventory
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.push("/stores")}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
              >
                All Stores
              </button>

              <button
                type="button"
                onClick={() => setAddMenuVisible(true)}
                className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 shadow transition hover:bg-slate-200"
              >
                + New Asset
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <InfoCard
              label="Total Active Units"
              value={totalActiveUnits.toString()}
              subtext="Stable"
            />

            <InfoCard
              label="Critical Shortages"
              value={`${shortageCount} Items`}
              subtext="Alert"
              isAlert={shortageCount > 0}
            />

            <InfoCard
              label="Transactions"
              value={monthlyTransactions.toString()}
              subtext="This Month"
            />

            <InfoCard
              label="Net Value"
              value={`$${netValue.toLocaleString("en-CA")}`}
              subtext="CAD"
            />
          </div>

          {/* Inventory table */}
          <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl backdrop-blur-md">
            <div className="flex flex-col gap-4 border-b border-white/10 bg-white/[0.01] p-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-base font-bold text-white">
                  Stock
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Products in the selected store workspace
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() =>
                    router.push(`/order?storeId=${storeId}`)
                  }
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-red-500"
                >
                  + Place Order
                </button>

                <button
                  type="button"
                  onClick={fetchProducts}
                  className="rounded-xl bg-slate-800 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-slate-700"
                >
                  Refresh Table
                </button>

                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={searchWord}
                  onChange={(event) =>
                    setSearchWord(event.target.value)
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-2.5 text-xs text-slate-300 outline-none transition focus:border-red-500/50 focus:bg-slate-900 sm:w-64"
                />
              </div>
            </div>

            {loading && (
              <div className="p-10 text-center text-sm text-slate-400">
                Loading inventory...
              </div>
            )}

            {!loading && error && (
              <div className="p-10 text-center">
                <p className="text-sm text-red-300">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={fetchProducts}
                  className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
                >
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && (
              <InventoryTable
                products={filteredProducts}
                onEdit={setSelected}
              />
            )}
          </section>
        </div>
      </main>

      {selectedItem && (
        <EditMenu
          product={selectedItem}
          onClose={() => setSelected(null)}
          onUpdate={fetchProducts}
        />
      )}

      {showAddMenu && (
        <AddItemMenu
          storeId={storeId}
          onClose={() => setAddMenuVisible(false)}
          onAdd={fetchProducts}
        />
      )}
    </>
  );
}