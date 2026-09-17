import React from 'react';
import { Calendar, Sparkles, ChevronDown, Award, Star, ShieldCheck, Scissors } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenConsultation: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenConsultation,
  onExploreServices
}) => {
  return (
    <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background with deep dark gradient overlay and high-fashion grooming imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Barbershop Grooming Craft"
          className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-[1.1] scale-105 transform animate-pulse duration-[10000ms]"
        />
        {/* Subtle Luxury Gradients and Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d10] via-[#0c0d10]/70 to-[#0c0d10]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#c5a880]/10 via-transparent to-transparent pointer-events-none" />
        {/* Fine gold horizontal accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a880]/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Live Atelier Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#c5a880]/30 bg-[#161820]/80 backdrop-blur-md mb-8 shadow-[0_0_15px_rgba(197,168,128,0.15)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-semibold tracking-widest text-[#e8dac5] uppercase">
            Atelier Open • DIFC Gate Village • 4 Master Chairs Available
          </span>
        </div>

        {/* Main Headings */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.1em] sm:tracking-[0.15em] text-[#f7f5f0] uppercase leading-[1.1] mb-6">
          The Pinnacle of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d8c2a3] via-[#edd8b7] to-[#bfa075]">
            Masculine Refinement
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#b8b5ad] font-light leading-relaxed mb-10 tracking-wide">
          Where Ottoman hot-towel blade rituals meet Mayfair precision scissor architecture. 
          Step into Dubai's most exclusive sanctuary for executive grooming, private VIP suites, and bespoke style mastery.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
          <button
            onClick={onOpenBooking}
            id="hero-reserve-session-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-r from-[#c5a880] via-[#dfcaa8] to-[#b8986d] text-[#0c0d10] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(197,168,128,0.45)] hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-[#0c0d10]" />
            <span>Reserve Atelier Chair</span>
          </button>

          <button
            onClick={onExploreServices}
            id="hero-explore-menu-btn"
            className="w-full sm:w-auto px-7 py-4 rounded-md border border-[#343844] bg-[#12141a]/90 text-[#eae7e1] font-medium text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:border-[#c5a880]/60 hover:text-[#f0dfc8] hover:bg-[#181b22] cursor-pointer flex items-center justify-center gap-2"
          >
            <Scissors className="w-4 h-4 text-[#c5a880]" />
            <span>Explore Services Menu</span>
          </button>

          <button
            onClick={onOpenConsultation}
            id="hero-ai-stylist-btn"
            className="w-full sm:w-auto px-6 py-4 rounded-md border border-[#c5a880]/40 bg-[#1e1b16]/70 text-[#f5dfbe] font-medium text-xs sm:text-sm tracking-[0.15em] uppercase transition-all duration-300 hover:border-[#c5a880] hover:bg-[#28231a] cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#e5cda7] animate-pulse" />
            <span>Face Shape Advisor</span>
          </button>
        </div>

        {/* 3 Prestige Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#232630]/80 max-w-4xl mx-auto text-left">
          <div className="flex items-center gap-3.5 bg-[#12141a]/60 p-3.5 rounded-lg border border-[#20232c]">
            <div className="w-10 h-10 rounded-md bg-[#1d2029] border border-[#2e3340] flex items-center justify-center text-[#c5a880] flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wider text-[#eee] uppercase font-display">18+ Years Legacy</div>
              <div className="text-xs text-[#9598a3]">Milan, Istanbul & DIFC Masters</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#12141a]/60 p-3.5 rounded-lg border border-[#20232c]">
            <div className="w-10 h-10 rounded-md bg-[#1d2029] border border-[#2e3340] flex items-center justify-center text-[#c5a880] flex-shrink-0">
              <Star className="w-5 h-5 fill-[#c5a880]" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wider text-[#eee] uppercase font-display">4.98 / 5 Rating</div>
              <div className="text-xs text-[#9598a3]">Over 1,480 Verified Gentlemen</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#12141a]/60 p-3.5 rounded-lg border border-[#20232c]">
            <div className="w-10 h-10 rounded-md bg-[#1d2029] border border-[#2e3340] flex items-center justify-center text-[#c5a880] flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wider text-[#eee] uppercase font-display">Private VIP Suites</div>
              <div className="text-xs text-[#9598a3]">Soundproof Chamber & Concierge</div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={onExploreServices}
            aria-label="Scroll down to services"
            className="text-[#888b94] hover:text-[#c5a880] transition-colors animate-bounce cursor-pointer p-2"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};
