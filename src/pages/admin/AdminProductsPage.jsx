import React, { useState, useMemo } from 'react';
import { useProductStore } from '../../store/useProductStore';
import { formatPrice } from '../../utils/formatters';
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Check,
  X,
  Star,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminProductsPage = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleFeatured, toggleBestSeller } =
    useProductStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStockStatus, setSelectedStockStatus] = useState('all'); // all, in_stock, low_stock, out_stock

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    category: 'women',
    collection: 'women',
    price: '',
    salePrice: '',
    stock: '',
    sku: '',
    description: '',
    imagesText: '',
    sizesText: 'XS, S, M, L, XL',
    colorsText: 'Camel Sand (#C2A382), Obsidian Noir (#111111)',
    isNew: true,
    isFeatured: false,
    isBestSeller: false,
    status: 'published',
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedStockStatus === 'in_stock' && p.stock <= 5) return false;
      if (selectedStockStatus === 'low_stock' && (p.stock > 5 || p.stock === 0)) return false;
      if (selectedStockStatus === 'out_stock' && p.stock > 0) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSKU = p.sku && p.sku.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesSKU && !matchesCategory) return false;
      }
      return true;
    });
  }, [products, selectedCategory, selectedStockStatus, searchQuery]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'women',
      collection: 'women',
      price: '',
      salePrice: '',
      stock: '15',
      sku: `VEL-NEW-${Math.floor(100 + Math.random() * 900)}`,
      description: '',
      imagesText: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200',
      sizesText: 'XS, S, M, L, XL',
      colorsText: 'Midnight Charcoal (#1E1E24), Ivory Cream (#F5F2EB)',
      isNew: true,
      isFeatured: false,
      isBestSeller: false,
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      collection: product.collection || 'women',
      price: String(product.price),
      salePrice: product.salePrice ? String(product.salePrice) : '',
      stock: String(product.stock),
      sku: product.sku || '',
      description: product.description || '',
      imagesText: Array.isArray(product.images) ? product.images.join('\n') : '',
      sizesText: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      colorsText: Array.isArray(product.colors)
        ? product.colors.map((c) => `${c.name} (${c.hex})`).join(', ')
        : '',
      isNew: Boolean(product.isNew),
      isFeatured: Boolean(product.isFeatured),
      isBestSeller: Boolean(product.isBestSeller),
      status: product.status || 'published',
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Product name and price are mandatory.');
      return;
    }

    // Parse images array
    const images = formData.imagesText
      .split('\n')
      .map((url) => url.trim())
      .filter(Boolean);

    // Parse sizes
    const sizes = formData.sizesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    // Parse colors
    const colors = formData.colorsText
      .split(',')
      .map((item) => {
        const match = item.match(/(.+?)\s*\((#[0-9a-fA-F]{3,6})\)/);
        if (match) {
          return { name: match[1].trim(), hex: match[2].trim() };
        }
        return { name: item.trim(), hex: '#111111' };
      })
      .filter((c) => c.name);

    const productPayload = {
      name: formData.name.trim(),
      category: formData.category,
      collection: formData.collection,
      price: Number(formData.price),
      salePrice: formData.salePrice ? Number(formData.salePrice) : null,
      stock: Number(formData.stock) || 0,
      sku: formData.sku.trim() || `VEL-${Date.now()}`,
      description: formData.description,
      images: images.length ? images : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200'],
      sizes: sizes.length ? sizes : ['One Size'],
      colors: colors.length ? colors : [{ name: 'Default', hex: '#111111' }],
      isNew: formData.isNew,
      isFeatured: formData.isFeatured,
      isBestSeller: formData.isBestSeller,
      status: formData.status,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222226] pb-5">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Product Catalog Management</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            {products.length} pieces registered • Immediate live storefront synchronization
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 px-4 py-2.5 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-widest font-semibold rounded shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Creation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#16161A] border border-[#25252B] p-4 rounded flex flex-col md:flex-row gap-4 items-center justify-between text-xs">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, SKU, category..."
            className="w-full bg-[#101014] border border-[#2E2E36] pl-9 pr-3 py-2 text-gray-200 placeholder-gray-500 rounded focus:outline-none focus:border-velora-gold"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#101014] border border-[#2E2E36] px-3 py-2 rounded text-gray-300 focus:outline-none focus:border-velora-gold uppercase tracking-wider"
          >
            <option value="all">All Departments</option>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="bags">Bags &amp; Leather</option>
            <option value="shoes">Footwear</option>
            <option value="accessories">Accessories</option>
          </select>

          {/* Stock status */}
          <select
            value={selectedStockStatus}
            onChange={(e) => setSelectedStockStatus(e.target.value)}
            className="bg-[#101014] border border-[#2E2E36] px-3 py-2 rounded text-gray-300 focus:outline-none focus:border-velora-gold uppercase tracking-wider"
          >
            <option value="all">All Stock Statuses</option>
            <option value="in_stock">Healthy Stock (&gt;5)</option>
            <option value="low_stock">Low Stock (≤5)</option>
            <option value="out_stock">Out of Stock (0)</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-[#16161A] border border-[#25252B] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111114] uppercase tracking-wider text-gray-400 border-b border-[#25252B]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Creation</th>
                <th className="py-3.5 px-3 font-semibold">SKU</th>
                <th className="py-3.5 px-3 font-semibold">Department</th>
                <th className="py-3.5 px-3 font-semibold">Price</th>
                <th className="py-3.5 px-3 font-semibold">Stock</th>
                <th className="py-3.5 px-3 font-semibold text-center">Featured</th>
                <th className="py-3.5 px-3 font-semibold text-center">Iconic</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222226]">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-[#1C1C20] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={p.images?.[0]}
                        alt={p.name}
                        className="w-10 h-12 object-cover rounded-sm border border-[#2E2E36] flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          to={`/product/${p.slug || p.id}`}
                          target="_blank"
                          className="font-medium text-white hover:text-velora-gold transition-colors block truncate max-w-xs"
                        >
                          {p.name}
                        </Link>
                        <span className="text-[10px] text-gray-500 capitalize">{p.collection || 'Collection'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-gray-400">{p.sku}</td>
                  <td className="py-3 px-3 capitalize text-gray-300">{p.category}</td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">
                      {formatPrice(p.salePrice || p.price)}
                    </div>
                    {p.salePrice && (
                      <span className="text-[10px] text-gray-500 line-through">
                        {formatPrice(p.price)}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        p.stock === 0
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : p.stock <= 5
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {p.stock} in stock
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => toggleFeatured(p.id)}
                      className={`p-1 rounded ${p.isFeatured ? 'text-velora-gold' : 'text-gray-600 hover:text-gray-400'}`}
                      title="Toggle Featured on Storefront"
                    >
                      <Star className={`w-4 h-4 ${p.isFeatured ? 'fill-velora-gold' : ''}`} />
                    </button>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => toggleBestSeller(p.id)}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        p.isBestSeller ? 'bg-velora-gold/20 text-velora-gold' : 'bg-gray-800/40 text-gray-500'
                      }`}
                    >
                      {p.isBestSeller ? 'Icon' : 'Normal'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-gray-400 hover:text-velora-gold transition-colors"
                        title="Edit product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#18181D] border border-[#2D2D35] p-6 max-w-sm w-full rounded space-y-4 shadow-2xl">
            <h3 className="font-editorial text-xl text-white font-medium">Remove from Atelier Catalog?</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              This action will permanently delete this piece from both the admin inventory and the customer storefront.
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 bg-[#25252B] text-gray-300 rounded text-xs uppercase"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs uppercase font-semibold"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex justify-center p-4 sm:p-6">
          <div className="relative bg-[#16161A] border border-[#2D2D35] max-w-2xl w-full my-auto rounded p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#25252B] pb-4">
              <div>
                <h3 className="font-editorial text-2xl text-white font-medium">
                  {editingProduct ? 'Edit Atelier Creation' : 'Add New Luxury Creation'}
                </h3>
                <p className="text-xs text-gray-400 font-mono">Changes immediately propagate to storefront</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                  Creation Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Double-Breasted Cashmere Peacoat"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    Department
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold uppercase"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="bags">Bags &amp; Leather</option>
                    <option value="shoes">Footwear</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    Collection Slug
                  </label>
                  <select
                    value={formData.collection}
                    onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold uppercase"
                  >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="new-arrivals">New Arrivals</option>
                    <option value="accessories">Accessories</option>
                    <option value="sale">Private Sale</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white font-mono focus:outline-none focus:border-velora-gold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    Regular Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1250.00"
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    Sale Price ($) (Optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                    placeholder="950.00"
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    Stock Inventory *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="10"
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                  Product Photography URLs (1 per line)
                </label>
                <textarea
                  rows="3"
                  value={formData.imagesText}
                  onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white font-mono text-[11px] focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    Available Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizesText}
                    onChange={(e) => setFormData({ ...formData, sizesText: e.target.value })}
                    placeholder="XS, S, M, L, XL"
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
                  />
                </div>

                <div>
                  <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                    Colors: Name (#HEX)
                  </label>
                  <input
                    type="text"
                    value={formData.colorsText}
                    onChange={(e) => setFormData({ ...formData, colorsText: e.target.value })}
                    placeholder="Camel Sand (#C2A382), Charcoal (#111111)"
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                  Editorial Garment Description
                </label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the fibers, cut, and Milan atelier craftsmanship..."
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
                />
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6 pt-2 border-t border-[#25252B]">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="accent-velora-gold rounded"
                  />
                  <span>Mark as New Debut</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="accent-velora-gold rounded"
                  />
                  <span>Feature on Storefront</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="accent-velora-gold rounded"
                  />
                  <span>Iconic Best Seller</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-[#25252B]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#25252B] hover:bg-[#303038] text-gray-300 rounded uppercase tracking-wider text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-velora-gold hover:bg-velora-gold-light text-black font-semibold rounded uppercase tracking-wider text-xs shadow-md"
                >
                  {editingProduct ? 'Save Updates' : 'Publish Creation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
