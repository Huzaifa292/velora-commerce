export const initialOrders = [
  {
    id: 'VEL-2026-9812',
    date: '2026-03-01T14:22:00',
    customer: {
      name: 'Helena Vance',
      email: 'helena.vance@vancemedia.com',
      phone: '+1 (555) 234-8901',
      shippingAddress: {
        street: '740 Park Avenue, Apt 14B',
        city: 'New York',
        postalCode: '10021',
        country: 'United States',
      },
    },
    items: [
      {
        id: 'prod-w-1',
        name: 'The Monolith Cashmere Trench Coat',
        price: 1850.00,
        quantity: 1,
        selectedSize: 'S',
        selectedColor: 'Camel Sand',
        image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=1000',
      },
      {
        id: 'prod-acc-1',
        name: 'Palazzo Mulberry Silk Square Scarf',
        price: 320.00,
        quantity: 1,
        selectedSize: 'One Size',
        selectedColor: 'Gold Monogram',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    deliveryMethod: 'Express Courier',
    paymentMethod: 'Simulated Card',
    subtotal: 2170.00,
    discount: 217.00,
    shippingFee: 0.00,
    total: 1953.00,
    status: 'Delivered', // Pending, Confirmed, Processing, Shipped, Delivered, Cancelled
    timeline: [
      { title: 'Delivered', date: '2026-03-04T10:15:00', description: 'Package delivered at door' },
      { title: 'Out for Delivery', date: '2026-03-04T08:00:00', description: 'With courier' },
      { title: 'Shipped', date: '2026-03-02T16:30:00', description: 'Departed distribution center in Milan' },
      { title: 'Confirmed', date: '2026-03-01T14:30:00', description: 'Order confirmed and verified' },
      { title: 'Order Placed', date: '2026-03-01T14:22:00', description: 'Payment authorized' },
    ]
  },
  {
    id: 'VEL-2026-8743',
    date: '2026-03-03T11:05:00',
    customer: {
      name: 'Julian Sterling',
      email: 'julian@sterlingholdings.co.uk',
      phone: '+44 20 7946 0912',
      shippingAddress: {
        street: '18 Berkeley Square, Mayfair',
        city: 'London',
        postalCode: 'W1J 6DA',
        country: 'United Kingdom',
      },
    },
    items: [
      {
        id: 'prod-m-1',
        name: 'Double-Breasted Italian Wool Overcoat',
        price: 1650.00,
        quantity: 1,
        selectedSize: 'L',
        selectedColor: 'Deep Charcoal',
        image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    deliveryMethod: 'Standard Delivery',
    paymentMethod: 'Simulated Card',
    subtotal: 1650.00,
    discount: 0.00,
    shippingFee: 0.00,
    total: 1650.00,
    status: 'Shipped',
    timeline: [
      { title: 'Shipped', date: '2026-03-04T12:00:00', description: 'Departed Heathrow cargo facility' },
      { title: 'Processing', date: '2026-03-03T15:00:00', description: 'Tailoring inspections completed' },
      { title: 'Order Placed', date: '2026-03-03T11:05:00', description: 'Order submitted' },
    ]
  },
  {
    id: 'VEL-2026-7629',
    date: '2026-03-04T09:18:00',
    customer: {
      name: 'Camille Laurent',
      email: 'camille.l@atelierlaurent.fr',
      phone: '+33 1 42 68 55 00',
      shippingAddress: {
        street: '28 Rue du Faubourg Saint-Honoré',
        city: 'Paris',
        postalCode: '75008',
        country: 'France',
      },
    },
    items: [
      {
        id: 'prod-b-1',
        name: 'The Velora Flap Bag in Box Calfskin',
        price: 1450.00,
        quantity: 1,
        selectedSize: 'Medium',
        selectedColor: 'Obsidian Black',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    deliveryMethod: 'Express Courier',
    paymentMethod: 'Cash on Delivery',
    subtotal: 1450.00,
    discount: 50.00,
    shippingFee: 25.00,
    total: 1425.00,
    status: 'Processing',
    timeline: [
      { title: 'Processing', date: '2026-03-04T10:00:00', description: 'Bespoke packing with signature gift box' },
      { title: 'Order Placed', date: '2026-03-04T09:18:00', description: 'Payment on delivery registered' },
    ]
  },
  {
    id: 'VEL-2026-6510',
    date: '2026-03-05T16:40:00',
    customer: {
      name: 'Sophia Rossi',
      email: 'sophia.rossi@milano.it',
      phone: '+39 02 8765 4321',
      shippingAddress: {
        street: 'Via Montenapoleone 12',
        city: 'Milan',
        postalCode: '20121',
        country: 'Italy',
      },
    },
    items: [
      {
        id: 'prod-w-2',
        name: 'Asymmetric Pleated Silk Evening Gown',
        price: 1980.00,
        quantity: 1,
        selectedSize: 'M',
        selectedColor: 'Champagne Ivory',
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    deliveryMethod: 'Express Courier',
    paymentMethod: 'Simulated Card',
    subtotal: 1980.00,
    discount: 0.00,
    shippingFee: 0.00,
    total: 1980.00,
    status: 'Confirmed',
    timeline: [
      { title: 'Confirmed', date: '2026-03-05T17:00:00', description: 'Allocated to atelier fulfillment team' },
      { title: 'Order Placed', date: '2026-03-05T16:40:00', description: 'Order payment successful' },
    ]
  },
  {
    id: 'VEL-2026-5401',
    date: '2026-03-06T08:55:00',
    customer: {
      name: 'Alexander Wright',
      email: 'alex.wright@archdesign.com',
      phone: '+1 (415) 890-1234',
      shippingAddress: {
        street: '420 Pacific Avenue',
        city: 'San Francisco',
        postalCode: '94133',
        country: 'United States',
      },
    },
    items: [
      {
        id: 'prod-s-1',
        name: 'The Venetian Leather Loafer',
        price: 680.00,
        quantity: 1,
        selectedSize: '42',
        selectedColor: 'Cognac Saddle',
        image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=1000',
      }
    ],
    deliveryMethod: 'Standard Delivery',
    paymentMethod: 'Simulated Card',
    subtotal: 680.00,
    discount: 0.00,
    shippingFee: 0.00,
    total: 680.00,
    status: 'Pending',
    timeline: [
      { title: 'Order Placed', date: '2026-03-06T08:55:00', description: 'Awaiting inventory verification' },
    ]
  }
];
