import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', phone: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050807] text-white pt-28 pb-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="text-[10px] font-mono tracking-[0.35em] text-gold-400 uppercase">
            Maison Atelier & Support
          </span>
          <h1 className="font-cinzel text-4xl sm:text-6xl text-white tracking-[0.08em]">
            LET'S TALK
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-sans font-light leading-relaxed">
            Questions regarding fragrance recommendations, order tracking, bespoke wedding sets,
            or international dispatch? Our olfactive team is at your disposal.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4">
              <h3 className="font-cinzel text-lg text-white font-semibold">
                Olfactive Customer Care
              </h3>

              <div className="space-y-4 text-xs font-sans text-neutral-300">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase font-mono">Email Us</div>
                    <a href="mailto:hello@ismaeelmuhammad.pk" className="text-white hover:text-gold-300 transition-colors">
                      hello@ismaeelmuhammad.pk
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase font-mono">WhatsApp Concierge</div>
                    <a href="https://wa.me/923008456789" className="text-white hover:text-emerald-300 transition-colors">
                      +92 300 8456789
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-gold-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase font-mono">Studio Atelier</div>
                    <div className="text-white">
                      Gulberg III, MM Alam Road vicinity<br />Lahore, Punjab, Pakistan
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-neutral-400 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-neutral-400 text-[10px] uppercase font-mono">Response Window</div>
                    <div className="text-white">
                      Monday to Saturday · 10:00 AM – 8:00 PM PKT
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gold-950/20 border border-gold-500/20 space-y-2">
              <span className="font-cinzel text-sm text-gold-200 font-semibold block">
                Complimentary Scent Advice
              </span>
              <p className="text-xs text-neutral-300 font-sans font-light">
                Not sure which fragrance fits your style? Send us a WhatsApp voice note describing your favorite scents, and Ismaeel's team will personally recommend the ideal match.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 p-8 rounded-2xl bg-black/40 border border-white/10">
            <h3 className="font-cinzel text-xl text-white font-semibold mb-6">
              Send a Private Inquiry
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <h4 className="font-cinzel text-lg text-white">Inquiry Received</h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto">
                  Thank you for reaching out. An olfactive advisor will respond to your email within 4 to 6 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-300 uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Daniyal Ahmed"
                      className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-neutral-300 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@email.com"
                      className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase mb-1">
                    WhatsApp Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="0300 0000000"
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-neutral-300 uppercase mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How may we assist your fragrance journey?"
                    className="w-full px-3.5 py-2.5 rounded bg-black/60 border border-white/15 focus:border-gold-400 focus:outline-none text-xs text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-black font-cinzel text-xs tracking-[0.25em] uppercase font-bold flex items-center justify-center space-x-2 transition-all shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
