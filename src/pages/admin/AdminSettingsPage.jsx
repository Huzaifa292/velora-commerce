import React, { useState } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { useProductStore } from '../../store/useProductStore';
import { Check, RotateCcw, ShieldCheck } from 'lucide-react';

export const AdminSettingsPage = () => {
  const settings = useSettingsStore();
  const { resetToDefaults } = useProductStore();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [contactEmail, setContactEmail] = useState(settings.contactEmail);
  const [phone, setPhone] = useState(settings.phone);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [currencyCode, setCurrencyCode] = useState(settings.currencyCode);
  const [shippingFee, setShippingFee] = useState(String(settings.shippingFee));
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(String(settings.freeShippingThreshold));
  const [lowStockThreshold, setLowStockThreshold] = useState(String(settings.lowStockThreshold));

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    settings.updateSettings({
      storeName,
      tagline,
      contactEmail,
      phone,
      currencySymbol,
      currencyCode,
      shippingFee: Number(shippingFee),
      freeShippingThreshold: Number(freeShippingThreshold),
      lowStockThreshold: Number(lowStockThreshold),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetCatalog = () => {
    if (confirm('Are you sure you wish to reload original factory demo data? This will reset custom products.')) {
      resetToDefaults();
      alert('Original factory luxury products have been reseeded successfully.');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-[#222226] pb-5">
        <h1 className="font-editorial text-3xl text-white font-medium">House Governance &amp; Store Configuration</h1>
        <p className="text-xs text-gray-400 mt-1 font-mono">
          Global currency formatting, thresholds, and concierge contact settings
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs rounded flex items-center space-x-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>System configuration updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <h2 className="font-editorial text-xl text-white font-medium border-b border-[#25252B] pb-3">
            Brand Identity &amp; Contact
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">House Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">House Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">Concierge Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">Telephone Hotline</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <h2 className="font-editorial text-xl text-white font-medium border-b border-[#25252B] pb-3">
            Financial &amp; Delivery Parameters
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">Currency Symbol</label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold font-mono"
              />
            </div>
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">Standard Delivery Fee ($)</label>
              <input
                type="number"
                value={shippingFee}
                onChange={(e) => setShippingFee(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">
                Complimentary Shipping Threshold ($)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
            <div>
              <label className="text-gray-300 uppercase tracking-wider block mb-1">
                Low Inventory Warning Threshold (Units)
              </label>
              <input
                type="number"
                value={lowStockThreshold}
                onChange={(e) => setLowStockThreshold(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={handleResetCatalog}
            className="flex items-center space-x-1.5 px-4 py-2.5 bg-rose-950 text-rose-300 hover:bg-rose-900 border border-rose-800 rounded text-xs uppercase tracking-wider"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reseed Default Demo Catalog</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-widest font-semibold rounded shadow-md"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
};
