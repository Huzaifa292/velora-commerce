import React, { useState, useMemo } from 'react';
import { useProductStore } from '../../store/useProductStore';
import { formatPrice } from '../../utils/formatters';
import { Boxes, AlertTriangle, Search, Plus, Minus, CheckCircle2 } from 'lucide-react';

export const AdminInventoryPage = () => {
  const { products, increaseStock, decreaseStock, updateProduct } = useProductStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // all, low_stock, out_stock

  const inventoryItems = useMemo(() => {
    return products.filter((p) => {
      if (filterMode === 'low_stock' && (p.stock > 5 || p.stock === 0)) return false;
      if (filterMode === 'out_stock' && p.stock > 0) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          p.name.toLowerCase().includes(q) ||
          (p.sku && p.sku.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, filterMode, searchQuery]);

  const totalStockUnits = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-6">
      <div className="border-b border-[#222226] pb-5">
        <h1 className="font-editorial text-3xl text-white font-medium">Atelier Inventory &amp; Stock Synchronization</h1>
        <p className="text-xs text-gray-400 mt-1 font-mono">
          Physical inventory tracked across Biella and Florence distribution centers • Synchronized with checkout
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-1">
          <span className="text-[10px] uppercase font-mono text-gray-400">Total Units in Atelier</span>
          <p className="font-editorial text-3xl font-bold text-white">{totalStockUnits}</p>
          <p className="text-[11px] text-emerald-400">Across {products.length} catalog references</p>
        </div>

        <div className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-1">
          <span className="text-[10px] uppercase font-mono text-gray-400">Low Stock Warnings (≤5)</span>
          <p className="font-editorial text-3xl font-bold text-amber-400">{lowStockCount}</p>
          <p className="text-[11px] text-gray-400">Replenishment recommended</p>
        </div>

        <div className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-1">
          <span className="text-[10px] uppercase font-mono text-gray-400">Depleted / Out of Stock</span>
          <p className="font-editorial text-3xl font-bold text-rose-400">{outOfStockCount}</p>
          <p className="text-[11px] text-gray-400">Temporarily unavailable for order</p>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-[#16161A] border border-[#25252B] p-4 rounded flex flex-col sm:flex-row gap-4 items-center justify-between text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by garment, SKU..."
            className="w-full bg-[#101014] border border-[#2E2E36] pl-9 pr-3 py-2 text-gray-200 placeholder-gray-500 rounded focus:outline-none focus:border-velora-gold"
          />
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded uppercase tracking-wider text-[11px] ${
              filterMode === 'all' ? 'bg-velora-gold text-black font-semibold' : 'bg-[#202026] text-gray-400'
            }`}
          >
            All Inventory
          </button>
          <button
            onClick={() => setFilterMode('low_stock')}
            className={`px-3 py-1.5 rounded uppercase tracking-wider text-[11px] ${
              filterMode === 'low_stock' ? 'bg-amber-500 text-black font-semibold' : 'bg-[#202026] text-gray-400'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterMode('out_stock')}
            className={`px-3 py-1.5 rounded uppercase tracking-wider text-[11px] ${
              filterMode === 'out_stock' ? 'bg-rose-500 text-white font-semibold' : 'bg-[#202026] text-gray-400'
            }`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>
      </div>

      {/* Inventory Table with Quick Adjustment */}
      <div className="bg-[#16161A] border border-[#25252B] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111114] uppercase tracking-wider text-gray-400 border-b border-[#25252B]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Garment Reference</th>
                <th className="py-3.5 px-3 font-semibold">SKU Code</th>
                <th className="py-3.5 px-3 font-semibold">Unit Price</th>
                <th className="py-3.5 px-3 font-semibold">Current Stock</th>
                <th className="py-3.5 px-3 font-semibold">Status Indicator</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Stock Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222226]">
              {inventoryItems.map((product) => (
                <tr key={product.id} className="hover:bg-[#1C1C20] transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images?.[0]}
                        alt=""
                        className="w-10 h-12 object-cover rounded-sm border border-[#2E2E36] flex-shrink-0"
                      />
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-[10px] text-gray-500 capitalize">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-gray-400">{product.sku}</td>
                  <td className="py-3 px-3 font-semibold text-white">
                    {formatPrice(product.salePrice || product.price)}
                  </td>
                  <td className="py-3 px-3 font-editorial text-lg font-bold text-white">
                    {product.stock}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                        product.stock === 0
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : product.stock <= 5
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {product.stock === 0 ? 'Out of Stock' : product.stock <= 5 ? 'Low Inventory' : 'Optimal'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center space-x-1.5 bg-[#101014] border border-[#2E2E36] p-1 rounded">
                      <button
                        onClick={() => decreaseStock(product.id, 1)}
                        className="p-1 hover:bg-[#202026] text-gray-400 hover:text-white rounded"
                        title="Reduce stock by 1"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 font-mono text-xs font-semibold text-white">{product.stock}</span>
                      <button
                        onClick={() => increaseStock(product.id, 1)}
                        className="p-1 hover:bg-[#202026] text-gray-400 hover:text-white rounded"
                        title="Add 1 unit to stock"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => increaseStock(product.id, 10)}
                        className="px-2 py-0.5 bg-[#25252B] hover:bg-velora-gold hover:text-black text-[10px] uppercase font-semibold text-gray-300 rounded transition-colors ml-1"
                        title="Add 10 units"
                      >
                        +10
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
