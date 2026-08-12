import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';
import { ObjectId } from "mongodb";
import { getSessionUser } from "@/lib/session";

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

    const db = await getDB();
    const storeId = new ObjectId(storeIdValue);

    const membership = await db
      .collection("storeMembers")
      .findOne({
        userId: sessionUser.userId,
        storeId,
      });

    if (!membership) {
      return NextResponse.json(
        { error: "You cannot access this store" },
        { status: 403 }
      );
    }

    const products = await db
      .collection(collectionName)
      .find({ storeId })
      .toArray();

    console.log(
      `Loaded ${products.length} products for store ${storeIdValue}`
    );

    // Explicit mapping avoids returning unexpected MongoDB/BSON values.
    const normalizedProducts = products.map((product) => ({
      _id: product._id.toString(),
      description: product.description ?? "",
      sku: product.sku ?? "",
      type: product.type ?? "",
      qty: Number(product.qty ?? 0),
      price: Number(product.price ?? 0),
      status: product.status ?? "",
      transactionsThisMonth: Number(
        product.transactionsThisMonth ?? 0
      ),
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








  export async function POST(request){
    
  try{
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
      return NextResponse.json({ error: "Not signed in" });
    }
    const db = await getDB();
    const product = await request.json();
    if (!product.storeId || !ObjectId.isValid(product.storeId)) {
      return NextResponse.json(
        { error: "Valid storeId is required" },
        { status: 400 }
      );
    }
    
    const storeId = new ObjectId(product.storeId);
    const membership = await db.collection("storeMembers").findOne({
      userId: sessionUser.userId,
      storeId,
    });

    if (!membership) {
      return NextResponse.json(
        { error: "You cannot add products to this store" },
        { status: 403 }
      );
    }
    await db.collection(collectionName).insertOne({
      description: product.description,
      sku: product.sku,
      type: product.type,
      qty: Number(product.qty),
      price: Number(product.price),
      status: product.status,
      transactionsThisMonth: Number(product.transactionsThisMonth ?? 0),
      storeId,
      ownerId: sessionUser.userId
    });
    return NextResponse.json({message: "Product created"})
      
    
  }catch(err){
    console.log(err)
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
  }