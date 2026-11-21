import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useWishlistStore } from '../../store/useWishlistStore';
import { useAuthStore } from '../../store/useAuthStore';
import { SearchOverlay } from '../storefront/SearchOverlay';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [megaMenuHovered, setMegaMenuHovered] = useState(false);

  const { getTotalItemsCount, openCart } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { customer, isAdminLoggedIn } = useAuthStore();
  const cartCount = getTotalItemsCount();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setMegaMenuHovered(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'New Arrivals', path: '/collections/new-arrivals' },
    { name: 'Women', path: '/collections/women' },
    { name: 'Men', path: '/collections/men' },
    { name: 'Collections', path: '/shop', hasMega: true },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-velora-ivory/95 backdrop-blur-md shadow-sm py-3 border-b border-velora-sand/60'
            : 'bg-velora-ivory py-4 border-b border-velora-sand/30'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Hamburger Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-velora-charcoal hover:text-velora-gold transition-colors focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex flex-col items-center lg:items-start">
              <Link to="/" className="group flex flex-col items-center">
                <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] font-medium text-velora-black transition-transform duration-300 group-hover:scale-[1.01]">
                  VELORA
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-velora-taupe font-sans -mt-1">
                  The Art of Modern Luxury
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => link.hasMega && setMegaMenuHovered(true)}
                  onMouseLeave={() => link.hasMega && setMegaMenuHovered(false)}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `text-xs uppercase tracking-[0.2em] transition-colors duration-200 hover:text-velora-gold py-1 ${
                        isActive ? 'text-velora-gold font-semibold border-b border-velora-gold' : 'text-velora-charcoal'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>

                  {/* Mega Menu Dropdown */}
                  {link.hasMega && megaMenuHovered && (
                    <div
                      className="absolute top-full -left-24 w-[750px] bg-white border border-velora-sand/80 shadow-2xl p-8 z-50 animate-fade-in"
                      onMouseEnter={() => setMegaMenuHovered(true)}
                      onMouseLeave={() => setMegaMenuHovered(false)}
                    >
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <p className="text-[11px] font-semibold tracking-widest uppercase text-velora-gold mb-3">
                            By Department
                          </p>
                          <ul className="space-y-2.5 text-xs text-velora-charcoal">
                            <li>
                              <Link to="/collections/women" className="hover:text-velora-gold transition-colors">
                                Women's Haute Couture
                              </Link>
                            </li>
                            <li>
                              <Link to="/collections/men" className="hover:text-velora-gold transition-colors">
                                Men's Tailoring & Outerwear
                              </Link>
                            </li>
                            <li>
                              <Link to="/collections/accessories" className="hover:text-velora-gold transition-colors">
                                Handcrafted Leather & Bags
                              </Link>
                            </li>
                            <li>
                              <Link to="/shop?category=shoes" className="hover:text-velora-gold transition-colors">
                                Luxury Footwear
                              </Link>
                            </li>
                            <li>
                              <Link to="/shop?category=accessories" className="hover:text-velora-gold transition-colors">
                                Fine Jewelry & Silk
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-[11px] font-semibold tracking-widest uppercase text-velora-gold mb-3">
                            Curated Edits
                          </p>
                          <ul className="space-y-2.5 text-xs text-velora-charcoal">
                            <li>
                              <Link to="/collections/new-arrivals" className="hover:text-velora-gold transition-colors">
                                Spring/Summer Preview
                              </Link>
                            </li>
                            <li>
                              <Link to="/shop?filter=bestseller" className="hover:text-velora-gold transition-colors">
                                The Iconic Best Sellers
                              </Link>
                            </li>
                            <li>
                              <Link to="/collections/sale" className="hover:text-red-800 transition-colors">
                                Private Archive Sale
                              </Link>
                            </li>
                            <li>
                              <Link to="/about" className="hover:text-velora-gold transition-colors">
                                Atelier Biella Craftsmanship
                              </Link>
                            </li>
                          </ul>
                        </div>

                        <div className="relative group overflow-hidden bg-velora-ivory p-4 border border-velora-sand">
                          <img
                            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=400"
                            alt="Campaign Preview"
                            className="w-full h-32 object-cover mb-3"
                          />
                          <p className="text-xs font-editorial font-bold text-velora-black">The Art of Modern Luxury</p>
                          <p className="text-[10px] text-velora-taupe mb-2">Explore the 2026 Editorial Curation</p>
                          <Link
                            to="/shop"
                            className="inline-flex items-center text-[10px] tracking-wider uppercase text-velora-gold font-medium hover:underline"
                          >
                            Shop Collection <ArrowRight className="w-2.5 h-2.5 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Client Demo Switcher Pill to Admin */}
              <Link
                to="/admin"
                className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-medium tracking-widest uppercase bg-velora-charcoal text-velora-ivory hover:bg-velora-gold hover:text-velora-black transition-all duration-200 border border-velora-charcoal"
                title="Open Admin Dashboard"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-velora-gold" />
                <span>Admin Suite</span>
              </Link>

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1.5 text-velora-charcoal hover:text-velora-gold transition-colors focus:outline-none"
                aria-label="Search catalog"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Account Link */}
              <Link
                to={customer ? '/account' : '/account/login'}
                className="p-1.5 text-velora-charcoal hover:text-velora-gold transition-colors focus:outline-none relative group"
                aria-label="Customer Account"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
                {customer && (
                  <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-600 border border-white"></span>
                )}
              </Link>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-1.5 text-velora-charcoal hover:text-velora-gold transition-colors focus:outline-none relative"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-velora-gold text-white text-[9px] font-bold flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Shopping Bag Drawer Trigger */}
              <button
                onClick={openCart}
                className="p-1.5 text-velora-charcoal hover:text-velora-gold transition-colors focus:outline-none relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-velora-black text-velora-ivory text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-velora-ivory p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-fade-in">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-velora-sand">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="group">
                  <span className="font-editorial text-2xl tracking-[0.2em] font-medium text-velora-black">
                    VELORA
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-velora-charcoal hover:text-velora-gold"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Search input shortcut */}
              <div className="mt-5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2.5 bg-white border border-velora-sand text-xs text-velora-taupe"
                >
                  <Search className="w-4 h-4 text-velora-taupe" />
                  <span>Search luxury catalog...</span>
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="mt-6 space-y-4">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-velora-charcoal hover:text-velora-gold py-1"
                >
                  Home
                </Link>
                <Link
                  to="/collections/new-arrivals"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-velora-charcoal hover:text-velora-gold py-1"
                >
                  New Arrivals
                </Link>
                <Link
                  to="/collections/women"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-velora-charcoal hover:text-velora-gold py-1"
                >
                  Women
                </Link>
                <Link
                  to="/collections/men"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-velora-charcoal hover:text-velora-gold py-1"
                >
                  Men
                </Link>
                <Link
                  to="/collections/accessories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-velora-charcoal hover:text-velora-gold py-1"
                >
                  Accessories & Bags
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-velora-charcoal hover:text-velora-gold py-1"
                >
                  All Collections
                </Link>
                <Link
                  to="/collections/sale"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-red-800 hover:text-red-950 font-medium py-1"
                >
                  Private Sale Archive
                </Link>
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm uppercase tracking-widest text-velora-charcoal hover:text-velora-gold py-1"
                >
                  The Atelier Story
                </Link>
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-velora-sand space-y-4">
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-velora-charcoal text-velora-ivory text-xs tracking-widest uppercase hover:bg-velora-gold hover:text-black transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-velora-gold" />
                <span>Switch to Admin Suite</span>
              </Link>
              <div className="flex justify-around text-xs tracking-wider uppercase text-velora-taupe pt-2">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-velora-gold">
                  Concierge
                </Link>
                <Link to="/faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-velora-gold">
                  Client Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Instant Search Overlay */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
