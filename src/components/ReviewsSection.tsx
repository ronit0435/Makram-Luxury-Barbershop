import React, { useState } from 'react';
import { Star, ShieldCheck, Quote, CheckCircle2 } from 'lucide-react';
import { CLIENT_REVIEWS } from '../data/barbershopData';
import { ClientReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ClientReview[]>(CLIENT_REVIEWS);
  const [newReviewOpen, setNewReviewOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [serviceUsed, setServiceUsed] = useState('The Imperial Makram Haircut');
  const [reviewContent, setReviewContent] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewContent.trim()) return;

    const newRev: ClientReview = {
      id: `rev-${Date.now()}`,
      name: authorName.trim(),
      role: authorRole.trim() || 'DIFC Resident',
      location: 'Dubai, UAE',
      serviceUsed: serviceUsed,
      rating: userRating,
      date: 'Just now',
      comment: reviewContent.trim(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setNewReviewOpen(false);
      setAuthorName('');
      setAuthorRole('');
      setReviewContent('');
    }, 2000);
  };

  return (
    <section id="reviews-section" className="py-24 bg-[#0c0e13] border-t border-[#1a1d25] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Rating Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 pb-12 border-b border-[#202430]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#c5a880] font-semibold mb-3">
              <Star className="w-3.5 h-3.5 fill-[#c5a880]" />
              <span>Client Endorsements</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-[0.1em] text-[#f4efe6] mb-3">
              The Gentleman's Verdict
            </h2>
            <p className="text-[#9ea2af] text-sm max-w-xl font-light">
              Trusted by heads of state, diplomats, DIFC partners, and discerning connoisseurs across the Emirates.
            </p>
          </div>

          {/* Rating Badge Card */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#141620] border border-[#272b38] shadow-xl">
            <div className="text-center pr-5 border-r border-[#242835]">
              <span className="font-display text-4xl sm:text-5xl font-extrabold text-[#f4efe6]">
                4.98
              </span>
              <div className="flex items-center justify-center gap-1 text-[#c5a880] mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#c5a880]" />
                ))}
              </div>
              <span className="text-[10px] text-[#8e929f] uppercase tracking-wider mt-1 block">
                1,480+ Reviews
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2 text-[#eee]">
                <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                <span className="font-semibold">100% Verified Appointments</span>
              </div>
              <div className="text-[11px] text-[#8c909e]">
                Highest-rated luxury barbershop in DIFC & Downtown Dubai
              </div>
              <button
                onClick={() => setNewReviewOpen(true)}
                className="text-[11px] font-bold text-[#c5a880] hover:text-[#e5cda7] uppercase tracking-wider pt-1 block cursor-pointer"
              >
                + Submit Client Testimonial
              </button>
            </div>
          </div>
        </div>

        {/* Submit Review Drawer */}
        {newReviewOpen && (
          <div className="mb-12 p-6 rounded-2xl bg-[#141621] border border-[#c5a880]/40 max-w-xl mx-auto shadow-2xl animate-in fade-in duration-200">
            {submittedMessage ? (
              <div className="text-center py-6 text-[#c5a880] flex items-center justify-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-bold text-sm uppercase tracking-wider">
                  Thank you. Your testimonial has been verified & published.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    Share Your Atelier Experience
                  </h3>
                  <button
                    type="button"
                    onClick={() => setNewReviewOpen(false)}
                    className="text-xs text-[#888] hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#888] uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Tariq Al-Nuaimi"
                      className="w-full p-2.5 rounded bg-[#191b26] border border-[#272b38] text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#888] uppercase mb-1">Title / Profession</label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      placeholder="e.g. Managing Director, DIFC"
                      className="w-full p-2.5 rounded bg-[#191b26] border border-[#272b38] text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#888] uppercase mb-1">Service Received</label>
                  <select
                    value={serviceUsed}
                    onChange={(e) => setServiceUsed(e.target.value)}
                    className="w-full p-2.5 rounded bg-[#191b26] border border-[#272b38] text-xs text-white"
                  >
                    <option value="The Imperial Makram Haircut">The Imperial Makram Haircut</option>
                    <option value="The Ottoman Hot-Towel Beard Ritual">The Ottoman Hot-Towel Beard Ritual</option>
                    <option value="The Grand Sultan Royal Package">The Grand Sultan Royal Package</option>
                    <option value="Caviar Scalp & Follicle Therapy">Caviar Scalp & Follicle Therapy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-[#888] uppercase mb-1">Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setUserRating(num)}
                        className={`p-1.5 rounded cursor-pointer ${
                          userRating >= num ? 'text-[#c5a880]' : 'text-[#444]'
                        }`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#888] uppercase mb-1">Testimonial</label>
                  <textarea
                    required
                    rows={3}
                    value={reviewContent}
                    onChange={(e) => setReviewContent(e.target.value)}
                    placeholder="Describe your session, craftsmanship, and ambiance..."
                    className="w-full p-2.5 rounded bg-[#191b26] border border-[#272b38] text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#c5a880] text-[#0c0d10] font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#dfcaa8]"
                >
                  Publish Testimonial
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-xl bg-[#13151d] border border-[#212532] hover:border-[#c5a880]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#c5a880]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#c5a880]" />
                    ))}
                  </div>
                  <span className="text-[10px] text-[#717583] tracking-wider">{rev.date}</span>
                </div>

                <Quote className="w-6 h-6 text-[#c5a880]/30 mb-2" />

                <p className="text-xs sm:text-sm text-[#cfccc4] leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1f222d] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-xs text-[#f5efe6]">{rev.name}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center text-[#c5a880]" title="Verified Appointment">
                        <CheckCircle2 className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#8e929f] block">{rev.role}</span>
                </div>
                <span className="text-[10px] text-[#c5a880] font-medium tracking-wide bg-[#1c1f2a] px-2 py-0.5 rounded">
                  {rev.serviceUsed.split(' ')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
