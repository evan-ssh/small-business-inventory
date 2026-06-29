import { NextResponse } from 'next/server';
import { getDB } from '@/lib/mongodb';


const collectionName = "products"


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