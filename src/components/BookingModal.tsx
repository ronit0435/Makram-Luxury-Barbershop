import React, { useState, useEffect } from 'react';
import {
  X, Check, Calendar, Clock, Scissors, Crown, Sparkles, User, Phone, Mail,
  MessageSquare, ArrowRight, ArrowLeft, Download, ExternalLink, ShieldCheck, CheckCircle2
} from 'lucide-react';
import { Service, MasterBarber, VIPAddon, Booking, Currency } from '../types';
import { SERVICES, MASTER_BARBERS, VIP_ADDONS, TIME_SLOTS } from '../data/barbershopData';
import { formatPrice, generateBookingReference, createGoogleCalendarUrl, downloadIcsFile } from '../utils/formatters';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCurrency: Currency;
  initialService?: Service | null;
  initialBarber?: MasterBarber | null;
  initialNote?: string;
  onBookingConfirmed: (newBooking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  currentCurrency,
  initialService,
  initialBarber,
  initialNote,
  onBookingConfirmed
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<MasterBarber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<VIPAddon[]>([]);
  const [isVIPSuite, setIsVIPSuite] = useState<boolean>(false);

  // Client info state
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [drinkPreference, setDrinkPreference] = useState<string>('Single Origin Espresso');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Confirmation state
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Generate upcoming dates (today + next 10 days)
  const [availableDates, setAvailableDates] = useState<{ dateStr: string; dayLabel: string; monthLabel: string }[]>([]);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const monthDay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const isoStr = d.toISOString().split('T')[0];
      dates.push({ dateStr: isoStr, dayLabel: dayName, monthLabel: monthDay });
    }
    setAvailableDates(dates);
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0].dateStr);
    }
  }, []);

  // Pre-load initial service / barber
  useEffect(() => {
    if (initialService) {
      setSelectedServices([initialService]);
      if (initialService.isVIP) {
        setIsVIPSuite(true);
      }
    } else if (SERVICES.length > 0 && selectedServices.length === 0) {
      setSelectedServices([SERVICES[0]]);
    }

    if (initialBarber) {
      setSelectedBarber(initialBarber);
    } else {
      setSelectedBarber(MASTER_BARBERS[0]);
    }

    if (initialNote) {
      setSpecialNotes(initialNote);
    }
  }, [initialService, initialBarber, initialNote]);

  if (!isOpen) return null;

  // Pricing calculations
  const servicesTotalAED = selectedServices.reduce((acc, s) => acc + s.priceAED, 0);
  const addonsTotalAED = selectedAddons.reduce((acc, a) => acc + a.priceAED, 0);
  const vipSuitePrice = isVIPSuite ? 200 : 0;
  const grandTotalAED = servicesTotalAED + addonsTotalAED + vipSuitePrice;

  const totalDurationMinutes = selectedServices.reduce((acc, s) => acc + s.durationMinutes, 0);

  const toggleService = (service: Service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const toggleAddon = (addon: VIPAddon) => {
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const ref = generateBookingReference();
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      referenceCode: ref,
      services: selectedServices,
      barber: selectedBarber || MASTER_BARBERS[0],
      date: selectedDate,
      timeSlot: selectedTimeSlot || '11:30 AM',
      isVIPSuite,
      addons: selectedAddons,
      clientName: clientName.trim(),
      clientPhone: clientPhone.trim(),
      clientEmail: clientEmail.trim() || 'concierge-guest@makram.ae',
      specialNotes: `${drinkPreference ? `Beverage: ${drinkPreference}. ` : ''}${specialNotes}`.trim(),
      totalAED: grandTotalAED,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('makram_salon_bookings');
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newBooking);
      localStorage.setItem('makram_salon_bookings', JSON.stringify(list));
    } catch {
      // LocalStorage fallback
    }

    setConfirmedBooking(newBooking);
    onBookingConfirmed(newBooking);
    setCurrentStep(5);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        id="booking-concierge-modal"
        className="relative w-full max-w-3xl bg-[#111319] border border-[#262a36] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e222d] bg-[#151821]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <Scissors className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display text-sm sm:text-base font-bold text-[#f5f1eb] tracking-widest uppercase">
                Makram Atelier Concierge
              </span>
              <span className="block text-[10px] text-[#c5a880] tracking-wider uppercase">
                Gate Village • DIFC Dubai
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#787c8a] hover:text-white hover:bg-[#202430] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Header (Only when not in confirmation step) */}
        {currentStep < 5 && (
          <div className="grid grid-cols-4 border-b border-[#1e222d] bg-[#13151c] text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center">
            <div
              className={`py-3 border-b-2 transition-colors ${
                currentStep >= 1 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
              }`}
            >
              1. Services
            </div>
            <div
              className={`py-3 border-b-2 transition-colors ${
                currentStep >= 2 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
              }`}
            >
              2. Barber
            </div>
            <div
              className={`py-3 border-b-2 transition-colors ${
                currentStep >= 3 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
              }`}
            >
              3. Date & Time
            </div>
            <div
              className={`py-3 border-b-2 transition-colors ${
                currentStep >= 4 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
              }`}
            >
              4. Details
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: SERVICES & ADD-ONS */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-sm font-bold text-[#f4efe6] uppercase tracking-wider">
                    Select Your Atelier Rituals
                  </h3>
                  <span className="text-[11px] text-[#c5a880]">
                    {selectedServices.length} Selected • {totalDurationMinutes} min
                  </span>
                </div>
                <p className="text-xs text-[#8e929f] mb-4">
                  Select one or combine multiple signature treatments for a comprehensive executive session.
                </p>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {SERVICES.map((service) => {
                    const isSelected = selectedServices.some((s) => s.id === service.id);
                    return (
                      <div
                        key={service.id}
                        onClick={() => toggleService(service)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-[#c5a880] bg-[#c5a880]/10'
                            : 'border-[#222633] bg-[#151821] hover:border-[#333847]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded flex items-center justify-center border ${
                              isSelected
                                ? 'bg-[#c5a880] border-[#c5a880] text-[#0c0d10]'
                                : 'border-[#444857]'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="font-semibold text-xs sm:text-sm text-[#f5efe6]">
                              {service.name}
                            </div>
                            <div className="text-[11px] text-[#9195a3]">
                              {service.durationMinutes} min • {service.tagline}
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-bold text-xs sm:text-sm text-[#e5cda7]">
                            {formatPrice(service.priceAED, currentCurrency)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* VIP Enhancements */}
              <div className="pt-4 border-t border-[#1e222d]">
                <h4 className="text-xs font-bold text-[#c5a880] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5" />
                  <span>VIP Suite & Bespoke Upgrades</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {VIP_ADDONS.map((addon) => {
                    const isAdded = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                          isAdded
                            ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                            : 'border-[#222633] bg-[#14161f] text-[#cfccc4] hover:border-[#353948]'
                        }`}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-semibold text-[11px] text-[#eae7e1]">
                            {addon.name}
                          </span>
                          <span className="text-[11px] font-bold text-[#e5cda7] whitespace-nowrap">
                            +{formatPrice(addon.priceAED, currentCurrency)}
                          </span>
                        </div>
                        <p className="text-[10px] text-[#838795] mt-1 line-clamp-2">
                          {addon.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: MASTER BARBER */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#f4efe6] uppercase tracking-wider mb-1">
                  Select Your Master Barber
                </h3>
                <p className="text-xs text-[#8e929f] mb-4">
                  Each master craftsman is dedicated to your complete visual architecture.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MASTER_BARBERS.map((barber) => {
                    const isSelected = selectedBarber?.id === barber.id;
                    return (
                      <div
                        key={barber.id}
                        onClick={() => setSelectedBarber(barber)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-4 ${
                          isSelected
                            ? 'border-[#c5a880] bg-[#c5a880]/10 ring-1 ring-[#c5a880]'
                            : 'border-[#222633] bg-[#151821] hover:border-[#333847]'
                        }`}
                      >
                        <img
                          src={barber.avatar}
                          alt={barber.name}
                          className="w-16 h-16 rounded-full object-cover border border-[#c5a880]/30 shadow-md flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs sm:text-sm text-[#f5efe6] truncate">
                              {barber.name}
                            </span>
                            {isSelected && <Check className="w-4 h-4 text-[#c5a880]" />}
                          </div>
                          <div className="text-[11px] text-[#c5a880] truncate">
                            {barber.title}
                          </div>
                          <div className="text-[10px] text-[#8e929f] mt-1">
                            Chair 0{barber.chairNumber} • {barber.experienceYears}+ yrs • ★ {barber.rating}
                          </div>
                          <div className="text-[10px] text-[#cfccc4] truncate mt-0.5">
                            {barber.specialty.split(',')[0]}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DATE & TIME SLOT */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-[#f4efe6] uppercase tracking-wider mb-1">
                  Select Reservation Date
                </h3>
                <p className="text-xs text-[#8e929f] mb-3">
                  Atelier operating hours: 10:00 AM – 11:00 PM Daily.
                </p>

                {/* Horizontal Date Picker */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        onClick={() => setSelectedDate(item.dateStr)}
                        className={`flex-shrink-0 p-3 rounded-xl border text-center transition-all cursor-pointer min-w-[80px] ${
                          isSelected
                            ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0d10] font-bold shadow-lg'
                            : 'border-[#222633] bg-[#151821] text-[#cfccc4] hover:border-[#383d4e]'
                        }`}
                      >
                        <div className="text-[11px] uppercase tracking-wider">{item.dayLabel}</div>
                        <div className="text-sm font-bold mt-0.5">{item.monthLabel}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Categorized */}
              <div>
                <h3 className="text-sm font-bold text-[#f4efe6] uppercase tracking-wider mb-3">
                  Available Salon Sessions
                </h3>
                <div className="space-y-4">
                  {TIME_SLOTS.map((group) => (
                    <div key={group.label} className="p-3.5 rounded-xl bg-[#14161f] border border-[#202430]">
                      <div className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider mb-2">
                        {group.label}
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                        {group.slots.map((slot) => {
                          const isSelected = selectedTimeSlot === slot;
                          return (
                            <button
                              key={slot}
                              onClick={() => setSelectedTimeSlot(slot)}
                              className={`py-2 px-2.5 rounded-lg border text-xs tracking-wider transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#c5a880] bg-[#c5a880] text-[#0c0d10] font-bold shadow-md'
                                  : 'border-[#272b38] bg-[#181a24] text-[#cfccc4] hover:border-[#404556]'
                              }`}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CLIENT DETAILS */}
          {currentStep === 4 && (
            <form onSubmit={handleConfirmReservation} className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#f4efe6] uppercase tracking-wider mb-1">
                  Gentleman's Information
                </h3>
                <p className="text-xs text-[#8e929f] mb-4">
                  For your DIFC valet access pass and appointment confirmation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#b5b8c5] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#757a87] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g. Sheikh Sultan or John Smith"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#161822] border border-[#262a37] text-xs text-[#eee] placeholder-[#636775] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#b5b8c5] uppercase tracking-wider mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#757a87] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+971 50 123 4567"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#161822] border border-[#262a37] text-xs text-[#eee] placeholder-[#636775] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#b5b8c5] uppercase tracking-wider mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#757a87] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="vip-guest@company.com"
                        className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#161822] border border-[#262a37] text-xs text-[#eee] placeholder-[#636775] focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#b5b8c5] uppercase tracking-wider mb-1">
                      Complimentary Atelier Beverage
                    </label>
                    <select
                      value={drinkPreference}
                      onChange={(e) => setDrinkPreference(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-[#161822] border border-[#262a37] text-xs text-[#eee] focus:outline-none focus:border-[#c5a880]"
                    >
                      <option value="Single Origin Espresso">Single Origin Italian Espresso</option>
                      <option value="Cold Brew Tonic">Cold Brew Coffee Tonic</option>
                      <option value="Moroccan Mint Tea">Fresh Moroccan Mint Tea</option>
                      <option value="Sparkling San Pellegrino">Sparkling Mineral Water</option>
                      <option value="Artisanal Taif Rose Cordial">Artisanal Taif Rose Cordial</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-[#b5b8c5] uppercase tracking-wider mb-1">
                    Special Requests or Styling Notes
                  </label>
                  <textarea
                    rows={2}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="Specific razor requirements, skin sensitivity, or meeting schedule..."
                    className="w-full p-3 rounded-lg bg-[#161822] border border-[#262a37] text-xs text-[#eee] placeholder-[#636775] focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                {/* VIP Suite Toggle */}
                <div className="mt-4 p-3.5 rounded-xl bg-[#1b1812] border border-[#c5a880]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-[#c5a880]" />
                    <div>
                      <span className="font-semibold text-xs text-[#f5efe6] block">
                        Upgrade to Soundproof Private VIP Suite (+200 AED)
                      </span>
                      <span className="text-[11px] text-[#9e9a8f]">
                        Dedicated private studio, private audio system, cigar terrace access.
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isVIPSuite}
                    onChange={(e) => setIsVIPSuite(e.target.checked)}
                    className="w-5 h-5 rounded border-[#c5a880] text-[#c5a880] accent-[#c5a880] cursor-pointer"
                  />
                </div>
              </div>
            </form>
          )}

          {/* STEP 5: CONFIRMATION VIEW */}
          {currentStep === 5 && confirmedBooking && (
            <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#c5a880]/15 border border-[#c5a880] text-[#c5a880] flex items-center justify-center mx-auto mb-2 shadow-[0_0_25px_rgba(197,168,128,0.3)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/15 text-[#e5cda7] text-xs font-semibold uppercase tracking-widest border border-[#c5a880]/30 mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Reservation Confirmed & Guaranteed</span>
                </span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-wider text-[#f5f1eb]">
                  We Await Your Presence, {confirmedBooking.clientName}
                </h3>
                <p className="text-xs text-[#9599a6] mt-1 max-w-md mx-auto">
                  Your chair is reserved at Makram Atelier in DIFC Gate Village. Complimentary VIP valet parking is ready upon arrival.
                </p>
              </div>

              {/* Pass Card */}
              <div className="p-6 rounded-2xl bg-[#161822] border border-[#c5a880]/40 text-left max-w-lg mx-auto shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a880]/5 rounded-full blur-2xl pointer-events-none" />

                <div className="flex justify-between items-start pb-4 border-b border-[#232733] mb-4">
                  <div>
                    <span className="text-[10px] text-[#8e929f] uppercase tracking-wider block">
                      Booking Reference
                    </span>
                    <span className="font-mono text-lg font-bold text-[#c5a880] tracking-widest">
                      {confirmedBooking.referenceCode}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#8e929f] uppercase tracking-wider block">
                      Total Investment
                    </span>
                    <span className="font-bold text-base text-[#e5cda7]">
                      {formatPrice(confirmedBooking.totalAED, currentCurrency)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                  <div>
                    <span className="text-[10px] text-[#787c89] uppercase tracking-wider block">
                      Master Barber
                    </span>
                    <span className="font-semibold text-[#eee]">{confirmedBooking.barber.name}</span>
                    <span className="block text-[10px] text-[#c5a880]">Chair 0{confirmedBooking.barber.chairNumber}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#787c89] uppercase tracking-wider block">
                      Date & Session
                    </span>
                    <span className="font-semibold text-[#eee]">{confirmedBooking.date}</span>
                    <span className="block text-[10px] text-[#c5a880]">{confirmedBooking.timeSlot}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#232733] text-xs">
                  <span className="text-[10px] text-[#787c89] uppercase tracking-wider block mb-1">
                    Rituals Reserved:
                  </span>
                  <ul className="space-y-1 text-[11px] text-[#cfccc4]">
                    {confirmedBooking.services.map((s) => (
                      <li key={s.id} className="flex justify-between">
                        <span>• {s.name}</span>
                        <span className="text-[#a5a9b8]">{s.durationMinutes}m</span>
                      </li>
                    ))}
                    {confirmedBooking.isVIPSuite && (
                      <li className="flex justify-between text-[#e5cda7]">
                        <span>• Private Velvet VIP Suite</span>
                        <span>Soundproof</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Calendar & Share Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <a
                  href={createGoogleCalendarUrl(
                    `Makram Salon Grooming - ${confirmedBooking.referenceCode}`,
                    `Grooming Appointment with Master ${confirmedBooking.barber.name} at Makram Luxury Barbershop DIFC.\nReference: ${confirmedBooking.referenceCode}`,
                    'Makram Salon, Gate Village Building 04, DIFC, Dubai, UAE',
                    confirmedBooking.date,
                    confirmedBooking.timeSlot,
                    totalDurationMinutes
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#1f232d] hover:bg-[#282d3a] text-xs font-semibold text-[#cfccc4] hover:text-white border border-[#2e3444] flex items-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3 h-3 text-[#787c89]" />
                </a>

                <button
                  onClick={() =>
                    downloadIcsFile(
                      `Makram Salon Grooming - ${confirmedBooking.referenceCode}`,
                      `Grooming Appointment with Master ${confirmedBooking.barber.name} at Makram Luxury Barbershop DIFC.\nReference: ${confirmedBooking.referenceCode}`,
                      'Makram Salon, Gate Village Building 04, DIFC, Dubai, UAE',
                      confirmedBooking.date,
                      confirmedBooking.timeSlot,
                      totalDurationMinutes
                    )
                  }
                  className="px-4 py-2.5 rounded-lg bg-[#1f232d] hover:bg-[#282d3a] text-xs font-semibold text-[#cfccc4] hover:text-white border border-[#2e3444] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Download .ICS (Apple/Outlook)</span>
                </button>

                <a
                  href={`https://wa.me/971501234567?text=${encodeURIComponent(
                    `Hello Makram Concierge, I have reserved appointment ${confirmedBooking.referenceCode} for ${confirmedBooking.date} at ${confirmedBooking.timeSlot} under ${confirmedBooking.clientName}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-[#143224] hover:bg-[#1a402e] text-[#5eead4] text-xs font-semibold border border-[#23583e] flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer Navigation */}
        <div className="px-6 py-4 border-t border-[#1e222d] bg-[#14161f] flex items-center justify-between">
          {currentStep < 5 && (
            <div className="text-xs">
              <span className="text-[#888c99] block text-[10px] uppercase">Estimated Total:</span>
              <span className="font-bold text-sm text-[#c5a880]">
                {formatPrice(grandTotalAED, currentCurrency)}
              </span>
              <span className="text-[10px] text-[#777b88] ml-1.5">
                ({totalDurationMinutes} min)
              </span>
            </div>
          )}

          <div className="flex items-center gap-3 ml-auto">
            {currentStep > 1 && currentStep < 5 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 rounded-lg text-xs text-[#8e929f] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                onClick={() => {
                  if (currentStep === 3 && !selectedTimeSlot) {
                    setSelectedTimeSlot('11:30 AM');
                  }
                  setCurrentStep(currentStep + 1);
                }}
                className="px-6 py-2.5 rounded-lg bg-[#c5a880] hover:bg-[#dfcaa8] text-[#0c0d10] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : currentStep === 4 ? (
              <button
                onClick={handleConfirmReservation}
                disabled={!clientName.trim() || !clientPhone.trim()}
                className={`px-7 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center gap-1.5 ${
                  clientName.trim() && clientPhone.trim()
                    ? 'bg-gradient-to-r from-[#c5a880] to-[#b8986d] text-[#0c0d10] hover:brightness-105'
                    : 'bg-[#252834] text-[#6e7280] cursor-not-allowed'
                }`}
              >
                <span>Confirm & Reserve Chair</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                Close Concierge
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
