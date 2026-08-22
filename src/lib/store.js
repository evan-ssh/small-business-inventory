import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";

// Helper functions for checking store membership, roles, and permissions

// Get the user's membership for a store
export async function getStoreMembership(storeId) {
  const sessionUser = await getSessionUser();

  if (!sessionUser) {
    return null;
  }

  if (!ObjectId.isValid(storeId)) {
    return null;
  }

  const db = await getDB();

  const membership = await db.collection("storeMembers").findOne({
    userId: sessionUser.userId,
    storeId: new ObjectId(storeId),
  });

  return membership;
}

//Get the permissions a user has for a store
export function hasStorePermission(membership, permission) {
    if (!membership) {
      return false;
    }
  
    if (membership.role === "owner") {
      return true; 
    }
  
    return membership.permissions?.[permission] === true;
  }


//Check if a user has a role 

export function hasStoreRole(membership, roles) {
  if (!membership) {
    return false;
  }

  return roles.includes(membership.role);
}