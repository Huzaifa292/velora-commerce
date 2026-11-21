import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { ProductCard } from '../../components/storefront/ProductCard';
import { QuickViewModal } from '../../components/storefront/QuickViewModal';
import { formatPrice } from '../../utils/formatters';
import {
  SlidersHorizontal,
  Grid,
  List,
  X,
  Search,
  Check,
  ChevronDown,
  RotateCcw,
} from 'lucide-react';

export const ShopPage = () => {
  const { products } = useProductStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' or 'list'
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Read URL query params
  const initialCategory = searchParams.get('category') || 'all';
  const initialCollection = searchParams.get('collection') || 'all';
  const initialFilter = searchParams.get('filter') || 'all';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCollection, setSelectedCollection] = useState(initialCollection);
  const [selectedSize, setSelectedSize] = useState('all');
  const [selectedColor, setSelectedColor] = useState('all');
  const [priceRange, setPriceRange] = useState(3000); // Max $3000
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // newest, price-asc, price-desc, popularity
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Sync state if URL search query or category changes
  useEffect(() => {
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category'));
    if (searchParams.get('collection')) setSelectedCollection(searchParams.get('collection'));
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search'));
    if (searchParams.get('filter') === 'bestseller') setSortBy('popularity');
  }, [searchParams]);

  // Available Sizes across all products
  const allSizes = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (Array.isArray(p.sizes)) p.sizes.forEach((s) => set.add(s));
    });
    return Array.from(set);
  }, [products]);

  // Available Colors across all products
  const allColors = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (Array.isArray(p.colors)) {
        p.colors.forEach((c) => {
          if (!map.has(c.name)) map.set(c.name, c.hex);
        });
      }
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [products]);

  // Categories list
  const categoryOptions = [
    { label: 'All Collections', value: 'all' },
    { label: 'Women', value: 'women' },
    { label: 'Men', value: 'men' },
    { label: 'Bags & Leather', value: 'bags' },
    { label: 'Footwear', value: 'shoes' },
    { label: 'Accessories', value: 'accessories' },
  ];

  const collectionOptions = [
    { label: 'All Curations', value: 'all' },
    { label: 'New Arrivals', value: 'new-arrivals' },
    { label: 'Private Sale', value: 'sale' },
    { label: 'Women', value: 'women' },
    { label: 'Men', value: 'men' },
    { label: 'Accessories', value: 'accessories' },
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Collection filter
      if (selectedCollection !== 'all' && p.collection !== selectedCollection) {
        return false;
      }
      // In stock
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      // Price range
      const effectivePrice = p.salePrice || p.price;
      if (effectivePrice > priceRange) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'all' && (!p.sizes || !p.sizes.includes(selectedSize))) {
        return false;
      }
      // Color filter
      if (selectedColor !== 'all' && (!p.colors || !p.colors.some((c) => c.name === selectedColor))) {
        return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSKU = p.sku && p.sku.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc && !matchesSKU) {
          return false;
        }
      }
      return true;
    });
  }, [
    products,
    selectedCategory,
    selectedCollection,
    inStockOnly,
    priceRange,
    selectedSize,
    selectedColor,
    searchQuery,
  ]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    } else if (sortBy === 'popularity') {
      list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    } else {
      // Newest
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Paginated slices
  const paginatedProducts = sortedProducts.slice(0, page * itemsPerPage);
  const hasMore = paginatedProducts.length < sortedProducts.length;

  const handleClearAll = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedSize('all');
    setSelectedColor('all');
    setPriceRange(3000);
    setInStockOnly(false);
    setSearchQuery('');
    setSortBy('newest');
    setSearchParams({});
  };

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedCollection !== 'all' ? 1 : 0) +
    (selectedSize !== 'all' ? 1 : 0) +
    (selectedColor !== 'all' ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (priceRange < 3000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-[11px] uppercase tracking-[0.3em] text-velora-gold font-medium">
          The Full Atelier Catalog
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black tracking-wide font-medium">
          LUXURY READY-TO-WEAR &amp; OBJECTS
        </h1>
        <p className="text-xs text-velora-taupe font-light max-w-md mx-auto">
          Tailored in noble fibers, hand-finished in Biella and Florence. Discover timeless haute creations.
        </p>
      </div>

      {/* Top Filter & View Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-velora-sand text-xs">
        {/* Left: Mobile Filter Button & Product Count */}
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center space-x-2 px-4 py-2 bg-velora-black text-white uppercase tracking-wider text-[11px] font-semibold"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>

          <span className="text-velora-taupe tracking-wider uppercase text-[11px]">
            Showing <strong className="text-velora-black font-semibold">{paginatedProducts.length}</strong> of{' '}
            <strong className="text-velora-black font-semibold">{sortedProducts.length}</strong> pieces
          </span>
        </div>

        {/* Right: Search within + Sort + Layout Mode */}
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* Quick Search */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in catalog..."
              className="bg-white border border-velora-sand px-3 py-1.5 pl-8 text-xs text-velora-charcoal placeholder-velora-taupe focus:outline-none focus:border-velora-gold w-36 sm:w-48"
            />
            <Search className="w-3.5 h-3.5 text-velora-taupe absolute left-2.5 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-velora-taupe hover:text-velora-black text-xs"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-velora-sand px-3 py-1.5 pr-8 text-xs text-velora-charcoal uppercase tracking-wider focus:outline-none focus:border-velora-gold cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popularity">Sort: Most Popular</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-velora-taupe absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Grid/List Toggle */}
          <div className="hidden sm:flex border border-velora-sand">
            <button
              onClick={() => setLayoutMode('grid')}
              className={`p-1.5 ${layoutMode === 'grid' ? 'bg-velora-black text-white' : 'bg-white text-velora-charcoal hover:text-velora-gold'}`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={`p-1.5 ${layoutMode === 'list' ? 'bg-velora-black text-white' : 'bg-white text-velora-charcoal hover:text-velora-gold'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-4 border-b border-velora-sand/50">
          <span className="text-[11px] uppercase tracking-wider text-velora-taupe mr-1">Active:</span>

          {selectedCategory !== 'all' && (
            <span className="inline-flex items-center bg-velora-sand/40 text-velora-charcoal text-[11px] px-2.5 py-1 rounded-sm">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('all')} className="ml-1.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedCollection !== 'all' && (
            <span className="inline-flex items-center bg-velora-sand/40 text-velora-charcoal text-[11px] px-2.5 py-1 rounded-sm">
              Collection: {selectedCollection}
              <button onClick={() => setSelectedCollection('all')} className="ml-1.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedSize !== 'all' && (
            <span className="inline-flex items-center bg-velora-sand/40 text-velora-charcoal text-[11px] px-2.5 py-1 rounded-sm">
              Size: {selectedSize}
              <button onClick={() => setSelectedSize('all')} className="ml-1.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedColor !== 'all' && (
            <span className="inline-flex items-center bg-velora-sand/40 text-velora-charcoal text-[11px] px-2.5 py-1 rounded-sm">
              Color: {selectedColor}
              <button onClick={() => setSelectedColor('all')} className="ml-1.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {priceRange < 3000 && (
            <span className="inline-flex items-center bg-velora-sand/40 text-velora-charcoal text-[11px] px-2.5 py-1 rounded-sm">
              Under {formatPrice(priceRange)}
              <button onClick={() => setPriceRange(3000)} className="ml-1.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {inStockOnly && (
            <span className="inline-flex items-center bg-velora-sand/40 text-velora-charcoal text-[11px] px-2.5 py-1 rounded-sm">
              In Stock Only
              <button onClick={() => setInStockOnly(false)} className="ml-1.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchQuery && (
            <span className="inline-flex items-center bg-velora-sand/40 text-velora-charcoal text-[11px] px-2.5 py-1 rounded-sm">
              Search: "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="ml-1.5 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={handleClearAll}
            className="text-[11px] text-velora-gold hover:underline uppercase tracking-wider font-medium ml-2 flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mt-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-8 pr-4 border-r border-velora-sand/60">
          {/* Category Filter */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-velora-black mb-3">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {categoryOptions.map((opt) => (
                <li key={opt.value}>
                  <button
                    onClick={() => setSelectedCategory(opt.value)}
                    className={`w-full text-left py-1 transition-colors flex justify-between items-center ${
                      selectedCategory === opt.value
                        ? 'text-velora-gold font-semibold'
                        : 'text-velora-charcoal hover:text-velora-gold'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {selectedCategory === opt.value && <Check className="w-3.5 h-3.5 text-velora-gold" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Collection Filter */}
          <div className="pt-6 border-t border-velora-sand/60">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-velora-black mb-3">
              Curated Edit
            </h3>
            <ul className="space-y-2 text-xs">
              {collectionOptions.map((col) => (
                <li key={col.value}>
                  <button
                    onClick={() => setSelectedCollection(col.value)}
                    className={`w-full text-left py-1 transition-colors flex justify-between items-center ${
                      selectedCollection === col.value
                        ? 'text-velora-gold font-semibold'
                        : 'text-velora-charcoal hover:text-velora-gold'
                    }`}
                  >
                    <span>{col.label}</span>
                    {selectedCollection === col.value && <Check className="w-3.5 h-3.5 text-velora-gold" />}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range Slider */}
          <div className="pt-6 border-t border-velora-sand/60">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-velora-black">
                Max Price
              </h3>
              <span className="text-xs font-semibold text-velora-gold">{formatPrice(priceRange)}</span>
            </div>
            <input
              type="range"
              min="200"
              max="3000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-velora-black cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-velora-taupe mt-1">
              <span>$200</span>
              <span>$3,000+</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="pt-6 border-t border-velora-sand/60">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-velora-black mb-3">
              Size
            </h3>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedSize('all')}
                className={`px-2.5 py-1 text-xs border uppercase ${
                  selectedSize === 'all'
                    ? 'bg-velora-black text-white border-velora-black'
                    : 'border-velora-sand bg-white text-velora-charcoal hover:border-velora-charcoal'
                }`}
              >
                All
              </button>
              {allSizes.slice(0, 10).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2.5 py-1 text-xs border uppercase ${
                    selectedSize === sz
                      ? 'bg-velora-black text-white border-velora-black'
                      : 'border-velora-sand bg-white text-velora-charcoal hover:border-velora-charcoal'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="pt-6 border-t border-velora-sand/60">
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold text-velora-black mb-3">
              Color Palette
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedColor('all')}
                className={`px-2.5 py-1 text-xs border uppercase ${
                  selectedColor === 'all'
                    ? 'bg-velora-black text-white border-velora-black'
                    : 'border-velora-sand bg-white text-velora-charcoal'
                }`}
              >
                All
              </button>
              {allColors.slice(0, 10).map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-6 h-6 rounded-full border transition-all ${
                    selectedColor === c.name
                      ? 'ring-2 ring-velora-black ring-offset-2 scale-110'
                      : 'border-black/20 hover:scale-105'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          {/* In Stock Only Checkbox */}
          <div className="pt-6 border-t border-velora-sand/60">
            <label className="flex items-center space-x-2.5 cursor-pointer text-xs text-velora-charcoal">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-velora-black rounded-none"
              />
              <span className="uppercase tracking-wider">In Stock Ready to Ship</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area (3 Columns on Desktop) */}
        <div className="lg:col-span-3">
          {paginatedProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-white border border-velora-sand p-8">
              <h3 className="font-editorial text-2xl text-velora-black">No pieces match your criteria</h3>
              <p className="text-xs text-velora-taupe max-w-sm mx-auto">
                Please adjust your filter selection, price range, or search term to discover available atelier creations.
              </p>
              <button
                onClick={handleClearAll}
                className="px-6 py-2.5 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : layoutMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}
            </div>
          ) : (
            /* List Layout */
            <div className="space-y-6">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-velora-sand p-4 flex flex-col sm:flex-row gap-6 items-center hover:border-velora-gold transition-colors"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full sm:w-44 aspect-[3/4] object-cover flex-shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] uppercase tracking-widest text-velora-taupe">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.slug || product.id}`}
                      className="font-editorial text-xl text-velora-black hover:text-velora-gold font-medium block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-velora-charcoal/80 font-light line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center space-x-3 pt-2">
                      <span className="font-editorial text-lg font-bold text-velora-black">
                        {formatPrice(product.salePrice || product.price)}
                      </span>
                      {product.salePrice && (
                        <span className="text-xs text-velora-taupe line-through">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="flex-1 sm:flex-none px-4 py-2.5 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
                    >
                      Quick View
                    </button>
                    <Link
                      to={`/product/${product.slug || product.id}`}
                      className="flex-1 sm:flex-none px-4 py-2.5 border border-velora-sand text-center text-xs uppercase tracking-widest hover:border-velora-black"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="mt-14 text-center">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-10 py-3.5 bg-white border border-velora-black hover:bg-velora-black hover:text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300"
              >
                Load More Creations ({sortedProducts.length - paginatedProducts.length} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Slide-Over Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-velora-sand">
                  <h3 className="font-editorial text-xl font-medium text-velora-black">Filter Creations</h3>
                  <button onClick={() => setIsMobileFiltersOpen(false)}>
                    <X className="w-5 h-5 text-velora-charcoal" />
                  </button>
                </div>

                {/* Mobile Categories */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">Category</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {categoryOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedCategory(opt.value)}
                        className={`px-3 py-1 text-xs border ${
                          selectedCategory === opt.value
                            ? 'bg-velora-black text-white'
                            : 'border-velora-sand text-velora-charcoal'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Collections */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold mb-2">Collection</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {collectionOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedCollection(opt.value)}
                        className={`px-3 py-1 text-xs border ${
                          selectedCollection === opt.value
                            ? 'bg-velora-black text-white'
                            : 'border-velora-sand text-velora-charcoal'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Price */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold uppercase">Max Price:</span>
                    <span className="text-velora-gold font-semibold">{formatPrice(priceRange)}</span>
                  </div>
                  <input
                    type="range"
                    min="200"
                    max="3000"
                    step="50"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="w-full accent-velora-black"
                  />
                </div>
              </div>

              {/* Bottom Apply Buttons */}
              <div className="pt-6 border-t border-velora-sand space-y-2">
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="w-full py-3 bg-velora-black text-white text-xs uppercase tracking-widest font-semibold"
                >
                  Apply Filters ({sortedProducts.length})
                </button>
                <button
                  onClick={() => {
                    handleClearAll();
                    setIsMobileFiltersOpen(false);
                  }}
                  className="w-full py-2 text-xs uppercase tracking-wider text-velora-taupe hover:text-velora-black"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
