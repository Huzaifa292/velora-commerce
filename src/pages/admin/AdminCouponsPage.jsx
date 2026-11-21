import React, { useState } from 'react';
import { useCouponStore } from '../../store/useCouponStore';
import { Plus, Edit2, Trash2, X, Ticket, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../../utils/formatters';

export const AdminCouponsPage = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon } = useCouponStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [form, setForm] = useState({
    code: '',
    discountType: 'percentage', // percentage or fixed
    discountValue: 15,
    minOrderAmount: 200,
    expirationDate: '2027-12-31',
    usageLimit: 100,
    status: 'active',
    description: '',
  });

  const handleOpenAdd = () => {
    setEditingCoupon(null);
    setForm({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minOrderAmount: 200,
      expirationDate: '2027-12-31',
      usageLimit: 100,
      status: 'active',
      description: '15% privilege reduction',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cpn) => {
    setEditingCoupon(cpn);
    setForm({
      code: cpn.code,
      discountType: cpn.discountType,
      discountValue: cpn.discountValue,
      minOrderAmount: cpn.minOrderAmount,
      expirationDate: cpn.expirationDate || '2027-12-31',
      usageLimit: cpn.usageLimit || 100,
      status: cpn.status || 'active',
      description: cpn.description || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.code.trim()) return;

    if (editingCoupon) {
      updateCoupon(editingCoupon.id, form);
    } else {
      addCoupon(form);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222226] pb-5">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Privilege Codes &amp; Coupons</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            {coupons.length} promotional codes configured • Live validation during customer checkout
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center space-x-2 px-4 py-2.5 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-widest font-semibold rounded shadow-md transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Issue New Code</span>
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-[#16161A] border border-[#25252B] rounded overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111114] uppercase tracking-wider text-gray-400 border-b border-[#25252B]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Code</th>
                <th className="py-3.5 px-3 font-semibold">Benefit</th>
                <th className="py-3.5 px-3 font-semibold">Min Subtotal</th>
                <th className="py-3.5 px-3 font-semibold">Times Used</th>
                <th className="py-3.5 px-3 font-semibold">Expiration</th>
                <th className="py-3.5 px-3 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222226]">
              {coupons.map((cpn) => (
                <tr key={cpn.id} className="hover:bg-[#1C1C20] transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-white text-xs px-2.5 py-1 rounded bg-[#101014] border border-[#2E2E36] tracking-wider text-velora-gold">
                      {cpn.code}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-white">
                    {cpn.discountType === 'percentage' ? `${cpn.discountValue}% OFF` : `$${cpn.discountValue} OFF`}
                  </td>
                  <td className="py-3.5 px-3 text-gray-300">
                    {formatPrice(cpn.minOrderAmount)}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-gray-300">
                    {cpn.usedCount || 0} / {cpn.usageLimit || '∞'}
                  </td>
                  <td className="py-3.5 px-3 text-gray-400 font-mono">
                    {cpn.expirationDate || 'Never'}
                  </td>
                  <td className="py-3.5 px-3">
                    <button
                      onClick={() => updateCoupon(cpn.id, { status: cpn.status === 'active' ? 'inactive' : 'active' })}
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider ${
                        cpn.status === 'active'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {cpn.status}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEdit(cpn)}
                        className="p-1.5 text-gray-400 hover:text-velora-gold"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => deleteCoupon(cpn.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-[#18181D] border border-[#2D2D35] max-w-md w-full rounded p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#25252B] pb-3">
              <h3 className="font-editorial text-xl text-white font-medium">
                {editingCoupon ? 'Edit Privilege Code' : 'Issue New Privilege Code'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. VIP20"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white font-mono uppercase focus:outline-none focus:border-velora-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 uppercase tracking-wider block mb-1">Discount Type</label>
                  <select
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-300 uppercase tracking-wider block mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: Number(e.target.value) })}
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 uppercase tracking-wider block mb-1">Min Order Amount ($)</label>
                  <input
                    type="number"
                    value={form.minOrderAmount}
                    onChange={(e) => setForm({ ...form, minOrderAmount: Number(e.target.value) })}
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-gray-300 uppercase tracking-wider block mb-1">Expiration Date</label>
                  <input
                    type="date"
                    value={form.expirationDate}
                    onChange={(e) => setForm({ ...form, expirationDate: e.target.value })}
                    className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-300 uppercase tracking-wider block mb-1">Description / Internal Memo</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. VIP 20% privilege code"
                  className="w-full bg-[#101014] border border-[#2E2E36] p-2 rounded text-white focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 bg-[#25252B] text-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-velora-gold text-black font-semibold rounded"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
