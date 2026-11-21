import React, { useState } from 'react';
import { useReviewStore } from '../../store/useReviewStore';
import { Star, Check, X, Trash2, Eye } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const AdminReviewsPage = () => {
  const { reviews, approveReview, rejectReview, deleteReview } = useReviewStore();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredReviews = reviews.filter((r) => {
    if (filterStatus === 'all') return true;
    return r.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      <div className="border-b border-[#222226] pb-5">
        <h1 className="font-editorial text-3xl text-white font-medium">Patron Reviews Moderation</h1>
        <p className="text-xs text-gray-400 mt-1 font-mono">
          Only approved reflections appear publicly on luxury garment product detail pages
        </p>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-3 py-1.5 rounded uppercase tracking-wider text-xs ${
            filterStatus === 'all' ? 'bg-velora-gold text-black font-semibold' : 'bg-[#18181D] text-gray-400'
          }`}
        >
          All ({reviews.length})
        </button>
        <button
          onClick={() => setFilterStatus('approved')}
          className={`px-3 py-1.5 rounded uppercase tracking-wider text-xs ${
            filterStatus === 'approved' ? 'bg-emerald-600 text-white font-semibold' : 'bg-[#18181D] text-gray-400'
          }`}
        >
          Approved ({reviews.filter((r) => r.status === 'approved').length})
        </button>
        <button
          onClick={() => setFilterStatus('rejected')}
          className={`px-3 py-1.5 rounded uppercase tracking-wider text-xs ${
            filterStatus === 'rejected' ? 'bg-rose-600 text-white font-semibold' : 'bg-[#18181D] text-gray-400'
          }`}
        >
          Rejected ({reviews.filter((r) => r.status === 'rejected').length})
        </button>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <div key={rev.id} className="bg-[#16161A] border border-[#25252B] p-5 rounded space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <span className="text-[10px] uppercase font-mono text-velora-gold tracking-widest block">
                  {rev.productName || 'Creation'}
                </span>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="font-semibold text-white text-xs">{rev.customerName}</span>
                  <span className="text-[10px] text-gray-500">({rev.customerEmail || 'Verified'})</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-[10px] text-gray-400">{formatDate(rev.date)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center text-velora-gold">
                  {[...Array(rev.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-velora-gold" />
                  ))}
                </div>
                <span className={`text-[10px] uppercase px-2 py-0.5 rounded font-bold ${
                  rev.status === 'approved' ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'
                }`}>
                  {rev.status}
                </span>
              </div>
            </div>

            <p className="font-editorial text-base text-white font-medium">{rev.title}</p>
            <p className="text-xs text-gray-300 font-light leading-relaxed">{rev.comment}</p>

            <div className="pt-2 border-t border-[#25252B] flex justify-end space-x-2 text-xs">
              {rev.status !== 'approved' && (
                <button
                  onClick={() => approveReview(rev.id)}
                  className="px-3 py-1 bg-emerald-950 text-emerald-300 hover:bg-emerald-900 rounded flex items-center space-x-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Approve Publicly</span>
                </button>
              )}
              {rev.status !== 'rejected' && (
                <button
                  onClick={() => rejectReview(rev.id)}
                  className="px-3 py-1 bg-rose-950 text-rose-300 hover:bg-rose-900 rounded flex items-center space-x-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reject</span>
                </button>
              )}
              <button
                onClick={() => deleteReview(rev.id)}
                className="p-1 text-gray-500 hover:text-rose-400"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
