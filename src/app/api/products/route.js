import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';


const collectionName = "products";


export async function GET(){
  try{
    const db = await getDB();


  
    const products = await db.collection(collectionName).find({}).toArray();

    console.log(`Loaded ${products.length} products from ${collectionName} collection`);
    const normalizedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
    }));
    return NextResponse.json(normalizedProducts)

  }catch(err){
    console.log(err);
  
    return NextResponse.json(
      {error:"Failed to get products"}, 
      {status:500}
    );
  }}

  export async function POST(request){
    
  try{
    const db = await getDB();
    const product = await request.json();
    await db.collection(collectionName).insertOne({
      description: product.description,
      sku: product.sku,
      type: product.type,
      qty: Number(product.qty),
      price: Number(product.price),
      status: product.status,
      transactionsThisMonth: Number(product.transactionsThisMonth ?? 0),
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