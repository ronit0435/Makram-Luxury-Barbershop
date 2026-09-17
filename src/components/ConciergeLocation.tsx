import React from 'react';
import { MapPin, Phone, Clock, MessageSquare, Car, Shield, ExternalLink, Navigation } from 'lucide-react';

interface ConciergeLocationProps {
  onOpenBooking: () => void;
}

export const ConciergeLocation: React.FC<ConciergeLocationProps> = ({ onOpenBooking }) => {
  return (
    <section id="concierge-section" className="py-24 bg-[#0a0c10] border-t border-[#1a1d25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Exclusive Sanctuary</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[0.1em] text-[#f4efe6] mb-5">
            DIFC Gate Village Atelier
          </h2>
          <p className="text-[#9ea2af] text-sm sm:text-base font-light leading-relaxed">
            Positioned within Dubai's premier financial and cultural district, Makram Atelier offers complete discretion, executive tranquility, and private valet reception.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Information Column */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Address & Building */}
            <div className="p-6 rounded-2xl bg-[#13151d] border border-[#232733] space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#1a1d26] border border-[#2b303d] flex items-center justify-center text-[#c5a880] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-[#f5efe6] uppercase tracking-wide">
                    Atelier Location
                  </h3>
                  <p className="text-xs text-[#b8bcc8] mt-1 leading-relaxed">
                    Gate Village Building 04, Level 02, Suite 204 <br />
                    Dubai International Financial Centre (DIFC) <br />
                    Dubai, United Arab Emirates
                  </p>
                </div>
              </div>

              {/* Valet */}
              <div className="p-3.5 rounded-xl bg-[#181a24] border border-[#262a37] flex items-center gap-3">
                <Car className="w-5 h-5 text-[#c5a880] flex-shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-[#f0ebe3] block">Complimentary VIP Valet</span>
                  <span className="text-[#8c909e] text-[11px]">
                    Present your booking reference at Gate Village 04 Valet Station.
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-2xl bg-[#13151d] border border-[#232733]">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#1a1d26] border border-[#2b303d] flex items-center justify-center text-[#c5a880] flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-[#f5efe6] uppercase tracking-wide mb-2">
                    Operating Hours
                  </h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-[#cfccc4]">
                      <span>Monday – Sunday:</span>
                      <span className="font-bold text-[#e5cda7]">10:00 AM – 11:00 PM</span>
                    </div>
                    <div className="flex justify-between text-[#cfccc4]">
                      <span>Private VIP Suite Access:</span>
                      <span className="font-bold text-[#e5cda7]">24/7 By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contacts */}
            <div className="p-6 rounded-2xl bg-[#13151d] border border-[#232733] space-y-3">
              <h3 className="font-display text-sm font-bold text-[#f5efe6] uppercase tracking-wide">
                Direct Concierge Desk
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+97143627000"
                  className="flex-1 p-3 rounded-xl bg-[#191c26] hover:bg-[#202431] border border-[#262b3a] flex items-center justify-center gap-2 text-xs font-semibold text-[#eee] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <span>+971 4 362 7000</span>
                </a>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 p-3 rounded-xl bg-[#143224] hover:bg-[#1a402e] border border-[#23583e] flex items-center justify-center gap-2 text-xs font-semibold text-[#5eead4] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative flex-1 min-h-[380px] rounded-2xl overflow-hidden border border-[#272b38] bg-[#14161f] shadow-2xl">
              {/* Map Graphic / Satellite style */}
              <img
                src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80"
                alt="Dubai DIFC Skyline Map Background"
                className="w-full h-full object-cover filter brightness-50 contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c10] via-black/40 to-[#0a0c10]/40" />

              {/* Pin Marker Card in the center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-2xl bg-[#0e1017]/95 backdrop-blur-md border border-[#c5a880]/50 text-center shadow-2xl max-w-xs w-[90%]">
                <div className="w-12 h-12 rounded-full bg-[#c5a880]/20 border border-[#c5a880] flex items-center justify-center text-[#c5a880] mx-auto mb-2 shadow-[0_0_20px_rgba(197,168,128,0.4)]">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <h4 className="font-display text-base font-bold text-[#f5efe6] uppercase tracking-wide">
                  Makram Salon DIFC
                </h4>
                <p className="text-[11px] text-[#9fa3b0] mt-1">
                  Gate Village Building 04 • Level 02
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <a
                    href="https://maps.google.com/?q=Gate+Village+DIFC+Dubai"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-lg bg-[#c5a880] hover:bg-[#dfcaa8] text-[#0c0d10] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get GPS Directions</span>
                  </a>
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-2 rounded-lg bg-[#1a1d26] hover:bg-[#232734] text-[#cfccc4] hover:text-white font-medium text-xs uppercase tracking-wider border border-[#2a2e3b] transition-colors"
                  >
                    Reserve Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
