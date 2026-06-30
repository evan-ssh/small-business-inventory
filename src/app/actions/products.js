"use server";
import { getDB } from "@/lib/mongodb";

const collectionName = "products";

function getStatusFromQty(qty) {
  if (qty <= 0) {
    return "Depleted";
  }

  if (qty < 20) {
    return "Low Stock";
  }

  return "Optimal";
}

export async function productAction(prevState, formData){
    try {
        const description = formData.get("description")?.toString().trim();
        const sku = formData.get("sku")?.toString().trim();
        const type = formData.get("type")?.toString().trim();
        const qty = Number(formData.get("qty") ?? 0);
        const price = Number(formData.get("price") ?? 0);
        
        if(!description){
            return{success:false,error:"Product description cannot be empty "}
        };
    

    const db = await getDB();

    await db.collection(collectionName).insertOne({
        description,
        sku,
        type,
        qty,
        price,
        status:getStatusFromQty(qty),
        transactionsThisMonth:0
    });

    return{success: true,error:""};

}catch(err){
    console.log(err)
    return{
        success:false,error:"Failed to create new product"
    }
}}