"use server";

import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";
import { getStoreMembership } from "@/lib/store";

export async function updateMemberPermissionsAction(
  storeId,
  memberId,
  permissions
) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    if (!storeId || !memberId) {
      return {
        success: false,
        error: "Store ID and member ID are required.",
      };
    }

    let storeObjectId;
    let memberObjectId;

    try {storeObjectId = new ObjectId(storeId);
    } catch {
      return {success: false,error: "Invalid store ID.",};
    }

    try {
      memberObjectId = new ObjectId(memberId);
    } catch {
      return {
        success: false,
        error: "Invalid member ID.",
      };
    }

    const db = await getDB();

    const requesterMembership =
      await getStoreMembership(storeId);

    if (!requesterMembership) {
      return {
        success: false,
        error: "You do not have access to this store.",
      };
    }

    if (
      requesterMembership.role !== "owner" &&
      requesterMembership.role !== "staff"
    ) {
      return {
        success: false,
        error: "You do not have permission to manage members.",
      };
    }

    const membership = await db
      .collection("storeMembers")
      .findOne({
        _id: memberObjectId,
        storeId: storeObjectId,
      });

    if (!membership) {
      return {
        success: false,
        error: "Store member not found.",
      };
    }

    if (membership.role === "owner") {
      return {
        success: false,
        error: "Owner permissions cannot be changed.",
      };
    }

    if (!permissions || typeof permissions !== "object") {
      return {
        success: false,
        error: "Valid permissions are required.",
      };
    }

    const updatedPermissions = {
      view: Boolean(permissions.view),
      create: Boolean(permissions.create),
      update: Boolean(permissions.update),
      delete: Boolean(permissions.delete),
    };

    await db.collection("storeMembers").updateOne(
      {
        _id: memberObjectId,
        storeId: storeObjectId,
      },
      {
        $set: {
          permissions: updatedPermissions,
        },
      }
    );

    let user = null;

    try {
      user = await db.collection("users").findOne({
        _id: new ObjectId(membership.userId),
      });
    } catch {
    }

    return {
      success: true,
      member: {
        _id: membership._id.toString(),
        userId: membership.userId,
        name: user?.name || "Unknown User",
        email: user?.email || "No email",
        picture: user?.picture || null,
        role: membership.role || "staff",
        permissions: updatedPermissions,
      },
    };
  } catch (error) {
    console.error("Update member permissions failed:", error);

    return {
      success: false,
      error: "Failed to update member permissions.",
    };
  }
}