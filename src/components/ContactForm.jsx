import React, { useState } from 'react';
import { db } from '../lib/db';
import { Send, Calendar, CheckCircle2, Clock } from 'lucide-react';

const TIME_SLOTS = [
  "08:30 AM - 10:00 AM",
  "10:00 AM - 11:30 AM",
  "01:00 PM - 02:30 PM",
  "02:30 PM - 04:00 PM",
  "04:00 PM - 05:30 PM"
];

const PURPOSE_OPTIONS = [
  "Consulting",
  "Milling",
  "Tooling",
  "Other Services"
];

export default function ContactForm() {
  // Form 1: Corporate Queries
  const [queryForm, setQueryForm] = useState({
    fullName: '',
    companyEmail: '',
    companyName: '',
    purpose: 'Consulting',
    message: ''
  });
  const [querySuccess, setQuerySuccess] = useState(false);
  const [queryLoading, setQueryLoading] = useState(false);

  // Form 2: Factory Consultations
  const [bookingForm, setBookingForm] = useState({
    visitorName: '',
    targetDate: '',
    timeSlot: TIME_SLOTS[0]
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Handle Query Submit
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!queryForm.fullName || !queryForm.companyEmail || !queryForm.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setQueryLoading(true);
    try {
      await db.addQuery({
        full_name: queryForm.fullName,
        company_name: queryForm.companyName,
        company_email: queryForm.companyEmail,
        subject: `Enquiry about ${queryForm.purpose}`,
        purpose: queryForm.purpose,
        technical_message: queryForm.message
      });
      setQuerySuccess(true);
      setQueryForm({ fullName: '', companyEmail: '', companyName: '', purpose: 'Consulting', message: '' });
      setTimeout(() => setQuerySuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit query.");
    } finally {
      setQueryLoading(false);
    }
  };

  // Handle Booking Submit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!bookingForm.visitorName || !bookingForm.targetDate) {
      alert("Please fill in all required fields.");
      return;
    }
    setBookingLoading(true);
    try {
      await db.addBooking({
        visitor_name: bookingForm.visitorName,
        target_date: bookingForm.targetDate,
        time_slot: bookingForm.timeSlot
      });
      setBookingSuccess(true);
      setBookingForm({ visitorName: '', targetDate: '', timeSlot: TIME_SLOTS[0] });
      setTimeout(() => setBookingSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Failed to schedule booking.");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-dark-border bg-dark-bg">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Contact & Bookings
          </h2>
          <p className="mt-4 text-base text-slate-400">
            Submit a specialized corporate engineering query or schedule a live physical consultation at our manufacturing facility.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Form A: Corporate Queries */}
          <div className="rounded-2xl border border-dark-border bg-dark-card/30 p-8 glass hover:border-slate-800 transition-all duration-300">
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center space-x-2 border-b border-dark-border pb-4 mb-6">
              <Send className="h-5 w-5 text-brand-cyan" />
              <span>Corporate Engineering Queries</span>
            </h3>

            {querySuccess ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-emerald animate-bounce" />
                <h4 className="mt-4 text-xl font-bold text-white">Query Transmitted</h4>
                <p className="mt-2 text-sm text-slate-400 max-w-xs">
                  Your specifications have been logged in the control room database. Our engineering group will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuerySubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Full Name <span className="text-brand-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={queryForm.fullName}
                    onChange={(e) => setQueryForm({ ...queryForm, fullName: e.target.value })}
                    placeholder="e.g. Dr. Sarah Connor"
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-brand-cyan focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={queryForm.companyName}
                      onChange={(e) => setQueryForm({ ...queryForm, companyName: e.target.value })}
                      placeholder="e.g. Cyberdyne Inc"
                      className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-brand-cyan focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Company Email <span className="text-brand-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={queryForm.companyEmail}
                      onChange={(e) => setQueryForm({ ...queryForm, companyEmail: e.target.value })}
                      placeholder="e.g. secure@cyberdyne.com"
                      className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-brand-cyan focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Scope of Query
                  </label>
                  <select
                    value={queryForm.purpose}
                    onChange={(e) => setQueryForm({ ...queryForm, purpose: e.target.value })}
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white focus:border-brand-cyan focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {PURPOSE_OPTIONS.map((opt, idx) => (
                      <option key={idx} value={opt} className="bg-dark-card text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Technical Specifications / Message <span className="text-brand-cyan">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={queryForm.message}
                    onChange={(e) => setQueryForm({ ...queryForm, message: e.target.value })}
                    placeholder="Provide details of tolerance requirements, arm models, or custom design scope..."
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-brand-cyan focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={queryLoading}
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-brand-cyan px-5 py-3 text-sm font-mono font-bold uppercase tracking-wider text-dark-bg hover:bg-brand-cyan-glow transition-all duration-300 glow-cyan disabled:opacity-50"
                >
                  <span>{queryLoading ? 'Transmitting...' : 'Transmit Query'}</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Form B: Factory Consultations */}
          <div className="rounded-2xl border border-dark-border bg-dark-card/30 p-8 glass hover:border-slate-800 transition-all duration-300">
            <h3 className="text-lg font-bold text-white tracking-wide flex items-center space-x-2 border-b border-dark-border pb-4 mb-6">
              <Calendar className="h-5 w-5 text-brand-emerald" />
              <span>Schedule Factory Consultations</span>
            </h3>

            {bookingSuccess ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-emerald animate-bounce" />
                <h4 className="mt-4 text-xl font-bold text-white">Consultation Scheduled</h4>
                <p className="mt-2 text-sm text-slate-400 max-w-xs">
                  Your consultation slot has been reserved. You can verify this in the admin panel logs.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Visitor Full Name <span className="text-brand-emerald">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingForm.visitorName}
                    onChange={(e) => setBookingForm({ ...bookingForm, visitorName: e.target.value })}
                    placeholder="e.g. John Connor"
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-brand-emerald focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Target Date <span className="text-brand-emerald">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={bookingForm.targetDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, targetDate: e.target.value })}
                      className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white focus:border-brand-emerald focus:outline-none transition-colors [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center space-x-1">
                    <Clock className="h-3.5 w-3.5 text-brand-emerald" />
                    <span>Preferred Time Slot</span>
                  </label>
                  <select
                    value={bookingForm.timeSlot}
                    onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                    className="w-full rounded-lg border border-dark-border bg-dark-bg px-4 py-3 text-sm text-white focus:border-brand-emerald focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot, idx) => (
                      <option key={idx} value={slot} className="bg-dark-card text-white">
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-7">
                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full flex items-center justify-center space-x-2 rounded-lg bg-brand-emerald px-5 py-3 text-sm font-mono font-bold uppercase tracking-wider text-dark-bg hover:bg-emerald-400 transition-all duration-300 glow-emerald disabled:opacity-50"
                  >
                    <span>{bookingLoading ? 'Reserving...' : 'Book Consult Slot'}</span>
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
