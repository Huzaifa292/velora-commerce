import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20 text-center space-y-6">
      <div className="max-w-md mx-auto space-y-4">
        <span className="text-[11px] uppercase tracking-[0.35em] text-velora-gold font-medium">
          404 Atelier Notice
        </span>
        <h1 className="font-editorial text-5xl sm:text-6xl text-velora-black font-medium">
          PAGE NOT FOUND
        </h1>
        <p className="text-xs text-velora-taupe font-light leading-relaxed">
          The editorial creation or archive section you are seeking does not exist or has been relocated to our private vaults.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-velora-black text-white text-xs uppercase tracking-[0.25em] font-semibold hover:bg-velora-gold hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
