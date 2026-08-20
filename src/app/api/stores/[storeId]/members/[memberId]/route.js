import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";

export async function PATCH(request, { params }) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { storeId, memberId } = await params;

    if (!storeId || !memberId) {
      return NextResponse.json(
        { error: "Store ID and member ID are required." },
        { status: 400 }
      );
    }

    let storeObjectId;
    let memberObjectId;

    try {
      storeObjectId = new ObjectId(storeId);
    } catch {
      return NextResponse.json(
        { error: "Invalid store ID." },
        { status: 400 }
      );
    }

    try {
      memberObjectId = new ObjectId(memberId);
    } catch {
      return NextResponse.json(
        { error: "Invalid member ID." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const db = await getDB();

    const requesterMembership = await db
      .collection("storeMembers")
      .findOne({
        userId: sessionUser.userId,
        storeId: storeObjectId,
      });

    if (!requesterMembership) {
      return NextResponse.json(
        { error: "You do not have access to this store." },
        { status: 403 }
      );
    }

    if (
      requesterMembership.role !== "owner" &&
      requesterMembership.role !== "manager"
    ) {
      return NextResponse.json(
        { error: "You do not have permission to manage members." },
        { status: 403 }
      );
    }

    const membership = await db
      .collection("storeMembers")
      .findOne({
        _id: memberObjectId,
        storeId: storeObjectId,
      });

    if (!membership) {
      return NextResponse.json(
        { error: "Store member not found." },
        { status: 404 }
      );
    }

    if (membership.role === "owner") {
      return NextResponse.json(
        { error: "Owner permissions cannot be changed." },
        { status: 403 }
      );
    }

    const permissions = body.permissions;

    if (!permissions || typeof permissions !== "object") {
      return NextResponse.json(
        { error: "Valid permissions are required." },
        { status: 400 }
      );
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
      // Leave user as null if userId is invalid
    }

    return NextResponse.json({
      member: {
        _id: membership._id.toString(),
        userId: membership.userId,
        name: user?.name || "Unknown User",
        email: user?.email || "No email",
        picture: user?.picture || null,
        role: membership.role || "staff",
        permissions: updatedPermissions,
      },
    });
  } catch (error) {
    console.error("PATCH store member error:", error);

    return NextResponse.json(
      { error: "Failed to update member permissions." },
      { status: 500 }
    );
  }
}