import React, { useState } from 'react';
import { useCollectionStore } from '../../store/useCollectionStore';
import { Plus, Edit2, Trash2, X, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminCollectionsPage = () => {
  const { collections, addCollection, updateCollection, deleteCollection } = useCollectionStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    slug: '',
    description: '',
    bannerImage: '',
    featured: true,
  });

  const handleOpenAdd = () => {
    setEditingCollection(null);
    setForm({
      title: '',
      subtitle: 'SPRING/SUMMER 2026',
      slug: '',
      description: '',
      bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920',
      featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (col) => {
    setEditingCollection(col);
    setForm({
      title: col.title,
      subtitle: col.subtitle || 'CURATED CAMPAIGN',
      slug: col.slug,
      description: col.description || '',
      bannerImage: col.bannerImage || '',
      featured: col.featured !== undefined ? col.featured : true,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    if (editingCollection) {
      updateCollection(editingCollection.id, form);
    } else {
      addCollection(form);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222226] pb-5">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Curated Collections &amp; Edits</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            {collections.length} editorial campaigns active across homepage and `/collections/:slug`
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 px-4 py-2.5 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-widest font-semibold rounded shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Create Collection</span>
        </button>
      </div>

      <div className="space-y-4">
        {collections.map((col) => (
          <div
            key={col.id}
            className="bg-[#16161A] border border-[#25252B] p-5 rounded flex flex-col md:flex-row gap-6 items-center justify-between"
          >
            <div className="flex items-center space-x-4 w-full md:w-auto">
              <img
                src={col.bannerImage}
                alt={col.title}
                className="w-24 h-16 object-cover rounded border border-[#2D2D35] flex-shrink-0"
              />
              <div>
                <span className="text-[10px] uppercase font-mono text-velora-gold tracking-widest">
                  {col.subtitle}
                </span>
                <h3 className="font-editorial text-xl font-medium text-white">{col.title}</h3>
                <p className="text-xs text-gray-400 line-clamp-1 max-w-md mt-0.5">{col.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 w-full md:w-auto justify-end text-xs">
              <Link
                to={`/collections/${col.slug}`}
                target="_blank"
                className="flex items-center space-x-1 text-gray-400 hover:text-velora-gold px-2.5 py-1.5 bg-[#202026] rounded"
              >
                <span>View Route</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => handleOpenEdit(col)}
                className="px-3 py-1.5 bg-[#202026] text-gray-300 hover:text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteCollection(col.id)}
                className="px-3 py-1.5 bg-rose-950 text-rose-300 hover:text-white rounded"
              >
                Delete
              </button>
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
                {editingCollection ? 'Edit Collection' : 'Create Collection'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Winter Private Edit"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Subtitle</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="VOL. 05 ARCHIVE"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Route Slug</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="winter-edit"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={form.bannerImage}
                  onChange={(e) => setForm({ ...form, bannerImage: e.target.value })}
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white font-mono text-[11px] focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Editorial Description</label>
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
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
