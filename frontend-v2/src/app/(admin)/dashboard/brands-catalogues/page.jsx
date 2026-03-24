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
      image: "https://images.unsplash.com/photo-1567102109796-90071d28cb38?w=400&q=80",
      downloadUrl: "#",
    },
  ]);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);

  const [editingBrand, setEditingBrand] = useState(null);
  const [editingCat, setEditingCat] = useState(null);

  const [form, setForm] = useState({});

  const reset = () => setForm({});

  // BRAND SAVE
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

  // CATALOGUE SAVE
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
    <div className="min-h-screen bg-background px-6 py-12 font-[Lato] space-y-10">
      
      {/* BRANDS */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Brands</h2>
          <button
            onClick={() => {
              reset();
              setEditingBrand(null);
              setShowBrandModal(true);
            }}
            className="px-4 py-2 bg-foreground text-background rounded-md text-sm"
          >
            Add Brand
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {brands.map((b) => (
            <div
              key={b.id}
              onDoubleClick={() => {
                setEditingBrand(b);
                setForm(b);
                setShowBrandModal(true);
              }}
              className="bg-card border border-border rounded-lg p-4 flex items-center justify-center cursor-pointer hover:shadow-md"
            >
              <Image src={b.logo} alt={b.name} width={100} height={50} />
            </div>
          ))}
        </div>
      </section>

      {/* CATALOGUES */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Catalogues</h2>
          <button
            onClick={() => {
              reset();
              setEditingCat(null);
              setShowCatModal(true);
            }}
            className="px-4 py-2 bg-foreground text-background rounded-md text-sm"
          >
            Add Catalogue
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {catalogues.map((c) => (
            <div
              key={c.id}
              onDoubleClick={() => {
                setEditingCat(c);
                setForm(c);
                setShowCatModal(true);
              }}
              className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md"
            >
              <div className="relative h-32">
                <Image src={c.image} alt={c.brand} fill className="object-cover" />
              </div>
              <div className="p-3 text-sm font-medium">{c.brand}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND MODAL */}
      {showBrandModal && (
        <Modal title={editingBrand ? "Edit Brand" : "Add Brand"} onClose={() => setShowBrandModal(false)}>
          <input
            placeholder="Brand Name"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />
          <input
            placeholder="Logo URL"
            value={form.logo || ""}
            onChange={(e) => setForm({ ...form, logo: e.target.value })}
            className="input mt-3"
          />
          <button onClick={saveBrand} className="btn-primary mt-4">
            Save
          </button>
        </Modal>
      )}

      {/* CATALOGUE MODAL */}
      {showCatModal && (
        <Modal title={editingCat ? "Edit Catalogue" : "Add Catalogue"} onClose={() => setShowCatModal(false)}>
          <input
            placeholder="Brand"
            value={form.brand || ""}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="input"
          />
          <input
            placeholder="Image URL"
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="input mt-3"
          />
          <input
            placeholder="Download URL"
            value={form.downloadUrl || ""}
            onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })}
            className="input mt-3"
          />
          <button onClick={saveCatalogue} className="btn-primary mt-4">
            Save
          </button>
        </Modal>
      )}
    </div>
  );
}

/* Modal */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}