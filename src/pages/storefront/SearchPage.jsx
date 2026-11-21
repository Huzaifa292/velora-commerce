import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../../components/storefront/ProductCard';
import { QuickViewModal } from '../../components/storefront/QuickViewModal';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const { products } = useProductStore();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q))
      );
    });
  }, [products, query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-velora-gold font-medium">Catalog Search</span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black font-medium">
          DISCOVER VELORA CREATIONS
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative flex items-center border-b-2 border-velora-black pb-2">
          <Search className="w-5 h-5 text-velora-charcoal mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by piece, cashmere, bag, loafer, or SKU..."
            className="w-full bg-transparent text-base sm:text-lg focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-1.5 bg-velora-black text-white text-xs uppercase tracking-wider hover:bg-velora-gold hover:text-black transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      <div>
        {query.trim() && (
          <div className="border-b border-velora-sand pb-4 mb-8 flex justify-between items-center text-xs text-velora-taupe">
            <span>Found {results.length} results for "{query}"</span>
            <Link to="/shop" className="hover:text-velora-gold underline uppercase tracking-wider">
              Explore All Collections
            </Link>
          </div>
        )}

        {results.length === 0 && query.trim() ? (
          <div className="py-20 text-center space-y-3 bg-white border border-velora-sand p-8">
            <h3 className="font-editorial text-2xl text-velora-black">No pieces matched your search</h3>
            <p className="text-xs text-velora-taupe">Try searching for terms such as "Coat", "Dress", "Silk", "Trousers", or "Shoes".</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {results.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
