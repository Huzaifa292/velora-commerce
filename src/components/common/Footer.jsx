import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore';

export const Footer = () => {
  const { storeName, contactEmail, phone, cms } = useSettingsStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please provide a valid email address.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-velora-black text-velora-sand/90 pt-16 pb-12 border-t border-velora-charcoal font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Grid */}
        <div className="pb-16 border-b border-velora-charcoal/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-[0.25em] text-velora-gold font-medium">Privileged Access</span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-velora-ivory mt-2 tracking-wide">
              {cms?.newsletter?.title || 'ENTER THE WORLD OF VELORA'}
            </h3>
            <p className="text-sm text-velora-sand/70 mt-2 max-w-xl font-light">
              {cms?.newsletter?.subtitle || 'Receive invitations to seasonal private archives, runway previews, and bespoke salon viewings.'}
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="flex items-center space-x-2 text-velora-gold bg-velora-charcoal/50 p-4 border border-velora-gold/40">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-xs tracking-wider uppercase font-medium">
                  Welcome to the House of Velora. Your invitation has been dispatched.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 bg-velora-charcoal/80 border border-velora-taupe/40 px-4 py-3 text-xs text-velora-ivory placeholder-velora-sand/40 focus:outline-none focus:border-velora-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-velora-gold hover:bg-velora-gold-light text-velora-black px-6 py-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center space-x-1"
                  >
                    <span>Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                {error && <p className="text-red-400 text-[11px]">{error}</p>}
              </form>
            )}
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 text-xs">
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-4 pr-6">
            <span className="font-editorial text-2xl tracking-[0.25em] text-velora-ivory block font-medium">
              {storeName}
            </span>
            <p className="text-velora-sand/70 text-xs leading-relaxed max-w-sm font-light">
              Architectural luxury tailoring and timeless ready-to-wear crafted across our private ateliers in Biella, Florence, and Paris.
            </p>
            <div className="text-[11px] text-velora-sand/60 space-y-1 pt-2">
              <p>Private Concierge: <span className="text-velora-sand">{phone}</span></p>
              <p>Client Inquiries: <span className="text-velora-sand">{contactEmail}</span></p>
            </div>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <p className="uppercase tracking-widest font-medium text-velora-ivory text-[11px]">Client Concierge</p>
            <ul className="space-y-2.5 text-velora-sand/70 font-light">
              <li><Link to="/shipping-returns" className="hover:text-velora-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/size-guide" className="hover:text-velora-gold transition-colors">Bespoke Size Guide</Link></li>
              <li><Link to="/faq" className="hover:text-velora-gold transition-colors">Frequently Asked</Link></li>
              <li><Link to="/contact" className="hover:text-velora-gold transition-colors">Contact Concierge</Link></li>
              <li><Link to="/order-confirmation/VEL-2026-9812" className="hover:text-velora-gold transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* The House */}
          <div className="space-y-3">
            <p className="uppercase tracking-widest font-medium text-velora-ivory text-[11px]">The House</p>
            <ul className="space-y-2.5 text-velora-sand/70 font-light">
              <li><Link to="/about" className="hover:text-velora-gold transition-colors">Atelier Heritage</Link></li>
              <li><Link to="/collections/new-arrivals" className="hover:text-velora-gold transition-colors">Runway Edits</Link></li>
              <li><Link to="/collections/women" className="hover:text-velora-gold transition-colors">Women's Collection</Link></li>
              <li><Link to="/collections/men" className="hover:text-velora-gold transition-colors">Men's Tailoring</Link></li>
              <li><Link to="/collections/accessories" className="hover:text-velora-gold transition-colors">Leather Goods</Link></li>
            </ul>
          </div>

          {/* Admin & Legal */}
          <div className="space-y-3">
            <p className="uppercase tracking-widest font-medium text-velora-gold text-[11px]">Management</p>
            <ul className="space-y-2.5 text-velora-sand/70 font-light">
              <li>
                <Link to="/admin" className="text-velora-gold hover:text-white font-medium transition-colors flex items-center space-x-1">
                  <span>Admin Dashboard</span>
                </Link>
              </li>
              <li><Link to="/privacy-policy" className="hover:text-velora-gold transition-colors">Privacy Governance</Link></li>
              <li><Link to="/terms" className="hover:text-velora-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/account" className="hover:text-velora-gold transition-colors">Client Portal</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-velora-charcoal/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-velora-taupe space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} {storeName} COMMERCE. The Art of Modern Luxury. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="hover:text-velora-sand transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-velora-sand transition-colors">Terms</Link>
            <Link to="/faq" className="hover:text-velora-sand transition-colors">Security</Link>
            <Link to="/admin" className="text-velora-gold hover:underline">Executive Access</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
