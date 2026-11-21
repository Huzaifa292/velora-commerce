import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useProductStore } from '../store/useProductStore';
import { useOrderStore } from '../store/useOrderStore';
import {
  LayoutDashboard,
  Package,
  Layers,
  FolderTree,
  ShoppingBag,
  Users,
  Boxes,
  Ticket,
  Star,
  BarChart3,
  Edit3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdminLoggedIn, adminUser, logoutAdmin } = useAuthStore();
  const { products } = useProductStore();
  const { orders } = useOrderStore();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If not authenticated, redirect to admin login
  if (!isAdminLoggedIn) {
    navigate('/admin/login');
    return null;
  }

  // Count low stock items & pending orders
  const lowStockCount = products.filter((p) => p.stock <= 5).length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Confirmed').length;

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Products', path: '/admin/products', icon: Package, badge: products.length },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Collections', path: '/admin/collections', icon: FolderTree },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag, badge: pendingOrdersCount, badgeColor: 'bg-amber-500' },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Inventory', path: '/admin/inventory', icon: Boxes, badge: lowStockCount > 0 ? lowStockCount : null, badgeColor: 'bg-rose-600' },
    { name: 'Coupons', path: '/admin/coupons', icon: Ticket },
    { name: 'Reviews', path: '/admin/reviews', icon: Star },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Content CMS', path: '/admin/content', icon: Edit3 },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#111113] text-gray-200 flex font-sans">
      {/* Desktop Deep Black Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#0A0A0C] border-r border-[#222226] flex-shrink-0 z-30">
        {/* Brand Banner */}
        <div className="h-18 px-6 flex items-center justify-between border-b border-[#222226]">
          <Link to="/admin" className="flex flex-col">
            <span className="font-editorial text-2xl tracking-[0.25em] font-semibold text-velora-gold">
              VELORA
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 -mt-1 font-mono">
              Executive Suite
            </span>
          </Link>
          <span className="text-[10px] bg-velora-gold/20 text-velora-gold border border-velora-gold/30 px-2 py-0.5 rounded font-mono font-medium">
            LIVE SYNC
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'bg-[#1C1C20] text-velora-gold font-semibold border-l-2 border-velora-gold'
                    : 'text-gray-400 hover:text-white hover:bg-[#151518]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-velora-gold' : 'text-gray-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge !== null && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                      item.badgeColor ? `${item.badgeColor} text-white` : 'bg-[#222226] text-gray-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer with Quick Storefront Switch & Profile */}
        <div className="p-4 border-t border-[#222226] space-y-3 bg-[#08080A]">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 bg-[#18181C] hover:bg-velora-gold hover:text-black text-gray-300 rounded text-xs uppercase tracking-wider font-semibold transition-colors border border-[#2A2A30]"
          >
            <span>Live Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-velora-gold/20 border border-velora-gold flex items-center justify-center text-velora-gold font-bold text-xs">
                AD
              </div>
              <div>
                <p className="text-xs font-semibold text-white leading-none">{adminUser?.name || 'Administrator'}</p>
                <p className="text-[10px] text-gray-400 mt-1">{adminUser?.email || 'admin@velora.demo'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-gray-400 hover:text-rose-400 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Administrative Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 bg-[#0E0E11] border-b border-[#222226] px-4 sm:px-6 flex items-center justify-between z-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400">
              <span>Velora Executive Suite</span>
              <span>/</span>
              <span className="text-velora-gold font-medium capitalize">
                {location.pathname.replace('/admin', '').replace('/', '') || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Live Shared State Status Indicator */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1A1E] border border-[#2D2D33] text-[11px] text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Unified State Active</span>
            </div>

            <Link
              to="/"
              className="flex items-center space-x-1.5 text-xs text-gray-300 hover:text-velora-gold transition-colors py-1.5 px-3 bg-[#18181C] border border-[#26262B] rounded"
            >
              <span className="hidden sm:inline">Storefront</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1.5 text-xs text-gray-400 hover:text-rose-400 py-1.5 px-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Sub-page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#121215]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-64 bg-[#0A0A0C] border-r border-[#222226] p-4 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#222226]">
                <span className="font-editorial text-2xl tracking-[0.2em] font-semibold text-velora-gold">
                  VELORA
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-gray-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.exact
                    ? location.pathname === item.path
                    : location.pathname.startsWith(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center justify-between px-3 py-2 rounded text-xs font-medium ${
                        isActive ? 'bg-[#1C1C20] text-velora-gold' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#222226] text-gray-300">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-[#222226] space-y-2">
              <Link
                to="/"
                onClick={() => setMobileSidebarOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-2 bg-[#18181C] text-gray-300 text-xs uppercase"
              >
                <span>View Storefront</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full py-2 text-xs uppercase tracking-wider text-rose-400 hover:text-rose-300 text-center"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
