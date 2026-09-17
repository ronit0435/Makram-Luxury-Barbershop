import React from 'react';
import { Star, Award, Scissors, Calendar, Check, Globe } from 'lucide-react';
import { MasterBarber } from '../types';
import { MASTER_BARBERS } from '../data/barbershopData';

interface BarbersSectionProps {
  onSelectBarberForBooking: (barber: MasterBarber) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({
  onSelectBarberForBooking
}) => {
  return (
    <section id="barbers-section" className="py-24 bg-[#0e1015] border-t border-[#1a1d25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Master Craftsmen</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[0.1em] text-[#f4efe6] mb-5">
            The Master Barbers of DIFC
          </h2>
          <p className="text-[#9ea2af] text-sm sm:text-base font-light leading-relaxed">
            Our atelier brings together four internationally acclaimed grooming artisans, each with over a decade of dedication to masculine aesthetic perfection.
          </p>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MASTER_BARBERS.map((barber) => (
            <div
              key={barber.id}
              id={`barber-card-${barber.id}`}
              className="group flex flex-col justify-between rounded-xl bg-[#14161d] border border-[#232733] overflow-hidden hover:border-[#c5a880]/50 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Master Avatar & Chair Tag */}
                <div className="relative h-72 overflow-hidden bg-[#1a1d26]">
                  <img
                    src={barber.avatar}
                    alt={barber.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-90 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14161d] via-[#14161d]/20 to-transparent" />

                  {/* Chair Tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0c0d10]/90 backdrop-blur-md border border-[#c5a880]/40 text-[#c5a880] text-[10px] font-bold tracking-widest uppercase">
                    Chair 0{barber.chairNumber}
                  </div>

                  {/* Experience Badge */}
                  <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#0c0d10]/90 backdrop-blur-md border border-[#2a2d38] text-[#cfccc4] text-[10px] font-medium tracking-wider">
                    {barber.experienceYears}+ Yrs Exp
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0c0d10]/80 backdrop-blur-md border border-[#2c303d]">
                    <Star className="w-3.5 h-3.5 fill-[#c5a880] text-[#c5a880]" />
                    <span className="text-xs font-bold text-[#eee]">{barber.rating}</span>
                    <span className="text-[10px] text-[#8e929f]">({barber.reviewsCount})</span>
                  </div>
                </div>

                {/* Barber Bio & Specialties */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-[#f5f1eb] tracking-wide group-hover:text-[#e4cfb4] transition-colors mb-1">
                    {barber.name}
                  </h3>
                  <div className="text-xs text-[#c5a880] font-medium tracking-wider uppercase mb-3">
                    {barber.title}
                  </div>

                  <p className="text-xs text-[#9094a2] leading-relaxed mb-4 line-clamp-3">
                    {barber.bio}
                  </p>

                  <div className="space-y-2 pt-3 border-t border-[#1e222c] text-xs">
                    <div>
                      <span className="text-[#727685] block text-[10px] uppercase tracking-wider mb-0.5">
                        Signature Craft:
                      </span>
                      <span className="text-[#cfccc4] font-medium text-[11px] flex items-center gap-1.5">
                        <Scissors className="w-3 h-3 text-[#c5a880] flex-shrink-0" />
                        <span>{barber.signatureStyle}</span>
                      </span>
                    </div>

                    <div>
                      <span className="text-[#727685] block text-[10px] uppercase tracking-wider mb-0.5">
                        Languages Spoken:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {barber.languages.map((lang) => (
                          <span
                            key={lang}
                            className="px-2 py-0.5 rounded bg-[#1c202a] text-[#a9adc0] text-[10px] tracking-wider"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectBarberForBooking(barber)}
                  id={`book-with-${barber.id}`}
                  className="w-full py-2.5 rounded-lg bg-[#1a1d26] hover:bg-[#c5a880] text-[#e0ded8] hover:text-[#0c0d10] font-bold text-xs tracking-widest uppercase transition-all duration-200 border border-[#2a2e3b] hover:border-[#c5a880] flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:bg-[#202532]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
