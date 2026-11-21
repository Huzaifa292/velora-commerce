import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useCouponStore } from '../../store/useCouponStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { formatPrice } from '../../utils/formatters';

export const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
  } = useCartStore();

  const { validateCoupon } = useCouponStore();
  const { freeShippingThreshold, shippingFee } = useSettingsStore();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee(freeShippingThreshold, shippingFee);
  const total = getTotal(freeShippingThreshold, shippingFee);

  const amountUntilFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const res = validateCoupon(couponCode, subtotal);
    if (!res.valid) {
      setCouponError(res.message);
    } else {
      applyCoupon(res.coupon);
      setCouponSuccess(res.message);
      setCouponCode('');
    }
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-fade-in border-l border-velora-sand">
          {/* Header */}
          <div className="px-6 py-5 border-b border-velora-sand flex items-center justify-between bg-velora-ivory/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-velora-gold" />
              <h2 className="font-editorial text-xl font-medium tracking-wider text-velora-black">
                Shopping Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-velora-charcoal hover:text-velora-gold transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-6 py-3 bg-velora-sand/20 border-b border-velora-sand/50 text-xs">
            {amountUntilFreeShipping > 0 ? (
              <p className="text-velora-charcoal font-light">
                Add <span className="font-semibold text-velora-black">{formatPrice(amountUntilFreeShipping)}</span> more for complimentary white-glove shipping.
              </p>
            ) : (
              <p className="text-emerald-800 font-medium flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>You have unlocked complimentary white-glove shipping!</span>
              </p>
            )}
            <div className="w-full bg-velora-sand/60 h-1.5 mt-2 rounded-full overflow-hidden">
              <div
                className="bg-velora-gold h-full transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-velora-sand/40">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-velora-taupe/60 stroke-[1]" />
                <p className="font-editorial text-xl text-velora-charcoal font-medium">Your shopping bag is empty</p>
                <p className="text-xs text-velora-taupe max-w-xs">
                  Discover our timeless curation of haute couture, Italian footwear, and handcrafted leather.
                </p>
                <Link
                  to="/shop"
                  onClick={closeCart}
                  className="px-6 py-3 bg-velora-black text-velora-ivory text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover border border-velora-sand/60 flex-shrink-0"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300';
                    }}
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${item.slug || item.productId}`}
                          onClick={closeCart}
                          className="font-editorial text-sm font-medium text-velora-black hover:text-velora-gold transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-velora-taupe hover:text-red-700 ml-2"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-velora-taupe mt-1 space-x-2">
                        <span>Size: <strong className="text-velora-charcoal font-normal">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-velora-charcoal font-normal">{item.selectedColor}</strong></span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-velora-sand text-xs">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-velora-sand/30 text-velora-charcoal"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-velora-sand/30 text-velora-charcoal"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-editorial text-sm font-semibold text-velora-black">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="border-t border-velora-sand px-6 py-5 bg-velora-ivory/30 space-y-4">
              {/* Promotional Code */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2 text-xs">
                  <div className="flex items-center space-x-2 text-emerald-900">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon: <strong>{appliedCoupon.code}</strong> applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-700 hover:text-emerald-950 text-[10px] underline uppercase"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Privilege Code (try VELORA10)"
                    className="flex-1 bg-white border border-velora-sand px-3 py-2 text-xs uppercase placeholder-velora-taupe focus:outline-none focus:border-velora-gold"
                  />
                  <button
                    type="submit"
                    className="bg-velora-black text-white px-4 py-2 text-xs tracking-wider uppercase hover:bg-velora-gold hover:text-black transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-red-600 text-[10px]">{couponError}</p>}
              {couponSuccess && <p className="text-emerald-700 text-[10px]">{couponSuccess}</p>}

              {/* Cost Summary */}
              <div className="space-y-1.5 text-xs text-velora-charcoal pt-1">
                <div className="flex justify-between">
                  <span className="text-velora-taupe">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-800">
                    <span>Privilege Reduction</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-velora-taupe">Estimated Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-velora-sand text-sm">
                  <span className="font-editorial text-base text-velora-black font-semibold">Total</span>
                  <span className="font-editorial text-base text-velora-black font-bold">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-velora-black hover:bg-velora-gold hover:text-velora-black text-white text-xs tracking-widest uppercase font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex justify-between text-[11px] text-velora-taupe pt-1">
                  <Link
                    to="/cart"
                    onClick={closeCart}
                    className="hover:text-velora-gold underline uppercase tracking-wider"
                  >
                    View Bag Details
                  </Link>
                  <button
                    onClick={closeCart}
                    className="hover:text-velora-gold uppercase tracking-wider"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
