import { Link } from 'react-router-dom';
import { Button, Input, Separator } from '@heroui/react';
import { Droplets, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#06060d] border-t border-white/10">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-900/30 via-red-900/20 to-orange-900/30 border-b border-orange-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">Get Exclusive Deals & Updates</h3>
              <p className="text-gray-400 text-sm">Subscribe to our newsletter for special offers and product launches.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                variant="bordered"
                classNames={{
                  base: "md:w-80",
                  input: "text-white",
                  inputWrapper: "border-orange-600/50 hover:border-orange-500 bg-white/5"
                }}
                startContent={<Mail className="w-4 h-4 text-orange-500" />}
              />
              <Button
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold whitespace-nowrap"
                endContent={<ArrowRight className="w-4 h-4" />}
                id="newsletter-subscribe-btn"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-black text-white">Lubri</span>
                <span className="text-xl font-black gradient-text">Max</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              India's trusted destination for premium lubricants, engine oils, and industrial fluids. Quality you can trust, performance you can feel.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: 'f', href: '#', label: 'Facebook' },
                { Icon: 't', href: '#', label: 'Twitter' },
                { Icon: 'in', href: '#', label: 'Instagram' },
                { Icon: 'yt', href: '#', label: 'YouTube' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all font-bold"
                >
                  {Icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/cart', label: 'My Cart' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-gray-400 hover:text-orange-500 text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Product Categories</h4>
            <ul className="space-y-3">
              {['Engine Oils', 'Gear Oils', 'Hydraulic Oils', 'Chain Lubricants', 'Greases', 'Coolants'].map((cat) => (
                <li key={cat}>
                  <Link to="/products" className="text-gray-400 hover:text-orange-500 text-sm transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                <span>42, Industrial Estate, Phase 2,<br />Chennai, Tamil Nadu 600096</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-orange-500 transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="mailto:info@lubrimax.in" className="hover:text-orange-500 transition-colors">info@lubrimax.in</a>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <p className="text-orange-500 text-xs font-medium">Business Hours</p>
              <p className="text-gray-300 text-xs mt-1">Mon – Sat: 9:00 AM – 7:00 PM<br />Sunday: Closed</p>
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2024 LubriMax. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
