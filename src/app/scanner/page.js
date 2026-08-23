import { Suspense } from "react";
import BarcodeCenter from "@/components/scanner/BarcodeCenter";

export default function ScannerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
          <p className="text-xs font-semibold uppercase tracking-wider">
            Loading Barcode Center...
          </p>
        </div>
      }
    >
      <BarcodeCenter />
    </Suspense>
  );
}