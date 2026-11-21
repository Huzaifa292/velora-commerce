import { create } from 'zustand';
import { initialCustomers } from '../data/demoCustomersData';

const STORAGE_KEY = 'velora_customers';

const getInitialCustomers = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load customers', e);
  }
  return initialCustomers;
};

export const useCustomerStore = create((set, get) => ({
  customers: getInitialCustomers(),

  saveCustomers: (customers) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
    } catch (e) {
      console.error('Failed to save customers', e);
    }
    set({ customers });
  },

  addCustomer: (custData) => {
    const existing = get().customers.find((c) => c.email.toLowerCase() === custData.email.toLowerCase());
    if (existing) {
      return existing;
    }
    const newCust = {
      ...custData,
      id: custData.id || `cust-${Date.now()}`,
      totalOrders: custData.totalOrders || 0,
      totalSpent: custData.totalSpent || 0,
      joinedDate: custData.joinedDate || new Date().toISOString().slice(0, 10),
      status: custData.status || 'Active',
      addresses: custData.addresses || [],
    };
    const updated = [newCust, ...get().customers];
    get().saveCustomers(updated);
    return newCust;
  },

  recordCustomerPurchase: (customerInfo, orderTotal) => {
    const customers = [...get().customers];
    const index = customers.findIndex(
      (c) => c.email && customerInfo.email && c.email.toLowerCase() === customerInfo.email.toLowerCase()
    );

    if (index > -1) {
      const existing = customers[index];
      customers[index] = {
        ...existing,
        name: customerInfo.name || existing.name,
        phone: customerInfo.phone || existing.phone,
        totalOrders: existing.totalOrders + 1,
        totalSpent: existing.totalSpent + orderTotal,
      };
    } else {
      customers.unshift({
        id: `cust-${Date.now()}`,
        name: customerInfo.name || 'Anonymous Client',
        email: customerInfo.email,
        phone: customerInfo.phone || '',
        totalOrders: 1,
        totalSpent: orderTotal,
        joinedDate: new Date().toISOString().slice(0, 10),
        status: orderTotal > 1500 ? 'VIP' : 'Active',
        city: customerInfo.shippingAddress?.city || 'New York',
        country: customerInfo.shippingAddress?.country || 'United States',
        addresses: customerInfo.shippingAddress
          ? [
              {
                id: `addr-${Date.now()}`,
                type: 'Default Shipping',
                fullName: customerInfo.name,
                street: customerInfo.shippingAddress.street,
                city: customerInfo.shippingAddress.city,
                postalCode: customerInfo.shippingAddress.postalCode,
                country: customerInfo.shippingAddress.country,
                phone: customerInfo.phone,
              },
            ]
          : [],
      });
    }
    get().saveCustomers(customers);
  },

  updateCustomer: (id, fields) => {
    const updated = get().customers.map((c) => (c.id === id ? { ...c, ...fields } : c));
    get().saveCustomers(updated);
  },

  deleteCustomer: (id) => {
    const updated = get().customers.filter((c) => c.id !== id);
    get().saveCustomers(updated);
  },
}));
