"use client";

import { useEffect, useState } from "react";
import EditMenuFields from "./EditMenuFields";
import DeletePopup from "./DeletePopup";

function getStatusFromQty(qty) {
  if (qty <= 0) {
    return "Depleted";
  }

  if (qty < 20) {
    return "Low Stock";
  }

  return "Optimal";
}

export default function EditMenu({ product, onClose,onUpdate }) {
  const [errMsg, setErr] = useState("");  
  const [formData, setFormData] = useState({
      description: "",
      sku: "",
      type: "",
      qty: "",
      price:""
    });
  
    const [editableFields, setEditableFields] = useState({
      description: false,
      sku: false,
      type: false,
      qty: false,
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

      if (!description) {setErr("Product description cannot be empty.");return;}
      if (!sku) {setErr("SKU code cannot be empty."); return;}

      const updatedProduct = {
        description: formData.description.trim(),
        sku: formData.sku.trim(),
        type: formData.type.trim(),
        qty: Number(formData.qty ?? 0),
        price: Number(formData.price ?? 0),
        status: getStatusFromQty(Number(formData.qty ?? 0)),
      };
      try{
        const response = await fetch(`/api/products/${product._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
          
        });

        if (!response.ok) {
          throw new Error("Failed to update product.");
        }
       
        await onUpdate();
        onClose();

    
      }catch(err){
        console.log(err)
      }
    }

  
async function handleDeleteConfirm(productToDelete) {
  try{
    const response = await fetch(`/api/products/${productToDelete._id}`,{
    method:"DELETE",
  });
  if(!response.ok){
    return false;
  }

  await onUpdate();
  onClose();

  return true;
  }catch(err){
    console.log(err);
    return false
    }
  }
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm">
        <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl shadow-black/40">
          <form onSubmit={handleSave}>
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] p-6">
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
  
            <EditMenuFields
              currFormValues={formData}
              editableFields={editableFields}
              onEnableEdit={enableEdit}
              onChange={handleChange}
            />
            {errMsg && (<p className="px-6 pb-4 text-sm font-medium text-red-400">
              {errMsg}
            </p>
          )}
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