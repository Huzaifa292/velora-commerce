import React, { useState } from 'react';
import { useSettingsStore } from '../../store/useSettingsStore';
import { Edit3, Check, RotateCcw } from 'lucide-react';

export const AdminContentPage = () => {
  const { cms, updateCMSSection } = useSettingsStore();

  const [announcementText, setAnnouncementText] = useState(
    cms?.announcementBar?.text || 'Complimentary white-glove shipping on orders exceeding $300 | Use code VELORA10'
  );
  const [announcementActive, setAnnouncementActive] = useState(cms?.announcementBar?.active ?? true);

  const [heroHeading, setHeroHeading] = useState(cms?.hero?.heading || 'THE ART OF MODERN LUXURY');
  const [heroEyebrow, setHeroEyebrow] = useState(cms?.hero?.eyebrow || 'SPRING / SUMMER 2026');
  const [heroSubheading, setHeroSubheading] = useState(cms?.hero?.subheading || '');
  const [heroBgImage, setHeroBgImage] = useState(cms?.hero?.bgImage || '');

  const [editorialTitle, setEditorialTitle] = useState(cms?.editorial?.title || 'THE ARCHITECTURAL SILHOUETTE');
  const [editorialSubtitle, setEditorialSubtitle] = useState(cms?.editorial?.subtitle || 'VOL. 04 / ESSENTIAL FORM');
  const [editorialDesc, setEditorialDesc] = useState(cms?.editorial?.description || '');
  const [editorialImage, setEditorialImage] = useState(cms?.editorial?.image || '');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveAll = (e) => {
    e.preventDefault();

    // 1. Update announcement
    updateCMSSection('announcementBar', {
      text: announcementText,
      active: announcementActive,
    });

    // 2. Update hero
    updateCMSSection('hero', {
      heading: heroHeading,
      eyebrow: heroEyebrow,
      subheading: heroSubheading,
      bgImage: heroBgImage,
    });

    // 3. Update editorial
    updateCMSSection('editorial', {
      title: editorialTitle,
      subtitle: editorialSubtitle,
      description: editorialDesc,
      image: editorialImage,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#222226] pb-5">
        <div>
          <h1 className="font-editorial text-3xl text-white font-medium">Storefront Content Management (CMS)</h1>
          <p className="text-xs text-gray-400 mt-1 font-mono">
            Directly update editorial headlines, announcement copy, and campaign imagery on the live storefront
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="flex items-center space-x-2 px-6 py-2.5 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-widest font-semibold rounded shadow-md transition-colors"
        >
          <Check className="w-4 h-4" />
          <span>Publish All Changes</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-200 text-xs rounded flex items-center space-x-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Editorial CMS successfully updated! Check your live customer storefront to see instantaneous updates.</span>
        </div>
      )}

      <form onSubmit={handleSaveAll} className="space-y-8">
        {/* Announcement Bar Section */}
        <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <div className="flex justify-between items-center border-b border-[#25252B] pb-3">
            <h2 className="font-editorial text-xl text-white font-medium">1. Global Announcement Bar</h2>
            <label className="flex items-center space-x-2 text-xs text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="accent-velora-gold"
              />
              <span>Banner Active</span>
            </label>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-gray-300 font-semibold block mb-1">
              Banner Announcement Copy
            </label>
            <input
              type="text"
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white text-xs focus:outline-none focus:border-velora-gold"
            />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <h2 className="font-editorial text-xl text-white font-medium border-b border-[#25252B] pb-3">
            2. Full-Screen Campaign Hero
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                Eyebrow Label
              </label>
              <input
                type="text"
                value={heroEyebrow}
                onChange={(e) => setHeroEyebrow(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>

            <div>
              <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                Primary Main Heading
              </label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
              Hero Editorial Subtext
            </label>
            <textarea
              rows="2"
              value={heroSubheading}
              onChange={(e) => setHeroSubheading(e.target.value)}
              className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
            />
          </div>

          <div className="text-xs">
            <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
              Background Campaign Photography URL
            </label>
            <input
              type="url"
              value={heroBgImage}
              onChange={(e) => setHeroBgImage(e.target.value)}
              className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white font-mono text-[11px] focus:outline-none focus:border-velora-gold"
            />
          </div>
        </div>

        {/* Editorial Split Section */}
        <div className="bg-[#16161A] border border-[#25252B] p-6 rounded space-y-4">
          <h2 className="font-editorial text-xl text-white font-medium border-b border-[#25252B] pb-3">
            3. Editorial Campaign Section
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                Issue Subtitle
              </label>
              <input
                type="text"
                value={editorialSubtitle}
                onChange={(e) => setEditorialSubtitle(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>

            <div>
              <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
                Editorial Title
              </label>
              <input
                type="text"
                value={editorialTitle}
                onChange={(e) => setEditorialTitle(e.target.value)}
                className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
              Description Body
            </label>
            <textarea
              rows="3"
              value={editorialDesc}
              onChange={(e) => setEditorialDesc(e.target.value)}
              className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white focus:outline-none focus:border-velora-gold"
            />
          </div>

          <div className="text-xs">
            <label className="text-gray-300 uppercase tracking-wider font-semibold block mb-1">
              Editorial Feature Photography URL
            </label>
            <input
              type="url"
              value={editorialImage}
              onChange={(e) => setEditorialImage(e.target.value)}
              className="w-full bg-[#101014] border border-[#2E2E36] p-2.5 rounded text-white font-mono text-[11px] focus:outline-none focus:border-velora-gold"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-velora-gold hover:bg-velora-gold-light text-black text-xs uppercase tracking-widest font-semibold rounded shadow-lg"
          >
            Publish Live CMS Updates
          </button>
        </div>
      </form>
    </div>
  );
};
