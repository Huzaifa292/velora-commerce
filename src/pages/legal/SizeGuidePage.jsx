import React from 'react';
import { Ruler, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SizeGuidePage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
          Precision Fitting
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black font-medium">
          BESPOKE SIZE &amp; MEASUREMENT GUIDE
        </h1>
        <p className="text-xs text-velora-taupe max-w-lg mx-auto font-light leading-relaxed">
          VELORA creations are proportioned according to traditional haute couture guidelines. Refer to our imperial and metric measurements below.
        </p>
      </div>

      {/* Women's Table */}
      <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-4">
        <h2 className="font-editorial text-2xl text-velora-black font-medium">Women's Couture Silhouette (Inches / CM)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-velora-ivory uppercase tracking-wider text-velora-taupe border-b border-velora-sand">
              <tr>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Bust (in / cm)</th>
                <th className="py-3 px-4">Waist (in / cm)</th>
                <th className="py-3 px-4">Hips (in / cm)</th>
                <th className="py-3 px-4">IT / FR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-velora-sand/50">
              <tr>
                <td className="py-3 px-4 font-bold">XS (38)</td>
                <td className="py-3 px-4">32 in / 81 cm</td>
                <td className="py-3 px-4">24 in / 61 cm</td>
                <td className="py-3 px-4">35 in / 89 cm</td>
                <td className="py-3 px-4">38 IT / 34 FR</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">S (40)</td>
                <td className="py-3 px-4">34 in / 86 cm</td>
                <td className="py-3 px-4">26 in / 66 cm</td>
                <td className="py-3 px-4">37 in / 94 cm</td>
                <td className="py-3 px-4">40 IT / 36 FR</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">M (42)</td>
                <td className="py-3 px-4">36 in / 91 cm</td>
                <td className="py-3 px-4">28 in / 71 cm</td>
                <td className="py-3 px-4">39 in / 99 cm</td>
                <td className="py-3 px-4">42 IT / 38 FR</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">L (44)</td>
                <td className="py-3 px-4">38 in / 97 cm</td>
                <td className="py-3 px-4">30 in / 76 cm</td>
                <td className="py-3 px-4">41 in / 104 cm</td>
                <td className="py-3 px-4">44 IT / 40 FR</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Men's Table */}
      <div className="bg-white border border-velora-sand p-6 sm:p-8 space-y-4">
        <h2 className="font-editorial text-2xl text-velora-black font-medium">Men's Tailoring &amp; Outerwear (Inches / CM)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-velora-ivory uppercase tracking-wider text-velora-taupe border-b border-velora-sand">
              <tr>
                <th className="py-3 px-4">Chest Size</th>
                <th className="py-3 px-4">Neck (in / cm)</th>
                <th className="py-3 px-4">Waist (in / cm)</th>
                <th className="py-3 px-4">Sleeve (in / cm)</th>
                <th className="py-3 px-4">IT / EU</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-velora-sand/50">
              <tr>
                <td className="py-3 px-4 font-bold">38R (S)</td>
                <td className="py-3 px-4">15 in / 38 cm</td>
                <td className="py-3 px-4">32 in / 81 cm</td>
                <td className="py-3 px-4">33 in / 84 cm</td>
                <td className="py-3 px-4">48 EU</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">40R (M)</td>
                <td className="py-3 px-4">15.5 in / 39 cm</td>
                <td className="py-3 px-4">34 in / 86 cm</td>
                <td className="py-3 px-4">34 in / 86 cm</td>
                <td className="py-3 px-4">50 EU</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">42R (L)</td>
                <td className="py-3 px-4">16.5 in / 42 cm</td>
                <td className="py-3 px-4">36 in / 91 cm</td>
                <td className="py-3 px-4">35 in / 89 cm</td>
                <td className="py-3 px-4">52 EU</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold">44R (XL)</td>
                <td className="py-3 px-4">17.5 in / 44 cm</td>
                <td className="py-3 px-4">38 in / 96 cm</td>
                <td className="py-3 px-4">36 in / 91 cm</td>
                <td className="py-3 px-4">54 EU</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center pt-4">
        <Link
          to="/contact"
          className="text-xs uppercase tracking-widest text-velora-gold hover:underline font-semibold"
        >
          Need a Custom Bespoke Measurement Consultation? Contact Concierge →
        </Link>
      </div>
    </div>
  );
};
