import { NextResponse } from 'next/server';

export async function GET(){
    const products = [
        { id: 1, description: "Electronics Chassis", sku: "SKU-9082-XL", type: "Hardware", qty: 412, price: 200, status: "Optimal" , },
        { id: 2, description: "High-Capacity Storage Drive", sku: "SKU-1104-MD", type: "Storage", qty: 14, price: 90, status: "Low Stock" },
        { id: 3, description: "Processing Core", sku: "SKU-4485-CR", type: "Processing", qty: 0, price: 130, status: "Depleted" },
        { id: 4, description: "Router", sku: "SKU-7731-HG", type: "Networking", qty: 89, price: 80, status: "Optimal" },
      ];
      
    return NextResponse.json(products)

}