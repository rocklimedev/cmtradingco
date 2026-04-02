"use client";

import { useState } from "react";
import Image from "next/image";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    {
      id: "tiles-stone",
      name: "Tiles & Stone",
      subcategories: [
        {
          name: "Indoor Tiles",
          image:
            "https://images.unsplash.com/photo-1706629503571-c165023a7792?w=400&q=80",
        },
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
    <div className="min-h-screen bg-background text-foreground px-6 py-10 font-lato">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Categories
            </h1>
            <p className="text-sm text-brand-muted">
              Manage categories and subcategories
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setEditingCat(null);
                resetForm();
                setShowCatModal(true);
              }}
              className="px-4 py-2 text-sm bg-brand-red text-white rounded-md hover:opacity-90"
            >
              + Category
            </button>

            <button
              onClick={() => {
                setEditingSub(null);
                resetForm();
                setShowSubModal(true);
              }}
              className="px-4 py-2 text-sm border border-border rounded-md hover:bg-accent"
            >
              + Subcategory
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 flex-wrap border-b border-border pb-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              onDoubleClick={() => {
                setEditingCat(cat);
                setForm({ name: cat.name });
                setShowCatModal(true);
              }}
              className={`px-4 py-2 text-sm rounded-md transition ${
                active === cat.id
                  ? "bg-brand-red text-white shadow-sm"
                  : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* SUBCATEGORY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {current.subcategories.map((sub) => (
            <div
              key={sub.name}
              onDoubleClick={() => {
                setEditingSub(sub);
                setForm(sub);
                setShowSubModal(true);
              }}
              className="group bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition"
            >
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={sub.image}
                  alt={sub.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-4">
                <p className="text-sm font-semibold">{sub.name}</p>
                <p className="text-xs text-brand-muted">
                  Double click to edit
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORY MODAL */}
      {showCatModal && (
        <Modal
          title={editingCat ? "Edit Category" : "Add Category"}
          onClose={() => setShowCatModal(false)}
        >
          <Input
            placeholder="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Button onClick={handleSaveCategory}>
            Save Category
          </Button>
        </Modal>
      )}

      {/* SUBCATEGORY MODAL */}
      {showSubModal && (
        <Modal
          title={editingSub ? "Edit Subcategory" : "Add Subcategory"}
          onClose={() => setShowSubModal(false)}
        >
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <Button onClick={handleSaveSub}>
            Save Subcategory
          </Button>
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
      className="w-full mt-3 px-4 py-2 bg-brand-red text-white rounded-md text-sm hover:opacity-90"
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