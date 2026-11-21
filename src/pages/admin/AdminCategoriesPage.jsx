import React, { useState } from 'react';
import { useCategoryStore } from '../../store/useCategoryStore';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

export const AdminCategoriesPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategoryStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '', image: '', status: 'active' });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      status: cat.status || 'active',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, form);
    } else {
      addCategory(form);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222226] pb-5">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Department Taxonomy</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            {categories.length} departments active in navigation &amp; catalog filters
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 px-4 py-2.5 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-widest font-semibold rounded shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[#16161A] border border-[#25252B] rounded overflow-hidden flex flex-col justify-between">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#101014]">
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-black/70 px-2 py-0.5 rounded text-[10px] font-mono text-velora-gold uppercase">
                /{cat.slug}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="font-editorial text-xl font-medium text-white">{cat.name}</h3>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono uppercase">
                    {cat.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 font-light mt-2 line-clamp-2">{cat.description}</p>
              </div>

              <div className="pt-3 border-t border-[#25252B] flex justify-end space-x-2">
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="px-3 py-1 bg-[#202026] text-gray-300 hover:text-white rounded text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="px-3 py-1 bg-rose-950 text-rose-300 hover:text-white rounded text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#18181D] border border-[#2D2D35] max-w-md w-full rounded p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#25252B] pb-3">
              <h3 className="font-editorial text-xl text-white font-medium">
                {editingCategory ? 'Edit Department' : 'Create Department'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Footwear"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="shoes"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white font-mono text-[11px] focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-[#25252B] text-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-velora-gold text-black font-semibold rounded"
                >
                  Save Department
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
