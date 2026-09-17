import { Service, MasterBarber, VIPAddon, ClientReview, CurrencyRate, Currency, GalleryItem } from '../types';

export const CURRENCY_RATES: Record<Currency, CurrencyRate> = {
  AED: { code: 'AED', symbol: 'AED', rateFromAED: 1 },
  USD: { code: 'USD', symbol: '$', rateFromAED: 0.272 },
  EUR: { code: 'EUR', symbol: '€', rateFromAED: 0.251 },
  GBP: { code: 'GBP', symbol: '£', rateFromAED: 0.215 }
};

export const SERVICES: Service[] = [
  {
    id: 'imperial-cut',
    name: 'The Imperial Makram Haircut & Styling',
    tagline: 'Precision bespoke haircut, invigorating wash & Japanese razor perimeter',
    description: 'Our signature haircut consultation tailored to bone structure and natural hair flow. Includes scalp cleansing with organic mint botanical shampoo, warm towel neck treatment, single-blade razor edging, and artisanal styling with matte clay or conditioning balm.',
    durationMinutes: 45,
    priceAED: 350,
    category: 'haircut',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Comprehensive facial symmetry consultation',
      'Botanical double cleanse & scalp massage',
      'Japanese steel scissor & clipper work',
      'Single-blade straight razor perimeter finish',
      'Custom styling & product recommendation'
    ]
  },
  {
    id: 'ottoman-beard',
    name: 'Royal Ottoman Hot Towel Beard Sculpt',
    tagline: 'Architectural beard shaping, essential steam & straight razor finish',
    description: 'A sensory grooming tradition refined for modern aristocracy. Begins with aromatic steam to soften the beard follicles, followed by tailored clipper sculpt, hot lather application, hand-sharpened Japanese razor lining, and an ice-cold marble stone compress to close pores.',
    durationMinutes: 40,
    priceAED: 280,
    category: 'beard',
    isPopular: true,
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Beard line and density mapping',
      'Herbal eucalyptus steam infusion',
      'Badger brush warm foam lathering',
      'Feather-edge straight razor contouring',
      'Hydrating argan & sandalwood oil seal',
      'Chilled marble stone pore refinement'
    ]
  },
  {
    id: 'grand-sultan',
    name: 'The Grand Sultan VIP Experience',
    tagline: 'The pinnacle 90-minute full head-to-beard royal transformation',
    description: 'Our most requested holistic experience. Unites the Imperial Haircut, the Royal Ottoman Beard Sculpt, a revitalizing 24K gold collagen eye rejuvenation, acupressure neck and shoulder release, and a personalized bespoke oud fragrance spritz before departure.',
    durationMinutes: 90,
    priceAED: 680,
    category: 'packages',
    isPopular: true,
    isVIP: true,
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Full bespoke Imperial Haircut & design',
      'Architectural beard sculpt or classic wet shave',
      '24K Gold collagen eye soothing treatment',
      '15-minute upper torso acupressure release',
      'Heated botanical mask & cold jade stone roll',
      'Private bar hospitality & bespoke oud spritz'
    ]
  },
  {
    id: 'traditional-wet-shave',
    name: 'Classic English Hot Lather Wet Shave',
    tagline: 'Traditional 3-pass hot foam shave with authentic straight razor glide',
    description: 'Timeless traditional wet shaving executed with surgical precision. Three rounds of piping-hot steam towels, thick warm lather whipped from British sandalwood cream, and precise single-blade shaving followed by natural alum block antiseptic and cooling restorative balm.',
    durationMinutes: 35,
    priceAED: 240,
    category: 'beard',
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Pre-shave essential oil barrier massage',
      'Triple hot towel herbal compress',
      'Warm badger-hair brush lathering',
      'Hand-honed straight razor pass',
      'Alum crystal soothing treatment',
      'Post-shave soothing witch hazel elixir'
    ]
  },
  {
    id: 'gold-scalp-therapy',
    name: '24K Gold & Caviar Scalp Revitalization',
    tagline: 'Trichological deep detox, caviar scrub & high-frequency hair renewal',
    description: 'Designed for the discerning executive combatting urban fatigue and humidity. Microscopic scalp diagnosis, caviar bead exfoliation to eliminate buildup, followed by high-frequency micro-current stimulation, 24K gold leaf peptide serum, and tension-melting cranial massage.',
    durationMinutes: 50,
    priceAED: 450,
    category: 'therapy',
    isVIP: true,
    image: 'https://images.unsplash.com/photo-1517832606589-7929c392f566?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Microscopic follicular & scalp diagnostic scan',
      'Black caviar exfoliating scrub',
      'High-frequency microcurrent cellular therapy',
      '24K bio-gold peptide ampoule infusion',
      'Acupuncture point cranial release massage',
      'Blow-dry & lightweight mineral finishing'
    ]
  },
  {
    id: 'charcoal-facial-flaming',
    name: 'Charcoal Purifying Facial & Turkish Ear Singe',
    tagline: 'Deep pore magnetic extraction & traditional ear flaming ritual',
    description: 'An invigorating deep cleanse utilizing activated volcanic charcoal to draw out impurities, blackheads, and environmental toxins. Complemented by traditional Turkish flaming technique to gently vaporize micro ear hair with zero discomfort.',
    durationMinutes: 35,
    priceAED: 260,
    category: 'therapy',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Steam pore opening treatment',
      'Volcanic activated charcoal peel mask',
      'Sonic pore extraction',
      'Traditional Turkish alcohol flaming singe',
      'Rosewater mist and matte sebum balancer'
    ]
  },
  {
    id: 'wedding-bespoke',
    name: 'The Dubai Royal Wedding & Gala Atelier',
    tagline: 'Private VIP suite, two hours of bespoke grooming, champagne & tailoring steam',
    description: 'The ultimate preparation for weddings, galas, and keynotes in Dubai. Conducted inside our private velvet suite with complimentary artisanal refreshments, complete master styling, skin revitalization, hand manicuring, and garment steam touch-up.',
    durationMinutes: 120,
    priceAED: 1200,
    category: 'packages',
    isVIP: true,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Exclusive reservation of Private VIP Suite',
      'Master director styling & beard architecture',
      'Full facial revival & 24K gold mask',
      'Executive hand & nail detailing',
      'Single origin coffee, fresh juice & refreshments',
      'Formal suit steaming & footwear mirror shine'
    ]
  },
  {
    id: 'father-son',
    name: 'Father & Son Royal Legacy Styling',
    tagline: 'Side-by-side master appointments fostering tradition and refinement',
    description: 'Share an iconic grooming tradition across generations. Two master barbers work simultaneously in adjoining chairs, delivering age-appropriate precision haircuts, hot towels, and bespoke finishing touches in a relaxed, prestigious atmosphere.',
    durationMinutes: 60,
    priceAED: 580,
    category: 'packages',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80',
    includes: [
      'Two simultaneous master barber cuts',
      'Junior styling & hair design consultation',
      'Signature adult hot towel finish',
      'Artisanal drinks & celebratory commemorative card'
    ]
  }
];

