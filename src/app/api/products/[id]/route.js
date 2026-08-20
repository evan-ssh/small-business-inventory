import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";

const collectionName = "products";


export async function PATCH(request,{params}){
    try{
        const sessionUser = await getSessionUser();

        if (!sessionUser) {
        return NextResponse.json({ error: "Not signed in" },{ status: 401 });
        }

        const db = await getDB();
        const updatedProduct = await request.json();
        const {id} = await params

        const product = await db.collection(collectionName).findOne({
            _id: new ObjectId(id),
          });
          if (!product) {
            return NextResponse.json(
              { error: "Product not found" },
              { status: 404 }
            );
          }

            // Check the user's membership in the product's store
        const membership = await db.collection("storeMembers").findOne({
        userId: sessionUser.userId,
        storeId: product.storeId,
        });

        if (!membership) {
        return NextResponse.json(
            { error: "You do not have access to this store" },
            { status: 403 }
        );
        }

        // Owners have full access
        if (
        membership.role !== "owner" &&
        !membership.permissions?.update
        ) {
        return NextResponse.json(
            { error: "You do not have permission to update products" },
            { status: 403 }
        );
        }


        await db.collection(collectionName).updateOne(
            {
                _id: new ObjectId(id), 
            },
            {
            $set:{
                description: updatedProduct.description,
                sku: updatedProduct.sku,
                type: updatedProduct.type,
                qty: Number(updatedProduct.qty),
                price: Number(updatedProduct.price),
                status: updatedProduct.status,
                threshold: Number(updatedProduct.threshold ?? 10),
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


export async function DELETE(_request, {params}){
    try{
        const sessionUser = await getSessionUser();

        if (!sessionUser) {
        return NextResponse.json({ error: "Not signed in" },{ status: 401 });
        }
        const db = await getDB();
        const {id} = await params;
        const product = await db.collection(collectionName).findOne({
            _id: new ObjectId(id),
          });
      
          if (!product) {
            return NextResponse.json(
              { error: "Product not found" },
              { status: 404 }
            );
          }

          // Check the user's membership in the product's store
        const membership = await db.collection("storeMembers").findOne({
        userId: sessionUser.userId,
        storeId: product.storeId,
        });

        if (!membership) {
        return NextResponse.json(
            { error: "You do not have access to this store" },
            { status: 403 }
        );
        }

        // Owners have full access
        if (
        membership.role !== "owner" &&
        !membership.permissions?.delete
        ) {
        return NextResponse.json(
            { error: "You do not have permission to delete products" },
            { status: 403 }
        );
        }

        await db.collection(collectionName).deleteOne({
            _id: new ObjectId(id),

        }); 

        return NextResponse.json({message:"Product deleted "})
    }catch(err){
        console.log(err)
        return NextResponse.json({error:"Failed to delete"},{status:500})
    };
}