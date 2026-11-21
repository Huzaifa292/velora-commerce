import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { formatPrice } from '../../utils/formatters';

export const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { products } = useProductStore();

  const popularSearches = ['Cashmere Trench', 'Silk Gown', 'Italian Wool', 'Loafer', 'Calfskin Bag', 'Sunglasses'];

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      );
    }).slice(0, 6);
  }, [query, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative min-h-screen px-4 pt-12 pb-20 flex flex-col items-center">
        {/* Modal Container */}
        <div className="relative w-full max-w-3xl bg-white p-6 sm:p-10 shadow-2xl border border-velora-sand animate-fade-in z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-velora-charcoal hover:text-velora-gold transition-colors"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>

          <span className="text-[10px] tracking-[0.3em] uppercase text-velora-gold font-medium block">
            Atelier Search
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl text-velora-black mt-1 font-medium">
            Discover VELORA Creations
          </h2>

          {/* Search Input Box */}
          <div className="mt-6 relative flex items-center border-b-2 border-velora-black pb-3">
            <Search className="w-5 h-5 text-velora-charcoal mr-3 stroke-[1.5]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by garment, noble material, category or SKU..."
              className="w-full bg-transparent text-base sm:text-lg text-velora-black placeholder-velora-taupe focus:outline-none font-light"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-velora-taupe hover:text-velora-black uppercase tracking-wider"
              >
                Clear
              </button>
            )}
          </div>

          {/* Popular Tag suggestions */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-velora-taupe mr-1">Trending:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="text-xs bg-velora-ivory px-3 py-1 border border-velora-sand hover:border-velora-gold hover:text-velora-gold transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          {/* Live Search Results */}
          <div className="mt-8">
            {query.trim() && searchResults.length === 0 ? (
              <div className="py-10 text-center space-y-2">
                <p className="font-editorial text-lg text-velora-charcoal">No pieces matching "{query}"</p>
                <p className="text-xs text-velora-taupe">
                  Try searching for general categories like "Women", "Men", "Cashmere", or "Bags".
                </p>
              </div>
            ) : query.trim() ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs text-velora-taupe">
                  <span>Found {searchResults.length} creations</span>
                  <Link
                    to={`/shop?search=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="hover:text-velora-gold underline uppercase tracking-wider"
                  >
                    View all in Shop
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      to={`/product/${item.slug || item.id}`}
                      onClick={onClose}
                      className="flex space-x-3 p-2.5 border border-velora-sand/50 hover:border-velora-gold/80 transition-all bg-velora-ivory/30 group"
                    >
                      <img
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-16 h-20 object-cover flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="text-[10px] uppercase tracking-wider text-velora-taupe">
                          {item.category}
                        </span>
                        <h4 className="font-editorial text-sm text-velora-black group-hover:text-velora-gold transition-colors line-clamp-1 font-medium">
                          {item.name}
                        </h4>
                        <div className="mt-1 flex items-center space-x-2 text-xs">
                          {item.salePrice ? (
                            <>
                              <span className="font-semibold text-velora-black">
                                {formatPrice(item.salePrice)}
                              </span>
                              <span className="text-velora-taupe line-through text-[11px]">
                                {formatPrice(item.price)}
                              </span>
                            </>
                          ) : (
                            <span className="font-semibold text-velora-black">
                              {formatPrice(item.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
