import React, { useState } from 'react';
import { X, Search, Calendar, Clock, Scissors, Trash2, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { Booking, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { TIME_SLOTS } from '../data/barbershopData';

interface ManageBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  currentCurrency: Currency;
  onCancelBooking: (bookingId: string) => void;
  onRescheduleBooking: (bookingId: string, newDate: string, newTime: string) => void;
  onNewBookingClick: () => void;
}

export const ManageBookingsModal: React.FC<ManageBookingsModalProps> = ({
  isOpen,
  onClose,
  bookings,
  currentCurrency,
  onCancelBooking,
  onRescheduleBooking,
  onNewBookingClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reschedulingId, setReschedulingId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('12:15 PM');

  if (!isOpen) return null;

  const filtered = bookings.filter(
    (b) =>
      b.referenceCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.clientPhone.includes(searchTerm)
  );

  const handleStartReschedule = (booking: Booking) => {
    setReschedulingId(booking.id);
    setNewDate(booking.date);
    setNewTime(booking.timeSlot);
  };

  const handleSaveReschedule = (bookingId: string) => {
    if (!newDate || !newTime) return;
    onRescheduleBooking(bookingId, newDate, newTime);
    setReschedulingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        id="manage-bookings-modal"
        className="relative w-full max-w-2xl bg-[#12141a] border border-[#272b38] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f232e] bg-[#161822]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-[#f5f1eb] uppercase tracking-wider">
                My Atelier Reservations
              </h3>
              <p className="text-[11px] text-[#8e929f]">
                Manage, reschedule, or cancel your appointments
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#787c8a] hover:text-white hover:bg-[#202430] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-5 border-b border-[#1f232e] bg-[#14161f]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#757a87] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by reference code (MKR-XXXXX), name, or phone..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#191b26] border border-[#272b3a] text-xs text-[#eee] placeholder-[#626674] focus:outline-none focus:border-[#c5a880]"
            />
          </div>
        </div>

        {/* List of Bookings */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-[#353948] mx-auto mb-3" />
              <h4 className="text-sm font-semibold text-[#f0ebe3] mb-1">
                No Reservations Found
              </h4>
              <p className="text-xs text-[#828694] max-w-sm mx-auto mb-5">
                You currently have no active appointments registered under this browser session or matching your search.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onNewBookingClick();
                }}
                className="px-5 py-2.5 rounded-lg bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#dfcaa8] transition-all"
              >
                Reserve An Appointment Now
              </button>
            </div>
          ) : (
            filtered.map((b) => {
              const isRescheduling = reschedulingId === b.id;
              const isCancelled = b.status === 'cancelled';

              return (
                <div
                  key={b.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isCancelled
                      ? 'border-[#332222] bg-[#191313] opacity-60'
                      : 'border-[#242836] bg-[#161822]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-3 border-b border-[#212533] mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#c5a880] tracking-wider">
                          {b.referenceCode}
                        </span>
                        {isCancelled ? (
                          <span className="px-2 py-0.5 rounded bg-red-900/40 border border-red-700/50 text-red-300 text-[10px] uppercase font-bold">
                            Cancelled
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-[#133222] border border-[#23583c] text-[#5eead4] text-[10px] uppercase font-bold">
                            Confirmed
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#8e929f] mt-0.5 block">
                        Reserved for {b.clientName} ({b.clientPhone})
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-sm text-[#e5cda7]">
                        {formatPrice(b.totalAED, currentCurrency)}
                      </span>
                    </div>
                  </div>

                  {/* Rescheduling Form */}
                  {isRescheduling ? (
                    <div className="p-3 rounded-lg bg-[#1d202b] border border-[#2e3343] space-y-3 mb-3">
                      <span className="text-xs font-semibold text-[#c5a880] block">
                        Select New Date & Time Slot:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] text-[#9195a4] uppercase mb-1">
                            New Date
                          </label>
                          <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full p-2 rounded bg-[#14161f] border border-[#2b3040] text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-[#9195a4] uppercase mb-1">
                            New Time Slot
                          </label>
                          <select
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full p-2 rounded bg-[#14161f] border border-[#2b3040] text-xs text-white"
                          >
                            {TIME_SLOTS.flatMap((g) => g.slots).map((slot) => (
                              <option key={slot} value={slot}>
                                {slot}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          onClick={() => setReschedulingId(null)}
                          className="px-3 py-1.5 rounded text-xs text-[#888] hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveReschedule(b.id)}
                          className="px-4 py-1.5 rounded bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase"
                        >
                          Confirm Reschedule
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-3">
                      <div>
                        <span className="text-[10px] text-[#717583] uppercase block">
                          Master Barber:
                        </span>
                        <span className="text-[#cfccc4] font-medium">{b.barber.name}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#717583] uppercase block">
                          Appointment Date:
                        </span>
                        <span className="text-[#cfccc4] font-medium">{b.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#717583] uppercase block">
                          Time Slot:
                        </span>
                        <span className="text-[#cfccc4] font-medium">{b.timeSlot}</span>
                      </div>
                    </div>
                  )}

                  {/* Rituals list */}
                  <div className="text-[11px] text-[#989ca9] mb-3">
                    <span className="text-[#717583] uppercase text-[10px] block mb-0.5">
                      Services:
                    </span>
                    {b.services.map((s) => s.name).join(' • ')}
                    {b.isVIPSuite && ' • Private VIP Velvet Suite'}
                  </div>

                  {/* Actions */}
                  {!isCancelled && !isRescheduling && (
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#202330]">
                      <button
                        onClick={() => handleStartReschedule(b)}
                        className="px-3 py-1.5 rounded bg-[#1e222e] hover:bg-[#282d3d] text-[#c5a880] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Reschedule</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to cancel booking ${b.referenceCode}?`)) {
                            onCancelBooking(b.id);
                          }
                        }}
                        className="px-3 py-1.5 rounded bg-[#201717] hover:bg-[#2e1d1d] text-red-400 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Cancel</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1f232e] bg-[#151720] flex justify-between items-center text-xs text-[#808493]">
          <span>Need assistance? Call DIFC Concierge: +971 4 362 7000</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#222634] hover:bg-[#2c3143] text-white text-xs font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
