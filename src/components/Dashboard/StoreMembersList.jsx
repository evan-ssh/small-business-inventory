
"use client";

import { useEffect, useState } from "react";
import { updateMemberPermissionsAction } from "@/app/actions/members";

export default function StoreMembersList({
  storeId,
  onClose,
}) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState(null);
  const [success, setSuccess] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await fetch(
        `/api/stores/${storeId}/members`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load members."
        );
      }

      setMembers(data.members || []);
    } catch (err) {
      console.error("Failed to fetch members:", err);
      setError(
        err.message || "Failed to load members."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchMembers();
    }
  }, [storeId]);

  const updatePermission = (
    memberId,
    permission,
    value
  ) => {
    setError("");
    setSuccess("");

    setMembers((prev) =>
      prev.map((member) => {
        if (member._id !== memberId) {
          return member;
        }

        return {
          ...member,
          permissions: {
            ...(member.permissions || {}),
            [permission]: value,
          },
        };
      })
    );
  };

  const savePermissions = async (member) => {
    try {
      setSavingId(member._id);
      setError("");
      setSuccess("");

      const result =
        await updateMemberPermissionsAction(
          storeId,
          member._id,
          member.permissions
        );

      if (!result.success) {
        throw new Error(
          result.error ||
            "Failed to update permissions."
        );
      }

      setMembers((prev) =>
        prev.map((item) =>
          item._id === member._id
            ? result.member
            : item
        )
      );

      setSuccess(
        `${member.name || "Member"} permissions saved successfully.`
      );
    } catch (err) {
      console.error(
        "Failed to save permissions:",
        err
      );

      setError(
        err.message ||
          "Failed to update permissions."
      );
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-full items-center justify-center overflow-hidden bg-slate-950/80 p-3 backdrop-blur-sm sm:p-6">
      <div className="flex h-full max-h-[100dvh] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-4xl">
        {/* Header */}
        <div className="shrink-0 border-b border-white/10 p-4 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Store Access
              </p>

              <h2 className="mt-1 text-xl font-bold text-white">
                Manage Permissions
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Control what each member can do within this
                workspace.
              </p>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close permissions"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ONLY THIS SECTION SCROLLS */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
                Loading Members...
              </p>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-400">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-5 rounded-xl border border-green-500/20 bg-green-500/10 p-3 text-xs font-medium text-green-300">
                  {success}
                </div>
              )}

              <div className="space-y-3">
                {members.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      No members found.
                    </p>
                  </div>
                ) : (
                  members.map((member) => {
                    const permissions =
                      member.permissions || {
                        view: true,
                        create: false,
                        update: false,
                        delete: false,
                      };

                    const isOwner =
                      member.role === "owner";

                    return (
                      <div
                        key={member._id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
                      >
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                          <div className="flex min-w-0 items-center gap-3">
                            {member.picture ? (
                              <img
                                src={member.picture}
                                alt={
                                  member.name ||
                                  "Member"
                                }
                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                                {member.name?.charAt(
                                  0
                                ) || "U"}
                              </div>
                            )}

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="truncate text-sm font-semibold text-white">
                                  {member.name ||
                                    "Unknown User"}
                                </p>

                                {isOwner && (
                                  <span className="rounded-md bg-red-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-300">
                                    Owner
                                  </span>
                                )}
                              </div>

                              <p className="truncate text-xs text-slate-400">
                                {member.email ||
                                  "No email"}
                              </p>
                            </div>
                          </div>

                          <span className="w-fit rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                            {member.role ||
                              "Staff"}
                          </span>
                        </div>

                        <div className="mt-5 border-t border-white/10 pt-5">
                          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                            Permissions
                          </p>

                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            {[
                              ["view", "View"],
                              ["create", "Create"],
                              ["update", "Update"],
                              ["delete", "Delete"],
                            ].map(
                              ([
                                permission,
                                label,
                              ]) => (
                                <label
                                  key={permission}
                                  className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 transition ${
                                    permissions[
                                      permission
                                    ]
                                      ? "border-red-500/30 bg-red-500/10"
                                      : "border-white/10 bg-white/[0.02]"
                                  } ${
                                    isOwner
                                      ? "cursor-not-allowed opacity-60"
                                      : "cursor-pointer hover:border-white/20"
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={Boolean(
                                      permissions[
                                        permission
                                      ]
                                    )}
                                    disabled={
                                      isOwner
                                    }
                                    onChange={(
                                      e
                                    ) =>
                                      updatePermission(
                                        member._id,
                                        permission,
                                        e.target
                                          .checked
                                      )
                                    }
                                    className="h-4 w-4 shrink-0 accent-red-600"
                                  />

                                  <span className="text-xs font-medium text-white">
                                    {label}
                                  </span>
                                </label>
                              )
                            )}
                          </div>

                          {!isOwner && (
                            <div className="mt-4 flex justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  savePermissions(
                                    member
                                  )
                                }
                                disabled={
                                  savingId ===
                                  member._id
                                }
                                className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                              >
                                {savingId ===
                                member._id
                                  ? "Saving..."
                                  : "Save Permissions"}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

