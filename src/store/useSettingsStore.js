import { create } from 'zustand';

const SETTINGS_KEY = 'velora_settings';

const defaultSettings = {
  storeName: 'VELORA',
  tagline: 'THE ART OF MODERN LUXURY',
  contactEmail: 'concierge@velora.luxury',
  phone: '+1 (800) 835-6721',
  currencySymbol: '$',
  currencyCode: 'USD',
  shippingFee: 25.0,
  freeShippingThreshold: 300.0,
  lowStockThreshold: 10,
  cms: {
    announcementBar: {
      text: 'Complimentary white-glove shipping on orders exceeding $300 | Use privilege code VELORA10',
      active: true,
    },
    hero: {
      eyebrow: 'SPRING / SUMMER 2026',
      heading: 'THE ART OF MODERN LUXURY',
      subheading: 'Sculptural silhouettes, unyielding craftsmanship, and noble textiles tailored for discerning connoisseurs.',
      primaryBtnText: 'Explore Women',
      primaryBtnLink: '/collections/women',
      secondaryBtnText: 'Discover Men',
      secondaryBtnLink: '/collections/men',
      bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000',
    },
    editorial: {
      title: 'THE ARCHITECTURAL SILHOUETTE',
      subtitle: 'VOL. 04 / ESSENTIAL FORM',
      description: 'Crafted between our private ateliers in Biella and Florence, the 2026 Edit challenges ornamental excess through pure cut, double-faced cashmere, and understated noble textures.',
      buttonText: 'Discover Collection',
      buttonLink: '/shop',
      image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600',
    },
    story: {
      title: 'BORN IN PURSUIT OF PERFECTION',
      quote: 'True luxury whispers where others shout. It lives within the invisible stitch, the tactile memory of Mongolian cashmere, and the architectural silhouette that outlives fleeting trends.',
      author: 'VELORA ATELIER, MILANO',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    },
    newsletter: {
      title: 'ENTER THE WORLD OF VELORA',
      subtitle: 'Subscribe to receive private invitations to seasonal archives, runway previews, and private salon viewings.',
    },
  },
};

const getInitialSettings = () => {
  try {
    const saved = localStorage.getItem(SETTINGS_KEY);
    if (saved) {
      return { ...defaultSettings, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load settings', e);
  }
  return defaultSettings;
};

export const useSettingsStore = create((set, get) => ({
  ...getInitialSettings(),

  saveSettings: (newSettings) => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
    set(newSettings);
  },

  updateSettings: (fields) => {
    const current = get();
    const updated = {
      ...current,
      ...fields,
      shippingFee: fields.shippingFee !== undefined ? Number(fields.shippingFee) : current.shippingFee,
      freeShippingThreshold: fields.freeShippingThreshold !== undefined ? Number(fields.freeShippingThreshold) : current.freeShippingThreshold,
      lowStockThreshold: fields.lowStockThreshold !== undefined ? Number(fields.lowStockThreshold) : current.lowStockThreshold,
    };
    get().saveSettings(updated);
  },

  updateCMSSection: (section, data) => {
    const current = get();
    const updated = {
      ...current,
      cms: {
        ...current.cms,
        [section]: {
          ...current.cms[section],
          ...data,
        },
      },
    };
    get().saveSettings(updated);
  },

  resetSettings: () => {
    get().saveSettings(defaultSettings);
  },
}));
