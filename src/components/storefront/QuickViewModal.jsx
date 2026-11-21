import React, { useState } from 'react';
import { X, Heart, Star, Check, ArrowRight } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { Link, useNavigate } from 'react-router-dom';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || { name: 'Default', hex: '#111111' });
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const { addToCart, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);
  const activePrice = product.salePrice ? product.salePrice : product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 800);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white max-w-4xl w-full border border-velora-sand shadow-2xl overflow-hidden p-6 sm:p-8 animate-fade-in z-10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-velora-charcoal hover:text-velora-gold transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Left */}
            <div className="space-y-3">
              <div className="aspect-[3/4] w-full overflow-hidden bg-velora-sand/20 border border-velora-sand/40">
                <img
                  src={product.images?.[selectedImage] || product.images?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-20 flex-shrink-0 border overflow-hidden ${
                        selectedImage === idx ? 'border-velora-black ring-1 ring-velora-black' : 'border-velora-sand opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta Right */}
            <div className="flex flex-col justify-between h-full space-y-5">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-velora-taupe font-medium">
                  {product.category}
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl text-velora-black mt-1 font-medium">
                  {product.name}
                </h2>

                {/* Rating & SKU */}
                <div className="flex items-center space-x-3 mt-2 text-xs">
                  <div className="flex items-center text-velora-gold">
                    <Star className="w-3.5 h-3.5 fill-velora-gold stroke-velora-gold" />
                    <span className="ml-1 text-velora-charcoal font-medium">{product.rating}</span>
                    <span className="text-velora-taupe ml-1">({product.reviewCount} reviews)</span>
                  </div>
                  <span className="text-velora-sand">•</span>
                  <span className="text-velora-taupe font-mono text-[11px]">{product.sku}</span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center space-x-3">
                  <span className="font-editorial text-2xl font-bold text-velora-black">
                    {formatPrice(activePrice)}
                  </span>
                  {product.salePrice && (
                    <span className="text-sm text-velora-taupe line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                  {product.salePrice && (
                    <span className="bg-red-900 text-white text-[10px] tracking-wider uppercase px-2 py-0.5">
                      Private Sale
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs text-velora-charcoal/80 mt-3 leading-relaxed font-light">
                  {product.description}
                </p>
              </div>

              {/* Selectors */}
              <div className="space-y-4 pt-2 border-t border-velora-sand/60">
                {/* Colors */}
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-medium block mb-2">
                      Color: <span className="text-velora-taupe font-normal">{selectedColor.name}</span>
                    </label>
                    <div className="flex items-center space-x-2">
                      {product.colors.map((c, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(c)}
                          className={`w-7 h-7 rounded-full p-0.5 border transition-all ${
                            selectedColor.name === c.name
                              ? 'border-velora-black ring-2 ring-velora-black ring-offset-1'
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

                {/* Sizes */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-medium">
                        Select Size
                      </label>
                      <Link
                        to="/size-guide"
                        target="_blank"
                        className="text-[10px] text-velora-taupe hover:text-velora-gold underline uppercase tracking-wider"
                      >
                        Size Guide
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3 py-1.5 text-xs tracking-wider uppercase border transition-colors ${
                            selectedSize === s
                              ? 'bg-velora-black text-white border-velora-black'
                              : 'border-velora-sand bg-white text-velora-charcoal hover:border-velora-charcoal'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="flex items-center space-x-4">
                  <span className="text-[11px] uppercase tracking-wider text-velora-charcoal font-medium">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-velora-sand">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-1 text-velora-charcoal hover:bg-velora-sand/30"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="px-3 py-1 text-velora-charcoal hover:bg-velora-sand/30"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] text-velora-taupe">
                    ({product.stock} available in atelier)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className={`flex-1 py-3.5 px-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      addedSuccess
                        ? 'bg-emerald-700 text-white'
                        : 'bg-velora-black text-white hover:bg-velora-gold hover:text-velora-black'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <span>Add to Bag</span>
                    )}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 border transition-colors ${
                      isFavorited
                        ? 'bg-velora-black text-velora-gold border-velora-black'
                        : 'border-velora-sand hover:border-velora-black text-velora-charcoal'
                    }`}
                    title={isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-velora-gold' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  disabled={product.stock <= 0}
                  className="w-full py-3 px-4 border border-velora-gold bg-velora-gold/10 hover:bg-velora-gold hover:text-velora-black text-velora-charcoal text-xs tracking-widest uppercase font-semibold transition-colors"
                >
                  Buy Now with Express Concierge
                </button>

                <div className="pt-2 text-center">
                  <Link
                    to={`/product/${product.slug || product.id}`}
                    onClick={onClose}
                    className="inline-flex items-center text-xs tracking-wider uppercase text-velora-taupe hover:text-velora-gold transition-colors font-medium"
                  >
                    <span>View Complete Editorial Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
