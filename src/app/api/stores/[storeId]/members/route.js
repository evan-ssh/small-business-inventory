import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";
import { getStoreMembership } from "@/lib/store";

export async function GET(request, { params }) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { storeId } = await params;

    if (!storeId) {
      return NextResponse.json(
        { error: "Store ID is required" },
        { status: 400 }
      );
    }

    let storeObjectId;

    try {
      storeObjectId = new ObjectId(storeId);
    } catch {
      return NextResponse.json(
        { error: "Invalid store ID" },
        { status: 400 }
      );
    }

    const db = await getDB();

    const currentMembership = await getStoreMembership(storeId);

    if (!currentMembership) {
      return NextResponse.json(
        { error: "You do not have access to this store." },
        { status: 403 }
      );
    }

    const memberships = await db
      .collection("storeMembers")
      .find({ storeId: storeObjectId })
      .toArray();

    const userObjectIds = memberships
      .map((member) => {
        try {
          return new ObjectId(member.userId);
        } catch {
          return null;
        }
      })
      .filter(Boolean);

    const users = await db
      .collection("users")
      .find({ _id: { $in: userObjectIds } })
      .toArray();

    const members = memberships.map((membership) => {
      const user = users.find(
        (user) =>
          user._id.toString() === membership.userId
      );

      return {
        _id: membership._id.toString(),
        userId: membership.userId,
        name: user?.name || "Unknown User",
        email: user?.email || "No email",
        picture: user?.picture || null,
        role: membership.role || "staff",
        permissions: membership.permissions || {
          view: true,
          create: false,
          update: false,
          delete: false,
        },
      };
    });

    return NextResponse.json({ members });
  } catch (error) {
    console.error("GET store members error:", error);

    return NextResponse.json(
      { error: "Failed to load store members." },
      { status: 500 }
    );
  }
}