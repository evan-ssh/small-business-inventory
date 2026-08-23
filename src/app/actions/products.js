"use server";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session"
import { ObjectId } from "mongodb";
import { getStoreMembership,hasStorePermission } from "@/lib/store";

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

//Create
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
        
        const membership = await getStoreMembership(storeIdValue);
    
        if (!membership) {return {success: false,error: "You do not have access to this store"};}


        if (!hasStorePermission(membership, "create")){
          return {success: false,error: "You do not have permission to create products",};
        }

        const db = await getDB();
        
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

  // UPDATE PRODUCT
  export async function updateProductAction(formData) {
    try {
      const sessionUser = await getSessionUser();

      if (!sessionUser) {
        return {
          success: false,
          error: "You must be signed in to update a product.",
        };
      }

      const productId = formData.get("id")?.toString();
      const description = formData.get("description")?.toString().trim();
      const sku = formData.get("sku")?.toString().trim() || "";
      const type = formData.get("type")?.toString().trim() || "";
      const qty = Number(formData.get("qty") ?? 0);
      const threshold = Number(formData.get("threshold") ?? 10);
      const price = Number(formData.get("price") ?? 0);

      if (!productId || !ObjectId.isValid(productId)) {
        return {
          success: false,
          error: "A valid product ID is required.",
        };
      }

      if (!description) {
        return {
          success: false,
          error: "Product description cannot be empty.",
        };
      }

      const db = await getDB();

      const product = await db.collection(collectionName).findOne({
        _id: new ObjectId(productId),
      });

      if (!product) {
        return {
          success: false,
          error: "Product not found.",
        };
      }

      const membership = await getStoreMembership(
        product.storeId.toString()
      );

      if (!membership) {
        return {
          success: false,
          error: "You do not have access to this store.",
        };
      }

      if (!hasStorePermission(membership, "update")) {
        return {
          success: false,
          error: "You do not have permission to update products.",
        };
      }

      await db.collection(collectionName).updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $set: {
            description,
            sku,
            type,
            qty,
            threshold,
            price,
            status: getProductStatus(qty, threshold),
          },
        }
      );

      return {
        success: true,
        message: "Product updated successfully.",
      };
    } catch (error) {
      console.error("Update product failed:", error);

      return {
        success: false,
        error: "Failed to update product.",
      };
    }
  }

  // DELETE PRODUCT
  export async function deleteProductAction(productId) {
    try {
      const sessionUser = await getSessionUser();

      if (!sessionUser) {
        return {
          success: false,
          error: "You must be signed in to delete a product.",
        };
      }

      if (!productId || !ObjectId.isValid(productId)) {
        return {
          success: false,
          error: "A valid product ID is required.",
        };
      }

      const db = await getDB();

      const product = await db.collection(collectionName).findOne({
        _id: new ObjectId(productId),
      });

      if (!product) {
        return {
          success: false,
          error: "Product not found.",
        };
      }

      const membership = await getStoreMembership(
        product.storeId.toString()
      );

      if (!membership) {
        return {
          success: false,
          error: "You do not have access to this store.",
        };
      }

      if (!hasStorePermission(membership, "delete")) {
        return {
          success: false,
          error: "You do not have permission to delete products.",
        };
      }

      await db.collection(collectionName).deleteOne({
        _id: new ObjectId(productId),
      });

      return {
        success: true,
        message: "Product deleted successfully.",
      };
    } catch (error) {
      console.error("Delete product failed:", error);

      return {
        success: false,
        error: "Failed to delete product.",
      };
    }
  }