export const MASTER_BARBERS: MasterBarber[] = [
  {
    id: 'makram',
    name: 'Makram Al-Husseini',
    title: 'Founder & Creative Director',
    experienceYears: 18,
    specialty: 'Editorial Scissors, Bone-Structure Scaffolding & Royal Bespoke',
    bio: 'Trained across Milan, Istanbul, and Mayfair London before founding Makram Salon in DIFC. Regular stylist to Gulf royalty, diplomats, and international dignitaries seeking quiet masculine elegance.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    rating: 4.99,
    reviewsCount: 480,
    languages: ['Arabic', 'English', 'Italian'],
    signatureStyle: 'Scissor-Over-Comb Taper & Architectural Beard',
    chairNumber: 1,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday']
  },
  {
    id: 'zayd',
    name: 'Zayd Montgomery',
    title: 'Senior Master Barber & Fade Architect',
    experienceYears: 12,
    specialty: 'High-Precision Skin Fades, Textured Crops & Modern Executive Styles',
    bio: 'Former senior educator at premier London grooming academies. Zayd is renowned across the UAE for flawless transitional fades and razor-sharp geometric lineups that last for weeks.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    rating: 4.97,
    reviewsCount: 390,
    languages: ['English', 'French'],
    signatureStyle: 'Low Drop Skin Fade with Textured European Top',
    chairNumber: 2,
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  },
  {
    id: 'karim',
    name: 'Karim El-Sayed',
    title: 'Master Shave & Beard Craftsman',
    experienceYears: 15,
    specialty: 'Ottoman Straight Razor, Hot Lather Geometry & Herbal Steam',
    bio: 'A third-generation master barber carrying forward century-old Levantine and Ottoman wet shave rituals, elevated with medical-grade hygiene and contemporary luxury techniques.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    rating: 4.98,
    reviewsCount: 340,
    languages: ['Arabic', 'English'],
    signatureStyle: 'Full Razor Beard Contour with Gradient Neckline',
    chairNumber: 3,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Sunday']
  },
  {
    id: 'dmitri',
    name: 'Dmitri Volkov',
    title: 'Executive Groomer & Trichology Specialist',
    experienceYears: 11,
    specialty: 'Scalp Detoxification, Hair Density Restoration & Scissor Sculpting',
    bio: 'Certified trichology specialist blending medical scalp wellness with bespoke British haircutting. Specializes in scalp revitalization therapies and high-density hair shaping.',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80',
    rating: 4.96,
    reviewsCount: 275,
    languages: ['English', 'Russian', 'German'],
    signatureStyle: 'Executive Contour Pompadour & Bio-Gold Scalp Ritual',
    chairNumber: 4,
    availableDays: ['Monday', 'Tuesday', 'Friday', 'Saturday', 'Sunday']
  }
];

