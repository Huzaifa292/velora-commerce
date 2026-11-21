import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { MapPin, Plus, Trash2, Edit2, Check } from 'lucide-react';

export const AddressesPage = () => {
  const { customer } = useAuthStore();

  const [addresses, setAddresses] = useState([
    {
      id: 'addr-default',
      isDefault: true,
      label: 'Primary Residence',
      fullName: customer?.name || 'Helena Vance',
      street: '740 Park Avenue, Apt 14B',
      city: 'New York',
      postalCode: '10021',
      country: 'United States',
      phone: '+1 (555) 234-8901',
    },
    {
      id: 'addr-secondary',
      isDefault: false,
      label: 'Summer Villa',
      fullName: customer?.name || 'Helena Vance',
      street: '34 Ocean Promenade, Villa 8',
      city: 'Southampton',
      postalCode: '11968',
      country: 'United States',
      phone: '+1 (555) 890-1234',
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: '',
    fullName: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'United States',
    phone: '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newAddr.street || !newAddr.city) return;
    setAddresses((prev) => [
      ...prev,
      {
        ...newAddr,
        id: `addr-${Date.now()}`,
        isDefault: false,
      },
    ]);
    setShowAddForm(false);
    setNewAddr({
      label: '',
      fullName: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'United States',
      phone: '',
    });
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-10">
      <div className="border-b border-velora-sand pb-4 flex justify-between items-end">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
            Patron Records
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
            SAVED RESIDENCES
          </h1>
        </div>
        <Link
          to="/account"
          className="text-xs uppercase tracking-wider text-velora-taupe hover:text-velora-black"
        >
          ← Back to Account
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white border border-velora-sand p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-velora-black">
                  {addr.label}
                </span>
                {addr.isDefault && (
                  <span className="text-[10px] bg-velora-gold/20 text-velora-gold px-2 py-0.5 rounded-sm font-semibold uppercase tracking-wider">
                    Default Shipping
                  </span>
                )}
              </div>
              <p className="text-xs font-medium text-velora-black mt-2">{addr.fullName}</p>
              <p className="text-xs text-velora-charcoal/80 font-light mt-1">{addr.street}</p>
              <p className="text-xs text-velora-charcoal/80 font-light">
                {addr.city}, {addr.postalCode}
              </p>
              <p className="text-xs text-velora-charcoal/80 font-light">{addr.country}</p>
              <p className="text-[11px] text-velora-taupe mt-2">Tel: {addr.phone}</p>
            </div>

            <div className="pt-3 border-t border-velora-sand flex justify-between text-xs text-velora-taupe">
              <button
                onClick={() => setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === addr.id })))}
                className="hover:text-velora-black"
              >
                Set as Default
              </button>
              {!addr.isDefault && (
                <button onClick={() => handleDelete(addr.id)} className="hover:text-red-700">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add Address Card */}
        <div className="bg-velora-ivory/40 border border-dashed border-velora-sand p-6 flex flex-col items-center justify-center text-center space-y-3 min-h-[220px]">
          <MapPin className="w-8 h-8 text-velora-taupe/60" />
          <p className="font-editorial text-lg text-velora-black">Add New Destination</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-velora-black text-white text-xs uppercase tracking-wider hover:bg-velora-gold hover:text-black transition-colors"
          >
            Add Address
          </button>
        </div>
      </div>

      {/* Modal to add address */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddForm(false)} />
          <div className="min-h-full flex items-center justify-center p-4">
            <form onSubmit={handleAdd} className="relative bg-white max-w-md w-full border border-velora-sand p-6 space-y-4 shadow-2xl z-10">
              <h3 className="font-editorial text-2xl text-velora-black font-medium border-b border-velora-sand pb-2">
                New Residence
              </h3>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Residence Label</label>
                <input
                  type="text"
                  required
                  value={newAddr.label}
                  onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                  placeholder="e.g. London Townhouse"
                  className="w-full border border-velora-sand p-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Full Recipient Name</label>
                <input
                  type="text"
                  required
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  placeholder="e.g. Helena Vance"
                  className="w-full border border-velora-sand p-2 text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Street Address</label>
                <input
                  type="text"
                  required
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                  placeholder="18 Berkeley Square"
                  className="w-full border border-velora-sand p-2 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    placeholder="London"
                    className="w-full border border-velora-sand p-2 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Postal Code</label>
                  <input
                    type="text"
                    required
                    value={newAddr.postalCode}
                    onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                    placeholder="W1J 6DA"
                    className="w-full border border-velora-sand p-2 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-velora-sand text-xs uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-velora-black text-white text-xs uppercase tracking-wider hover:bg-velora-gold hover:text-black"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
