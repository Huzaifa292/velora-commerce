import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { formatPrice, formatDate } from '../../utils/formatters';
import { Eye, ArrowRight, Truck, CheckCircle2, Clock } from 'lucide-react';

export const OrderHistoryPage = () => {
  const { customer } = useAuthStore();
  const { orders } = useOrderStore();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const displayOrders = customer
    ? orders.filter((o) => o.customer?.email?.toLowerCase() === customer.email?.toLowerCase())
    : orders;

  const actualList = displayOrders.length > 0 ? displayOrders : orders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      <div className="border-b border-velora-sand pb-4 flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
            Patron Records
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
            ORDER ARCHIVES ({actualList.length})
          </h1>
        </div>
        <Link
          to="/account"
          className="text-xs uppercase tracking-wider text-velora-taupe hover:text-velora-black"
        >
          ← Back to Account
        </Link>
      </div>

      {actualList.length === 0 ? (
        <div className="py-20 text-center space-y-4 bg-white border border-velora-sand p-8">
          <h3 className="font-editorial text-2xl text-velora-black">No past dispatches recorded</h3>
          <p className="text-xs text-velora-taupe">Browse our latest runway pieces to begin your order history.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-2.5 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
          >
            Explore Collection
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-velora-sand overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-velora-ivory/80 uppercase tracking-widest text-velora-taupe border-b border-velora-sand">
                <tr>
                  <th className="py-4 px-6 font-semibold">Order ID</th>
                  <th className="py-4 px-4 font-semibold">Date</th>
                  <th className="py-4 px-4 font-semibold">Items</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                  <th className="py-4 px-6 font-semibold text-right">Total</th>
                  <th className="py-4 px-6 font-semibold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-velora-sand/50">
                {actualList.map((order) => (
                  <tr key={order.id} className="hover:bg-velora-ivory/20 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-velora-black">
                      {order.id}
                    </td>
                    <td className="py-4 px-4 text-velora-taupe">
                      {formatDate(order.date)}
                    </td>
                    <td className="py-4 px-4">
                      {order.items?.length || 1} pieces
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded-sm font-semibold tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-editorial text-base font-semibold text-velora-black text-right">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1 bg-velora-ivory border border-velora-sand hover:border-velora-black text-xs uppercase tracking-wider"
                        >
                          Timeline
                        </button>
                        <Link
                          to={`/order-confirmation/${order.id}`}
                          className="px-3 py-1 bg-velora-black text-white hover:bg-velora-gold hover:text-black text-xs uppercase tracking-wider transition-colors"
                        >
                          Dossier
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Timeline Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="min-h-full flex items-center justify-center p-4">
            <div className="relative bg-white max-w-lg w-full border border-velora-sand p-6 sm:p-8 space-y-6 shadow-2xl z-10">
              <div className="flex justify-between items-center border-b border-velora-sand pb-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-velora-gold font-semibold">
                    Order Status Progression
                  </span>
                  <h3 className="font-editorial text-2xl text-velora-black font-medium">{selectedOrder.id}</h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-xs uppercase tracking-wider text-velora-taupe hover:text-velora-black"
                >
                  Close
                </button>
              </div>

              {/* Timeline steps */}
              <div className="space-y-4 pl-2">
                {(selectedOrder.timeline || [
                  { title: selectedOrder.status, date: selectedOrder.date, description: 'Current active status' },
                  { title: 'Order Placed', date: selectedOrder.date, description: 'Payment registered' },
                ]).map((step, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-velora-gold pb-4 last:pb-0">
                    <span className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-velora-gold" />
                    <p className="font-semibold text-xs text-velora-black uppercase tracking-wider">{step.title}</p>
                    <p className="text-[10px] text-velora-taupe">{formatDate(step.date, 'MMM dd, yyyy - HH:mm')}</p>
                    <p className="text-xs text-velora-charcoal mt-1 font-light">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-velora-sand flex justify-between items-center text-xs">
                <span className="text-velora-taupe">Total: <strong className="text-velora-black">{formatPrice(selectedOrder.total)}</strong></span>
                <Link
                  to={`/order-confirmation/${selectedOrder.id}`}
                  className="text-velora-gold hover:underline font-semibold uppercase tracking-wider"
                >
                  View Full Receipt
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
