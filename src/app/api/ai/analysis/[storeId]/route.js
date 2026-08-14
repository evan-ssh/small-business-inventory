import { NextResponse } from "next/server";
import { generateText, Output } from "ai";
import { ObjectId } from "mongodb";
import { getDB } from "@/lib/mongodb";
import { getSessionUser } from "@/lib/session";
import { groqModels } from "@/lib/ai/groq/model";
import { recommendationSchema } from "@/lib/ai/schemas/recommendation";

export async function GET(request, { params }) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const resolvedParams = await params;
    const storeId = resolvedParams.storeId;
    if (!storeId || !ObjectId.isValid(storeId)) {
      return NextResponse.json({ error: "Valid store ID is required" }, { status: 400 });
    }

    const db = await getDB();
    const storeObjectId = new ObjectId(storeId);

    const membership = await db.collection("storeMembers").findOne({
      userId: sessionUser.userId,
      storeId: storeObjectId,
    });

    if (!membership) {
      return NextResponse.json({ error: "Access denied to this store workspace" }, { status: 403 });
    }

    const products = await db
      .collection("products")
      .find({ storeId: storeObjectId })
      .toArray();

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: "No inventory products found to analyze." },
        { status: 404 }
      );
    }
    //Pre filter to avoid showing healthy stock items in the prompt 
    const ProductsNeedAttention = products.filter(
        (p) => p.status === "Low Stock" || p.status === "Depleted" || Number(p.qty) <= 5
      );
  
      if (ProductsNeedAttention.length === 0) {
        return NextResponse.json(
          { inventoryAnalysis: [], newProductRecommendations: [] },
          { status: 200 }
        );
      }
  
      const result = await generateText({
        model: groqModels("openai/gpt-oss-20b"),
        system: "You are an expert inventory logistic business analytics assistant. Evaluate items meticulously.",
        prompt: `Analyze the following workspace inventory data. 
        
        CRITICAL RULES:
        1. For the inventory health analysis, ONLY evaluate the items listed under "Items Needing Attention" below.
        2. For the new product recommendations, look at the "Full Store Inventory" to understand all existing categories and items so you can suggest creative complementary products.
  
        Items Needing Attention:
        ${JSON.stringify(ProductsNeedAttention, null, 2)}
  
        Full Store Inventory :
        ${JSON.stringify(products, null, 2)}`,
        
        output: Output.object({
          name: "inventory_analysis",
          description: "Structured inventory analysis and product recommendations",
          schema: recommendationSchema,
        }),
        maxRetries: 0,
        providerOptions: {
          groq: {
            reasoningEffort: "low",
          },
        },
        maxOutputTokens: 2500,
      });




    return NextResponse.json(result.output, { status: 200 });
  } catch (error) {
    console.error("AI Analysis Route Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI analysis." },
      { status: 500 }
    );
  }
}