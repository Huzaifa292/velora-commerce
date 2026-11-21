import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { useCollectionStore } from '../../store/useCollectionStore';
import { ProductCard } from '../../components/storefront/ProductCard';
import { QuickViewModal } from '../../components/storefront/QuickViewModal';
import { ChevronDown } from 'lucide-react';

export const CollectionPage = () => {
  const { slug } = useParams();
  const { products } = useProductStore();
  const { collections } = useCollectionStore();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  // Find matching collection meta
  const currentCollection = useMemo(() => {
    return collections.find((c) => c.slug === slug) || {
      title: slug ? slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') : 'Collection',
      subtitle: 'THE ART OF MODERN LUXURY',
      description: 'Handcrafted garments and leather goods sculpted with architectural precision.',
      bannerImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1920',
    };
  }, [collections, slug]);

  // Filter products belonging to this collection or category
  const collectionProducts = useMemo(() => {
    let list = products.filter((p) => {
      if (slug === 'new-arrivals') return p.isNew;
      if (slug === 'sale') return p.salePrice !== null && p.salePrice > 0;
      if (slug === 'women') return p.category === 'women' || p.collection === 'women';
      if (slug === 'men') return p.category === 'men' || p.collection === 'men';
      if (slug === 'accessories') return p.category === 'accessories' || p.category === 'bags' || p.category === 'shoes';
      return p.collection === slug || p.category === slug;
    });

    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'popularity') {
      list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }
    return list;
  }, [products, slug, sortBy]);

  return (
    <div className="space-y-12">
      {/* Cinematic Collection Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-velora-black">
        <div className="absolute inset-0 z-0">
          <img
            src={currentCollection.bannerImage}
            alt={currentCollection.title}
            className="w-full h-full object-cover object-center brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-velora-ivory space-y-4 pt-10">
          <span className="text-xs uppercase tracking-[0.35em] text-velora-gold font-medium">
            {currentCollection.subtitle}
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-light tracking-wide uppercase">
            {currentCollection.title}
          </h1>
          <p className="text-xs sm:text-sm text-velora-sand/90 font-light max-w-xl mx-auto leading-relaxed">
            {currentCollection.description}
          </p>
          <p className="text-[11px] uppercase tracking-widest text-velora-sand/70 pt-2 font-mono">
            {collectionProducts.length} Atelier Creations
          </p>
        </div>
      </section>

      {/* Main Grid & Sort Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Sort & Breadcrumbs Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-6 border-b border-velora-sand gap-4">
          <div className="text-xs text-velora-taupe space-x-2">
            <Link to="/" className="hover:text-velora-black">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-velora-black">Collections</Link>
            <span>/</span>
            <span className="text-velora-black font-semibold uppercase">{currentCollection.title}</span>
          </div>

          <div className="flex items-center space-x-3 text-xs">
            <span className="text-velora-taupe uppercase tracking-wider">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-velora-sand px-3 py-1.5 pr-8 text-xs text-velora-charcoal uppercase tracking-wider focus:outline-none focus:border-velora-gold cursor-pointer"
              >
                <option value="newest">Featured Curation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popularity">Most Coveted</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-velora-taupe absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8">
          {collectionProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white border border-velora-sand p-8">
              <h3 className="font-editorial text-2xl text-velora-black">No pieces in this collection</h3>
              <p className="text-xs text-velora-taupe">
                Explore our full catalog to discover contemporary tailoring and handcrafted luxury.
              </p>
              <Link
                to="/shop"
                className="inline-block px-6 py-2.5 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
              >
                Browse All Collections
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {collectionProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
