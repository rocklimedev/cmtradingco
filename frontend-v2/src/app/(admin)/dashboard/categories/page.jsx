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
          id: "indoor-tiles",
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

  /* ---------------- CATEGORY ---------------- */

  const handleSaveCategory = () => {
    if (!form.name) return;

    if (editingCat) {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCat.id ? { ...c, name: form.name } : c
        )
      );
    } else {
      const id = form.name.toLowerCase().replace(/\s+/g, "-");

      setCategories((prev) => [
        ...prev,
        { id, name: form.name, subcategories: [] },
      ]);

      setActive(id); // auto switch
    }

    setShowCatModal(false);
    setEditingCat(null);
    resetForm();
  };

  const deleteCategory = (id) => {
    const filtered = categories.filter((c) => c.id !== id);
    setCategories(filtered);

    if (active === id && filtered.length) {
      setActive(filtered[0].id);
    }
  };

  /* ---------------- SUBCATEGORY ---------------- */

  const handleSaveSub = () => {
    if (!form.name || !form.image) return;

    setCategories((prev) =>
      prev.map((c) => {
        if (c.id !== active) return c;

        if (editingSub) {
          return {
            ...c,
            subcategories: c.subcategories.map((s) =>
              s.id === editingSub.id ? { ...s, ...form } : s
            ),
          };
        }

        return {
          ...c,
          subcategories: [
            ...c.subcategories,
            {
              id: form.name.toLowerCase().replace(/\s+/g, "-"),
              ...form,
            },
          ],
        };
      })
    );

    setShowSubModal(false);
    setEditingSub(null);
    resetForm();
  };

  const deleteSub = (id) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === active
          ? {
              ...c,
              subcategories: c.subcategories.filter((s) => s.id !== id),
            }
          : c
      )
    );
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 font-lato">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Categories</h1>
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
              className="px-4 py-2 bg-brand-red text-white rounded-md text-sm"
            >
              + Category
            </button>

            <button
              onClick={() => {
                setEditingSub(null);
                resetForm();
                setShowSubModal(true);
              }}
              className="px-4 py-2 border border-border rounded-md text-sm"
            >
              + Subcategory
            </button>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-2 flex-wrap border-b border-border pb-3">
          {categories.map((cat) => (
            <div key={cat.id} className="relative group">
              <button
                onClick={() => setActive(cat.id)}
                onDoubleClick={() => {
                  setEditingCat(cat);
                  setForm({ name: cat.name });
                  setShowCatModal(true);
                }}
                className={`px-4 py-2 text-sm rounded-md ${
                  active === cat.id
                    ? "bg-brand-red text-white"
                    : "hover:bg-accent"
                }`}
              >
                {cat.name}
              </button>

              {/* DELETE */}
              <button
                onClick={() => deleteCategory(cat.id)}
                className="absolute -top-2 -right-2 text-xs bg-black text-white px-1 rounded hidden group-hover:block"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* SUBCATEGORY GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {current?.subcategories.map((sub) => (
            <div
              key={sub.id}
              onDoubleClick={() => {
                setEditingSub(sub);
                setForm(sub);
                setShowSubModal(true);
              }}
              className="group relative bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:shadow-lg"
            >
              <div className="relative h-36">
                <Image
                  src={sub.image}
                  alt={sub.name}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-4">
                <p className="text-sm font-semibold">{sub.name}</p>
              </div>

              {/* DELETE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteSub(sub.id);
                }}
                className="absolute top-1 right-1 text-xs bg-black/60 text-white px-2 py-0.5 rounded"
              >
                ✕
              </button>
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
      className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm"
    />
  );
}

/* BUTTON */
function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full mt-3 px-4 py-2 bg-brand-red text-white rounded-md text-sm"
    >
      {children}
    </button>
  );
}

/* MODAL */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-5">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}