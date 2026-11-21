import { create } from 'zustand';
import { initialProducts } from '../data/productsData';

const STORAGE_KEY = 'velora_products';

const getInitialProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load products from localStorage', e);
  }
  return initialProducts;
};

export const useProductStore = create((set, get) => ({
  products: getInitialProducts(),

  saveProducts: (products) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      console.error('Failed to save products to localStorage', e);
    }
    set({ products });
  },

  addProduct: (productData) => {
    const newProduct = {
      ...productData,
      id: productData.id || `prod-custom-${Date.now()}`,
      slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      stock: Number(productData.stock) || 0,
      price: Number(productData.price) || 0,
      salePrice: productData.salePrice ? Number(productData.salePrice) : null,
      rating: productData.rating ? Number(productData.rating) : 5.0,
      reviewCount: productData.reviewCount ? Number(productData.reviewCount) : 0,
      status: productData.status || 'published',
      images: Array.isArray(productData.images) && productData.images.length ? productData.images : [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200'
      ],
      sizes: Array.isArray(productData.sizes) ? productData.sizes : ['One Size'],
      colors: Array.isArray(productData.colors) ? productData.colors : [{ name: 'Default', hex: '#111111' }],
      details: Array.isArray(productData.details) ? productData.details : ['Premium craftsmanship', 'Imported luxury fabric'],
    };

    const updated = [newProduct, ...get().products];
    get().saveProducts(updated);
    return newProduct;
  },

  updateProduct: (id, updatedFields) => {
    const updated = get().products.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...updatedFields,
          price: updatedFields.price !== undefined ? Number(updatedFields.price) : p.price,
          salePrice: updatedFields.salePrice !== undefined ? (updatedFields.salePrice ? Number(updatedFields.salePrice) : null) : p.salePrice,
          stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : p.stock,
        };
      }
      return p;
    });
    get().saveProducts(updated);
  },

  deleteProduct: (id) => {
    const updated = get().products.filter((p) => p.id !== id);
    get().saveProducts(updated);
  },

  decreaseStock: (productId, quantity) => {
    const updated = get().products.map((p) => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock - quantity);
        return { ...p, stock: newStock };
      }
      return p;
    });
    get().saveProducts(updated);
  },

  increaseStock: (productId, quantity) => {
    const updated = get().products.map((p) => {
      if (p.id === productId) {
        return { ...p, stock: p.stock + quantity };
      }
      return p;
    });
    get().saveProducts(updated);
  },

  toggleFeatured: (id) => {
    const updated = get().products.map((p) =>
      p.id === id ? { ...p, isFeatured: !p.isFeatured } : p
    );
    get().saveProducts(updated);
  },

  toggleBestSeller: (id) => {
    const updated = get().products.map((p) =>
      p.id === id ? { ...p, isBestSeller: !p.isBestSeller } : p
    );
    get().saveProducts(updated);
  },

  resetToDefaults: () => {
    get().saveProducts(initialProducts);
  },

  getProductById: (id) => {
    return get().products.find((p) => p.id === id || p.slug === id);
  },
}));
