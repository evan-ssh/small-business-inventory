"use client";

function EditableField({ label, name, value, type = "text", isEditing, onEdit, onChange }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-red-400/30 hover:bg-white/[0.05]">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</label>
        <button
          type="button"
          onClick={onEdit}
          className="opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 rounded-lg border border-white/10 bg-white/10 px-2 py-1 text-xs text-white transition hover:bg-white hover:text-slate-950">
          ✏️
        </button>
      </div>

      <input
        name={name}
        type={type}
        value={value}
        readOnly={!isEditing}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${
          isEditing
            ? "border-red-400/40 bg-slate-900 text-white focus:ring-4 focus:ring-red-500/10"
            : "border-white/10 bg-slate-900/40 text-slate-400 cursor-default"
        }`}
      />
    </div>
  );
}

export default function EditMenuFields({
  currFormValues,                                                                     
  editableFields,
  onEnableEdit,
  onChange,
}) {
    return (
        <div className="space-y-4 p-6">
          <EditableField
            label="Description"
            name="description"
            value={currFormValues.description}
            isEditing={editableFields.description}
            onEdit={() => onEnableEdit("description")}
            onChange={onChange}
          />
        <EditableField
            label="SKU Code"
            name="sku"
            value={currFormValues.sku}
            isEditing={editableFields.sku}
            onEdit={() => onEnableEdit("sku")}
            onChange={onChange}
        />
          <EditableField
            label="Product Type"
            name="type"
            value={currFormValues.type}
            isEditing={editableFields.type}
            onEdit={() => onEnableEdit("type")}
            onChange={onChange}
          />
    
          <EditableField
            label="Quantity"
            name="qty"
            type="number"
            value={currFormValues.qty}
            isEditing={editableFields.qty}
            onEdit={() => onEnableEdit("qty")}
            onChange={onChange}
          />

        <EditableField
            label="$ / Unit"
            name="price"
            type="number"
            value={currFormValues.price}
            isEditing={editableFields.price}
            onEdit={() => onEnableEdit("price")}
            onChange={onChange}
        />


    </div>
  );
}