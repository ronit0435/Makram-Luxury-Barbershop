import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BarbersSection } from './components/BarbersSection';
import { AtelierGallery } from './components/AtelierGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { ConciergeLocation } from './components/ConciergeLocation';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ManageBookingsModal } from './components/ManageBookingsModal';
import { StyleAdvisorModal } from './components/StyleAdvisorModal';
import { Currency, Service, MasterBarber, Booking } from './types';
import { SERVICES, MASTER_BARBERS } from './data/barbershopData';
import { MessageSquare, Calendar, Sparkles } from 'lucide-react';

export default function App() {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>('AED');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isManageBookingsOpen, setIsManageBookingsOpen] = useState<boolean>(false);
  const [isStyleAdvisorOpen, setIsStyleAdvisorOpen] = useState<boolean>(false);

  const [preSelectedService, setPreSelectedService] = useState<Service | null>(null);
  const [preSelectedBarber, setPreSelectedBarber] = useState<MasterBarber | null>(null);
  const [consultationNote, setConsultationNote] = useState<string>('');

  const [bookings, setBookings] = useState<Booking[]>([]);

  // Initialize and load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('makram_salon_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        // Seed an initial VIP reservation for immediate experience
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const isoTomorrow = tomorrow.toISOString().split('T')[0];

        const initialSampleBooking: Booking = {
          id: 'booking-seed-01',
          referenceCode: 'MKR-89241',
          services: [SERVICES[0], SERVICES[1]], // Imperial Cut + Ottoman Beard
          barber: MASTER_BARBERS[0], // Makram
          date: isoTomorrow,
          timeSlot: '11:30 AM',
          isVIPSuite: true,
          addons: [],
          clientName: 'Sultan Al-Ghurair',
          clientPhone: '+971 50 882 1994',
          clientEmail: 's.alghurair@investment.ae',
          specialNotes: 'Complimentary Beverage: Single Origin Espresso. Please arrange Gate Village 04 valet greeting.',
          totalAED: 700,
          status: 'confirmed',
          createdAt: new Date().toISOString()
        };
        const defaultList = [initialSampleBooking];
        localStorage.setItem('makram_salon_bookings', JSON.stringify(defaultList));
        setBookings(defaultList);
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleBookingConfirmed = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: 'cancelled' as const } : b
    );
    setBookings(updated);
    try {
      localStorage.setItem('makram_salon_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleRescheduleBooking = (bookingId: string, newDate: string, newTime: string) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, date: newDate, timeSlot: newTime } : b
    );
    setBookings(updated);
    try {
      localStorage.setItem('makram_salon_bookings', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleOpenBooking = () => {
    setPreSelectedService(null);
    setPreSelectedBarber(null);
    setConsultationNote('');
    setIsBookingOpen(true);
  };

  const handleSelectServiceForBooking = (service: Service) => {
    setPreSelectedService(service);
    setPreSelectedBarber(null);
    setConsultationNote('');
    setIsBookingOpen(true);
  };

  const handleSelectBarberForBooking = (barber: MasterBarber) => {
    setPreSelectedBarber(barber);
    setPreSelectedService(null);
    setConsultationNote('');
    setIsBookingOpen(true);
  };

  const handleSelectRecommendedService = (service: Service, note: string) => {
    setPreSelectedService(service);
    setConsultationNote(note);
    setIsBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#cfccc4] font-sans antialiased selection:bg-[#c5a880]/30 selection:text-[#f4efe6]">
      {/* Top Header */}
      <Header
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        onOpenBooking={handleOpenBooking}
        onOpenManageBookings={() => setIsManageBookingsOpen(true)}
        onOpenConsultation={() => setIsStyleAdvisorOpen(true)}
        bookingCount={bookings.filter((b) => b.status === 'confirmed').length}
      />

      {/* Hero Experience */}
      <Hero
        onOpenBooking={handleOpenBooking}
        onOpenConsultation={() => setIsStyleAdvisorOpen(true)}
        onExploreServices={() => scrollToSection('services-section')}
      />

      {/* Services Menu Section */}
      <ServicesSection
        currentCurrency={currentCurrency}
        onSelectServiceForBooking={handleSelectServiceForBooking}
      />

      {/* Master Barbers Section */}
      <BarbersSection
        onSelectBarberForBooking={handleSelectBarberForBooking}
      />

      {/* Visual Atelier & Rituals Gallery */}
      <AtelierGallery />

      {/* Verified Reviews Section */}
      <ReviewsSection />

      {/* DIFC Gate Village Location & Concierge */}
      <ConciergeLocation onOpenBooking={handleOpenBooking} />

      {/* Footer */}
      <Footer
        onOpenBooking={handleOpenBooking}
        onOpenManageBookings={() => setIsManageBookingsOpen(true)}
        onOpenConsultation={() => setIsStyleAdvisorOpen(true)}
      />

      {/* Floating Action Concierge Bar (Bottom-Right for mobile & desktop convenience) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-3 pointer-events-auto">
        <button
          onClick={() => setIsStyleAdvisorOpen(true)}
          id="floating-style-advisor-btn"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#181a24]/90 backdrop-blur-md border border-[#c5a880]/40 text-[#f5dfbe] hover:border-[#c5a880] text-xs font-medium shadow-xl hover:scale-105 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880] animate-pulse" />
          <span className="hidden sm:inline">AI Face Shape Advisor</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Concierge"
            className="w-12 h-12 rounded-full bg-[#133827] hover:bg-[#1a4a35] border border-[#23583e] text-[#5eead4] flex items-center justify-center shadow-2xl hover:scale-105 transition-all"
          >
            <MessageSquare className="w-5 h-5" />
          </a>

          <button
            onClick={handleOpenBooking}
            id="floating-reserve-btn"
            className="px-5 py-3 rounded-full bg-gradient-to-r from-[#c5a880] via-[#dfcaa8] to-[#b8986d] text-[#0c0d10] font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_4px_25px_rgba(197,168,128,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#0c0d10]" />
            <span>Book Chair</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        currentCurrency={currentCurrency}
        initialService={preSelectedService}
        initialBarber={preSelectedBarber}
        initialNote={consultationNote}
        onBookingConfirmed={handleBookingConfirmed}
      />

      <ManageBookingsModal
        isOpen={isManageBookingsOpen}
        onClose={() => setIsManageBookingsOpen(false)}
        bookings={bookings}
        currentCurrency={currentCurrency}
        onCancelBooking={handleCancelBooking}
        onRescheduleBooking={handleRescheduleBooking}
        onNewBookingClick={handleOpenBooking}
      />

      <StyleAdvisorModal
        isOpen={isStyleAdvisorOpen}
        onClose={() => setIsStyleAdvisorOpen(false)}
        onSelectRecommendedService={handleSelectRecommendedService}
      />
    </div>
  );
}
