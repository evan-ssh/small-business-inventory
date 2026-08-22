"use server";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session"
import { ObjectId } from "mongodb";


const collectionName = "products";

function getProductStatus(qty,threshold) {
  if (qty <= 0) {
    return "Depleted";
  }

  if (qty < threshold) {
    return "Low Stock";
  }

  return "Optimal";
}

export async function productAction(prevState, formData){
    try {
        const sessionUser = await getSessionUser();
        if (!sessionUser) {
            return {
              success: false,
              error: "You must be signed in to create a product",
            };
          }
      

        const description = formData.get("description")?.toString().trim();
        
        const sku = formData.get("sku")?.toString().trim();
        const type = formData.get("type")?.toString().trim();
        const qty = Number(formData.get("qty") ?? 0);
        const threshold = Number(formData.get("threshold") ?? 10);
        const price = Number(formData.get("price") ?? 0);
        const storeIdValue = formData.get("storeId")?.toString();
        if (!description) {
          return {
            success: false,
            error: "Product description cannot be empty",
          };
        }

        if (!storeIdValue || !ObjectId.isValid(storeIdValue)) {
          return {
            success: false,
            error: "A valid store workspace is required",
          };
        }

        const storeId = new ObjectId(storeIdValue);
        const db = await getDB();
    
 
        const membership = await db
          .collection("storeMembers")
          .findOne({
            userId: sessionUser.userId,
            storeId,
          });
    
        if (!membership) {
          return {
            success: false,
            error: "You do not have access to this store",
          };
        }
        if (membership.role !== "owner" && !membership.permissions?.create) {
          return {
            success: false,
            error: "You do not have permission to create products",
          };
        }

    //Insert Product        
    await db.collection(collectionName).insertOne({
        description,
        sku,
        type,
        qty,
        threshold,
        price,
        status:getProductStatus(qty,threshold),
        transactionsThisMonth:0,
        storeId,
        ownerId: sessionUser.userId,
    });

    return{success: true,error:""};

}catch(err){
    console.log(err)
    return{
        success:false,error:"Failed to create new product"
    }
}}