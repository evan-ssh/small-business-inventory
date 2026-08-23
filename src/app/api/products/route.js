import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';
import { ObjectId } from "mongodb";
import { getSessionUser } from "@/lib/session";
import { getStoreMembership } from "@/lib/store";

const collectionName = "products";


export async function GET(request) {
  try {
    const sessionUser = await getSessionUser();

    if (!sessionUser?.userId) {
      return NextResponse.json(
        { error: "Not signed in" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const storeIdValue = searchParams.get("storeId");

    if (!storeIdValue || !ObjectId.isValid(storeIdValue)) {
      return NextResponse.json(
        { error: "Valid storeId is required" },
        { status: 400 }
      );
    }

    const membership = await getStoreMembership(storeIdValue);

      if (!membership) {
       return NextResponse.json({ error: "You cannot access this store" },{ status: 403 });
      }

const db = await getDB();
const storeId = new ObjectId(storeIdValue);

    const products = await db
      .collection(collectionName)
      .find({ storeId })
      .toArray();

    console.log(
      `Loaded ${products.length} products for store ${storeIdValue}`
    );

    const normalizedProducts = products.map((product) => ({
      _id: product._id.toString(),
      description: product.description ?? "",
      sku: product.sku ?? "",
      type: product.type ?? "",
      qty: Number(product.qty ?? 0),
      threshold: Number(product.threshold ?? 10),
      price: Number(product.price ?? 0),
      status: product.status ?? "",
      transactionsThisMonth: Number(
        product.transactionsThisMonth ?? 0
      ),
      barcode: product.barcode ?? "",
      storeId: product.storeId?.toString() ?? storeIdValue,
      ownerId: product.ownerId?.toString() ?? "",
    }));

    return NextResponse.json(normalizedProducts);
  } catch (error) {
    console.error("GET products failed:", error);

    return NextResponse.json(
      {
        error: "Failed to get products",
        
      },
      { status: 500 }
    );
  }
}