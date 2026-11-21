import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';
import { formatPrice } from '../../utils/formatters';

export const WishlistPage = () => {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleMoveToCart = (product) => {
    addToCart(product, 'Standard', 'Default', 1);
    removeFromWishlist(product.id);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <Heart className="w-16 h-16 text-velora-taupe/40 mx-auto stroke-[1]" />
        <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black">Your Wishlist is Empty</h1>
        <p className="text-xs text-velora-taupe max-w-md mx-auto leading-relaxed">
          Save your favourite couture garments, bags, and noble jewelry while browsing our curated edits.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3.5 bg-velora-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-velora-gold hover:text-black transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-velora-sand pb-4 gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-[0.25em] text-velora-gold font-medium">Curated Favourites</span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
            CLIENT WISHLIST ({items.length})
          </h1>
        </div>
        <button
          onClick={clearWishlist}
          className="text-xs text-velora-taupe hover:text-red-800 uppercase tracking-wider"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {items.map((product) => (
          <div key={product.id} className="group relative flex flex-col bg-white border border-velora-sand">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-velora-sand/20">
              <Link to={`/product/${product.slug || product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800';
                  }}
                />
              </Link>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 p-2 bg-white/90 text-velora-taupe hover:text-red-700 transition-colors"
                title="Remove from Wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-velora-taupe">{product.category}</p>
                <Link
                  to={`/product/${product.slug || product.id}`}
                  className="font-editorial text-base text-velora-black hover:text-velora-gold transition-colors font-medium block line-clamp-1"
                >
                  {product.name}
                </Link>
                <p className="mt-1 font-semibold text-xs text-velora-charcoal">
                  {formatPrice(product.salePrice || product.price)}
                </p>
              </div>

              <button
                onClick={() => handleMoveToCart(product)}
                className="w-full py-2.5 bg-velora-black hover:bg-velora-gold hover:text-black text-white text-[11px] uppercase tracking-widest font-semibold transition-colors flex items-center justify-center space-x-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
