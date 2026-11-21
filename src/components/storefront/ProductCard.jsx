import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useCartStore } from '../../store/useCartStore';

export const ProductCard = ({ product, onQuickView }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const isFavorited = isInWishlist(product.id);
  const hasMultipleImages = product.images && product.images.length > 1;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // If has sizes or colors, opening quick view gives user full choice
    if (onQuickView) {
      onQuickView(product);
    } else {
      addToCart(product, product.sizes?.[0], product.colors?.[0], 1);
    }
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="group relative flex flex-col transition-all duration-300"
      onMouseEnter={() => {
        setIsHovered(true);
        if (hasMultipleImages) setCurrentImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-velora-sand/30 border border-velora-sand/50">
        <Link to={`/product/${product.slug || product.id}`} className="block w-full h-full">
          <img
            src={product.images?.[currentImageIndex] || product.images?.[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800';
            }}
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.salePrice && (
            <span className="bg-velora-black text-white text-[10px] tracking-widest uppercase px-2 py-0.5 font-medium">
              Sale
            </span>
          )}
          {product.isNew && (
            <span className="bg-velora-ivory/95 backdrop-blur-sm text-velora-black text-[10px] tracking-widest uppercase px-2 py-0.5 font-medium border border-velora-sand">
              New
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-velora-gold text-velora-black text-[10px] tracking-widest uppercase px-2 py-0.5 font-medium">
              Iconic
            </span>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="bg-amber-800 text-white text-[9px] tracking-wider uppercase px-2 py-0.5">
              Only {product.stock} left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-10 ${
            isFavorited
              ? 'bg-velora-black text-velora-gold shadow-md'
              : 'bg-white/90 text-velora-charcoal hover:bg-white hover:text-velora-black'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${isFavorited ? 'fill-velora-gold scale-110' : ''}`}
          />
        </button>

        {/* Hover Action Bar */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              className="flex-1 bg-white/95 backdrop-blur-sm hover:bg-velora-black hover:text-white text-velora-charcoal py-2 px-3 text-[11px] tracking-widest uppercase font-medium flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          )}

          <button
            onClick={handleQuickAdd}
            className="flex-1 bg-velora-black hover:bg-velora-gold hover:text-velora-black text-white py-2 px-3 text-[11px] tracking-widest uppercase font-medium flex items-center justify-center space-x-1.5 transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Select & Bag</span>
          </button>
        </div>
      </div>

      {/* Info Details */}
      <div className="mt-3 flex flex-col flex-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-velora-taupe font-medium">
          {product.category}
        </p>

        <Link
          to={`/product/${product.slug || product.id}`}
          className="font-editorial text-sm sm:text-base text-velora-black hover:text-velora-gold transition-colors mt-0.5 line-clamp-1 font-medium"
        >
          {product.name}
        </Link>

        {/* Price display */}
        <div className="mt-1 flex items-center space-x-2 text-xs">
          {product.salePrice ? (
            <>
              <span className="font-semibold text-velora-black">{formatPrice(product.salePrice)}</span>
              <span className="text-velora-taupe line-through text-[11px]">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-semibold text-velora-charcoal">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Color Swatches preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="mt-2 flex items-center space-x-1.5">
            {product.colors.slice(0, 4).map((c, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[9px] text-velora-taupe font-sans">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
