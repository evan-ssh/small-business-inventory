import { z } from "zod";

export const recommendationSchema = z.object({
  inventoryAnalysis: z.array(
    z.object({
      product: z
        .string()
        .min(1)
        .describe("The exact product name/description from the store inventory"),

      category: z
        .string()
        .min(1)
        .describe("The type or category of the product"),

      currentStatus: z
        .enum(["Optimal", "Low Stock", "Depleted"])
        .describe("The current health status of the product based on quantity and threshold"),

      priority: z
        .enum(["Low", "Medium", "High"])
        .describe("How urgently the product should be restocked"),

      suggestedQuantity: z
        .number()
        .int()
        .min(0)
        .describe("The suggested quantity to order"),

      recommendedAction: z
        .string()
        .min(1)
        .describe("The specific operational action to take (e.g., 'Reorder immediately', 'Monitor sales velocity')"),

      reason: z
        .string()
        .min(1)
        .describe("Why this action is recommended based on stock levels and monthly transactions"),
    })
  ),

  newProductRecommendations: z.array(
    z.object({
      suggestedItem: z
        .string()
        .min(1)
        .describe("Name of a new product that fits the store's existing categories and top-selling trends"),

      category: z
        .string()
        .min(1)
        .describe("The category this new item belongs to"),

      rationale: z
        .string()
        .min(1)
        .describe("Why this item should be introduced based on current store sales and types"),
    })
  ),
});