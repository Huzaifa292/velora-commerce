import React, { useState } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AnnouncementBar = () => {
  const { cms } = useSettingsStore();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !cms?.announcementBar?.active) return null;

  return (
    <div className="bg-velora-charcoal text-velora-ivory text-[11px] md:text-xs tracking-widest uppercase py-2 px-4 transition-all duration-300 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center flex items-center justify-center space-x-2">
          <Sparkles className="w-3 h-3 text-velora-gold hidden sm:inline" />
          <span>{cms.announcementBar.text}</span>
          <Link
            to="/shop"
            className="hidden md:inline ml-2 underline underline-offset-4 hover:text-velora-gold transition-colors font-medium"
          >
            Shop Now
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="p-1 hover:text-velora-gold transition-colors ml-2"
          aria-label="Dismiss banner"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
