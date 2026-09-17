import { Currency } from '../types';
import { CURRENCY_RATES } from '../data/barbershopData';

export function formatPrice(priceAED: number, currency: Currency): string {
  const rateInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.AED;
  const converted = Math.round(priceAED * rateInfo.rateFromAED);
  
  if (currency === 'AED') {
    return `${converted} AED`;
  }
  return `${rateInfo.symbol}${converted}`;
}

export function generateBookingReference(): string {
  const letters = 'MKR';
  const num = Math.floor(10000 + Math.random() * 90000);
  return `${letters}-${num}`;
}

export function createGoogleCalendarUrl(
  title: string,
  description: string,
  location: string,
  dateStr: string,
  timeStr: string,
  durationMinutes: number
): string {
  // Parse date and time into basic ISO format for Google Calendar
  try {
    const dateTime = new Date(`${dateStr} ${timeStr}`);
    if (isNaN(dateTime.getTime())) {
      const fallbackDate = new Date();
      fallbackDate.setDate(fallbackDate.getDate() + 1);
      const startIso = fallbackDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
      fallbackDate.setMinutes(fallbackDate.getMinutes() + durationMinutes);
      const endIso = fallbackDate.toISOString().replace(/-|:|\.\d\d\d/g, '');
      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startIso}/${endIso}`;
    }

    const startIso = dateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');
    const endDateTime = new Date(dateTime.getTime() + durationMinutes * 60000);
    const endIso = endDateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startIso}/${endIso}`;
  } catch {
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;
  }
}

export function downloadIcsFile(
  title: string,
  description: string,
  location: string,
  dateStr: string,
  timeStr: string,
  durationMinutes: number
) {
  const icsData = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Makram Salon Dubai//Booking Concierge//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location}`,
    `STATUS:CONFIRMED`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `makram-booking-${dateStr}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
