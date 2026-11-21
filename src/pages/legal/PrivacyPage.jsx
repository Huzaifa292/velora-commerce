import React from 'react';

export const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-8">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
          Governance &amp; Trust
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black font-medium">
          PRIVACY GOVERNANCE
        </h1>
        <p className="text-xs text-velora-taupe">Last revised: March 2026</p>
      </div>

      <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-6 text-xs text-velora-charcoal/90 leading-relaxed font-light">
        <section className="space-y-2">
          <h2 className="font-editorial text-xl text-velora-black font-medium">1. Patron Confidentiality</h2>
          <p>
            At VELORA COMMERCE, patron privacy is sacred. We collect personal identification only when explicitly submitted for bespoke tailoring records, order dispatch, or private salon appointments. We will never sell, lease, or monetize client information.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-editorial text-xl text-velora-black font-medium">2. Data Storage &amp; Encryption</h2>
          <p>
            This website functions as a frontend demonstration and portfolio platform. Data saved within this application is stored locally inside your browser's persistent LocalStorage cache and is not transmitted to external third-party advertising trackers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-editorial text-xl text-velora-black font-medium">3. Client Rights</h2>
          <p>
            You retain absolute sovereignty over your records. You may inspect, modify, or erase your stored addresses and order histories at any moment through your patron account dashboard.
          </p>
        </section>
      </div>
    </div>
  );
};
