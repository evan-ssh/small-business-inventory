import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";

const collectionName = "products";


export async function PATCH(request,{params}){
    try{
        const db = await getDB();
        const updatedProduct = await request.json();
        const {id} = await params

        await db.collection(collectionName).updateOne(
            {
                _id: new ObjectId(id) 
            },
            {
            $set:{
                description: updatedProduct.description,
                sku: updatedProduct.sku,
                type: updatedProduct.type,
                qty: Number(updatedProduct.qty),
                price: Number(updatedProduct.price),
                status: updatedProduct.status,
              }
            }
          );
      
          return NextResponse.json({ message: "Product updated" });
        } catch (err) {
          console.log(err);
      
          return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
          );
        }
}