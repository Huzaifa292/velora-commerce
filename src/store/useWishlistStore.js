import { create } from 'zustand';

const WISHLIST_STORAGE_KEY = 'velora_wishlist';

const getInitialWishlist = () => {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load wishlist', e);
  }
  return [];
};

export const useWishlistStore = create((set, get) => ({
  items: getInitialWishlist(),

  saveWishlist: (items) => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
    set({ items });
  },

  toggleWishlist: (product) => {
    const items = [...get().items];
    const index = items.findIndex((item) => item.id === product.id);

    if (index > -1) {
      items.splice(index, 1);
    } else {
      items.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images && product.images[0] ? product.images[0] : '',
        category: product.category,
        stock: product.stock,
      });
    }

    get().saveWishlist(items);
  },

  isInWishlist: (productId) => {
    return get().items.some((item) => item.id === productId);
  },

  removeFromWishlist: (productId) => {
    const items = get().items.filter((item) => item.id !== productId);
    get().saveWishlist(items);
  },

  clearWishlist: () => {
    get().saveWishlist([]);
  },
}));
