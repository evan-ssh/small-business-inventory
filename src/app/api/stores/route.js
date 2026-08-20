import { NextResponse } from "next/server";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";

export async function GET() {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const db = await getDB();

    const memberships = await db
      .collection("storeMembers")
      .find({
        userId: user.userId,
      })
      .toArray();

    const storeIds = memberships.map(
      (membership) => membership.storeId
    );

    const stores = await db
      .collection("stores")
      .find({
        _id: {
          $in: storeIds,
        },
      })
      .toArray();

    const results = await Promise.all(
      stores.map(async (store) => {
        const membership = memberships.find(
          (item) =>
            item.storeId.toString() ===
            store._id.toString()
        );

        const products = await db
          .collection("products")
          .find({
            storeId: store._id,
          })
          .project({
            qty: 1,
            price: 1,
            status: 1,
          })
          .toArray();

        const teamMembers = await db
          .collection("storeMembers")
          .countDocuments({
            storeId: store._id,
          });

        const activeUnits = products.reduce(
          (total, product) =>
            total + Number(product.qty ?? 0),
          0
        );

        const lowStock = products.filter(
          (product) =>
            product.status === "Low Stock" ||
            product.status === "Depleted"
        ).length;

        const inventoryValue = products.reduce(
          (total, product) =>
            total +
            Number(product.qty ?? 0) *
              Number(product.price ?? 0),
          0
        );

        return {
          ...store,
          _id: store._id.toString(),
          role: membership?.role || "staff",

          products: products.length,
          activeUnits,
          lowStock,
          teamMembers,
          inventoryValue,
        };
      })
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET stores error:", error);

    return NextResponse.json(
      { error: "Failed to load stores" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const name = body.name?.toString().trim();

    if (!name) {
      return NextResponse.json(
        { error: "Store name is required" },
        { status: 400 }
      );
    }

    const db = await getDB();
    const now = new Date();

    const storeResult = await db
      .collection("stores")
      .insertOne({
        name,
        location: body.location?.toString().trim() || "",
        type: body.type?.toString().trim() || "Retail Store",
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

    return NextResponse.json(
      {
        _id: storeResult.insertedId.toString(),
        name,
        location: body.location?.toString().trim() || "",
        type: body.type?.toString().trim() || "Retail Store",
        role: "owner",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST stores error:", error);

    return NextResponse.json(
      { error: "Failed to create store" },
      { status: 500 }
    );
  }
}