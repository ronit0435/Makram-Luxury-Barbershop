import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, Scissors, Shield, ChevronRight } from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data/barbershopData';

interface StyleAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRecommendedService: (service: Service, note: string) => void;
}

export const StyleAdvisorModal: React.FC<StyleAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectRecommendedService
}) => {
  const [step, setStep] = useState<number>(1);
  const [faceShape, setFaceShape] = useState<string>('oval');
  const [hairTexture, setHairTexture] = useState<string>('wavy');
  const [beardStyle, setBeardStyle] = useState<string>('full-sculpted');
  const [lifestyle, setLifestyle] = useState<string>('executive');

  if (!isOpen) return null;

  const faceShapes = [
    { id: 'oval', name: 'Oval Face', desc: 'Balanced proportions, slightly narrower jawline' },
    { id: 'square', name: 'Square Face', desc: 'Sharp prominent jawline and square forehead' },
    { id: 'round', name: 'Round Face', desc: 'Equal width and length with softer cheek curves' },
    { id: 'diamond', name: 'Diamond / Angular', desc: 'High prominent cheekbones with pointed chin' },
    { id: 'oblong', name: 'Oblong / Rectangular', desc: 'Elongated face shape with uniform cheek width' }
  ];

  const hairTextures = [
    { id: 'straight', name: 'Straight / Fine', desc: 'Naturally falls flat, benefits from textured layering' },
    { id: 'wavy', name: 'Wavy / Medium', desc: 'Natural movement, responds well to scissor tapering' },
    { id: 'curly', name: 'Curly / Coarse', desc: 'High volume and density, requires perimeter control' },
    { id: 'thinning', name: 'Thinning / Receding', desc: 'Strategic high fades to maximize apparent crown density' }
  ];

  const beardPreferences = [
    { id: 'full-sculpted', name: 'Full Sculpted Beard', desc: 'Dense, razor-lined perimeter with graduation' },
    { id: 'defined-stubble', name: 'Designer Stubble (3-5 Days)', desc: 'Clean cheekbone taper and faded neckline' },
    { id: 'clean-shaven', name: 'Clean Shaven', desc: 'Baby-smooth finish with traditional hot lather razor pass' },
    { id: 'goatee-contour', name: 'Goatee / Royal Anchor', desc: 'Precise goatee with faded sideburns' }
  ];

  const lifestyles = [
    { id: 'executive', name: 'DIFC Boardroom & Executive', desc: 'Impeccable poise, quiet luxury, crisp contour lines' },
    { id: 'gala', name: 'Dubai Red Carpet & Galas', desc: 'High glamour, high-shine pomade, pristine beard geometry' },
    { id: 'creative', name: 'Modern Creative & Tech Founder', desc: 'Textured crop, European drop fade, relaxed elegance' },
    { id: 'athletic', name: 'Active & Low-Maintenance Luxe', desc: 'Effortless morning styling, high sweat resistance' }
  ];

  // Logic to synthesize the bespoke recommendation
  const getRecommendation = () => {
    if (faceShape === 'round' || faceShape === 'square') {
      const recService = SERVICES.find((s) => s.id === 'grand-sultan') || SERVICES[0];
      return {
        cutName: 'The High Taper Textured Crop & Quiff',
        cutRationale: 'Adds vertical height while tightening the lateral volume above the ears, elongating and slimming the facial silhouette.',
        beardAdvice: 'Elongated chin graduation with tight tapered cheek lines to sharpen the jaw angle.',
        service: recService,
        productTip: 'Matte clay with marine salt spray for natural root lift and all-day humidity resistance.',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
      };
    } else if (faceShape === 'oval') {
      const recService = SERVICES.find((s) => s.id === 'imperial-cut') || SERVICES[0];
      return {
        cutName: 'The Classic Scissor-Over-Comb Executive Side Part',
        cutRationale: 'Complements your balanced facial symmetry without exaggerating any singular feature. An iconic European hallmark.',
        beardAdvice: 'Natural medium-density beard shaped along the jawbone with sharp straight-razor cheekbones.',
        service: recService,
        productTip: 'Water-soluble light sheen pomade applied to damp hair with a tortoiseshell comb.',
        image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80'
      };
    } else {
      const recService = SERVICES.find((s) => s.id === 'ottoman-beard') || SERVICES[1];
      return {
        cutName: 'The European Low Drop Skin Fade & Textured Top',
        cutRationale: 'Balances the sharp cheekbones and angular jaw with soft crown texture and smooth micro-fade transitions.',
        beardAdvice: 'Full squared chin contour with smooth sideburn fade down into the beard foundation.',
        service: recService,
        productTip: 'Sandalwood conditioning beard balm and argan oil hot towel seal.',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=600&q=80'
      };
    }
  };

  const rec = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div
        id="style-advisor-modal"
        className="relative w-full max-w-2xl bg-[#12141a] border border-[#2a2e3a] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#20232c] bg-[#161821]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#c5a880]/15 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-[#f4efe6] uppercase tracking-wider">
                Bespoke Cranial & Style Advisor
              </h3>
              <p className="text-[11px] text-[#9a9ea9]">
                Tailored aesthetic analysis by Makram Salon master stylists
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#7e8290] hover:text-white hover:bg-[#20232d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress */}
        <div className="grid grid-cols-4 border-b border-[#20232c] text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center">
          <div
            className={`py-2.5 border-b-2 transition-colors ${
              step >= 1 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
            }`}
          >
            1. Face Shape
          </div>
          <div
            className={`py-2.5 border-b-2 transition-colors ${
              step >= 2 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
            }`}
          >
            2. Hair Texture
          </div>
          <div
            className={`py-2.5 border-b-2 transition-colors ${
              step >= 3 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
            }`}
          >
            3. Beard & Style
          </div>
          <div
            className={`py-2.5 border-b-2 transition-colors ${
              step >= 4 ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-[#666]'
            }`}
          >
            4. Diagnosis
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 1 && (
            <div>
              <h4 className="text-sm font-semibold text-[#f0ebe3] uppercase tracking-wider mb-1">
                Select Your Primary Facial Geometry
              </h4>
              <p className="text-xs text-[#8e929f] mb-4">
                Our master barbers design hairstyles to harmonize with natural jaw and cheekbone structure.
              </p>
              <div className="space-y-2.5">
                {faceShapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setFaceShape(shape.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      faceShape === shape.id
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-[#232733] bg-[#161820] text-[#cfccc4] hover:border-[#383d4e]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm tracking-wide">{shape.name}</div>
                      <div className="text-[11px] text-[#8a8e9b] mt-0.5">{shape.desc}</div>
                    </div>
                    {faceShape === shape.id && <Check className="w-4 h-4 text-[#c5a880]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h4 className="text-sm font-semibold text-[#f0ebe3] uppercase tracking-wider mb-1">
                Describe Your Hair Texture & Density
              </h4>
              <p className="text-xs text-[#8e929f] mb-4">
                This dictates the balance between clipper fading and Japanese scissor thinning techniques.
              </p>
              <div className="space-y-2.5">
                {hairTextures.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setHairTexture(item.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      hairTexture === item.id
                        ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                        : 'border-[#232733] bg-[#161820] text-[#cfccc4] hover:border-[#383d4e]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-xs sm:text-sm tracking-wide">{item.name}</div>
                      <div className="text-[11px] text-[#8a8e9b] mt-0.5">{item.desc}</div>
                    </div>
                    {hairTexture === item.id && <Check className="w-4 h-4 text-[#c5a880]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h4 className="text-sm font-semibold text-[#f0ebe3] uppercase tracking-wider mb-1">
                Facial Hair & Lifestyle Preference
              </h4>
              <p className="text-xs text-[#8e929f] mb-4">
                Choose your preferred beard architecture and daily professional environment.
              </p>
              
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider block mb-2">
                  Preferred Beard Profile:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {beardPreferences.map((beard) => (
                    <button
                      key={beard.id}
                      onClick={() => setBeardStyle(beard.id)}
                      className={`p-3 rounded-lg border text-left cursor-pointer text-xs transition-all ${
                        beardStyle === beard.id
                          ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                          : 'border-[#232733] bg-[#161820] text-[#b0b3bf] hover:border-[#363a48]'
                      }`}
                    >
                      <div className="font-semibold text-[11px]">{beard.name}</div>
                      <div className="text-[10px] text-[#7a7e8c] mt-0.5">{beard.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-semibold text-[#c5a880] uppercase tracking-wider block mb-2">
                  Aesthetic & Lifestyle:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lifestyles.map((life) => (
                    <button
                      key={life.id}
                      onClick={() => setLifestyle(life.id)}
                      className={`p-3 rounded-lg border text-left cursor-pointer text-xs transition-all ${
                        lifestyle === life.id
                          ? 'border-[#c5a880] bg-[#c5a880]/10 text-white'
                          : 'border-[#232733] bg-[#161820] text-[#b0b3bf] hover:border-[#363a48]'
                      }`}
                    >
                      <div className="font-semibold text-[11px]">{life.name}</div>
                      <div className="text-[10px] text-[#7a7e8c] mt-0.5">{life.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#1b1e28] to-[#14161f] border border-[#c5a880]/40 flex flex-col sm:flex-row gap-4 items-center">
                <img
                  src={rec.image}
                  alt={rec.cutName}
                  className="w-24 h-24 rounded-lg object-cover border border-[#c5a880]/30 shadow-md flex-shrink-0"
                />
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#c5a880] text-[#0c0d10] font-bold text-[10px] tracking-wider uppercase mb-1">
                    <Sparkles className="w-3 h-3" />
                    Bespoke Match
                  </div>
                  <h4 className="font-display text-base font-bold text-[#f5efe6] uppercase tracking-wide">
                    {rec.cutName}
                  </h4>
                  <p className="text-xs text-[#a9adc0] leading-relaxed mt-1">
                    {rec.cutRationale}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#151821] border border-[#232733]">
                  <span className="text-[10px] text-[#c5a880] uppercase tracking-wider font-semibold block mb-1">
                    Beard Geometry:
                  </span>
                  <p className="text-[#cfccc4] text-[11px] leading-relaxed">
                    {rec.beardAdvice}
                  </p>
                </div>
                <div className="p-3.5 rounded-lg bg-[#151821] border border-[#232733]">
                  <span className="text-[10px] text-[#c5a880] uppercase tracking-wider font-semibold block mb-1">
                    Daily Care & Regimen:
                  </span>
                  <p className="text-[#cfccc4] text-[11px] leading-relaxed">
                    {rec.productTip}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#1a1711] border border-[#c5a880]/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#c5a880] font-bold uppercase tracking-wider block">
                    Recommended Atelier Ritual:
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {rec.service.name} ({rec.service.durationMinutes} min • {rec.service.priceAED} AED)
                  </span>
                </div>
                <button
                  onClick={() => {
                    const consultationNote = `Consultation Match: ${rec.cutName} (${faceShape} face, ${hairTexture} hair)`;
                    onSelectRecommendedService(rec.service, consultationNote);
                    onClose();
                  }}
                  className="px-4 py-2 rounded bg-[#c5a880] hover:bg-[#dfcaa8] text-[#0c0d10] font-bold text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all flex items-center gap-1.5"
                >
                  <span>Book This Ritual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-[#20232c] bg-[#14161e] flex items-center justify-between">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded text-xs text-[#8e929f] hover:text-white transition-colors cursor-pointer"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2.5 rounded-md bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider hover:bg-[#dfcaa8] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Continue</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded text-xs text-[#8e929f] hover:text-white transition-colors cursor-pointer"
            >
              Recalculate
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
