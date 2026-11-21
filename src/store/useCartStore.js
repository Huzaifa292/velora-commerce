import { create } from 'zustand';

const CART_STORAGE_KEY = 'velora_cart';

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to parse cart storage', e);
  }
  return [];
};

export const useCartStore = create((set, get) => ({
  items: getInitialCart(),
  isCartOpen: false,
  appliedCoupon: null,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

  saveCart: (items) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
    set({ items });
  },

  addToCart: (product, selectedSize, selectedColor, quantity = 1) => {
    const items = [...get().items];
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const color = typeof selectedColor === 'object' ? selectedColor.name : (selectedColor || 'Default');
    const colorHex = typeof selectedColor === 'object' ? selectedColor.hex : '#111111';

    const existingIndex = items.findIndex(
      (item) => item.productId === product.id && item.selectedSize === size && item.selectedColor === color
    );

    const price = product.salePrice ? Number(product.salePrice) : Number(product.price);

    if (existingIndex > -1) {
      const existing = items[existingIndex];
      const newQty = Math.min(product.stock, existing.quantity + quantity);
      items[existingIndex] = {
        ...existing,
        quantity: newQty,
      };
    } else {
      const newItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        productId: product.id,
        name: product.name,
        slug: product.slug,
        price: price,
        originalPrice: product.price,
        image: product.images && product.images[0] ? product.images[0] : '',
        selectedSize: size,
        selectedColor: color,
        colorHex: colorHex,
        quantity: Math.min(product.stock, quantity),
        stock: product.stock,
      };
      items.push(newItem);
    }

    get().saveCart(items);
    get().openCart();
  },

  removeFromCart: (cartItemId) => {
    const items = get().items.filter((item) => item.id !== cartItemId);
    get().saveCart(items);
  },

  updateQuantity: (cartItemId, newQty) => {
    if (newQty <= 0) {
      get().removeFromCart(cartItemId);
      return;
    }
    const items = get().items.map((item) => {
      if (item.id === cartItemId) {
        return {
          ...item,
          quantity: Math.min(item.stock, newQty),
        };
      }
      return item;
    });
    get().saveCart(items);
  },

  clearCart: () => {
    get().saveCart([]);
    set({ appliedCoupon: null });
  },

  applyCoupon: (coupon) => {
    set({ appliedCoupon: coupon });
  },

  removeCoupon: () => {
    set({ appliedCoupon: null });
  },

  getSubtotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    const coupon = get().appliedCoupon;
    if (!coupon) return 0;

    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return 0;
    }

    if (coupon.discountType === 'percentage') {
      return (subtotal * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed') {
      return Math.min(subtotal, coupon.discountValue);
    }
    return 0;
  },

  getShippingFee: (freeThreshold = 300, defaultFee = 25) => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= freeThreshold ? 0 : defaultFee;
  },

  getTotal: (freeThreshold = 300, defaultFee = 25) => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingFee(freeThreshold, defaultFee);
    return Math.max(0, subtotal - discount + shipping);
  },

  getTotalItemsCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
