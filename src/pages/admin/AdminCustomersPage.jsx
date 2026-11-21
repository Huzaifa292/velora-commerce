import React, { useState, useMemo } from 'react';
import { useCustomerStore } from '../../store/useCustomerStore';
import { formatPrice } from '../../utils/formatters';
import { Search, Mail, Phone, MapPin, User, ShieldCheck } from 'lucide-react';

export const AdminCustomersPage = () => {
  const { customers } = useCustomerStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        (c.city && c.city.toLowerCase().includes(q))
      );
    });
  }, [customers, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#222226] pb-5">
        <h1 className="font-editorial text-3xl text-white font-medium">Patron Directory &amp; CRM</h1>
        <p className="text-xs text-gray-400 mt-1 font-mono">
          {customers.length} registered clientele • VIP privilege metrics and lifetime value
        </p>
      </div>

      {/* Search */}
      <div className="bg-[#16161A] border border-[#25252B] p-4 rounded flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patrons by name, email, or city..."
            className="w-full bg-[#101014] border border-[#2E2E36] pl-9 pr-3 py-2 text-xs text-gray-200 placeholder-gray-500 rounded focus:outline-none focus:border-velora-gold"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-[#16161A] border border-[#25252B] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111114] uppercase tracking-wider text-gray-400 border-b border-[#25252B]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Patron Name</th>
                <th className="py-3.5 px-4 font-semibold">Contact</th>
                <th className="py-3.5 px-3 font-semibold">Location</th>
                <th className="py-3.5 px-3 font-semibold">Orders</th>
                <th className="py-3.5 px-4 font-semibold">Lifetime Spend</th>
                <th className="py-3.5 px-3 font-semibold">Tier</th>
                <th className="py-3.5 px-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222226]">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-[#1C1C20] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-velora-gold/20 text-velora-gold font-bold flex items-center justify-center text-xs">
                        {c.name.charAt(0)}
                      </div>
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">
                    <p>{c.email}</p>
                    <p className="text-[10px] text-gray-500">{c.phone}</p>
                  </td>
                  <td className="py-3.5 px-3 text-gray-400">
                    {c.city || 'Milan'}, {c.country || 'Italy'}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-gray-300 font-semibold">
                    {c.totalOrders}
                  </td>
                  <td className="py-3.5 px-4 font-editorial text-sm font-bold text-velora-gold">
                    {formatPrice(c.totalSpent)}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-mono font-bold ${
                      c.status === 'VIP'
                        ? 'bg-velora-gold/20 text-velora-gold border border-velora-gold/40'
                        : 'bg-[#222226] text-gray-300'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="px-3 py-1 bg-[#222228] hover:bg-velora-gold hover:text-black text-gray-200 rounded text-xs transition-colors"
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#18181D] border border-[#2D2D35] max-w-md w-full rounded p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#25252B] pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-velora-gold tracking-widest">Patron Profile</span>
                <h3 className="font-editorial text-2xl text-white font-medium">{selectedCustomer.name}</h3>
              </div>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              <div className="p-3 bg-[#111114] rounded border border-[#25252B] space-y-1">
                <p>Email: <span className="text-white">{selectedCustomer.email}</span></p>
                <p>Phone: <span className="text-white">{selectedCustomer.phone || 'N/A'}</span></p>
                <p>Patron Since: <span className="text-white">{selectedCustomer.joinedDate}</span></p>
                <p>Tier Privilege: <span className="text-velora-gold font-bold">{selectedCustomer.status}</span></p>
              </div>

              <div className="p-3 bg-[#111114] rounded border border-[#25252B] space-y-1">
                <p className="font-semibold text-white uppercase tracking-wider text-[11px]">Primary Residence</p>
                <p>{selectedCustomer.addresses?.[0]?.street || 'Private Residence'}</p>
                <p>{selectedCustomer.city}, {selectedCustomer.country}</p>
              </div>

              <div className="flex justify-between text-xs pt-2">
                <span>Total Orders: <strong className="text-white">{selectedCustomer.totalOrders}</strong></span>
                <span>Lifetime Value: <strong className="text-velora-gold font-bold">{formatPrice(selectedCustomer.totalSpent)}</strong></span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-1.5 bg-[#25252B] text-gray-300 rounded text-xs"
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
