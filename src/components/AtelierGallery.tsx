import React, { useState } from 'react';
import { Sparkles, Eye, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/barbershopData';
import { GalleryItem } from '../types';

export const AtelierGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Perspectives' },
    { id: 'interior', label: 'Atelier & VIP Suites' },
    { id: 'craft', label: 'Artisanal Blades' },
    { id: 'ritual', label: 'Heritage Rituals' }
  ];

  const filtered = GALLERY_ITEMS.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <section id="atelier-section" className="py-24 bg-[#0a0c10] border-t border-[#1a1d25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Visual Chronicle</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[0.1em] text-[#f4efe6] mb-5">
            The Atelier & Ritual Craft
          </h2>
          <p className="text-[#9ea2af] text-sm sm:text-base font-light leading-relaxed">
            Constructed with Italian Nero Marquina marble, bespoke hand-stitched Belmont leather chairs, and Japanese Damascus steel. Step inside Dubai's private retreat.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-lg bg-[#14161f] border border-[#232733]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-md text-xs tracking-wider uppercase font-medium transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-md'
                    : 'text-[#9ea2af] hover:text-white hover:bg-[#1b1e2a]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative h-80 rounded-xl overflow-hidden border border-[#222532] bg-[#12141a] cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Inspect Icon on hover */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#0c0d10]/70 backdrop-blur-md border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>

              {/* Title & Description */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <span className="text-[10px] text-[#c5a880] uppercase tracking-widest font-semibold block mb-1">
                  Atelier Showcase
                </span>
                <h3 className="font-display text-base font-bold text-[#f5efe6] uppercase tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-[#a4a8b7] mt-1 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#12141b] border border-[#2e3342] rounded-2xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative max-h-[70vh] overflow-hidden bg-black">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain max-h-[70vh] mx-auto"
                />
              </div>
              <div className="p-6 bg-[#151720]">
                <span className="text-xs text-[#c5a880] uppercase tracking-widest font-semibold block mb-1">
                  Makram Atelier DIFC
                </span>
                <h3 className="font-display text-xl font-bold text-[#f5efe6] uppercase">
                  {selectedPhoto.title}
                </h3>
                <p className="text-sm text-[#a4a8b7] mt-2">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
