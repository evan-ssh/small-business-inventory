"use server";

import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";
import {
  getStoreMembership,
  hasStorePermission,
} from "@/lib/store";

const collectionName = "stores";

// CREATE STORE
export async function createStoreAction(formData) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return {
        success: false,
        error: "You must be signed in to create a store.",
      };
    }

    const name = formData.get("name")?.toString().trim();
    const location =
      formData.get("location")?.toString().trim() || "";
    const type =
      formData.get("type")?.toString().trim() ||
      "Retail Store";

    if (!name) {
      return {
        success: false,
        error: "Store name is required.",
      };
    }

    const db = await getDB();
    const now = new Date();

    const storeResult = await db.collection(collectionName).insertOne({
      name,
      location,
      type,
      ownerId: user.userId,
      createdAt: now,
      updatedAt: now,
    });

    await db.collection("storeMembers").insertOne({
      userId: user.userId,
      storeId: storeResult.insertedId,
      role: "owner",
      permissions: {
        view: true,
        create: true,
        update: true,
        delete: true,
      },
      createdAt: now,
    });

    return {
      success: true,
      store: {
        _id: storeResult.insertedId.toString(),
        name,
        location,
        type,
        role: "owner",
      },
    };
  } catch (error) {
    console.error("Create store failed:", error);

    return {
      success: false,
      error: "Failed to create store.",
    };
  }
}

// UPDATE STORE
export async function updateStoreAction(formData) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return {
        success: false,
        error: "You must be signed in to update a store.",
      };
    }

    const storeId = formData.get("storeId")?.toString();
    const name = formData.get("name")?.toString().trim();
    const location =
      formData.get("location")?.toString().trim() || "";
    const type =
      formData.get("type")?.toString().trim() ||
      "Retail Store";

    if (!storeId || !ObjectId.isValid(storeId)) {
      return {
        success: false,
        error: "A valid store ID is required.",
      };
    }

    if (!name) {
      return {
        success: false,
        error: "Store name is required.",
      };
    }

    const membership = await getStoreMembership(storeId);

    if (!membership) {
      return {
        success: false,
        error: "You do not have access to this store.",
      };
    }

    if (!hasStorePermission(membership, "update")) {
      return {
        success: false,
        error: "You do not have permission to update this store.",
      };
    }

    const db = await getDB();

    const result = await db.collection(collectionName).updateOne(
      {
        _id: new ObjectId(storeId),
      },
      {
        $set: {
          name,
          location,
          type,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: "Store not found.",
      };
    }

    return {
      success: true,
      message: "Store updated successfully.",
    };
  } catch (error) {
    console.error("Update store failed:", error);

    return {
      success: false,
      error: "Failed to update store.",
    };
  }
}

// DELETE STORE
export async function deleteStoreAction(storeId) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return {
        success: false,
        error: "You must be signed in to delete a store.",
      };
    }

    if (!storeId || !ObjectId.isValid(storeId)) {
      return {
        success: false,
        error: "A valid store ID is required.",
      };
    }

    const membership = await getStoreMembership(storeId);

    if (!membership) {
      return {
        success: false,
        error: "You do not have access to this store.",
      };
    }

    if (!hasStorePermission(membership, "delete")) {
      return {
        success: false,
        error: "You do not have permission to delete this store.",
      };
    }

    const db = await getDB();
    const storeObjectId = new ObjectId(storeId);

    const store = await db.collection(collectionName).findOne({
      _id: storeObjectId,
    });

    if (!store) {
      return {
        success: false,
        error: "Store not found.",
      };
    }

    await db.collection("products").deleteMany({
      storeId: storeObjectId,
    });

    await db.collection("storeMembers").deleteMany({
      storeId: storeObjectId,
    });

    await db.collection(collectionName).deleteOne({
      _id: storeObjectId,
    });

    return {
      success: true,
      message: "Store deleted successfully.",
    };
  } catch (error) {
    console.error("Delete store failed:", error);

    return {
      success: false,
      error: "Failed to delete store.",
    };
  }
}