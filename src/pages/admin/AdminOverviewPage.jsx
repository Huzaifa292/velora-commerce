import React from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../../store/useProductStore';
import { useOrderStore } from '../../store/useOrderStore';
import { useCustomerStore } from '../../store/useCustomerStore';
import { formatPrice, formatDate } from '../../utils/formatters';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminOverviewPage = () => {
  const { products } = useProductStore();
  const { orders, updateOrderStatus } = useOrderStore();
  const { customers } = useCustomerStore();

  // Metrics calculation
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalCustomers = customers.length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  // Revenue by Category for Pie Chart
  const categoryRevenueMap = {};
  orders.forEach((o) => {
    (o.items || []).forEach((item) => {
      // Find category
      const prod = products.find((p) => p.id === item.id);
      const cat = prod?.category || 'couture';
      categoryRevenueMap[cat] = (categoryRevenueMap[cat] || 0) + item.price * item.quantity;
    });
  });

  const categoryChartData = Object.entries(categoryRevenueMap).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: Math.round(value),
  }));

  const COLORS = ['#B69A70', '#8C7355', '#D8C9B5', '#555555', '#E8DFD3'];

  // 7-day revenue dummy & live trend
  const revenueTrendData = [
    { day: 'Mon', revenue: 4200, orders: 3 },
    { day: 'Tue', revenue: 6800, orders: 4 },
    { day: 'Wed', revenue: 5100, orders: 3 },
    { day: 'Thu', revenue: 8400, orders: 5 },
    { day: 'Fri', revenue: 9900, orders: 6 },
    { day: 'Sat', revenue: 12400, orders: 8 },
    { day: 'Sun', revenue: Math.max(7500, Math.round(totalRevenue * 0.3)), orders: totalOrders },
  ];

  const recentOrders = orders.slice(0, 5);
  const topProducts = [...products].sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)).slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Executive Overview</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            Live atelier metrics &amp; inventory throughput
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-wider font-semibold rounded transition-colors"
          >
            + Add New Creation
          </Link>
          <Link
            to="/"
            target="_blank"
            className="px-4 py-2 bg-[#1A1A1E] hover:bg-[#25252A] text-gray-300 text-xs uppercase tracking-wider font-semibold rounded border border-[#2B2B32] transition-colors"
          >
            Open Storefront ↗
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-3">
          <div className="flex justify-between items-center text-gray-400 text-xs">
            <span className="uppercase tracking-wider font-mono">Total Revenue</span>
            <div className="p-2 rounded bg-velora-gold/10 text-velora-gold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-3xl font-bold text-white">{formatPrice(totalRevenue)}</p>
          <div className="flex items-center text-[11px] text-emerald-400 space-x-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.8% vs last month</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-3">
          <div className="flex justify-between items-center text-gray-400 text-xs">
            <span className="uppercase tracking-wider font-mono">Total Orders</span>
            <div className="p-2 rounded bg-blue-500/10 text-blue-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-3xl font-bold text-white">{totalOrders}</p>
          <div className="flex items-center text-[11px] text-gray-400 space-x-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{orders.filter((o) => o.status === 'Confirmed' || o.status === 'Pending').length} awaiting fulfillment</span>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-3">
          <div className="flex justify-between items-center text-gray-400 text-xs">
            <span className="uppercase tracking-wider font-mono">Average Order Value</span>
            <div className="p-2 rounded bg-purple-500/10 text-purple-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-3xl font-bold text-white">{formatPrice(averageOrderValue)}</p>
          <p className="text-[11px] text-gray-400">High luxury basket index</p>
        </div>

        {/* Low Stock Warning */}
        <div className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-3">
          <div className="flex justify-between items-center text-gray-400 text-xs">
            <span className="uppercase tracking-wider font-mono">Stock Watch</span>
            <div className={`p-2 rounded ${lowStockProducts.length > 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="font-editorial text-3xl font-bold text-white">
            {lowStockProducts.length}{' '}
            <span className="text-xs font-sans font-normal text-gray-400">items ≤ 5</span>
          </p>
          <Link
            to="/admin/inventory"
            className="text-[11px] text-velora-gold hover:underline flex items-center space-x-1"
          >
            <span>Inspect inventory</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Revenue Trend Area Chart */}
        <div className="lg:col-span-8 bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-editorial text-xl text-white font-medium">Revenue Velocity</h2>
              <p className="text-xs text-gray-400">Daily gross turnover trajectory</p>
            </div>
            <span className="text-xs font-mono text-velora-gold">Gross Volume</span>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueTrendData}>
                <defs>
                  <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#B69A70" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#B69A70" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#25252B" />
                <XAxis dataKey="day" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1A1E', borderColor: '#333', fontSize: '12px' }}
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#B69A70" strokeWidth={2} fillOpacity={1} fill="url(#goldGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Sales by Category */}
        <div className="lg:col-span-4 bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="font-editorial text-xl text-white font-medium">Volume by Department</h2>
            <p className="text-xs text-gray-400">Distribution across catalog segments</p>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryChartData.length ? categoryChartData : [{ name: 'Women', value: 4500 }, { name: 'Men', value: 3800 }, { name: 'Bags', value: 2900 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {(categoryChartData.length ? categoryChartData : [{ name: 'A' }, { name: 'B' }, { name: 'C' }]).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1A1A1E', borderColor: '#333', fontSize: '11px' }}
                  formatter={(val) => [`$${Number(val).toLocaleString()}`, 'Sales']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 pt-2 border-t border-[#25252B]">
            {categoryChartData.map((cat, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span>{cat.name}: ${cat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Tables: Recent Orders & Best Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-editorial text-xl text-white font-medium">Recent Atelier Orders</h2>
              <p className="text-xs text-gray-400">Live order queue synced with storefront</p>
            </div>
            <Link to="/admin/orders" className="text-xs text-velora-gold hover:underline">
              View All Orders ({orders.length}) →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#111114] uppercase tracking-wider text-gray-400 border-b border-[#25252B]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Order ID</th>
                  <th className="py-3 px-4 font-semibold">Patron</th>
                  <th className="py-3 px-4 font-semibold">Amount</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Quick Transition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222226]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#1C1C20] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-white">{order.id}</td>
                    <td className="py-3.5 px-4 text-gray-300">
                      <div>
                        <p className="font-medium text-white">{order.customer?.name}</p>
                        <p className="text-[10px] text-gray-400">{order.customer?.email}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-editorial text-sm font-bold text-velora-gold">
                      {formatPrice(order.total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-semibold tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-950 text-blue-300 border border-blue-800'
                          : order.status === 'Processing'
                          ? 'bg-purple-950 text-purple-300 border border-purple-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-[#101014] border border-[#2E2E36] text-[11px] text-gray-200 px-2 py-1 rounded focus:outline-none focus:border-velora-gold"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Selling Products */}
        <div className="lg:col-span-4 bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-editorial text-xl text-white font-medium">Iconic Creations</h2>
              <p className="text-xs text-gray-400">High engagement catalog items</p>
            </div>
            <Link to="/admin/products" className="text-xs text-velora-gold hover:underline">
              Inventory →
            </Link>
          </div>

          <div className="space-y-3.5">
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center space-x-3 p-2 rounded bg-[#131316] border border-[#222226]">
                <img src={p.images?.[0]} alt={p.name} className="w-10 h-12 object-cover rounded-sm flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400 capitalize">{p.category} • Stock: {p.stock}</p>
                </div>
                <span className="font-editorial text-sm font-semibold text-velora-gold">
                  {formatPrice(p.salePrice || p.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
