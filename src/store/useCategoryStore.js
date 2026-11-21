import { create } from 'zustand';
import { initialCategories } from '../data/categoriesData';

const STORAGE_KEY = 'velora_categories';

const getInitialCategories = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load categories from localStorage', e);
  }
  return initialCategories;
};

export const useCategoryStore = create((set, get) => ({
  categories: getInitialCategories(),

  saveCategories: (categories) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
    set({ categories });
  },

  addCategory: (catData) => {
    const newCat = {
      ...catData,
      id: catData.id || `cat-${Date.now()}`,
      slug: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      itemCount: catData.itemCount || 0,
      status: catData.status || 'active',
    };
    const updated = [...get().categories, newCat];
    get().saveCategories(updated);
    return newCat;
  },

  updateCategory: (id, fields) => {
    const updated = get().categories.map((c) => (c.id === id ? { ...c, ...fields } : c));
    get().saveCategories(updated);
  },

  deleteCategory: (id) => {
    const updated = get().categories.filter((c) => c.id !== id);
    get().saveCategories(updated);
  },
}));
