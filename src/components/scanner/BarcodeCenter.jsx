"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import bwipjs from "@bwip-js/browser";
import {
  Html5QrcodeScanner,
  Html5QrcodeScanType,
} from "html5-qrcode";

export default function BarcodeCenter() {
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");

  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [scannedProduct, setScannedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scannerKey, setScannerKey] = useState(0);

  const barcodeCanvasRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      if (!storeId) {
        setError("A store workspace is required.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/products?storeId=${storeId}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Failed to load products."
          );
        }

        setProducts(data);

        if (data.length > 0) {
          setSelectedProductId(data[0]._id);
        }
      } catch (error) {
        console.error("Failed to load products:", error);

        setError(
          error.message || "Failed to load products."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [storeId]);

  const selectedProduct = products.find(
    (product) => product._id === selectedProductId
  );

  useEffect(() => {
    if (
      !selectedProduct?.barcode ||
      !barcodeCanvasRef.current
    ) {
      return;
    }

    try {
      bwipjs.toCanvas(barcodeCanvasRef.current, {
        bcid: "code128",
        text: selectedProduct.barcode,
        scale: 5,
        height: 30,
        includetext: true,
        textxalign: "center",
        paddingwidth: 10,
        paddingheight: 10,
      });
    } catch (error) {
      console.error(
        "Barcode generation failed:",
        error
      );

      setError("Failed to generate barcode.");
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (!storeId || products.length === 0) {
      return;
    }

    const scanner = new Html5QrcodeScanner(
      `barcode-reader-${scannerKey}`,
      {
        fps: 10,
        qrbox: {
          width: 320,
          height: 160,
        },
        rememberLastUsedCamera: true,
        supportedScanTypes: [
          Html5QrcodeScanType.SCAN_TYPE_CAMERA,
        ],
      },
      false
    );

    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        const scannedValue = decodedText.trim();

        setScannedBarcode(scannedValue);

        const matchingProduct = products.find(
          (product) =>
            product.barcode?.trim() === scannedValue
        );

        if (!matchingProduct) {
          setScannedProduct(null);
          return;
        }

        setScannedProduct(matchingProduct);

        try {
          await scanner.clear();
          scannerRef.current = null;
        } catch (error) {
          console.error(
            "Failed to stop scanner:",
            error
          );
        }
      },
      () => {
        // Ignore repeated scanner errors while the camera is running.
      }
    );

    return () => {
      scanner.clear().catch(() => {});
      scannerRef.current = null;
    };
  }, [products, storeId, scannerKey]);

  function handlePrint() {
    window.print();
  }

  function handleScanAgain() {
    setScannedBarcode("");
    setScannedProduct(null);
    setScannerKey((currentKey) => currentKey + 1);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-28 text-white sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="border-b border-white/10 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-red-300">
            Inventory Tools
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Barcode Center
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Generate printable product barcodes and scan
            them using a phone or computer camera.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Barcode Generator */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Generator
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Product Barcode
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Select a product to view and print its
                barcode.
              </p>
            </div>

            {loading ? (
              <p className="text-sm text-slate-400">
                Loading products...
              </p>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
                <p className="text-sm text-slate-400">
                  No products are available in this
                  store.
                </p>
              </div>
            ) : (
              <>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Product
                </label>

                <select
                  value={selectedProductId}
                  onChange={(event) =>
                    setSelectedProductId(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-red-400/50"
                >
                  {products.map((product) => (
                    <option
                      key={product._id}
                      value={product._id}
                    >
                      {product.description} —{" "}
                      {product.sku}
                    </option>
                  ))}
                </select>

                {selectedProduct && (
                  <div
                    id="printable-barcode"
                    className="mt-6 overflow-x-auto rounded-2xl bg-white p-8 text-center"
                  >
                    <p className="text-sm font-bold text-slate-900">
                      {selectedProduct.description}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      SKU: {selectedProduct.sku}
                    </p>

                    {selectedProduct.barcode ? (
                      <>
                        <div className="mt-6 flex min-w-[420px] justify-center">
                          <canvas
                            ref={barcodeCanvasRef}
                          />
                        </div>

                        <p className="mt-3 text-xs text-slate-500">
                          {selectedProduct.barcode}
                        </p>
                      </>
                    ) : (
                      <p className="mt-6 text-sm text-red-500">
                        This product does not have a
                        barcode yet.
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={!selectedProduct?.barcode}
                  className="mt-6 w-full rounded-xl bg-red-600 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Print Barcode
                </button>
              </>
            )}
          </section>

          {/* Scanner */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 shadow-2xl">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Scanner
              </p>

              <h2 className="mt-1 text-xl font-bold">
                Scan Product
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Open this page on your phone and scan a
                barcode from your screen or a printed
                label.
              </p>
            </div>

            {!scannedProduct && (
              <div
                id={`barcode-reader-${scannerKey}`}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
              />
            )}

            {scannedBarcode && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Scanned Barcode
                </p>

                <p className="mt-2 font-mono text-lg text-white">
                  {scannedBarcode}
                </p>
              </div>
            )}

            {scannedProduct && (
              <div className="mt-4 rounded-2xl border border-green-500/20 bg-green-500/10 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-green-300">
                  Product Found
                </p>

                <h3 className="mt-2 text-lg font-bold text-white">
                  {scannedProduct.description}
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-slate-500">
                      SKU
                    </p>

                    <p className="text-white">
                      {scannedProduct.sku}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Stock
                    </p>

                    <p className="text-white">
                      {scannedProduct.qty}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Price
                    </p>

                    <p className="text-white">
                      $
                      {Number(
                        scannedProduct.price
                      ).toFixed(2)}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">
                      Status
                    </p>

                    <p className="text-white">
                      {scannedProduct.status}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleScanAgain}
                  className="mt-5 w-full rounded-xl bg-red-600 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-red-500"
                >
                  Scan Another Product
                </button>
              </div>
            )}

            {scannedBarcode && !scannedProduct && (
              <div className="mt-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5">
                <p className="text-sm text-yellow-200">
                  Barcode was scanned, but no matching
                  product was found in this store.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}