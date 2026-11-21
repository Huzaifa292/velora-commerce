import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Printer, Package, Truck, ShieldCheck } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { formatPrice, formatDate } from '../../utils/formatters';
import confetti from 'canvas-confetti';

export const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const { getOrderById } = useOrderStore();
  const order = getOrderById(orderId);

  useEffect(() => {
    // Fire festive luxury gold confetti on success
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B69A70', '#D8C9B5', '#111111', '#F8F6F1'],
      });
    } catch {
      // Ignore if confetti fails in headless env
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-velora-black">Order Dispatch Received</h2>
        <p className="text-xs text-velora-taupe">Reference code: {orderId}</p>
        <Link
          to="/shop"
          className="inline-block px-8 py-3 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      {/* Celebration Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.3em] text-velora-gold font-semibold block">
          Order Confirmed
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black font-medium tracking-wide">
          THANK YOU FOR YOUR PATRONAGE
        </h1>
        <p className="text-xs sm:text-sm text-velora-charcoal/80 max-w-lg mx-auto font-light leading-relaxed">
          Your order has been allocated to our atelier fulfillment team in Milan. A confirmation dossier has been sent to{' '}
          <strong className="text-velora-black">{order.customer?.email}</strong>.
        </p>
      </div>

      {/* Order Meta Bar */}
      <div className="bg-white border border-velora-sand p-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-xs">
        <div>
          <span className="text-velora-taupe uppercase tracking-wider block text-[10px]">Order Identifier</span>
          <span className="font-mono font-bold text-velora-black mt-1 block">{order.id}</span>
        </div>
        <div>
          <span className="text-velora-taupe uppercase tracking-wider block text-[10px]">Date Authorized</span>
          <span className="font-medium text-velora-black mt-1 block">{formatDate(order.date)}</span>
        </div>
        <div>
          <span className="text-velora-taupe uppercase tracking-wider block text-[10px]">Status</span>
          <span className="font-semibold text-emerald-800 mt-1 block uppercase tracking-wider">
            {order.status}
          </span>
        </div>
        <div>
          <span className="text-velora-taupe uppercase tracking-wider block text-[10px]">Total Paid</span>
          <span className="font-editorial text-base font-bold text-velora-black mt-0.5 block">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      {/* Order Details & Summary Card */}
      <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-8">
        <div>
          <h2 className="font-editorial text-2xl text-velora-black font-medium border-b border-velora-sand pb-3">
            Creations in this Dispatch
          </h2>
          <div className="divide-y divide-velora-sand/50 mt-4">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-16 h-20 object-cover border border-velora-sand" />
                  <div>
                    <h3 className="font-editorial text-base font-medium text-velora-black">{item.name}</h3>
                    <p className="text-xs text-velora-taupe mt-0.5">
                      Size: {item.selectedSize} • Color: {item.selectedColor}
                    </p>
                    <p className="text-xs text-velora-taupe">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-editorial text-base font-semibold text-velora-black">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Addresses & Dispatch Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-velora-sand text-xs text-velora-charcoal">
          <div className="space-y-2">
            <h4 className="uppercase tracking-widest font-semibold text-velora-black text-[11px]">
              Delivery Destination
            </h4>
            <p className="font-medium">{order.customer?.name}</p>
            <p className="font-light">{order.customer?.shippingAddress?.street}</p>
            <p className="font-light">
              {order.customer?.shippingAddress?.city}, {order.customer?.shippingAddress?.postalCode}
            </p>
            <p className="font-light">{order.customer?.shippingAddress?.country}</p>
            <p className="font-light text-velora-taupe pt-1">Tel: {order.customer?.phone}</p>
          </div>

          <div className="space-y-2">
            <h4 className="uppercase tracking-widest font-semibold text-velora-black text-[11px]">
              Dispatch Protocol &amp; Billing
            </h4>
            <p className="font-light">
              Service: <strong className="text-velora-black font-normal">{order.deliveryMethod}</strong>
            </p>
            <p className="font-light">
              Payment: <strong className="text-velora-black font-normal">{order.paymentMethod}</strong>
            </p>
            <div className="pt-2 text-velora-taupe space-y-1">
              <p>Subtotal: {formatPrice(order.subtotal)}</p>
              {order.discount > 0 && <p className="text-emerald-800">Privilege: -{formatPrice(order.discount)}</p>}
              <p>Shipping: {order.shippingFee === 0 ? 'Complimentary' : formatPrice(order.shippingFee)}</p>
              <p className="font-bold text-velora-black text-sm pt-1">Total: {formatPrice(order.total)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/shop"
          className="w-full sm:w-auto px-8 py-3.5 bg-velora-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-velora-gold hover:text-black transition-colors text-center"
        >
          Continue Browsing
        </Link>
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-6 py-3.5 border border-velora-sand bg-white text-velora-charcoal text-xs uppercase tracking-widest font-semibold hover:border-velora-black transition-colors flex items-center justify-center space-x-2"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>
      </div>
    </div>
  );
};
