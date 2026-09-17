import React, { useState } from 'react';
import { Clock, CheckCircle2, Crown, Sparkles, ArrowRight, Info, Search } from 'lucide-react';
import { Service, Currency, ServiceCategory } from '../types';
import { SERVICES } from '../data/barbershopData';
import { formatPrice } from '../utils/formatters';

interface ServicesSectionProps {
  currentCurrency: Currency;
  onSelectServiceForBooking: (service: Service) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentCurrency,
  onSelectServiceForBooking
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'haircut', label: 'Haircuts & Styling' },
    { id: 'beard', label: 'Beard & Shaves' },
    { id: 'therapy', label: 'Scalp & Therapy' },
    { id: 'packages', label: 'Royal Packages' }
  ];

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services-section" className="py-24 bg-[#0c0d10] border-t border-[#1a1d25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Grooming Atelier</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[0.1em] text-[#f4efe6] mb-5">
            Bespoke Services Menu
          </h2>
          <p className="text-[#9ea2af] text-sm sm:text-base font-light leading-relaxed">
            Every ritual is individually tailored to your cranial geometry, beard density, and executive presence. 
            All treatments include premium Japanese hot towels, organic botanical cleansers, and private lounge amenities.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-lg bg-[#14161d] border border-[#232732] max-w-full overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-md text-xs tracking-wider uppercase font-medium transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#c5a880] text-[#0c0d10] font-bold shadow-md'
                    : 'text-[#9ea2af] hover:text-[#e4ded5] hover:bg-[#1c1f29]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#757a87] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#14161d] border border-[#232732] text-xs text-[#eae7e1] placeholder-[#686c78] focus:outline-none focus:border-[#c5a880]/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#757a87] hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const isExpanded = expandedServiceId === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className="group flex flex-col justify-between rounded-xl bg-[#13151c] border border-[#222530] overflow-hidden hover:border-[#c5a880]/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {/* Top Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-[0.88]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13151c] via-transparent to-black/40" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {service.isPopular && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#c5a880] text-[#0c0d10] font-bold text-[10px] tracking-wider uppercase shadow-md">
                        <Sparkles className="w-3 h-3" />
                        Signature
                      </span>
                    )}
                    {service.isVIP && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1f1b14] border border-[#c5a880]/50 text-[#f3dfc3] font-bold text-[10px] tracking-wider uppercase shadow-md">
                        <Crown className="w-3 h-3 text-[#c5a880]" />
                        VIP Atelier
                      </span>
                    )}
                  </div>

                  {/* Duration & Price overlay */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#0c0d10]/80 backdrop-blur-md text-[11px] text-[#cfccc4] border border-[#2a2d38]">
                      <Clock className="w-3 h-3 text-[#c5a880]" />
                      {service.durationMinutes} min
                    </span>
                    <span className="px-3 py-1 rounded bg-[#c5a880] text-[#0c0d10] font-bold text-xs tracking-wider">
                      {formatPrice(service.priceAED, currentCurrency)}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-[#f5f1eb] tracking-wide group-hover:text-[#e4cfb4] transition-colors mb-2">
                      {service.name}
                    </h3>
                    <p className="text-xs text-[#c5a880] font-medium tracking-wide mb-3">
                      {service.tagline}
                    </p>
                    <p className="text-xs text-[#9599a6] leading-relaxed mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Ritual Inclusions Toggle */}
                    <div className="pt-2 border-t border-[#1d202a]">
                      <button
                        onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                        className="text-[11px] text-[#c5a880] hover:text-[#f0dfc8] flex items-center gap-1 font-semibold uppercase tracking-wider mb-2 cursor-pointer"
                      >
                        <Info className="w-3 h-3" />
                        <span>{isExpanded ? 'Hide Ritual Details' : 'What Is Included'}</span>
                      </button>

                      {isExpanded && (
                        <ul className="space-y-1.5 text-[11px] text-[#b4b7c2] bg-[#0c0d10]/70 p-3 rounded-lg border border-[#232733] mb-3 animate-in fade-in duration-200">
                          {service.includes.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a880] flex-shrink-0 mt-0.5" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="pt-4 mt-auto">
                    <button
                      onClick={() => onSelectServiceForBooking(service)}
                      id={`select-service-${service.id}`}
                      className="w-full py-3 rounded-lg bg-[#1a1d26] hover:bg-[#c5a880] text-[#e0ded8] hover:text-[#0c0d10] font-bold text-xs tracking-widest uppercase transition-all duration-200 border border-[#2a2e3b] hover:border-[#c5a880] flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:bg-[#202430]"
                    >
                      <span>Reserve This Treatment</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-[#13151c] rounded-xl border border-[#222530]">
            <p className="text-sm text-[#8e929f] mb-3">No grooming rituals matched your search query.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded bg-[#c5a880] text-[#0c0d10] text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
