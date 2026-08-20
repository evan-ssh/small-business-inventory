"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AddMemberPanel from "./AddMemberPanel";
import StoreMembersList from "./StoreMembersList";

export default function DashboardActionBar({storeId,userRole,storeMembers = [],permissions = {},setAddMenuVisible,onMemberAdded,}) 
{
  const router = useRouter();

  const [membersMenuOpen, setMembersMenuOpen] = useState(false);
  const [showAddMemberPanel, setShowAddMemberPanel] = useState(false);
  const [showManageMembersOverlay, setShowManageMembersOverlay] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMembersMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="flex items-center gap-3">
        

        {/* Stores */}
        <button
          type="button"
          onClick={() => router.push("/stores")}
          className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
        >
          All Stores
        </button>

        {/* New Asset */}
        {permissions.create && (
        <button
          type="button"
          onClick={() => setAddMenuVisible(true)}
          className="rounded-xl bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-950 shadow transition hover:bg-slate-200"
        >
          + New Asset
        </button>
        )}

{/* Members */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setMembersMenuOpen((prev) => !prev)}
            className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
          >
            <div className="flex -space-x-2 overflow-hidden">
              {storeMembers.slice(0, 3).map((member, idx) =>
                member.picture ? (
                  <img
                    key={member._id || idx}
                    src={member.picture}
                    alt={member.name || "Member"}
                    className="inline-block h-5 w-5 rounded-full object-cover ring-2 ring-slate-950"
                  />
                ) : (
                  <div
                    key={member._id || idx}
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[9px] font-bold text-white ring-2 ring-slate-950"
                  >
                    {member.name?.charAt(0) || "U"}
                  </div>
                )
              )}
            </div>

            <span className="hidden sm:inline">Members</span>

            <svg
              className="h-4 w-4 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </button>

          {/* Members Dropdown */}
          {membersMenuOpen && (
           <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-1rem)] rounded-2xl border border-white/10 bg-slate-950 p-4 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Workspace Access
                </span>
                <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">
                  {storeMembers.length} Total
                </span>
              </div>

              <div className="my-3 max-h-48 space-y-2 overflow-y-auto">
                {storeMembers.length === 0 ? (
                  <p className="py-3 text-center text-xs text-slate-500">
                    No members found.
                  </p>
                ) : (
                  storeMembers.map((member) => (
                    <div
                      key={member._id}
                      className="flex items-center justify-between py-1"
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        {member.picture ? (
                          <img
                            src={member.picture}
                            alt={member.name || "Member"}
                            className="h-7 w-7 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                            {member.name?.charAt(0) || "U"}
                          </div>
                        )}

                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-white">
                            {member.name || "Unknown User"}
                          </p>
                          <p className="truncate text-[10px] text-slate-400">
                            {member.email || "No email"}
                          </p>
                        </div>
                      </div>

                      <span className="ml-2 shrink-0 text-[10px] font-semibold uppercase text-slate-400">
                        {member.role}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {userRole === "owner" && (
            <div className="flex flex-col gap-2 border-t border-white/10 pt-2">
                <button
                type="button"
                onClick={() => {
                    setMembersMenuOpen(false);
                    setShowAddMemberPanel(true);
                }}
                className="w-full rounded-xl bg-red-600 py-2 text-center text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-500"
                >
                + Add New Member
                </button>

                <button
                type="button"
                onClick={() => {
                    setMembersMenuOpen(false);
                    setShowManageMembersOverlay(true);
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                Manage Permissions
                </button>
            </div>
            )}
            </div>
          )}
        </div>
      </div>

      {/* Add Member */}
      {showAddMemberPanel && (
        <AddMemberPanel
          storeId={storeId}
          onClose={() => setShowAddMemberPanel(false)}
          onMemberAdded={onMemberAdded}
        />
      )}

      {/* Manage Members */}
      {showManageMembersOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl">
            <button
              type="button"
              onClick={() => setShowManageMembersOverlay(false)}
              className="absolute right-4 top-4 z-10 text-slate-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>

            <StoreMembersList storeId={storeId} />
          </div>
        </div>
      )}
    </>
  );
}