import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Truck, Check, AlertCircle } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useProductStore } from '../../store/useProductStore';
import { useCustomerStore } from '../../store/useCustomerStore';
import { useCouponStore } from '../../store/useCouponStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { formatPrice } from '../../utils/formatters';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    items,
    appliedCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotal,
    clearCart,
  } = useCartStore();

  const { createOrder } = useOrderStore();
  const { decreaseStock } = useProductStore();
  const { recordCustomerPurchase } = useCustomerStore();
  const { incrementCouponUsage } = useCouponStore();
  const { freeShippingThreshold, shippingFee } = useSettingsStore();

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'United States',
    deliveryMethod: 'standard', // standard or express
    paymentMethod: 'card_demo', // card_demo or cod
    notes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const baseShipping = getShippingFee(freeShippingThreshold, shippingFee);
  const expressSurcharge = formData.deliveryMethod === 'express' ? 35.0 : 0.0;
  const totalShipping = baseShipping + expressSurcharge;
  const finalTotal = Math.max(0, subtotal - discount + totalShipping);

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-velora-black">Your bag is currently empty</h2>
        <p className="text-xs text-velora-taupe">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
        >
          Return to Collections
        </Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required.';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email format.';
    }
    if (!formData.phone.trim()) errs.phone = 'Contact phone number is required.';
    if (!formData.street.trim()) errs.street = 'Street address is required.';
    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required.';
    return errs;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      // 1. Create order record
      const customer = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        shippingAddress: {
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
      };

      const orderData = {
        customer,
        items: items.map((item) => ({
          id: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
          image: item.image,
        })),
        deliveryMethod: formData.deliveryMethod === 'express' ? 'Express White-Glove (+ $35)' : 'Standard Insured',
        paymentMethod: formData.paymentMethod === 'card_demo' ? 'Simulated Card (Demo)' : 'Cash on Delivery',
        subtotal,
        discount,
        shippingFee: totalShipping,
        total: finalTotal,
      };

      const newOrder = createOrder(orderData);

      // 2. Decrease product inventory
      items.forEach((item) => {
        decreaseStock(item.productId, item.quantity);
      });

      // 3. Record customer purchase
      recordCustomerPurchase(customer, finalTotal);

      // 4. Increment coupon usage if used
      if (appliedCoupon?.code) {
        incrementCouponUsage(appliedCoupon.code);
      }

      // 5. Clear cart
      clearCart();
      setIsSubmitting(false);

      // 6. Navigate to confirmation
      navigate(`/order-confirmation/${newOrder.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      {/* Checkout Header */}
      <div className="border-b border-velora-sand pb-4 flex justify-between items-center">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-velora-gold font-medium">Private Concierge Checkout</span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
            SECURE ORDER DISPATCH
          </h1>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-velora-taupe">
          <Lock className="w-3.5 h-3.5 text-velora-gold" />
          <span>Encrypted Demo Protocol</span>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="bg-velora-sand/20 border border-velora-sand p-3.5 text-xs text-velora-charcoal flex items-start space-x-2.5">
        <AlertCircle className="w-4 h-4 text-velora-gold flex-shrink-0 mt-0.5" />
        <p>
          <strong>Simulated Portfolio Demonstration:</strong> Real financial transactions are disabled. No credit card details are ever collected. Submitting this order dynamically decrements product atelier stock and produces a live order in your admin dashboard.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Customer Information & Delivery Address */}
        <div className="lg:col-span-7 space-y-8 bg-white border border-velora-sand p-6 sm:p-8">
          {/* Section 1: Contact Information */}
          <div className="space-y-4">
            <h2 className="font-editorial text-xl text-velora-black font-medium border-b border-velora-sand pb-2">
              1. Patron Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="e.g. Helena"
                  className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                />
                {errors.firstName && <p className="text-red-600 text-[10px] mt-0.5">{errors.firstName}</p>}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="e.g. Vance"
                  className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                />
                {errors.lastName && <p className="text-red-600 text-[10px] mt-0.5">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="client@luxury.com"
                  className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                />
                {errors.email && <p className="text-red-600 text-[10px] mt-0.5">{errors.email}</p>}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                  Phone Number (Courier SMS) *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 234-8901"
                  className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                />
                {errors.phone && <p className="text-red-600 text-[10px] mt-0.5">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Destination */}
          <div className="space-y-4 pt-4">
            <h2 className="font-editorial text-xl text-velora-black font-medium border-b border-velora-sand pb-2">
              2. Delivery Destination
            </h2>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                Street Address *
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                placeholder="740 Park Avenue, Apt 14B"
                className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
              />
              {errors.street && <p className="text-red-600 text-[10px] mt-0.5">{errors.street}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                />
                {errors.city && <p className="text-red-600 text-[10px] mt-0.5">{errors.city}</p>}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                  Postal Code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="10021"
                  className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                />
                {errors.postalCode && <p className="text-red-600 text-[10px] mt-0.5">{errors.postalCode}</p>}
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider text-velora-charcoal font-semibold block mb-1">
                  Country
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full bg-velora-ivory/30 border border-velora-sand px-3 py-2 text-xs focus:outline-none focus:border-velora-gold"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Italy">Italy</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Method */}
          <div className="space-y-3 pt-4">
            <h2 className="font-editorial text-xl text-velora-black font-medium border-b border-velora-sand pb-2">
              3. Delivery Service
            </h2>
            <div className="space-y-2.5">
              <label
                className={`flex items-center justify-between p-3.5 border cursor-pointer transition-colors ${
                  formData.deliveryMethod === 'standard' ? 'border-velora-black bg-velora-ivory/40' : 'border-velora-sand'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="standard"
                    checked={formData.deliveryMethod === 'standard'}
                    onChange={handleInputChange}
                    className="accent-velora-black"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-velora-black">
                      Standard White-Glove Delivery
                    </p>
                    <p className="text-[11px] text-velora-taupe">Delivered in signature archival gift box (3-5 business days)</p>
                  </div>
                </div>
                <span className="text-xs font-semibold">
                  {baseShipping === 0 ? 'Complimentary' : formatPrice(baseShipping)}
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 border cursor-pointer transition-colors ${
                  formData.deliveryMethod === 'express' ? 'border-velora-black bg-velora-ivory/40' : 'border-velora-sand'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="express"
                    checked={formData.deliveryMethod === 'express'}
                    onChange={handleInputChange}
                    className="accent-velora-black"
                  />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-velora-black">
                      Priority Air Courier &amp; Personal Delivery
                    </p>
                    <p className="text-[11px] text-velora-taupe">Hand-carried priority freight (1-2 business days)</p>
                  </div>
                </div>
                <span className="text-xs font-semibold">
                  +{formatPrice(35.00)}
                </span>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Simulation */}
          <div className="space-y-3 pt-4">
            <h2 className="font-editorial text-xl text-velora-black font-medium border-b border-velora-sand pb-2">
              4. Payment Method
            </h2>
            <div className="space-y-2.5">
              <label
                className={`flex items-center justify-between p-3.5 border cursor-pointer ${
                  formData.paymentMethod === 'card_demo' ? 'border-velora-black bg-velora-ivory/40' : 'border-velora-sand'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card_demo"
                    checked={formData.paymentMethod === 'card_demo'}
                    onChange={handleInputChange}
                    className="accent-velora-black"
                  />
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-4 h-4 text-velora-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Simulated Online Card (Instant Authorization)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono">
                  DEMO PASS
                </span>
              </label>

              <label
                className={`flex items-center justify-between p-3.5 border cursor-pointer ${
                  formData.paymentMethod === 'cod' ? 'border-velora-black bg-velora-ivory/40' : 'border-velora-sand'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="accent-velora-black"
                  />
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-velora-gold" />
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Cash on Delivery / Concierge Handover
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Summary Breakdown */}
        <div className="lg:col-span-5 bg-white border border-velora-sand p-6 sm:p-8 space-y-6 shadow-sm sticky top-28">
          <h2 className="font-editorial text-2xl text-velora-black font-medium border-b border-velora-sand pb-3">
            Order Review ({items.length})
          </h2>

          <div className="divide-y divide-velora-sand/50 max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex space-x-3 items-center">
                <img src={item.image} alt={item.name} className="w-12 h-16 object-cover border border-velora-sand flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-editorial text-xs font-medium text-velora-black line-clamp-1">{item.name}</p>
                  <p className="text-[10px] text-velora-taupe">
                    {item.selectedSize} / {item.selectedColor} × {item.quantity}
                  </p>
                </div>
                <span className="font-semibold text-xs text-velora-black">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2.5 pt-4 border-t border-velora-sand text-xs text-velora-charcoal">
            <div className="flex justify-between">
              <span className="text-velora-taupe">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-800">
                <span>Promotional Privilege</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-velora-taupe">Insured Shipping</span>
              <span>{totalShipping === 0 ? 'Complimentary' : formatPrice(totalShipping)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-velora-sand text-base font-semibold">
              <span className="font-editorial text-xl text-velora-black">Total to Authorize</span>
              <span className="font-editorial text-xl text-velora-black font-bold">
                {formatPrice(finalTotal)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-velora-black hover:bg-velora-gold hover:text-velora-black text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-md disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authorizing Order with Atelier...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-velora-gold" />
                <span>Place Order • {formatPrice(finalTotal)}</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-velora-taupe text-center leading-relaxed">
            By authorizing, you accept VELORA's terms of sale and white-glove packaging governance.
          </p>
        </div>
      </form>
    </div>
  );
};
