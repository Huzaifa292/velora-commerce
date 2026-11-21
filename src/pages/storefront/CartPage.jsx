import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useCouponStore } from '../../store/useCouponStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { formatPrice } from '../../utils/formatters';

export const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
    clearCart,
  } = useCartStore();

  const { validateCoupon } = useCouponStore();
  const { freeShippingThreshold, shippingFee } = useSettingsStore();
  const navigate = useNavigate();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

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

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <ShoppingBag className="w-16 h-16 text-velora-taupe/50 mx-auto stroke-[1]" />
        <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-velora-taupe max-w-md mx-auto leading-relaxed">
          You currently have no pieces in your selection. Explore our collections of haute couture, Italian footwear, and handcrafted leather.
        </p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3.5 bg-velora-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-velora-gold hover:text-black transition-colors"
        >
          Discover Atelier Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      <div className="border-b border-velora-sand pb-4">
        <span className="text-[11px] uppercase tracking-[0.25em] text-velora-gold font-medium">Your Selection</span>
        <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
          SHOPPING BAG ({items.length})
        </h1>
      </div>

      {/* Free Shipping Progress Alert */}
      <div className="bg-velora-sand/20 border border-velora-sand p-4 text-xs">
        {amountUntilFreeShipping > 0 ? (
          <p className="text-velora-charcoal">
            Add <strong className="text-velora-black">{formatPrice(amountUntilFreeShipping)}</strong> more to unlock complimentary white-glove shipping.
          </p>
        ) : (
          <p className="text-emerald-800 font-medium flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Complimentary white-glove shipping unlocked!</span>
          </p>
        )}
        <div className="w-full bg-velora-sand/60 h-1.5 mt-2 rounded-full overflow-hidden">
          <div
            className="bg-velora-gold h-full transition-all duration-500 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Table of Cart Items */}
        <div className="lg:col-span-8 bg-white border border-velora-sand overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-velora-ivory/80 uppercase tracking-widest text-velora-taupe border-b border-velora-sand">
                <tr>
                  <th className="py-4 px-6 font-semibold">Creation</th>
                  <th className="py-4 px-4 font-semibold">Unit Price</th>
                  <th className="py-4 px-4 font-semibold text-center">Quantity</th>
                  <th className="py-4 px-6 font-semibold text-right">Subtotal</th>
                  <th className="py-4 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-velora-sand/50">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-velora-ivory/30 transition-colors">
                    <td className="py-5 px-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-20 object-cover border border-velora-sand flex-shrink-0"
                        />
                        <div>
                          <Link
                            to={`/product/${item.slug || item.productId}`}
                            className="font-editorial text-sm font-medium text-velora-black hover:text-velora-gold transition-colors block line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <div className="text-[11px] text-velora-taupe mt-1 space-x-2">
                            <span>Size: <strong className="text-velora-charcoal font-normal">{item.selectedSize}</strong></span>
                            <span>•</span>
                            <span>Color: <strong className="text-velora-charcoal font-normal">{item.selectedColor}</strong></span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-4 font-semibold text-velora-black">
                      {formatPrice(item.price)}
                    </td>
                    <td className="py-5 px-4 text-center">
                      <div className="inline-flex items-center border border-velora-sand">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-velora-charcoal hover:bg-velora-sand/30"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-velora-charcoal hover:bg-velora-sand/30"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-5 px-6 font-editorial text-base font-semibold text-velora-black text-right">
                      {formatPrice(item.price * item.quantity)}
                    </td>
                    <td className="py-5 px-4 text-center">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-velora-taupe hover:text-red-700"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-velora-ivory/40 border-t border-velora-sand flex justify-between items-center text-xs">
            <Link to="/shop" className="text-velora-charcoal hover:text-velora-gold underline uppercase tracking-wider">
              Continue Browsing
            </Link>
            <button
              onClick={clearCart}
              className="text-velora-taupe hover:text-red-800 uppercase tracking-wider text-[11px]"
            >
              Clear Entire Bag
            </button>
          </div>
        </div>

        {/* Right: Summary Order Card */}
        <div className="lg:col-span-4 bg-white border border-velora-sand p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-editorial text-2xl text-velora-black font-medium border-b border-velora-sand pb-3">
            Summary
          </h2>

          {/* Promotional Coupon Input */}
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-semibold text-velora-charcoal block">
              Promotional Privilege Code
            </label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-300 p-2 text-xs">
                <div className="flex items-center space-x-2 text-emerald-900">
                  <Tag className="w-4 h-4" />
                  <span>Code <strong>{appliedCoupon.code}</strong> Applied</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-emerald-800 underline uppercase text-[10px]"
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
                  placeholder="e.g. VELORA10"
                  className="flex-1 border border-velora-sand px-3 py-2 text-xs uppercase focus:outline-none focus:border-velora-gold"
                />
                <button
                  type="submit"
                  className="bg-velora-black text-white px-4 py-2 text-xs uppercase tracking-wider hover:bg-velora-gold hover:text-black transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            {couponError && <p className="text-red-600 text-[10px]">{couponError}</p>}
            {couponSuccess && <p className="text-emerald-700 text-[10px]">{couponSuccess}</p>}
          </div>

          {/* Breakdown */}
          <div className="space-y-3 pt-3 border-t border-velora-sand text-xs text-velora-charcoal">
            <div className="flex justify-between">
              <span className="text-velora-taupe">Atelier Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Promotional Discount</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-velora-taupe">Insured Shipping</span>
              <span>{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-velora-sand text-base font-medium">
              <span className="font-editorial text-xl text-velora-black">Grand Total</span>
              <span className="font-editorial text-xl font-bold text-velora-black">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-velora-black hover:bg-velora-gold hover:text-velora-black text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
