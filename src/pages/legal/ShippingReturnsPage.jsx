import React from 'react';
import { Truck, RefreshCw, ShieldCheck, Clock } from 'lucide-react';

export const ShippingReturnsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
          Concierge Services
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black font-medium">
          SHIPPING &amp; WHITE-GLOVE RETURNS
        </h1>
        <p className="text-xs text-velora-taupe font-light max-w-md mx-auto">
          Every piece is handled with archival care from our atelier floor to your residence.
        </p>
      </div>

      <div className="space-y-8 text-xs text-velora-charcoal">
        <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-velora-black">
            <Truck className="w-5 h-5 text-velora-gold" />
            <h2 className="font-editorial text-2xl font-medium">Domestic &amp; Global Dispatch</h2>
          </div>
          <p className="leading-relaxed font-light">
            All orders exceeding $300 qualify for complimentary white-glove courier shipping. Orders are packed inside custom wooden-braced boxes, sealed against environmental moisture, and dispatched via insured priority air cargo.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-velora-taupe">
            <li>Standard White-Glove: 3 to 5 business days (Complimentary over $300, else $25).</li>
            <li>Priority Express Air: 1 to 2 business days ($35 flat worldwide surcharge).</li>
            <li>Same-Day Atelier Courier: Available in Milan, Paris, London, and New York.</li>
          </ul>
        </div>

        <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-4">
          <div className="flex items-center space-x-2 text-velora-black">
            <RefreshCw className="w-5 h-5 text-velora-gold" />
            <h2 className="font-editorial text-2xl font-medium">30-Day Effortless Returns</h2>
          </div>
          <p className="leading-relaxed font-light">
            Should any piece fail to meet your standards of cut or hand-feel, we welcome returns within 30 calendar days of delivery. The item must remain unworn, with security ribbon intact, and enclosed in original packaging.
          </p>
          <p className="leading-relaxed font-light text-velora-taupe">
            Contact our private concierge to schedule doorstep courier collection at zero expense to you.
          </p>
        </div>
      </div>
    </div>
  );
};
