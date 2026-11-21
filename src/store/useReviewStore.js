import { create } from 'zustand';
import { initialReviews } from '../data/demoReviewsData';

const STORAGE_KEY = 'velora_reviews';

const getInitialReviews = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load reviews', e);
  }
  return initialReviews;
};

export const useReviewStore = create((set, get) => ({
  reviews: getInitialReviews(),

  saveReviews: (reviews) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews', e);
    }
    set({ reviews });
  },

  addReview: (reviewData) => {
    const newReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      rating: Number(reviewData.rating) || 5,
      date: new Date().toISOString().slice(0, 10),
      status: 'approved', // Auto-approve demo reviews so customer immediately sees their feedback, admin can toggle
    };
    const updated = [newReview, ...get().reviews];
    get().saveReviews(updated);
    return newReview;
  },

  approveReview: (id) => {
    const updated = get().reviews.map((r) => (r.id === id ? { ...r, status: 'approved' } : r));
    get().saveReviews(updated);
  },

  rejectReview: (id) => {
    const updated = get().reviews.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r));
    get().saveReviews(updated);
  },

  deleteReview: (id) => {
    const updated = get().reviews.filter((r) => r.id !== id);
    get().saveReviews(updated);
  },

  getApprovedProductReviews: (productId) => {
    return get().reviews.filter((r) => r.productId === productId && r.status === 'approved');
  },
}));
