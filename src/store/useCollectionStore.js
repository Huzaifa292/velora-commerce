import { create } from 'zustand';
import { initialCollections } from '../data/collectionsData';

const STORAGE_KEY = 'velora_collections';

const getInitialCollections = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load collections from localStorage', e);
  }
  return initialCollections;
};

export const useCollectionStore = create((set, get) => ({
  collections: getInitialCollections(),

  saveCollections: (collections) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collections));
    } catch (e) {
      console.error('Failed to save collections', e);
    }
    set({ collections });
  },

  addCollection: (colData) => {
    const newCol = {
      ...colData,
      id: colData.id || `col-${Date.now()}`,
      slug: colData.slug || colData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      featured: colData.featured !== undefined ? colData.featured : true,
    };
    const updated = [...get().collections, newCol];
    get().saveCollections(updated);
    return newCol;
  },

  updateCollection: (id, fields) => {
    const updated = get().collections.map((c) => (c.id === id ? { ...c, ...fields } : c));
    get().saveCollections(updated);
  },

  deleteCollection: (id) => {
    const updated = get().collections.filter((c) => c.id !== id);
    get().saveCollections(updated);
  },
}));
