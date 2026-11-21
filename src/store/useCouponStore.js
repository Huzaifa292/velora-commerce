import { create } from 'zustand';
import { initialCoupons } from '../data/demoCouponsData';

const STORAGE_KEY = 'velora_coupons';

const getInitialCoupons = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load coupons', e);
  }
  return initialCoupons;
};

export const useCouponStore = create((set, get) => ({
  coupons: getInitialCoupons(),

  saveCoupons: (coupons) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coupons));
    } catch (e) {
      console.error('Failed to save coupons', e);
    }
    set({ coupons });
  },

  addCoupon: (couponData) => {
    const newCoupon = {
      ...couponData,
      id: couponData.id || `cpn-${Date.now()}`,
      code: couponData.code.toUpperCase().trim(),
      discountValue: Number(couponData.discountValue) || 0,
      minOrderAmount: Number(couponData.minOrderAmount) || 0,
      usedCount: 0,
      status: couponData.status || 'active',
    };
    const updated = [newCoupon, ...get().coupons];
    get().saveCoupons(updated);
    return newCoupon;
  },

  updateCoupon: (id, fields) => {
    const updated = get().coupons.map((c) => {
      if (c.id === id) {
        return {
          ...c,
          ...fields,
          code: fields.code ? fields.code.toUpperCase().trim() : c.code,
          discountValue: fields.discountValue !== undefined ? Number(fields.discountValue) : c.discountValue,
          minOrderAmount: fields.minOrderAmount !== undefined ? Number(fields.minOrderAmount) : c.minOrderAmount,
        };
      }
      return c;
    });
    get().saveCoupons(updated);
  },

  deleteCoupon: (id) => {
    const updated = get().coupons.filter((c) => c.id !== id);
    get().saveCoupons(updated);
  },

  validateCoupon: (code, subtotal) => {
    if (!code) return { valid: false, message: 'Please enter a coupon code.' };
    const normalized = code.toUpperCase().trim();
    const coupon = get().coupons.find((c) => c.code === normalized);

    if (!coupon) {
      return { valid: false, message: 'Invalid promotional code.' };
    }
    if (coupon.status !== 'active') {
      return { valid: false, message: 'This code is no longer active.' };
    }
    if (coupon.expirationDate && new Date(coupon.expirationDate) < new Date()) {
      return { valid: false, message: 'This promotional code has expired.' };
    }
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return {
        valid: false,
        message: `A minimum subtotal of $${coupon.minOrderAmount} is required for this code.`,
      };
    }

    return {
      valid: true,
      coupon,
      message: `Coupon "${coupon.code}" applied successfully!`,
    };
  },

  incrementCouponUsage: (code) => {
    const updated = get().coupons.map((c) =>
      c.code === code ? { ...c, usedCount: (c.usedCount || 0) + 1 } : c
    );
    get().saveCoupons(updated);
  },
}));
