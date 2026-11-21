import { create } from 'zustand';

const CUSTOMER_AUTH_KEY = 'velora_customer_auth';
const ADMIN_AUTH_KEY = 'velora_admin_auth';

export const useAuthStore = create((set) => ({
  // Customer Auth
  customer: (() => {
    try {
      const saved = localStorage.getItem(CUSTOMER_AUTH_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })(),

  // Admin Auth
  isAdminLoggedIn: (() => {
    try {
      return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  })(),

  adminUser: {
    email: 'admin@velora.demo',
    name: 'Executive Director',
    role: 'Super Administrator',
  },

  loginCustomer: (email, password) => {
    // Demo authentication
    if (!email || !password) return { success: false, message: 'Please enter all credentials.' };
    const user = {
      id: `cust-user-${Date.now()}`,
      email,
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
      joinedDate: new Date().toISOString().slice(0, 10),
    };
    localStorage.setItem(CUSTOMER_AUTH_KEY, JSON.stringify(user));
    set({ customer: user });
    return { success: true, user };
  },

  registerCustomer: (name, email, password) => {
    if (!name || !email || !password) return { success: false, message: 'All fields are required.' };
    const user = {
      id: `cust-user-${Date.now()}`,
      name,
      email,
      joinedDate: new Date().toISOString().slice(0, 10),
    };
    localStorage.setItem(CUSTOMER_AUTH_KEY, JSON.stringify(user));
    set({ customer: user });
    return { success: true, user };
  },

  logoutCustomer: () => {
    localStorage.removeItem(CUSTOMER_AUTH_KEY);
    set({ customer: null });
  },

  updateCustomerProfile: (fields) => {
    set((state) => {
      const updated = { ...state.customer, ...fields };
      localStorage.setItem(CUSTOMER_AUTH_KEY, JSON.stringify(updated));
      return { customer: updated };
    });
  },

  // Admin Login with credentials: admin@velora.demo / Velora123!
  loginAdmin: (email, password) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (cleanEmail === 'admin@velora.demo' && cleanPass === 'Velora123!') {
      localStorage.setItem(ADMIN_AUTH_KEY, 'true');
      set({ isAdminLoggedIn: true });
      return { success: true };
    }
    return {
      success: false,
      message: 'Invalid administrative credentials. Use admin@velora.demo / Velora123!',
    };
  },

  logoutAdmin: () => {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    set({ isAdminLoggedIn: false });
  },
}));
