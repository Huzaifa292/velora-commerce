import React, { useState } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import { useProductStore } from '../../store/useProductStore';
import { formatPrice, exportToCSV } from '../../utils/formatters';
import { Download, TrendingUp, Calendar } from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const AdminAnalyticsPage = () => {
  const { orders } = useOrderStore();
  const { products } = useProductStore();

  const [dateFilter, setDateFilter] = useState('month');

  const monthlyData = [
    { month: 'Oct', revenue: 24800, orders: 18, aov: 1377 },
    { month: 'Nov', revenue: 38400, orders: 26, aov: 1476 },
    { month: 'Dec', revenue: 54900, orders: 38, aov: 1444 },
    { month: 'Jan', revenue: 31200, orders: 22, aov: 1418 },
    { month: 'Feb', revenue: 42100, orders: 29, aov: 1451 },
    { month: 'Mar', revenue: 48900, orders: 34, aov: 1438 },
  ];

  const categoryPerformance = [
    { category: 'Women', sales: 68500, units: 48 },
    { category: 'Men', sales: 52400, units: 36 },
    { category: 'Bags & Leather', sales: 44200, units: 31 },
    { category: 'Footwear', sales: 29800, units: 38 },
    { category: 'Accessories', sales: 18400, units: 45 },
  ];

  const handleExportAnalytics = () => {
    exportToCSV(monthlyData, 'velora-financial-analytics.csv');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222226] pb-5">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Financial &amp; Atelier Analytics</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            Granular revenue trajectories, order frequency, and segment contribution
          </p>
        </div>

        <button
          onClick={handleExportAnalytics}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#1F1F24] hover:bg-[#282830] text-gray-200 text-xs uppercase tracking-wider font-semibold rounded border border-[#303038] transition-colors"
        >
          <Download className="w-4 h-4 text-velora-gold" />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      {/* Trajectory Area Chart */}
      <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-editorial text-xl text-white font-medium">Monthly Gross Trajectory</h2>
            <p className="text-xs text-gray-400">Total atelier client turnover ($)</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">+22.4% YoY</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#25252B" />
              <XAxis dataKey="month" stroke="#666" fontSize={11} />
              <YAxis stroke="#666" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1A1A1E', borderColor: '#333', fontSize: '12px' }}
                formatter={(val) => [`$${Number(val).toLocaleString()}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#B69A70" strokeWidth={2} fill="#B69A70" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders Volume Bar Chart & Category Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <h2 className="font-editorial text-xl text-white font-medium">Orders Dispatched per Month</h2>
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#25252B" />
                <XAxis dataKey="month" stroke="#666" fontSize={11} />
                <YAxis stroke="#666" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#1A1A1E', borderColor: '#333', fontSize: '11px' }} />
                <Bar dataKey="orders" fill="#B69A70" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <h2 className="font-editorial text-xl text-white font-medium">Department Contribution</h2>
          <div className="space-y-3 pt-2">
            {categoryPerformance.map((item) => (
              <div key={item.category} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">{item.category}</span>
                  <span className="font-mono text-velora-gold font-bold">{formatPrice(item.sales)}</span>
                </div>
                <div className="w-full bg-[#101014] h-2 rounded-full overflow-hidden border border-[#25252B]">
                  <div
                    className="bg-velora-gold h-full rounded-full"
                    style={{ width: `${(item.sales / 70000) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
