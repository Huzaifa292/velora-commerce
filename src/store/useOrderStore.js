import { create } from 'zustand';
import { initialOrders } from '../data/demoOrdersData';
import { generateOrderId } from '../utils/formatters';

const STORAGE_KEY = 'velora_orders';

const getInitialOrders = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load orders', e);
  }
  return initialOrders;
};

export const useOrderStore = create((set, get) => ({
  orders: getInitialOrders(),

  saveOrders: (orders) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
    set({ orders });
  },

  createOrder: (orderData) => {
    const newOrderId = generateOrderId();
    const now = new Date().toISOString();

    const order = {
      id: newOrderId,
      date: now,
      customer: orderData.customer,
      items: orderData.items,
      deliveryMethod: orderData.deliveryMethod || 'Standard Delivery',
      paymentMethod: orderData.paymentMethod || 'Simulated Card',
      subtotal: Number(orderData.subtotal) || 0,
      discount: Number(orderData.discount) || 0,
      shippingFee: Number(orderData.shippingFee) || 0,
      total: Number(orderData.total) || 0,
      status: 'Confirmed',
      timeline: [
        {
          title: 'Confirmed',
          date: now,
          description: 'Order placed and payment authorized successfully',
        },
        {
          title: 'Order Placed',
          date: now,
          description: 'Awaiting atelier fulfillment',
        },
      ],
    };

    const updated = [order, ...get().orders];
    get().saveOrders(updated);
    return order;
  },

  updateOrderStatus: (orderId, newStatus) => {
    const now = new Date().toISOString();
    const updated = get().orders.map((o) => {
      if (o.id === orderId) {
        const timeline = [...(o.timeline || [])];
        timeline.unshift({
          title: newStatus,
          date: now,
          description: `Order status transitioned to ${newStatus}`,
        });
        return {
          ...o,
          status: newStatus,
          timeline,
        };
      }
      return o;
    });
    get().saveOrders(updated);
  },

  deleteOrder: (orderId) => {
    const updated = get().orders.filter((o) => o.id !== orderId);
    get().saveOrders(updated);
  },

  getOrderById: (orderId) => {
    return get().orders.find((o) => o.id === orderId);
  },

  getOrdersByEmail: (email) => {
    if (!email) return [];
    return get().orders.filter(
      (o) => o.customer && o.customer.email && o.customer.email.toLowerCase() === email.toLowerCase()
    );
  },
}));
