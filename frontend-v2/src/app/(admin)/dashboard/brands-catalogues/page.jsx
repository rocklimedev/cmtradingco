"use client";

import { useState } from "react";
import Image from "next/image";

export default function BrandsCataloguesPage() {
  const [brands, setBrands] = useState([
    { id: "grohe", name: "Grohe", logo: "/assets/brand_logos/grohe.png" },
  ]);

  const [catalogues, setCatalogues] = useState([
    {
      id: "cat-grohe",
      brand: "Grohe",
      image:
        "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=400&q=80",
      downloadUrl: "#",
    },
  ]);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);

  const [editingBrand, setEditingBrand] = useState(null);
  const [editingCat, setEditingCat] = useState(null);

  const [form, setForm] = useState({});

  const reset = () => setForm({});

  const saveBrand = () => {
    if (editingBrand) {
      setBrands((prev) =>
        prev.map((b) => (b.id === editingBrand.id ? { ...b, ...form } : b))
      );
    } else {
      setBrands((prev) => [
        ...prev,
        { id: form.name.toLowerCase(), ...form },
      ]);
    }
    setShowBrandModal(false);
    setEditingBrand(null);
    reset();
  };

  const saveCatalogue = () => {
    if (editingCat) {
      setCatalogues((prev) =>
        prev.map((c) => (c.id === editingCat.id ? { ...c, ...form } : c))
      );
    } else {
      setCatalogues((prev) => [
        ...prev,
        { id: `cat-${Date.now()}`, ...form },
      ]);
    }
    setShowCatModal(false);
    setEditingCat(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 font-lato">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Brands & Catalogues
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage your brands and downloadable catalogues
          </p>
        </div>

        {/* BRANDS */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Brands</h2>
            <button
              onClick={() => {
                reset();
                setEditingBrand(null);
                setShowBrandModal(true);
              }}
              className="px-4 py-2 rounded-md text-sm bg-brand-red text-white hover:opacity-90"
            >
              + Add Brand
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {brands.map((b) => (
              <div
                key={b.id}
                onDoubleClick={() => {
                  setEditingBrand(b);
                  setForm(b);
                  setShowBrandModal(true);
                }}
                className="group bg-card border border-border rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-lg transition-all cursor-pointer"
              >
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={100}
                  height={50}
                  className="object-contain grayscale group-hover:grayscale-0 transition"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CATALOGUES */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Catalogues</h2>
            <button
              onClick={() => {
                reset();
                setEditingCat(null);
                setShowCatModal(true);
              }}
              className="px-4 py-2 rounded-md text-sm bg-brand-red text-white hover:opacity-90"
            >
              + Add Catalogue
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {catalogues.map((c) => (
              <div
                key={c.id}
                onDoubleClick={() => {
                  setEditingCat(c);
                  setForm(c);
                  setShowCatModal(true);
                }}
                className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-36 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.brand}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4 space-y-1">
                  <p className="text-sm font-semibold">{c.brand}</p>
                  <p className="text-xs text-brand-muted">
                    Click to edit catalogue
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* BRAND MODAL */}
      {showBrandModal && (
        <Modal
          title={editingBrand ? "Edit Brand" : "Add Brand"}
          onClose={() => setShowBrandModal(false)}
        >
          <Input
            placeholder="Brand Name"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Logo URL"
            value={form.logo || ""}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
          />
          <Button onClick={saveBrand}>Save Brand</Button>
        </Modal>
      )}

      {/* CATALOGUE MODAL */}
      {showCatModal && (
        <Modal
          title={editingCat ? "Edit Catalogue" : "Add Catalogue"}
          onClose={() => setShowCatModal(false)}
        >
          <Input
            placeholder="Brand"
            value={form.brand || ""}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
          />
          <Input
            placeholder="Image URL"
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
          <Input
            placeholder="Download URL"
            value={form.downloadUrl || ""}
            onChange={(e) =>
              setForm({ ...form, downloadUrl: e.target.value })
            }
          />
          <Button onClick={saveCatalogue}>Save Catalogue</Button>
        </Modal>
      )}
    </div>
  );
}

/* REUSABLE INPUT */
function Input(props) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
    />
  );
}

/* BUTTON */
function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full mt-2 px-4 py-2 bg-brand-red text-white rounded-md text-sm hover:opacity-90"
    >
      {children}
    </button>
  );
}

/* MODAL */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-5 animate-fade-in-up">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-brand-muted hover:text-foreground"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}