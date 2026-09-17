import React, { useState } from 'react';
import { Scissors, Instagram, Facebook, MapPin, Phone, Mail, ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenManageBookings: () => void;
  onOpenConsultation: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenManageBookings,
  onOpenConsultation
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#08090c] border-t border-[#1a1d26] text-[#8e929f] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#181a24]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c5a880]/40 flex items-center justify-center bg-[#151720] text-[#c5a880]">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <span className="block font-display text-2xl font-bold tracking-[0.25em] text-[#f4efe6] uppercase">
                  MAKRAM
                </span>
                <span className="block text-[10px] tracking-[0.35em] text-[#c5a880] uppercase -mt-0.5">
                  DUBAI • ATELIER DE LUXE
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8c909e] leading-relaxed max-w-sm">
              The pinnacle of bespoke masculine grooming, situated within Gate Village DIFC. 
              Dedicated to traditional craftsmanship, rare Japanese cutlery, and the uncompromising art of executive poise.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-[#13151d] border border-[#232733] flex items-center justify-center text-[#c5a880] hover:text-white hover:border-[#c5a880] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-[#13151d] border border-[#232733] flex items-center justify-center text-[#c5a880] hover:text-white hover:border-[#c5a880] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:concierge@makram.ae"
                aria-label="Email Concierge"
                className="w-8 h-8 rounded-full bg-[#13151d] border border-[#232733] flex items-center justify-center text-[#c5a880] hover:text-white hover:border-[#c5a880] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-2">
              Atelier Nav
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('services-section')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Services Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('barbers-section')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Master Barbers
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConsultation}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer text-[#e5cda7]"
                >
                  AI Style Advisor
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('atelier-section')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  The Atelier & Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('reviews-section')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Verified Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Booking */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-2">
              Concierge Desk
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer text-[#e5cda7] font-semibold"
                >
                  Reserve Appointment
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenManageBookings}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  Look Up My Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('concierge-section')}
                  className="hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  DIFC Valet Directions
                </button>
              </li>
              <li>
                <a
                  href="tel:+97143627000"
                  className="hover:text-[#c5a880] transition-colors"
                >
                  +971 4 362 7000
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#5eead4] hover:underline"
                >
                  WhatsApp Concierge
                </a>
              </li>
            </ul>
          </div>

          {/* VIP Gazette Newsletter */}
          <div className="space-y-3 text-xs">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-sm mb-2">
              The Gentleman's Gazette
            </h4>
            <p className="text-[11px] text-[#7e8291]">
              Exclusive invitations to seasonal grooming releases, fragrance previews, and private lounge evenings.
            </p>

            {subscribed ? (
              <div className="p-2.5 rounded bg-[#16251b] border border-[#235839] text-[#5eead4] text-[11px] flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" />
                <span>You have been added to the VIP guest list.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    className="w-full pl-3 pr-8 py-2 rounded-lg bg-[#14161f] border border-[#232733] text-xs text-white placeholder-[#606472] focus:outline-none focus:border-[#c5a880]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Gazette"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#c5a880] hover:text-white"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6d717f] gap-4">
          <p>© {new Date().getFullYear()} Makram Luxury Barbershop LLC. All rights reserved. Gate Village, DIFC, Dubai.</p>
          <div className="flex gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Charter</span>
            <span className="hover:text-white transition-colors cursor-pointer">VIP Member Terms</span>
            <span className="hover:text-white transition-colors cursor-pointer">Valet Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
