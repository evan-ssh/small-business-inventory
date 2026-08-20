import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";

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

    const currentMembership = await db
      .collection("storeMembers")
      .findOne({
        userId: sessionUser.userId,
        storeId: storeObjectId,
      });

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

export async function POST(request, { params }) {
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

    const body = await request.json();
    const email = body.email?.trim().toLowerCase();
    const role = body.role || "staff";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!["staff", "manager"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid member role." },
        { status: 400 }
      );
    }

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
        { error: "You do not have permission to add members." },
        { status: 403 }
      );
    }

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "No user account was found with that email." },
        { status: 404 }
      );
    }

    const existingMembership = await db
      .collection("storeMembers")
      .findOne({
        userId: user._id.toString(),
        storeId: storeObjectId,
      });

    if (existingMembership) {
      return NextResponse.json(
        { error: "This user is already a member of this store." },
        { status: 409 }
      );
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

    return NextResponse.json(
      {
        member: {
          _id: result.insertedId.toString(),
          userId: user._id.toString(),
          name: user.name || "Unknown User",
          email: user.email || email,
          picture: user.picture || null,
          role,
          permissions,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST store member error:", error);

    return NextResponse.json(
      { error: "Failed to add store member." },
      { status: 500 }
    );
  }
}