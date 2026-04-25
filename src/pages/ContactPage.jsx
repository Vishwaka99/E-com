import { useState } from 'react';
import { Button, Input, Chip, Card } from '@heroui/react';
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });

  const handleChange = (key, val) => setForm(p => ({ ...p, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '42, Industrial Estate, Phase 2, Chennai, Tamil Nadu 600096', color: 'from-orange-600 to-red-600' },
    { icon: Phone, label: 'Phone', value: '+91 98765 43210\n+91 44 2234 5678', color: 'from-green-500 to-emerald-600' },
    { icon: Mail, label: 'Email', value: 'info@lubrimax.in\nsupport@lubrimax.in', color: 'from-blue-500 to-cyan-600' },
    { icon: Clock, label: 'Business Hours', value: 'Mon – Sat: 9:00 AM – 7:00 PM\nSunday: Closed', color: 'from-purple-500 to-violet-600' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
      {/* Header */}
      <section className="relative py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/15 via-transparent to-red-900/15" />
        <div className="relative max-w-2xl mx-auto px-4">
          <Chip size="sm" className="mb-4 bg-orange-500/10 text-orange-500 border border-orange-500/30">Get in Touch</Chip>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Contact <span className="gradient-text">LubriMax</span>
          </h1>
          <p className="text-gray-400">Have questions about our products? Our expert team is here to help you choose the right lubricant for your needs.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {contactInfo.map(({ icon: Icon, label, value, color }) => (
              <div className="p-5">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
                <div className="text-white text-sm whitespace-pre-line">{value}</div>
              </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
            <h2 className="text-white font-bold text-2xl mb-2 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-orange-500" />
              Send Us a Message
            </h2>
            <p className="text-gray-400 text-sm mb-6">We typically respond within 2–4 business hours.</p>

            {sent && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <p className="text-green-400 font-medium text-sm">Message sent! We'll get back to you shortly.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name" placeholder="Rajesh Kumar" value={form.name}
                  onValueChange={(v) => handleChange('name', v)} isRequired variant="bordered"
                  classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-orange-500/50', label: 'text-gray-400' }}
                />
                <Input
                  label="Phone Number" placeholder="+91 98765 43210" value={form.phone}
                  onValueChange={(v) => handleChange('phone', v)} variant="bordered"
                  classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-orange-500/50', label: 'text-gray-400' }}
                />
              </div>
              <Input
                label="Email Address" type="email" placeholder="rajesh@example.com" value={form.email}
                onValueChange={(v) => handleChange('email', v)} isRequired variant="bordered"
                classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-orange-500/50', label: 'text-gray-400' }}
              />
              <Input
                label="Subject" placeholder="e.g. Product inquiry, Bulk order, Technical support" value={form.subject}
                onValueChange={(v) => handleChange('subject', v)} isRequired variant="bordered"
                classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-orange-500/50', label: 'text-gray-400' }}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-gray-400 text-sm">Message <span className="text-danger">*</span></label>
                <textarea
                  placeholder="Tell us about your requirement, vehicle type, application, etc."
                  value={form.message}
                  required
                  onChange={(e) => handleChange('message', e.target.value)}
                  className="bg-white/5 border border-white/15 text-white rounded-xl px-4 py-3 focus:border-orange-500/50 focus:outline-none w-full min-h-[120px] resize-y"
                  rows={5}
                />
              </div>
              <Button
                type="submit" fullWidth size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold shadow-lg hover:scale-[1.02] transition-transform"
                endContent={<Send className="w-4 h-4" />}
                id="contact-submit-btn"
              >
                Send Message
              </Button>
            </form>
          </div>

          {/* Map & Quick Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Map placeholder */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-64 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.84916296526!2d80.00902617578125!3d13.067439047519632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526754d6e3b16d%3A0xd82b2345b9d9ff3d!2sChennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                className="w-full h-full opacity-70"
                allowFullScreen=""
                loading="lazy"
                title="LubriMax Location"
              />
              <div className="absolute inset-0 pointer-events-none border border-orange-500/20 rounded-2xl" />
            </div>

            {/* FAQ */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-white font-bold mb-4">Quick FAQ</h3>
              <div className="space-y-3">
                {[
                  { q: 'Do you deliver across India?', a: 'Yes! We deliver to 500+ cities across India in 24–48 hours.' },
                  { q: 'Are your products genuine?', a: 'Absolutely. We are an authorized distributor for all brands we sell.' },
                  { q: 'Can I place bulk orders?', a: 'Yes! Contact us for bulk pricing and wholesale discounts.' },
                ].map(({ q, a }) => (
                  <details key={q} className="group">
                    <summary className="text-gray-300 text-sm font-medium cursor-pointer hover:text-orange-500 transition-colors list-none flex items-center justify-between gap-2">
                      {q}
                      <span className="text-orange-500 text-xs group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-gray-500 text-xs mt-2 leading-relaxed pl-0">{a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/30 rounded-2xl hover:bg-green-500/20 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white text-2xl">📱</span>
              </div>
              <div>
                <div className="text-white font-bold">Chat on WhatsApp</div>
                <div className="text-green-400 text-sm">+91 98765 43210</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
