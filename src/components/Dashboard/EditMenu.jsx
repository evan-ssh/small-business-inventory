"use client";

import { useEffect, useState } from "react";
import EditMenuFields from "./EditMenuFields";
import DeletePopup from "./DeletePopup";
import {updateProductAction,deleteProductAction} from "@/app/actions/products";


export default function EditMenu({ product, onClose,onUpdate }) {
  const [errMsg, setErr] = useState("");  
  const [formData, setFormData] = useState({
      description: "",
      sku: "",
      type: "",
      qty: "",
      threshold:"",
      price:""
    });
  
    const [editableFields, setEditableFields] = useState({
      description: false,
      sku: false,
      type: false,
      qty: false,
      threshold:false,
      price:false,
    });
  
    const [showDeletePopup, setShowDeletePopup] = useState(false);
  
    useEffect(() => {
      if (product) {
        setFormData({
          description: product.description,
          sku: product.sku,
          type: product.type,
          qty: product.qty,
          threshold: product.threshold ?? 10,
          price: product.price,
        });
      }
    }, [product]);
  
    function handleChange(e) {
      const { name, value } = e.target;
  
      setFormData((currentData) => ({
        ...currentData,
        [name]: value,
      }));
      setErr("");
    }
  
    function enableEdit(fieldName) {
      setEditableFields((currentFields) => ({
        ...currentFields,
        [fieldName]: true,
      }));
    }
  
    async function handleSave(e) {
      e.preventDefault();
    
      const description = formData.description.trim();
      const sku = formData.sku.trim();
    
      if (!description) {
        setErr("Product description cannot be empty.");
        return;
      }
    
      if (!sku) {
        setErr("SKU code cannot be empty.");
        return;
      }
    
      const actionFormData = new FormData();
    
      actionFormData.append("id", product._id);
      actionFormData.append("description", description);
      actionFormData.append("sku", sku);
      actionFormData.append("type", formData.type.trim());
      actionFormData.append("qty", String(Number(formData.qty ?? 0)));
      actionFormData.append(
        "threshold",
        String(Number(formData.threshold ?? 10))
      );
      actionFormData.append(
        "price",
        String(Number(formData.price ?? 0))
      );
    
      setErr("");
    
      const result = await updateProductAction(actionFormData);
    
      if (!result.success) {
        setErr(result.error || "Failed to update product.");
        return;
      }
    
      await onUpdate();
      onClose();
    }
  
    async function handleDeleteConfirm(productToDelete) {
      const result = await deleteProductAction(productToDelete._id);
    
      if (!result.success) {
        return {
          success: false,
          error: result.error || "Failed to delete product.",
        };
      }
    
      await onUpdate();
      onClose();
    
      return {
        success: true,
      };
    }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
        <div className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40">
          <form onSubmit={handleSave} className="flex min-h-0 flex-col">
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.02] p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  SKU Code
                </p>
  
                <h2 className="mt-1 font-mono text-lg font-bold text-white">
                  {product.sku}
                </h2>
              </div>
  
              <button
                type="button"
                onClick={() => setShowDeletePopup(true)}
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-red-300 transition hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            </div>
          <div className="flex-1 overflow-y-auto">
          {errMsg && (
              <div className="mx-6 mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="text-sm font-medium text-red-400">
                  {errMsg}
                </p>
              </div>
            )}
            <EditMenuFields
              currFormValues={formData}
              editableFields={editableFields}
              onEnableEdit={enableEdit}
              onChange={handleChange}
            />
          
          </div>
            <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.02] p-6">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-slate-950"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                className="rounded-xl bg-red-600 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow transition hover:bg-red-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
  
        {showDeletePopup && (
          <DeletePopup
            product={product}
            onCancel={() => setShowDeletePopup(false)}
            onConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    );
  }