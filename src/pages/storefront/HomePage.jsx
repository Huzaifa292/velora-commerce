import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { useProductStore } from '../../store/useProductStore';
import { useCategoryStore } from '../../store/useCategoryStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import { ProductCard } from '../../components/storefront/ProductCard';
import { QuickViewModal } from '../../components/storefront/QuickViewModal';

export const HomePage = () => {
  const { products } = useProductStore();
  const { categories } = useCategoryStore();
  const { cms } = useSettingsStore();

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // New arrivals & best sellers from shared store
  const newArrivals = products.filter((p) => p.isNew).slice(0, 8);
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 8);

  const hero = cms?.hero || {
    eyebrow: 'SPRING / SUMMER 2026',
    heading: 'THE ART OF MODERN LUXURY',
    subheading: 'Sculptural silhouettes, unyielding craftsmanship, and noble textiles tailored for discerning connoisseurs.',
    primaryBtnText: 'Explore Women',
    primaryBtnLink: '/collections/women',
    secondaryBtnText: 'Discover Men',
    secondaryBtnLink: '/collections/men',
    bgImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000',
  };

  const editorial = cms?.editorial || {
    title: 'THE ARCHITECTURAL SILHOUETTE',
    subtitle: 'VOL. 04 / ESSENTIAL FORM',
    description: 'Crafted between our private ateliers in Biella and Florence, the 2026 Edit challenges ornamental excess through pure cut, double-faced cashmere, and understated noble textures.',
    buttonText: 'Discover Collection',
    buttonLink: '/shop',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1600',
  };

  const instagramPosts = [
    {
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600',
      tag: '@velora.atelier',
    },
    {
      img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600',
      tag: '#VeloraMen',
    },
    {
      img: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=600',
      tag: '#TheMonolithCoat',
    },
    {
      img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600',
      tag: '#HandmadeFlorence',
    },
    {
      img: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=600',
      tag: '#VenetianCraft',
    },
    {
      img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=600',
      tag: '#HauteEvening',
    },
  ];

  return (
    <div className="space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-velora-black">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={hero.bgImage}
            alt="Velora Luxury Campaign"
            className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.05] transition-transform duration-1000 ease-out scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-velora-ivory space-y-6 pt-12">
          <span className="inline-block text-xs uppercase tracking-[0.35em] text-velora-gold font-medium animate-fade-in">
            {hero.eyebrow}
          </span>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.08em] leading-[1.05] text-white uppercase drop-shadow-md">
            {hero.heading}
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-light text-velora-sand/90 max-w-2xl mx-auto leading-relaxed">
            {hero.subheading}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to={hero.primaryBtnLink || '/collections/women'}
              className="w-full sm:w-auto px-8 py-4 bg-velora-ivory text-velora-black hover:bg-velora-gold hover:text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 shadow-xl"
            >
              {hero.primaryBtnText || 'Explore Women'}
            </Link>

            <Link
              to={hero.secondaryBtnLink || '/collections/men'}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-velora-ivory/80 text-velora-ivory hover:bg-velora-ivory hover:text-velora-black text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300 backdrop-blur-sm"
            >
              {hero.secondaryBtnText || 'Discover Men'}
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 inset-x-0 flex justify-center text-velora-ivory/60 text-[10px] uppercase tracking-[0.25em] z-10 animate-pulse">
          Scroll to Explore
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="bg-white border border-velora-sand/80 shadow-luxury py-6 px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:text-left">
          <div className="flex items-center space-x-3.5">
            <Truck className="w-5 h-5 text-velora-gold flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-velora-black">Complimentary Delivery</p>
              <p className="text-[11px] text-velora-taupe">On all orders exceeding $300</p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <Sparkles className="w-5 h-5 text-velora-gold flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-velora-black">Noble Italian Fibers</p>
              <p className="text-[11px] text-velora-taupe">Double-faced cashmere & silk</p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <RefreshCw className="w-5 h-5 text-velora-gold flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-velora-black">30-Day Atelier Return</p>
              <p className="text-[11px] text-velora-taupe">Prepaid white-glove pickup</p>
            </div>
          </div>
          <div className="flex items-center space-x-3.5">
            <ShieldCheck className="w-5 h-5 text-velora-gold flex-shrink-0" />
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-velora-black">Certificate of Authenticity</p>
              <p className="text-[11px] text-velora-taupe">Hand-numbered serials</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED COLLECTIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-12">
          <span className="text-[11px] uppercase tracking-[0.3em] text-velora-gold font-medium">Curated Universes</span>
          <h2 className="font-editorial text-3xl sm:text-4xl text-velora-black tracking-wide">
            EXPLORE THE COLLECTIONS
          </h2>
          <div className="w-12 h-0.5 bg-velora-gold mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Women */}
          <Link
            to="/collections/women"
            className="group relative aspect-[4/5] overflow-hidden border border-velora-sand bg-velora-black"
          >
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000"
              alt="Women's Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-velora-gold font-medium">Collection 01</span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-light">WOMEN</h3>
              <p className="text-xs text-velora-sand/80 font-light line-clamp-2">
                Draped silk gowns, cashmere overcoats, and empowering tailoring.
              </p>
              <span className="inline-flex items-center text-xs uppercase tracking-widest text-velora-gold pt-2 group-hover:underline">
                Explore Curation <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Card 2: Men */}
          <Link
            to="/collections/men"
            className="group relative aspect-[4/5] overflow-hidden border border-velora-sand bg-velora-black"
          >
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1000"
              alt="Men's Collection"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-velora-gold font-medium">Collection 02</span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-light">MEN</h3>
              <p className="text-xs text-velora-sand/80 font-light line-clamp-2">
                Unstructured Melton wool coats, lambskin suede, and Savile Row precision.
              </p>
              <span className="inline-flex items-center text-xs uppercase tracking-widest text-velora-gold pt-2 group-hover:underline">
                Explore Curation <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>

          {/* Card 3: Bags & Accessories */}
          <Link
            to="/collections/accessories"
            className="group relative aspect-[4/5] overflow-hidden border border-velora-sand bg-velora-black"
          >
            <img
              src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000"
              alt="Leather & Bags"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 text-white space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-velora-gold font-medium">Collection 03</span>
              <h3 className="font-editorial text-2xl sm:text-3xl font-light">BAGS & LEATHER</h3>
              <p className="text-xs text-velora-sand/80 font-light line-clamp-2">
                Florentine box calfskin, 24k gold hardware, and architectural weekenders.
              </p>
              <span className="inline-flex items-center text-xs uppercase tracking-widest text-velora-gold pt-2 group-hover:underline">
                Explore Curation <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 4. NEW ARRIVALS CAROUSEL / GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-4 border-b border-velora-sand">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-velora-gold font-medium">Season Debut</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center text-xs uppercase tracking-widest text-velora-charcoal hover:text-velora-gold font-semibold transition-colors mt-4 md:mt-0"
          >
            <span>View All New Arrivals ({newArrivals.length})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL CAMPAIGN SPLIT */}
      <section className="bg-velora-sand/30 border-y border-velora-sand/60 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Large Photography */}
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden border border-velora-sand shadow-luxury">
              <img
                src={editorial.image}
                alt="Velora Editorial Campaign"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-semibold text-velora-black">
                Editorial Issue 04
              </div>
            </div>

            {/* Right Editorial Copy */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-velora-gold font-semibold">
                {editorial.subtitle}
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-velora-black leading-tight font-medium">
                {editorial.title}
              </h2>
              <p className="text-sm text-velora-charcoal/80 leading-relaxed font-light">
                {editorial.description}
              </p>
              <div className="pt-2">
                <Link
                  to={editorial.buttonLink || '/shop'}
                  className="inline-flex items-center space-x-2 px-8 py-3.5 bg-velora-black hover:bg-velora-gold hover:text-black text-white text-xs uppercase tracking-[0.25em] font-semibold transition-all duration-300"
                >
                  <span>{editorial.buttonText || 'Discover Collection'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-4 border-b border-velora-sand">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-velora-gold font-medium">Most Coveted</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1 font-medium">
              THE VELORA ICONS
            </h2>
          </div>
          <Link
            to="/shop?filter=bestseller"
            className="inline-flex items-center text-xs uppercase tracking-widest text-velora-charcoal hover:text-velora-gold font-semibold transition-colors mt-4 md:mt-0"
          >
            <span>Explore All Icons</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 7. BRAND STORY & PHILOSOPHY */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 py-6">
        <span className="text-[11px] uppercase tracking-[0.35em] text-velora-gold font-medium block">
          The Velora Manifesto
        </span>
        <h2 className="font-editorial text-3xl sm:text-5xl text-velora-black tracking-wide leading-tight">
          "True luxury whispers where others shout. It lives within the invisible stitch and the noble fiber."
        </h2>
        <p className="text-xs uppercase tracking-[0.25em] text-velora-taupe font-sans pt-2">
          ATELIER BIELLA &amp; FIRENZE
        </p>
        <div className="pt-4">
          <Link
            to="/about"
            className="inline-block border-b-2 border-velora-black pb-1 text-xs uppercase tracking-widest text-velora-black hover:text-velora-gold hover:border-velora-gold transition-colors font-semibold"
          >
            Explore Our Heritage &amp; Craftsmanship
          </Link>
        </div>
      </section>

      {/* 8. INSTAGRAM-INSPIRED EDITORIAL GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="text-center mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-medium">Digital Salon</span>
          <h3 className="font-editorial text-2xl text-velora-black mt-1">#VELORAATELIER</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post, idx) => (
            <div key={idx} className="group relative aspect-square overflow-hidden bg-velora-sand border border-velora-sand">
              <img
                src={post.img}
                alt="Velora Social Edit"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3 text-center">
                <span className="text-white text-[11px] font-mono tracking-wider">{post.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Global Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
