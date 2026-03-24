"use client";

import { useState } from "react";
import Image from "next/image";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    {
      id: "tiles-stone",
      name: "Tiles & Stone",
      subcategories: [
        { name: "Indoor Tiles", image: "https://images.unsplash.com/photo-1706629503571-c165023a7792?w=400&q=80" },
      ],
    },
  ]);

  const [active, setActive] = useState(categories[0].id);

  const [showCatModal, setShowCatModal] = useState(false);
  const [showSubModal, setShowSubModal] = useState(false);

  const [editingCat, setEditingCat] = useState(null);
  const [editingSub, setEditingSub] = useState(null);

  const [form, setForm] = useState({ name: "", image: "" });

  const current = categories.find((c) => c.id === active);

  const resetForm = () => setForm({ name: "", image: "" });

  // CATEGORY SAVE
  const handleSaveCategory = () => {
    if (editingCat) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCat.id ? { ...c, name: form.name } : c
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: form.name.toLowerCase().replace(/\s+/g, "-"),
          name: form.name,
          subcategories: [],
        },
      ]);
    }

    setShowCatModal(false);
    setEditingCat(null);
    resetForm();
  };

  // SUBCATEGORY SAVE
  const handleSaveSub = () => {
    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== active) return c;

        if (editingSub) {
          return {
            ...c,
            subcategories: c.subcategories.map((s) =>
              s.name === editingSub.name ? form : s
            ),
          };
        }

        return {
          ...c,
          subcategories: [...c.subcategories, form],
        };
      })
    );

    setShowSubModal(false);
    setEditingSub(null);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-background px-6 py-12 font-[Lato] space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Categories</h1>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditingCat(null);
              resetForm();
              setShowCatModal(true);
            }}
            className="px-4 py-2 text-sm font-medium bg-foreground text-background rounded-md"
          >
            Add Category
          </button>

          <button
            onClick={() => {
              setEditingSub(null);
              resetForm();
              setShowSubModal(true);
            }}
            className="px-4 py-2 text-sm font-medium border border-border rounded-md"
          >
            Add Subcategory
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 border-b border-border pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            onDoubleClick={() => {
              setEditingCat(cat);
              setForm({ name: cat.name });
              setShowCatModal(true);
            }}
            className={`px-4 py-2 text-sm rounded-md ${
              active === cat.id
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:bg-accent"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Subcategories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {current.subcategories.map((sub) => (
          <div
            key={sub.name}
            onDoubleClick={() => {
              setEditingSub(sub);
              setForm(sub);
              setShowSubModal(true);
            }}
            className="bg-card border border-border rounded-lg overflow-hidden cursor-pointer hover:shadow-md"
          >
            <div className="relative h-32">
              <Image src={sub.image} alt={sub.name} fill className="object-cover" />
            </div>
            <div className="p-3 text-sm font-medium">{sub.name}</div>
          </div>
        ))}
      </div>

      {/* CATEGORY MODAL */}
      {showCatModal && (
        <Modal
          title={editingCat ? "Edit Category" : "Add Category"}
          onClose={() => setShowCatModal(false)}
        >
          <input
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />

          <button onClick={handleSaveCategory} className="btn-primary">
            Save
          </button>
        </Modal>
      )}

      {/* SUBCATEGORY MODAL */}
      {showSubModal && (
        <Modal
          title={editingSub ? "Edit Subcategory" : "Add Subcategory"}
          onClose={() => setShowSubModal(false)}
        >
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="input mt-3"
          />

          <button onClick={handleSaveSub} className="btn-primary mt-4">
            Save
          </button>
        </Modal>
      )}
    </div>
  );
}

/* Modal Component */
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