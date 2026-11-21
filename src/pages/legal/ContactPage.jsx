import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { useSettingsStore } from '../../store/useSettingsStore';

export const ContactPage = () => {
  const { phone, contactEmail } = useSettingsStore();
  const [form, setForm] = useState({ name: '', email: '', subject: 'Salon Appointment', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.3em] text-velora-gold font-semibold">
          Client Concierge
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl text-velora-black font-medium">
          CONNECT WITH OUR ATELIER
        </h1>
        <p className="text-xs text-velora-taupe font-light leading-relaxed">
          Our private concierge team is at your bespoke service for appointments, styling consultations, and custom order assistance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Information */}
        <div className="lg:col-span-5 space-y-8 bg-white border border-velora-sand p-8">
          <h2 className="font-editorial text-2xl text-velora-black font-medium border-b border-velora-sand pb-3">
            Private Inquiries
          </h2>

          <div className="space-y-6 text-xs text-velora-charcoal">
            <div className="flex items-start space-x-3.5">
              <Phone className="w-4 h-4 text-velora-gold flex-shrink-0 mt-0.5" />
              <div>
                <span className="uppercase tracking-wider font-semibold block text-velora-black">Telephone Concierge</span>
                <p className="text-velora-taupe mt-0.5">{phone}</p>
                <p className="text-[10px] text-velora-taupe">Mon - Sat: 09:00 - 20:00 CET</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <Mail className="w-4 h-4 text-velora-gold flex-shrink-0 mt-0.5" />
              <div>
                <span className="uppercase tracking-wider font-semibold block text-velora-black">Electronic Dispatch</span>
                <p className="text-velora-taupe mt-0.5">{contactEmail}</p>
                <p className="text-[10px] text-velora-taupe">Average response within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5">
              <MapPin className="w-4 h-4 text-velora-gold flex-shrink-0 mt-0.5" />
              <div>
                <span className="uppercase tracking-wider font-semibold block text-velora-black">Milan Atelier Headquarters</span>
                <p className="text-velora-taupe mt-0.5">Via Montenapoleone 14</p>
                <p className="text-velora-taupe">20121 Milano, Italy</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-velora-sand/20 border border-velora-sand text-xs text-velora-taupe space-y-1">
            <p className="font-semibold text-velora-black uppercase tracking-wider">Private Salon Protocol</p>
            <p className="font-light">
              Appointments must be scheduled 24 hours in advance to ensure our master tailors are dedicated exclusively to your visit.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 bg-white border border-velora-sand p-8">
          <h2 className="font-editorial text-2xl text-velora-black font-medium border-b border-velora-sand pb-3 mb-6">
            Schedule a Private Consultation
          </h2>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span className="font-semibold uppercase tracking-wider">Your Inquiry Has Been Received</span>
              </div>
              <p className="font-light">
                A personal client advisor from the House of Velora will review your requirements and reach out via encrypted communication within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Helena Vance"
                    className="w-full border border-velora-sand p-2.5 text-xs focus:outline-none focus:border-velora-gold"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="client@luxury.com"
                    className="w-full border border-velora-sand p-2.5 text-xs focus:outline-none focus:border-velora-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Consultation Topic</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full border border-velora-sand p-2.5 text-xs focus:outline-none focus:border-velora-gold"
                >
                  <option value="Salon Appointment">Reserve Private Salon Suite (Milan/Paris/NYC)</option>
                  <option value="Bespoke Tailoring">Bespoke Couture Tailoring Inquiry</option>
                  <option value="VIP Private Archive">Private Archive Access Privileges</option>
                  <option value="Order Dispatch Inquiry">Order &amp; White-Glove Tracking</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold block mb-1">Your Requirements</label>
                <textarea
                  rows="4"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Detail preferred dates, measurements, or particular garment references..."
                  className="w-full border border-velora-sand p-2.5 text-xs focus:outline-none focus:border-velora-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-velora-black hover:bg-velora-gold hover:text-black text-white text-xs uppercase tracking-[0.25em] font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Dispatch Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