export const VIP_ADDONS: VIPAddon[] = [
  {
    id: 'vip-private-suite',
    name: 'Private Velvet VIP Suite Upgrade',
    description: 'Complete privacy in our soundproof royal chamber with 65-inch screen, espresso bar & bespoke music.',
    priceAED: 200,
    category: 'suite',
    icon: 'Crown'
  },
  {
    id: 'artisanal-oud-spritz',
    name: 'Bespoke Emirati Oud Fragrance Fitting',
    description: 'Curation of three rare aged Cambodian and Taif rose oud elixirs misted to garments and pulse points.',
    priceAED: 95,
    category: 'fragrance',
    icon: 'Sparkles'
  },
  {
    id: 'italian-shoeshine',
    name: 'Handcrafted Italian Saphir Mirror Shoeshine',
    description: 'Full beeswax nourish, edge dressing, and champagne mirror shine executed while you sit in the chair.',
    priceAED: 85,
    category: 'wellness',
    icon: 'ShieldCheck'
  },
  {
    id: 'shoulder-acupressure',
    name: 'Extended 20-Min Acupressure Shoulder Release',
    description: 'Deep tissue tension liberation focusing on trapezius, cervical spine, and scapula with warm herbal oils.',
    priceAED: 140,
    category: 'wellness',
    icon: 'Activity'
  },
  {
    id: 'gold-collagen-eye',
    name: '24K Gold Collagen Eye Recovery Mask',
    description: 'Instant eye fatigue reversal reducing puffiness, dark circles, and screen strain during your service.',
    priceAED: 90,
    category: 'wellness',
    icon: 'Sun'
  }
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    name: 'Rashid Al-Nuaimi',
    role: 'Managing Director, DIFC Capital',
    location: 'Dubai, UAE',
    rating: 5,
    date: '2 days ago',
    comment: 'Without question the most refined men’s salon in the UAE. Makram’s scissor work is mathematically immaculate. The private VIP suite provides the calm and discretion every executive needs before critical meetings.',
    serviceUsed: 'The Grand Sultan VIP Experience',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-2',
    name: 'Julian Sterling',
    role: 'Tech Founder & Investor',
    location: 'London / Dubai',
    rating: 5,
    date: '1 week ago',
    comment: 'I fly between Mayfair and DIFC constantly. Zayd delivers the sharpest skin fade in the region. The hot towel and cold stone beard finish is pure mastery. Worth every single dirham.',
    serviceUsed: 'The Imperial Makram Haircut & Styling',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'rev-3',
    name: 'Tariq Benali',
    role: 'Architecture Principal',
    location: 'Downtown Dubai',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The Ottoman hot lather shave with Karim is an art form. The vintage Japanese steel blades glide effortlessly, and the complimentary espresso in the lounge sets the perfect tone.',
    serviceUsed: 'Royal Ottoman Hot Towel Beard Sculpt',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80'
  }
];

export const ATELIER_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Master Japanese Damascus Shears',
    category: 'craft',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=900&q=80',
    description: 'Forged high-carbon steel blades hand-sharpened weekly for effortless, micron-level hair cutting.',
    caption: 'Forged high-carbon steel blades hand-sharpened weekly for effortless, micron-level hair cutting.'
  },
  {
    id: 'gal-2',
    title: 'The Ottoman Hot Lather Ritual',
    category: 'ritual',
    image: 'https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=900&q=80',
    description: 'Badger bristles, organic sandalwood warm froth, and steaming herbal towels.',
    caption: 'Badger bristles, organic sandalwood warm froth, and steaming herbal towels.'
  },
  {
    id: 'gal-3',
    title: 'Custom Italian Leather Belmont Chairs',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=900&q=80',
    description: 'Bespoke hand-stitched leather barber thrones equipped with pneumatic headrests and heating.',
    caption: 'Bespoke hand-stitched leather barber thrones equipped with pneumatic headrests and heating.'
  },
  {
    id: 'gal-4',
    title: 'Architectural Beard Geometry',
    category: 'craft',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
    description: 'Sharp cheekline graduation with natural neck blend, sealed with rare botanical oils.',
    caption: 'Sharp cheekline graduation with natural neck blend, sealed with rare botanical oils.'
  },
  {
    id: 'gal-5',
    title: 'The Private VIP Velvet Suite',
    category: 'interior',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
    description: 'Complete seclusion, private sound system, dedicated concierge, and bespoke refreshment bar.',
    caption: 'Complete seclusion, private sound system, dedicated concierge, and bespoke refreshment bar.'
  },
  {
    id: 'gal-6',
    title: 'Precision Texturing & European Fade',
    category: 'ritual',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80',
    description: 'Harmonizing high-contrast skin fades with structured natural volume.',
    caption: 'Harmonizing high-contrast skin fades with structured natural volume.'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = ATELIER_GALLERY;

export const TIME_SLOTS = [
  { label: 'Morning Session', slots: ['10:00 AM', '10:45 AM', '11:30 AM'] },
  { label: 'Afternoon Session', slots: ['12:15 PM', '01:00 PM', '02:00 PM', '02:45 PM', '03:30 PM'] },
  { label: 'Evening Lounge', slots: ['04:15 PM', '05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM'] },
  { label: 'Night Atelier (VIP Hours)', slots: ['08:00 PM', '08:45 PM', '09:30 PM', '10:15 PM'] }
];
