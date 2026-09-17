import React, { useState, useEffect } from 'react';
import { Scissors, Calendar, Menu, X, Globe, Sparkles, MapPin, Phone } from 'lucide-react';
import { Currency } from '../types';

interface HeaderProps {
  currentCurrency: Currency;
  onSelectCurrency: (curr: Currency) => void;
  onOpenBooking: () => void;
  onOpenManageBookings: () => void;
  onOpenConsultation: () => void;
  bookingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCurrency,
  onSelectCurrency,
  onOpenBooking,
  onOpenManageBookings,
  onOpenConsultation,
  bookingCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currencies: Currency[] = ['AED', 'USD', 'EUR', 'GBP'];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0d10]/95 backdrop-blur-md border-b border-[#252830] py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0c0d10]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          id="brand-logo-link"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full border border-[#c5a880]/40 flex items-center justify-center bg-[#181a20] text-[#c5a880] group-hover:border-[#c5a880] group-hover:scale-105 transition-all">
            <Scissors className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </div>
          <div>
            <span className="block font-display text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#f4efe6] uppercase">
              MAKRAM
            </span>
            <span className="block text-[10px] tracking-[0.35em] text-[#c5a880] uppercase -mt-0.5">
              DUBAI • ATELIER DE LUXE
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wider uppercase text-[#c0bdb5]">
          <button
            onClick={() => scrollToSection('services-section')}
            id="nav-services-btn"
            className="hover:text-[#c5a880] transition-colors cursor-pointer py-1"
          >
            Services Menu
          </button>
          <button
            onClick={() => scrollToSection('barbers-section')}
            id="nav-barbers-btn"
            className="hover:text-[#c5a880] transition-colors cursor-pointer py-1"
          >
            Master Barbers
          </button>
          <button
            onClick={onOpenConsultation}
            id="nav-consultation-btn"
            className="flex items-center gap-1.5 text-[#e5cda7] hover:text-white transition-colors cursor-pointer py-1 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            AI Style Advisor
          </button>
          <button
            onClick={() => scrollToSection('atelier-section')}
            id="nav-atelier-btn"
            className="hover:text-[#c5a880] transition-colors cursor-pointer py-1"
          >
            The Atelier
          </button>
          <button
            onClick={() => scrollToSection('reviews-section')}
            id="nav-reviews-btn"
            className="hover:text-[#c5a880] transition-colors cursor-pointer py-1"
          >
            Reviews
          </button>
          <button
            onClick={() => scrollToSection('concierge-section')}
            id="nav-concierge-btn"
            className="hover:text-[#c5a880] transition-colors cursor-pointer py-1"
          >
            DIFC Location
          </button>
        </nav>

        {/* Right Actions: Currency, Manage Bookings & Book Button */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              id="currency-selector-btn"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#2a2e37] bg-[#14161c] text-xs text-[#cfccc4] hover:border-[#c5a880]/50 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#c5a880]" />
              <span className="font-medium tracking-wider">{currentCurrency}</span>
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 py-1.5 bg-[#171922] border border-[#2a2e37] rounded-lg shadow-2xl z-50">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      onSelectCurrency(curr);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs tracking-wider transition-colors cursor-pointer ${
                      currentCurrency === curr
                        ? 'bg-[#c5a880]/20 text-[#e6c99f] font-semibold'
                        : 'text-[#bbb] hover:bg-[#20232c] hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Manage Bookings */}
          <button
            onClick={onOpenManageBookings}
            id="header-my-bookings-btn"
            className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-md border border-[#2a2e37] bg-[#14161c] text-xs tracking-wider text-[#cfccc4] hover:text-white hover:border-[#c5a880]/50 transition-all cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>My Bookings</span>
            {bookingCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#c5a880] text-[#0c0d10] font-bold text-[10px] flex items-center justify-center ml-0.5">
                {bookingCount}
              </span>
            )}
          </button>

          {/* Primary Book CTA */}
          <button
            onClick={onOpenBooking}
            id="header-reserve-chair-btn"
            className="relative group overflow-hidden px-4 py-2 rounded-md bg-gradient-to-r from-[#c5a880] via-[#dfcaa8] to-[#b8986d] text-[#0c0d10] font-semibold text-xs tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(197,168,128,0.4)] hover:brightness-105 active:scale-98 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>Book Appointment</span>
            </span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded bg-[#c5a880] text-[#0c0d10] text-[11px] font-bold uppercase tracking-wider"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="p-2 rounded-md border border-[#2a2e37] bg-[#14161c] text-[#cfccc4] hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#101217] border-b border-[#252830] px-5 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex justify-between items-center pb-3 border-b border-[#20232c]">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#8e929d] uppercase tracking-wider">Currency:</span>
              <div className="flex gap-1.5">
                {currencies.map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onSelectCurrency(curr)}
                    className={`px-2 py-1 text-xs rounded ${
                      currentCurrency === curr
                        ? 'bg-[#c5a880] text-[#0c0d10] font-bold'
                        : 'bg-[#181a22] text-[#aaa]'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenManageBookings();
              }}
              className="text-xs text-[#c5a880] flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Bookings ({bookingCount})</span>
            </button>
          </div>

          <div className="flex flex-col space-y-3 text-sm tracking-wider uppercase text-[#c0bdb5]">
            <button
              onClick={() => scrollToSection('services-section')}
              className="text-left py-2 hover:text-[#c5a880]"
            >
              Services Menu
            </button>
            <button
              onClick={() => scrollToSection('barbers-section')}
              className="text-left py-2 hover:text-[#c5a880]"
            >
              Master Barbers
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="text-left py-2 text-[#e5cda7] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#c5a880]" />
              AI Style & Face Advisor
            </button>
            <button
              onClick={() => scrollToSection('atelier-section')}
              className="text-left py-2 hover:text-[#c5a880]"
            >
              The Atelier & Craft
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="text-left py-2 hover:text-[#c5a880]"
            >
              Verified Reviews
            </button>
            <button
              onClick={() => scrollToSection('concierge-section')}
              className="text-left py-2 hover:text-[#c5a880]"
            >
              DIFC Location & Valet
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-md bg-[#c5a880] text-[#0c0d10] font-bold text-xs tracking-widest uppercase text-center"
            >
              Reserve an Appointment
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
