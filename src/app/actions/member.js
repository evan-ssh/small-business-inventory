"use server";

import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";
import { getStoreMembership } from "@/lib/store";
 async function addMemberAction(storeId, email, role) {
    try {
      const sessionUser = await getSessionUser();
  
      if (!sessionUser) {
        return {
          success: false,
          error: "Unauthorized",
        };
      }
  
      if (!storeId) {
        return {
          success: false,
          error: "Store ID is required",
        };
      }
  
      if (!email) {
        return {
          success: false,
          error: "Email is required.",
        };
      }
  
      if (!["staff", "manager"].includes(role)) {
        return {
          success: false,
          error: "Invalid member role.",
        };
      }
  
      if (!ObjectId.isValid(storeId)) {
        return {
          success: false,
          error: "Invalid store ID.",
        };
      }
  
      const db = await getDB();
      const storeObjectId = new ObjectId(storeId);
  
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
          error: "You do not have permission to add members.",
        };
      }
  
      const user = await db
        .collection("users")
        .findOne({
          email: email.trim().toLowerCase(),
        });
  
      if (!user) {
        return {
          success: false,
          error: "No user account was found with that email.",
        };
      }
  
      const existingMembership = await db
        .collection("storeMembers")
        .findOne({
          userId: user._id.toString(),
          storeId: storeObjectId,
        });
  
      if (existingMembership) {
        return {
          success: false,
          error: "This user is already a member of this store.",
        };
      }
  
      const permissions = {
        view: true,
        create: false,
        update: false,
        delete: false,
      };
  
      const membership = {
        userId: user._id.toString(),
        storeId: storeObjectId,
        role,
        permissions,
        createdAt: new Date(),
      };
  
      const result = await db
        .collection("storeMembers")
        .insertOne(membership);
  
      return {
        success: true,
        member: {
          _id: result.insertedId.toString(),
          userId: user._id.toString(),
          name: user.name || "Unknown User",
          email: user.email || email,
          picture: user.picture || null,
          role,
          permissions,
        },
      };
    } catch (error) {
      console.error("Add member failed:", error);
  
      return {
        success: false,
        error: "Failed to add store member.",
      };
    }
  }