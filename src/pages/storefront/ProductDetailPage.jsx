import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  Star,
  Check,
  Truck,
  ShieldCheck,
  RefreshCw,
  Ruler,
  Share2,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useReviewStore } from '../../store/useReviewStore';
import { ProductCard } from '../../components/storefront/ProductCard';
import { formatPrice } from '../../utils/formatters';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProductById } = useProductStore();
  const { addToCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { getApprovedProductReviews, addReview } = useReviewStore();

  const product = getProductById(id) || products.find((p) => p.slug === id || p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // details, material, shipping, reviews
  const [addedToast, setAddedToast] = useState(false);

  // Review Form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Set default size and color when product loads
  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
      setActiveImageIndex(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-velora-black">Creation Not Found</h2>
        <p className="text-xs text-velora-taupe">The requested luxury piece could not be located in our atelier catalog.</p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const reviews = getApprovedProductReviews(product.id);
  const activePrice = product.salePrice ? product.salePrice : product.price;

  // Related products from same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleMouseMoveZoom = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length) {
      alert('Please select your size before adding to bag.');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    addReview({
      productId: product.id,
      productName: product.name,
      customerName: reviewAuthor,
      customerEmail: reviewEmail,
      rating: reviewRating,
      title: reviewTitle || 'Exceptional craftsmanship',
      comment: reviewComment,
    });

    setReviewSubmitted(true);
    setReviewAuthor('');
    setReviewEmail('');
    setReviewTitle('');
    setReviewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="text-xs text-velora-taupe space-x-2 flex items-center">
        <Link to="/" className="hover:text-velora-black">Home</Link>
        <ChevronRight className="w-3 h-3 text-velora-sand" />
        <Link to="/shop" className="hover:text-velora-black">Collections</Link>
        <ChevronRight className="w-3 h-3 text-velora-sand" />
        <Link to={`/collections/${product.category}`} className="capitalize hover:text-velora-black">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 text-velora-sand" />
        <span className="text-velora-black font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid: Gallery Left + Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails list */}
          {product.images && product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-20 md:w-20 md:h-24 flex-shrink-0 border overflow-hidden transition-all ${
                    activeImageIndex === idx
                      ? 'border-velora-black ring-1 ring-velora-black'
                      : 'border-velora-sand/60 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Display Image with Zoom */}
          <div
            className="flex-1 relative aspect-[3/4] overflow-hidden bg-velora-sand/20 border border-velora-sand/60 cursor-crosshair group"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMoveZoom}
          >
            <img
              src={product.images?.[activeImageIndex] || product.images?.[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150 origin-center' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                    }
                  : undefined
              }
            />

            <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm p-1.5 text-velora-charcoal text-[10px] tracking-wider uppercase flex items-center space-x-1 pointer-events-none opacity-80 group-hover:opacity-100">
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Hover to Zoom</span>
            </div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              {product.salePrice && (
                <span className="bg-velora-black text-white text-[10px] tracking-widest uppercase px-2.5 py-1 font-semibold">
                  Private Sale
                </span>
              )}
              {product.isNew && (
                <span className="bg-white/95 text-velora-black border border-velora-sand text-[10px] tracking-widest uppercase px-2.5 py-1 font-semibold">
                  Spring/Summer '26
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Product Purchasing & Specifications */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-velora-gold font-semibold">
              VELORA {product.category}
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black font-medium mt-1 leading-tight">
              {product.name}
            </h1>

            {/* Rating & SKU */}
            <div className="flex items-center space-x-3 mt-3 text-xs">
              <div className="flex items-center text-velora-gold">
                <Star className="w-3.5 h-3.5 fill-velora-gold stroke-velora-gold" />
                <span className="ml-1 text-velora-charcoal font-semibold">{product.rating}</span>
                <span className="text-velora-taupe ml-1">({reviews.length || product.reviewCount} client reviews)</span>
              </div>
              <span className="text-velora-sand">•</span>
              <span className="text-velora-taupe font-mono text-[11px] uppercase">SKU: {product.sku}</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline space-x-3">
              <span className="font-editorial text-3xl font-bold text-velora-black">
                {formatPrice(activePrice)}
              </span>
              {product.salePrice && (
                <span className="text-base text-velora-taupe line-through">
                  {formatPrice(product.price)}
                </span>
              )}
              {product.salePrice && (
                <span className="text-xs text-red-900 font-semibold tracking-wider uppercase">
                  (Save {formatPrice(product.price - product.salePrice)})
                </span>
              )}
            </div>

            <p className="text-xs text-velora-taupe mt-1">
              Complimentary luxury gift wrapping and insured white-glove transport included.
            </p>
          </div>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="pt-4 border-t border-velora-sand/60">
              <label className="text-xs uppercase tracking-wider text-velora-charcoal font-semibold block mb-2.5">
                Color:{' '}
                <span className="text-velora-taupe font-normal font-sans">
                  {selectedColor?.name || 'Selected'}
                </span>
              </label>
              <div className="flex items-center space-x-3">
                {product.colors.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c)}
                    className={`w-8 h-8 rounded-full p-0.5 border transition-all ${
                      selectedColor?.name === c.name
                        ? 'border-velora-black ring-2 ring-velora-black ring-offset-2'
                        : 'border-velora-sand hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    <span
                      className="w-full h-full rounded-full block border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="pt-4 border-t border-velora-sand/60">
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs uppercase tracking-wider text-velora-charcoal font-semibold">
                  Select Size
                </label>
                <Link
                  to="/size-guide"
                  className="text-[11px] text-velora-gold hover:underline flex items-center space-x-1"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Guide</span>
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs tracking-wider uppercase border transition-colors ${
                      selectedSize === sz
                        ? 'bg-velora-black text-white border-velora-black font-semibold'
                        : 'border-velora-sand bg-white text-velora-charcoal hover:border-velora-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Stock Availability */}
          <div className="pt-4 border-t border-velora-sand/60 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-xs uppercase tracking-wider font-semibold">Quantity:</span>
              <div className="flex items-center border border-velora-sand">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-velora-charcoal hover:bg-velora-sand/30"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-3 py-1.5 text-velora-charcoal hover:bg-velora-sand/30"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              {product.stock > 0 ? (
                <span className="inline-flex items-center text-xs text-emerald-800 font-medium">
                  <Check className="w-3.5 h-3.5 mr-1" /> In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-xs text-red-700 font-medium">Currently Out of Stock</span>
              )}
            </div>
          </div>

          {/* CTA Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="flex-1 py-4 bg-velora-black hover:bg-velora-gold hover:text-velora-black text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-md"
              >
                Add to Shopping Bag
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className={`p-4 border transition-colors ${
                  isFavorited
                    ? 'bg-velora-black text-velora-gold border-velora-black'
                    : 'border-velora-sand hover:border-velora-black text-velora-charcoal'
                }`}
                title={isFavorited ? 'In Wishlist' : 'Save to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-velora-gold' : ''}`} />
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              disabled={product.stock <= 0}
              className="w-full py-3.5 border border-velora-gold bg-velora-gold/15 hover:bg-velora-gold hover:text-velora-black text-velora-black text-xs uppercase tracking-[0.25em] font-semibold transition-colors"
            >
              Buy Now with Express Concierge
            </button>
          </div>

          {/* Reassurance Features */}
          <div className="pt-6 border-t border-velora-sand/60 space-y-3 text-xs text-velora-charcoal/80">
            <div className="flex items-center space-x-3">
              <Truck className="w-4 h-4 text-velora-gold" />
              <span>Complimentary insured shipping on all orders over $300</span>
            </div>
            <div className="flex items-center space-x-3">
              <RefreshCw className="w-4 h-4 text-velora-gold" />
              <span>30-day effortless returns with prepaid courier pickup</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-4 h-4 text-velora-gold" />
              <span>Guaranteed authentic with bespoke serial registration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Editorial Details, Material & Care, Shipping, Reviews */}
      <div className="pt-12 border-t border-velora-sand">
        {/* Tab Headers */}
        <div className="flex flex-wrap border-b border-velora-sand gap-6 sm:gap-10 text-xs uppercase tracking-widest font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 transition-colors ${
              activeTab === 'details'
                ? 'border-b-2 border-velora-black text-velora-black'
                : 'text-velora-taupe hover:text-velora-black'
            }`}
          >
            Editorial Details
          </button>
          <button
            onClick={() => setActiveTab('material')}
            className={`pb-3 transition-colors ${
              activeTab === 'material'
                ? 'border-b-2 border-velora-black text-velora-black'
                : 'text-velora-taupe hover:text-velora-black'
            }`}
          >
            Material &amp; Care
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`pb-3 transition-colors ${
              activeTab === 'shipping'
                ? 'border-b-2 border-velora-black text-velora-black'
                : 'text-velora-taupe hover:text-velora-black'
            }`}
          >
            Delivery &amp; Returns
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 transition-colors ${
              activeTab === 'reviews'
                ? 'border-b-2 border-velora-black text-velora-black'
                : 'text-velora-taupe hover:text-velora-black'
            }`}
          >
            Client Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8">
          {activeTab === 'details' && (
            <div className="max-w-3xl space-y-6">
              <h3 className="font-editorial text-2xl text-velora-black">The Art of the Piece</h3>
              <p className="text-sm text-velora-charcoal/80 leading-relaxed font-light">
                {product.description}
              </p>
              {product.details && product.details.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-velora-black">
                    Architectural Specifications:
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-velora-charcoal/80">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'material' && (
            <div className="max-w-3xl space-y-4">
              <h3 className="font-editorial text-2xl text-velora-black">Noble Fibers &amp; Maintenance</h3>
              <p className="text-sm text-velora-charcoal/80 leading-relaxed font-light">
                {product.materialCare ||
                  'Crafted exclusively from certified natural fibers. Handle with delicate care.'}
              </p>
              <div className="p-4 bg-velora-sand/20 border border-velora-sand text-xs text-velora-taupe space-y-1">
                <p>• Avoid prolonged exposure to direct sunlight or humidity.</p>
                <p>• Store in the provided bespoke Velora breathable flannel garment cover.</p>
                <p>• Steaming is always advised over direct heat pressing.</p>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-4">
              <h3 className="font-editorial text-2xl text-velora-black">White-Glove Transport &amp; Returns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-velora-charcoal/80">
                <div className="space-y-2 border border-velora-sand p-4 bg-white">
                  <p className="font-semibold uppercase tracking-wider text-velora-black">
                    Complimentary Express Delivery
                  </p>
                  <p className="font-light leading-relaxed">
                    Orders exceeding $300 receive complimentary courier delivery (2-4 business days). All packages are sealed in signature moisture-proof archival boxes with bespoke ribbon.
                  </p>
                </div>
                <div className="space-y-2 border border-velora-sand p-4 bg-white">
                  <p className="font-semibold uppercase tracking-wider text-velora-black">
                    Effortless 30-Day Atelier Return
                  </p>
                  <p className="font-light leading-relaxed">
                    Should your creation require adjustment or return, our concierge arranges immediate courier pickup from your residence at zero fee.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-10 max-w-4xl">
              {/* Existing Reviews */}
              <div className="space-y-6">
                <h3 className="font-editorial text-2xl text-velora-black">Client Reflections</h3>
                {reviews.length === 0 ? (
                  <p className="text-xs text-velora-taupe">Be the inaugural client to record impressions of this piece.</p>
                ) : (
                  <div className="divide-y divide-velora-sand/60">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="py-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-xs text-velora-black">{rev.customerName}</span>
                            <span className="text-[10px] bg-velora-sand/40 text-velora-charcoal px-2 py-0.5 rounded-sm">
                              Verified Patron
                            </span>
                          </div>
                          <span className="text-[11px] text-velora-taupe">{rev.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-velora-gold">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-velora-gold" />
                          ))}
                        </div>
                        <h4 className="font-editorial text-base text-velora-black font-medium">{rev.title}</h4>
                        <p className="text-xs text-velora-charcoal/80 leading-relaxed font-light">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Leave Review Form */}
              <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-4">
                <h4 className="font-editorial text-xl text-velora-black font-medium">Record Your Impression</h4>
                <p className="text-xs text-velora-taupe">Your evaluation guides fellow connoisseurs of modern luxury.</p>

                {reviewSubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs">
                    Thank you. Your patron review has been recorded and published to the House of Velora.
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                          Your Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          placeholder="e.g. Helena Vance"
                          className="w-full bg-velora-ivory/40 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={reviewEmail}
                          onChange={(e) => setReviewEmail(e.target.value)}
                          placeholder="client@luxury.com"
                          className="w-full bg-velora-ivory/40 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                          Rating Score
                        </label>
                        <select
                          value={reviewRating}
                          onChange={(e) => setReviewRating(Number(e.target.value))}
                          className="w-full bg-velora-ivory/40 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                        >
                          <option value="5">★★★★★ Exceptional (5/5)</option>
                          <option value="4">★★★★☆ Very Refined (4/5)</option>
                          <option value="3">★★★☆☆ Average (3/5)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                          Headline / Title
                        </label>
                        <input
                          type="text"
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                          placeholder="e.g. The drape of the cashmere is sublime"
                          className="w-full bg-velora-ivory/40 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                        Detailed Reflection
                      </label>
                      <textarea
                        rows="3"
                        required
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="Detail the hand-feel, fit silhouette, and atelier packaging..."
                        className="w-full bg-velora-ivory/40 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-velora-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-velora-gold hover:text-black transition-colors"
                    >
                      Publish Client Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div className="pt-16 border-t border-velora-sand space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-medium">
              Curated Harmonies
            </span>
            <h3 className="font-editorial text-3xl text-velora-black font-medium">COMPLETE THE ENSEMBLE</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
