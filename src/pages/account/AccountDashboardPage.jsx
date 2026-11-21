import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useOrderStore } from '../../store/useOrderStore';
import { formatPrice, formatDate } from '../../utils/formatters';
import { Package, User, MapPin, Heart, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';

export const AccountDashboardPage = () => {
  const navigate = useNavigate();
  const { customer, logoutCustomer } = useAuthStore();
  const { orders } = useOrderStore();

  // If not logged in, redirect to login
  if (!customer) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-velora-black">Patron Portal Required</h2>
        <p className="text-xs text-velora-taupe">Please sign in to view your account details and order records.</p>
        <Link
          to="/account/login"
          className="inline-block px-8 py-3 bg-velora-black text-white text-xs uppercase tracking-widest hover:bg-velora-gold hover:text-black transition-colors"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Filter orders matching this customer email or show latest demo orders
  const customerOrders = orders.filter(
    (o) => o.customer?.email?.toLowerCase() === customer.email?.toLowerCase()
  );
  const displayOrders = customerOrders.length > 0 ? customerOrders : orders.slice(0, 3);

  const totalSpent = displayOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  const handleLogout = () => {
    logoutCustomer();
    navigate('/account/login');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      {/* Account Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-velora-sand pb-4 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
              Patron Profile
            </span>
            <span className="bg-velora-black text-velora-gold text-[9px] uppercase px-2 py-0.5 font-bold tracking-widest">
              VIP Tier
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
            WELCOME, {customer.name?.toUpperCase() || 'ESTEEMED CLIENT'}
          </h1>
          <p className="text-xs text-velora-taupe mt-0.5">{customer.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-velora-taupe hover:text-red-700"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex border-b border-velora-sand gap-6 sm:gap-10 text-xs uppercase tracking-wider font-semibold">
        <Link to="/account" className="pb-3 border-b-2 border-velora-black text-velora-black">
          Overview
        </Link>
        <Link to="/account/orders" className="pb-3 text-velora-taupe hover:text-velora-black">
          Order Archives ({displayOrders.length})
        </Link>
        <Link to="/account/addresses" className="pb-3 text-velora-taupe hover:text-velora-black">
          Saved Residences
        </Link>
        <Link to="/wishlist" className="pb-3 text-velora-taupe hover:text-velora-black">
          Wishlist
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-velora-sand p-6 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-velora-taupe block">Total Orders</span>
          <p className="font-editorial text-3xl font-medium text-velora-black">{displayOrders.length}</p>
          <p className="text-[11px] text-emerald-800 font-medium">Active atelier dispatch</p>
        </div>

        <div className="bg-white border border-velora-sand p-6 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-velora-taupe block">Lifetime Investment</span>
          <p className="font-editorial text-3xl font-medium text-velora-black">{formatPrice(totalSpent)}</p>
          <p className="text-[11px] text-velora-gold font-medium">Privileged Member Status</p>
        </div>

        <div className="bg-white border border-velora-sand p-6 space-y-2">
          <span className="text-[10px] uppercase tracking-wider text-velora-taupe block">Concierge Access</span>
          <p className="font-editorial text-xl font-medium text-velora-black">Personal Advisor</p>
          <p className="text-[11px] text-velora-taupe">Available 24/7 via private line</p>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-velora-sand pb-4">
          <h2 className="font-editorial text-2xl text-velora-black font-medium">Recent Atelier Orders</h2>
          <Link
            to="/account/orders"
            className="text-xs uppercase tracking-wider text-velora-gold hover:underline flex items-center space-x-1"
          >
            <span>View All ({displayOrders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-velora-sand/50">
          {displayOrders.map((order) => (
            <div key={order.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-mono font-bold text-xs text-velora-black">{order.id}</span>
                  <span className={`text-[10px] uppercase px-2 py-0.5 rounded-sm font-semibold tracking-wider ${
                    order.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'Shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-velora-taupe">
                  Authorized on {formatDate(order.date)} • {order.items?.length || 1} creations
                </p>
              </div>

              <div className="flex items-center space-x-6 w-full sm:w-auto justify-between sm:justify-end">
                <span className="font-editorial text-base font-bold text-velora-black">
                  {formatPrice(order.total)}
                </span>
                <Link
                  to={`/order-confirmation/${order.id}`}
                  className="px-4 py-2 border border-velora-sand text-xs uppercase tracking-wider hover:border-velora-black transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
