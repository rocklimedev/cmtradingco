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
      brandId: "grohe",
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

  const getBrandName = (id) =>
    brands.find((b) => b.id === id)?.name || "Unknown";

  /* ---------------- BRAND CRUD ---------------- */

  const saveBrand = () => {
    if (!form.name || !form.logo) return;

    if (editingBrand) {
      setBrands((prev) =>
        prev.map((b) => (b.id === editingBrand.id ? { ...b, ...form } : b)),
      );
    } else {
      const id = form.name.toLowerCase().replace(/\s+/g, "-");

      setBrands((prev) => [
        ...prev,
        {
          id,
          name: form.name,
          logo: form.logo,
        },
      ]);
    }

    setShowBrandModal(false);
    setEditingBrand(null);
    reset();
  };

  const deleteBrand = (id) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    setCatalogues((prev) => prev.filter((c) => c.brandId !== id));
  };

  /* ---------------- CATALOGUE CRUD ---------------- */

  const saveCatalogue = () => {
    if (!form.brandId || !form.image || !form.downloadUrl) return;

    if (editingCat) {
      setCatalogues((prev) =>
        prev.map((c) => (c.id === editingCat.id ? { ...c, ...form } : c)),
      );
    } else {
      setCatalogues((prev) => [
        ...prev,
        {
          id: `cat-${Date.now()}`,
          ...form,
        },
      ]);
    }

    setShowCatModal(false);
    setEditingCat(null);
    reset();
  };

  const deleteCatalogue = (id) => {
    setCatalogues((prev) => prev.filter((c) => c.id !== id));
  };

  /* ---------------- UI ---------------- */

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
                className="group relative bg-card border border-border rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-lg transition cursor-pointer"
              >
                <Image
                  src={b.logo}
                  alt={b.name}
                  width={100}
                  height={50}
                  className="object-contain grayscale group-hover:grayscale-0 transition"
                />

                {/* DELETE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteBrand(b.id);
                  }}
                  className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded"
                >
                  ✕
                </button>
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
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative h-36">
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-4">
                  <p className="text-sm font-semibold">
                    {getBrandName(c.brandId)}
                  </p>

                  <a
                    href={c.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block mt-2 text-xs text-brand-red hover:underline"
                  >
                    Download →
                  </a>
                </div>

                {/* DELETE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCatalogue(c.id);
                  }}
                  className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded"
                >
                  ✕
                </button>
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
          <select
            value={form.brandId || ""}
            onChange={(e) => setForm({ ...form, brandId: e.target.value })}
            className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
          >
            <option value="">Select Brand</option>
            {brands.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Image URL"
            value={form.image || ""}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <Input
            placeholder="Download URL"
            value={form.downloadUrl || ""}
            onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })}
          />

          <Button onClick={saveCatalogue}>Save Catalogue</Button>
        </Modal>
      )}
    </div>
  );
}

/* INPUT */
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
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
