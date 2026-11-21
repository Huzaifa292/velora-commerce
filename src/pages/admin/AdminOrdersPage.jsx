import React, { useState, useMemo } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { formatPrice, formatDate, exportToCSV } from '../../utils/formatters';
import { Search, Download, Eye, X, CheckCircle, Clock, Truck, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOrdersPage = () => {
  const { orders, updateOrderStatus, deleteOrder } = useOrderStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewingOrder, setViewingOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (selectedStatus !== 'all' && o.status !== selectedStatus) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesId = o.id.toLowerCase().includes(q);
        const matchesName = o.customer?.name?.toLowerCase().includes(q);
        const matchesEmail = o.customer?.email?.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesEmail) return false;
      }
      return true;
    });
  }, [orders, selectedStatus, searchQuery]);

  const handleExportCSV = () => {
    const dataToExport = orders.map((o) => ({
      'Order ID': o.id,
      Date: formatDate(o.date),
      Customer: o.customer?.name,
      Email: o.customer?.email,
      Total: o.total,
      Status: o.status,
      'Delivery Method': o.deliveryMethod,
      'Payment Method': o.paymentMethod,
    }));
    exportToCSV(dataToExport, `velora-orders-${new Date().toISOString().slice(0, 10)}.csv`);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222226] pb-5">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Order Dispatch Management</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            {orders.length} total orders recorded • Status changes synchronize with patron order history
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#1F1F24] hover:bg-[#282830] text-gray-200 text-xs uppercase tracking-wider font-semibold rounded border border-[#303038] transition-colors"
        >
          <Download className="w-4 h-4 text-velora-gold" />
          <span>Export Orders CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#16161A] border border-[#25252B] p-4 rounded flex flex-col sm:flex-row gap-4 items-center justify-between text-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer name, email..."
            className="w-full bg-[#101014] border border-[#2E2E36] pl-9 pr-3 py-2 text-gray-200 placeholder-gray-500 rounded focus:outline-none focus:border-velora-gold"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <span className="text-gray-400 uppercase tracking-wider text-[11px]">Filter by:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#101014] border border-[#2E2E36] px-3 py-2 rounded text-gray-300 uppercase tracking-wider focus:outline-none focus:border-velora-gold"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-[#16161A] border border-[#25252B] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111114] uppercase tracking-wider text-gray-400 border-b border-[#25252B]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Order ID</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Patron Details</th>
                <th className="py-3.5 px-3 font-semibold">Items</th>
                <th className="py-3.5 px-3 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222226]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[#1C1C20] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">{order.id}</td>
                  <td className="py-3.5 px-4 text-gray-400">{formatDate(order.date)}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-medium text-white">{order.customer?.name}</p>
                    <p className="text-[10px] text-gray-500">{order.customer?.email}</p>
                  </td>
                  <td className="py-3.5 px-3 text-gray-300 font-mono">
                    {order.items?.length || 1} pcs
                  </td>
                  <td className="py-3.5 px-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className={`text-[11px] font-semibold uppercase px-2 py-1 rounded bg-[#101014] border focus:outline-none ${
                        order.status === 'Delivered'
                          ? 'border-emerald-800 text-emerald-400'
                          : order.status === 'Shipped'
                          ? 'border-blue-800 text-blue-400'
                          : order.status === 'Processing'
                          ? 'border-purple-800 text-purple-400'
                          : 'border-amber-800 text-amber-400'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 font-editorial text-base font-bold text-velora-gold">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setViewingOrder(order)}
                      className="px-3 py-1 bg-[#222228] hover:bg-velora-gold hover:text-black text-gray-200 rounded text-xs transition-colors"
                    >
                      Inspect Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#18181D] border border-[#2D2D35] max-w-2xl w-full my-auto rounded p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-[#25252B] pb-4">
              <div>
                <span className="text-[10px] uppercase font-mono text-velora-gold tracking-widest">
                  Atelier Fulfillment Dossier
                </span>
                <h3 className="font-editorial text-2xl text-white font-medium mt-0.5">
                  Order {viewingOrder.id}
                </h3>
                <p className="text-xs text-gray-400">Authorized on {formatDate(viewingOrder.date, 'MMMM dd, yyyy - HH:mm')}</p>
              </div>
              <button onClick={() => setViewingOrder(null)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Status Selector */}
            <div className="flex items-center justify-between p-3 bg-[#111114] border border-[#282830] rounded">
              <span className="text-xs uppercase tracking-wider text-gray-300 font-semibold">
                Progression Status:
              </span>
              <select
                value={viewingOrder.status}
                onChange={(e) => {
                  updateOrderStatus(viewingOrder.id, e.target.value);
                  setViewingOrder({ ...viewingOrder, status: e.target.value });
                }}
                className="bg-[#1A1A20] border border-velora-gold/50 text-velora-gold text-xs px-3 py-1.5 rounded font-semibold uppercase"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing in Atelier</option>
                <option value="Shipped">Shipped via Air Cargo</option>
                <option value="Delivered">Delivered &amp; Handed Over</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Ordered Items List */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-wider text-gray-300 font-semibold">
                Garments &amp; Creations ({viewingOrder.items?.length})
              </h4>
              <div className="divide-y divide-[#282830] max-h-48 overflow-y-auto pr-1">
                {viewingOrder.items?.map((item, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <img src={item.image} alt="" className="w-10 h-12 object-cover rounded border border-[#333]" />
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-[10px] text-gray-400">
                          Size: {item.selectedSize} • Color: {item.selectedColor} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-editorial text-sm font-semibold text-velora-gold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer & Address Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300 border-t border-[#25252B] pt-4">
              <div>
                <p className="uppercase tracking-wider font-semibold text-white text-[11px] mb-1">
                  Patron &amp; Delivery Destination
                </p>
                <p className="font-medium text-velora-gold">{viewingOrder.customer?.name}</p>
                <p className="text-gray-400">{viewingOrder.customer?.email}</p>
                <p className="text-gray-400">{viewingOrder.customer?.shippingAddress?.street}</p>
                <p className="text-gray-400">
                  {viewingOrder.customer?.shippingAddress?.city},{' '}
                  {viewingOrder.customer?.shippingAddress?.postalCode},{' '}
                  {viewingOrder.customer?.shippingAddress?.country}
                </p>
              </div>

              <div>
                <p className="uppercase tracking-wider font-semibold text-white text-[11px] mb-1">
                  Financial Settlement
                </p>
                <p>Delivery: {viewingOrder.deliveryMethod}</p>
                <p>Payment Channel: {viewingOrder.paymentMethod}</p>
                <div className="mt-2 text-gray-400 space-y-0.5">
                  <p>Subtotal: {formatPrice(viewingOrder.subtotal)}</p>
                  {viewingOrder.discount > 0 && <p className="text-emerald-400">Privilege: -{formatPrice(viewingOrder.discount)}</p>}
                  <p>Shipping: {formatPrice(viewingOrder.shippingFee)}</p>
                  <p className="text-sm font-bold text-white pt-1">
                    Total: {formatPrice(viewingOrder.total)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-[#25252B] text-xs">
              <Link
                to={`/order-confirmation/${viewingOrder.id}`}
                target="_blank"
                className="text-velora-gold hover:underline"
              >
                Open Customer Receipt View ↗
              </Link>
              <button
                onClick={() => setViewingOrder(null)}
                className="px-4 py-1.5 bg-[#25252B] hover:bg-[#303038] text-white rounded uppercase tracking-wider text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
