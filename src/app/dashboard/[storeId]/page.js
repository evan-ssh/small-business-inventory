"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InventoryTable from "@/components/Dashboard/InventoryTable";
import EditMenu from "@/components/Dashboard/EditMenu";
import AddItemMenu from "@/components/Dashboard/AddItemMenu";
import SmartPanel from "@/components/Dashboard/SmartPanel";
import DashboardActionBar from "@/components/Dashboard/DashboardActionBar";

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
  const [storeMembers, setStoreMembers] = useState([]);
  const [allowed, setAllowed] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);

    const [permissions, setPermissions] = useState({
      view: false,
      create: false,
      update: false,
      delete: false,
    });
  const [userRole, setUserRole] = useState("");
  const totalActiveUnits = countActiveUnits(products);
  const shortageCount = countShortages(products);
  const netValue = getNetVal(products);
  const monthlyTransactions = countMonthlyTransactions(products);
  const filteredProducts = searchProducts(products, searchWord);

    const fetchSession = useCallback(async () => {
      try {
        const response = await fetch("/api/auth/session");
    
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
    
        const data = await response.json();
    
        if (!data?.user) {
          router.push("/login");
          return false;
        }
    
        return data.user;
      } catch (error) {
        console.error("Failed to check session:", error);
        router.push("/login");
        return false;
      }
    }, [router]);
    
    // Check whether user belongs to this store
    const checkStoreAccess = useCallback(async () => {
      if (!storeId) return false;
    
      try {
        const response = await fetch(`/api/stores/${storeId}`);
        const data = await response.json();
    
        if (!response.ok || !data.allowed) {
          console.error("Store access denied:", data.error);
          setAllowed(false);
          router.push("/stores");
          return false;
        }
    
        setAllowed(true);
        return true;
      } catch (error) {
        console.error("Failed to check store access:", error);
        setAllowed(false);
        router.push("/stores");
        return false;
      } finally {
        setAccessChecked(true);
      }
    }, [storeId, router]);
    
    // Fetch products
    const fetchProducts = useCallback(async () => {
      if (!storeId) return;
    
      try {
        setLoading(true);
        setError("");
    
        const response = await fetch(`/api/products?storeId=${storeId}`);
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(
            data.error || `Error loading products: ${response.status}`
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
    
    // Fetch store members
   
    const fetchStoreMembers = useCallback(async (sessionUser) => {
      if (!storeId) return;
    
      try {
        const response = await fetch(`/api/stores/${storeId}/members`);
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error || "Failed to load store members");
        }
    
        const members = data.members || [];
    
        setStoreMembers(members);
    
        // Find membership
        const currentMember = members.find(
          (member) => member.userId === sessionUser.userId
        );
    
        if (currentMember) {
          setUserRole(currentMember.role);
        
          setPermissions(
            currentMember.permissions || {
              view: false,
              create: false,
              update: false,
              delete: false,
            }
          );
        }
      } catch (error) {
        console.error("Failed to fetch store members:", error);
      }
    }, [storeId]);


    useEffect(() => {
      async function initializeDashboard() {
        if (!storeId) return;
    
        setLoading(true);
   
        const sessionUser = await fetchSession();

        if (!sessionUser) return;

        const hasAccess = await checkStoreAccess();
        if (!hasAccess) return;

        await Promise.all([
          fetchProducts(),
          fetchStoreMembers(sessionUser),
        ]);
      }
    
      initializeDashboard();
    }, [
      storeId,
      fetchSession,
      checkStoreAccess,
      fetchProducts,
      fetchStoreMembers,
    ]);
    
    // Don't render table until access check
    if (!accessChecked || !allowed) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
          <p className="text-xs font-semibold uppercase tracking-wider">
            Checking workspace access...
          </p>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen space-y-8 bg-slate-950 px-6 pb-6 pt-28 text-slate-100 md:px-10 md:pb-10 md:pt-32">
        {/* Top Header Action Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-white">
                Inventory
              </h1>
    
              <span className="rounded-lg border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-300">
                Critical Shortages: {shortageCount} Items
              </span>
            </div>
          </div>
    
          <DashboardActionBar
            storeId={storeId}
            storeMembers={storeMembers}
            permissions={permissions}
            userRole={userRole}
            setAddMenuVisible={setAddMenuVisible}
            onMemberAdded={(newMember) => {
              setStoreMembers((prev) => [...prev, newMember]);
            }}
          />
        </div>
    
        {/* AI Smart Panel */}
        <SmartPanel />
    
        {/* Main Inventory Table */}
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60 shadow-2xl backdrop-blur-md">
          {loading && (
            <div className="p-12 text-center text-xs uppercase tracking-wider text-slate-400">
              Loading Workspace Assets...
            </div>
          )}
    
          {!loading && error && (
            <div className="p-12 text-center">
              <p className="text-sm text-red-400">{error}</p>
    
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
              totalUnits={totalActiveUnits}
              transactions={monthlyTransactions}
              netValue={netValue}
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              onRefresh={fetchProducts}
              onPlaceOrder={() => router.push("/order")}
            />
          )}
        </div>
    
        {/* Add Item Menu */}
        {showAddMenu && (
          <AddItemMenu
            storeId={storeId}
            onClose={() => setAddMenuVisible(false)}
            onAdd={fetchProducts}
          />
        )}
    
        {/* Edit Item Menu */}
        {selectedItem && (
          <EditMenu
            product={selectedItem}
            onClose={() => setSelected(null)}
            onUpdate={fetchProducts}
          />
        )}
      </div>
    );
  }