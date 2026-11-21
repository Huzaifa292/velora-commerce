import React from 'react';

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
          Legal Covenants
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black font-medium">
          TERMS OF SALE &amp; SERVICE
        </h1>
        <p className="text-xs text-velora-taupe">Effective date: March 2026</p>
      </div>

      <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-6 text-xs text-velora-charcoal/90 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-editorial text-xl text-velora-black font-medium">1. Authenticity &amp; Integrity</h2>
          <p>
            Every product cataloged on VELORA COMMERCE reflects authentic artisanal specifications. By placing an order, patrons accept our bespoke packaging protocols and atelier delivery schedules.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-editorial text-xl text-velora-black font-medium">2. Simulated Demonstration Conditions</h2>
          <p>
            This application is created as a showcase of modern luxury e-commerce architecture. Payment channels depicted on this platform operate under simulated demo conditions for evaluation purposes. No real bank debits occur.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-editorial text-xl text-velora-black font-medium">3. Intellectual Property</h2>
          <p>
            All styling layouts, typography treatments, and creative editorial trademarks associated with VELORA COMMERCE are protected by international design copyright.
          </p>
        </section>
      </div>
    </div>
  );
};
