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

    const results = [];

    for (const store of stores) {
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

      results.push({
        ...store,
        _id: store._id.toString(),
        role: membership?.role || "staff",
        products: products.length,
        activeUnits,
        lowStock,
        teamMembers,
        inventoryValue,
      });
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("GET stores error:", error);

    return NextResponse.json(
      { error: "Failed to load stores" },
      { status: 500 }
    );
  }
}