"use client";

function AddField({ label, name, value, type = "text", required = false, readOnly = false, onChange }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-red-400/30 hover:bg-white/[0.05]">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        required={required}
        readOnly={readOnly}
        onChange={onChange}
        className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${readOnly ? "border-white/10 bg-slate-900/40 text-slate-400 cursor-default" : "border-white/10 bg-slate-900 text-white focus:border-red-400/50 focus:ring-4 focus:ring-red-500/10"
        }`}
      />
    </div>
  );
}

export default function AddItemFields({
  currFormValues,
  calculatedStatus,
  onChange,
}) {
  return (
    <div className="space-y-4 p-6">
      <AddField label="Description"
        name="description"
        value={currFormValues.description}
        required={true}
        onChange={onChange}
      />

      <AddField
        label="SKU Code"
        name="sku"
        value={currFormValues.sku}
        onChange={onChange}
      />

      <AddField
        label="Product Type"
        name="type"
        value={currFormValues.type}
        onChange={onChange}
      />

      <AddField
        label="Quantity"
        name="qty"
        type="number"
        value={currFormValues.qty}
        onChange={onChange}
      />
      <AddField
        label="Low Stock Threshold"
        name="threshold"
        type="number"
        value={currFormValues.threshold}
        onChange={onChange}
      />
      <AddField
        label="$ / Unit"
        name="price"
        type="number"
        value={currFormValues.price}
        onChange={onChange}
        />

    </div>
  );
}