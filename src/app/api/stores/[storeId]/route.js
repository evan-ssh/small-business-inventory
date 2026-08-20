import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";

export async function GET(request, { params }) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json(
        { allowed: false, error: "Not signed in" },
        { status: 401 }
      );
    }

    const { storeId } = await params;

    if (!storeId) {
      return NextResponse.json(
        { allowed: false, error: "Store ID is required" },
        { status: 400 }
      );
    }

    let storeObjectId;

    try {
      storeObjectId = new ObjectId(storeId);
    } catch {
      return NextResponse.json(
        { allowed: false, error: "Invalid store ID" },
        { status: 400 }
      );
    }

    const db = await getDB();

    const membership = await db
      .collection("storeMembers")
      .findOne({
        userId: sessionUser.userId,
        storeId: storeObjectId,
      });

    if (!membership) {
      return NextResponse.json(
        {
          allowed: false,
          error: "You do not have access to this store.",
        },
        { status: 403 }
      );
    }

    const store = await db
      .collection("stores")
      .findOne({
        _id: storeObjectId,
      });

    if (!store) {
      return NextResponse.json(
        { allowed: false, error: "Store not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      allowed: true,
      storeId: store._id.toString(),
      role: membership.role,
      user: {
        userId: sessionUser.userId,
        email: sessionUser.email,
        name: sessionUser.name,
        picture: sessionUser.picture,
      },
    });
  } catch (error) {
    console.error("GET store access error:", error);

    return NextResponse.json(
      {
        allowed: false,
        error: "Failed to check store access.",
      },
      { status: 500 }
    );
  }
}