import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const FaqPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How are VELORA garments manufactured?',
      a: 'All pieces in our collections are hand-assembled and tailored across our private partner ateliers in Biella (cashmere & suiting), Florence (leather & bags), and Marche (bespoke footwear). We utilize exclusively Grade-A natural fibers and 24k gold-plated solid brass hardware.',
    },
    {
      q: 'What is the white-glove delivery experience?',
      a: 'All orders over $300 are delivered via insured express air courier. Garments arrive enclosed in breathable flannel dust covers, hung upon solid cedar hangers, and sealed inside rigid moisture-resistant archival presentation boxes with hand-tied satin ribbons.',
    },
    {
      q: 'What is your returns policy?',
      a: 'We offer an effortless 30-day complimentary return policy. Upon logging a return through our client concierge, a courier will be scheduled to collect the package directly from your residence or hotel at zero charge.',
    },
    {
      q: 'Are certificates of authenticity provided?',
      a: 'Yes. Every handbag, leather coat, and precious accessory includes an individually registered certificate of authenticity featuring an engraved serial code corresponding to our atelier registry.',
    },
    {
      q: 'How do I care for double-faced cashmere and silk chiffon?',
      a: 'Double-faced cashmere should be brushed with a natural horsehair garment brush after wear and aired out in shade. Specialist gentle dry cleaning is recommended once per season. Silk pieces should be steamed on low heat.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
          Client Services
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black font-medium">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-xs text-velora-taupe font-light max-w-md mx-auto">
          Essential insights regarding our craftsmanship, atelier dispatch, and concierge services.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white border border-velora-sand overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              className="w-full p-5 text-left flex justify-between items-center text-xs sm:text-sm font-semibold uppercase tracking-wider text-velora-black hover:text-velora-gold transition-colors"
            >
              <span>{faq.q}</span>
              {openIdx === i ? <ChevronUp className="w-4 h-4 text-velora-gold" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openIdx === i && (
              <div className="px-5 pb-5 text-xs text-velora-charcoal/80 font-light leading-relaxed border-t border-velora-sand/50 pt-3">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
