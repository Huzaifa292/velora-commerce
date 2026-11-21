import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-20 md:space-y-28">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-velora-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
            alt="Velora Milan Atelier"
            className="w-full h-full object-cover brightness-[0.6] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-velora-ivory space-y-4">
          <span className="text-[11px] uppercase tracking-[0.35em] text-velora-gold font-medium">
            Heritage &amp; Vision
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl text-white font-light uppercase tracking-wide">
            THE ART OF MODERN LUXURY
          </h1>
          <p className="text-sm font-light text-velora-sand/90 leading-relaxed max-w-xl mx-auto">
            Founded with unyielding devotion to structural purity, exquisite tailoring, and noble Italian fibers that defy seasonal obsolescence.
          </p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <span className="text-xs uppercase tracking-[0.3em] text-velora-gold font-semibold">Our Philosophy</span>
        <h2 className="font-editorial text-3xl sm:text-4xl text-velora-black leading-snug">
          "Luxury is not loudness or ostentation. It is the silent confidence of double-faced Mongolian cashmere, the precision of hand-stitched silk lapels, and an architectural silhouette that commands reverence without demanding attention."
        </h2>
        <div className="w-16 h-0.5 bg-velora-gold mx-auto" />
      </section>

      {/* Atelier Story Columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-velora-sand p-8 space-y-4">
            <span className="text-xs font-mono text-velora-gold">01 / FIBERS</span>
            <h3 className="font-editorial text-2xl text-velora-black font-medium">Noble Provenance</h3>
            <p className="text-xs text-velora-charcoal/80 leading-relaxed font-light">
              We commission raw materials directly from heritage mills in Biella, Como, and Tuscany. Our 480gsm double-faced cashmere and 22-momme Mulberry silk satisfy the highest standards of international luxury.
            </p>
          </div>

          <div className="bg-white border border-velora-sand p-8 space-y-4">
            <span className="text-xs font-mono text-velora-gold">02 / CRAFT</span>
            <h3 className="font-editorial text-2xl text-velora-black font-medium">Architectural Tailoring</h3>
            <p className="text-xs text-velora-charcoal/80 leading-relaxed font-light">
              Every garment is engineered around the human form like modern sculpture. Horsehair canvas chests, hand-turned French seams, and natural water-buffalo horn buttons define our signature silhouette.
            </p>
          </div>

          <div className="bg-white border border-velora-sand p-8 space-y-4">
            <span className="text-xs font-mono text-velora-gold">03 / ETHOS</span>
            <h3 className="font-editorial text-2xl text-velora-black font-medium">Enduring Permanence</h3>
            <p className="text-xs text-velora-charcoal/80 leading-relaxed font-light">
              In an age of ephemeral trends, VELORA designs objects intended to be cherished for decades and passed down as heirlooms. We manufacture in limited ateliers to preserve meticulous craft.
            </p>
          </div>
        </div>
      </section>

      {/* Salons Location Grid */}
      <section className="bg-velora-sand/20 border-y border-velora-sand py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">Flagship Salons</span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-velora-black mt-1">WHERE TO EXPERIENCE VELORA</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            <div className="bg-white border border-velora-sand p-6 space-y-2">
              <h3 className="font-editorial text-xl font-medium text-velora-black">Milan Flagship Atelier</h3>
              <p className="text-velora-taupe">Via Montenapoleone 14, 20121 Milano</p>
              <p className="text-velora-taupe">Private Suite Appointments Only</p>
            </div>
            <div className="bg-white border border-velora-sand p-6 space-y-2">
              <h3 className="font-editorial text-xl font-medium text-velora-black">Paris Haute Salon</h3>
              <p className="text-velora-taupe">28 Rue du Faubourg Saint-Honoré, 75008 Paris</p>
              <p className="text-velora-taupe">Bespoke Curation &amp; Tailoring</p>
            </div>
            <div className="bg-white border border-velora-sand p-6 space-y-2">
              <h3 className="font-editorial text-xl font-medium text-velora-black">New York Penthouse</h3>
              <p className="text-velora-taupe">740 Madison Avenue, New York, NY 10065</p>
              <p className="text-velora-taupe">Personal Concierge Sessions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="text-center pb-16 space-y-4">
        <h3 className="font-editorial text-3xl text-velora-black">Experience the Current Edit</h3>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-velora-black text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-velora-gold hover:text-black transition-colors"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
