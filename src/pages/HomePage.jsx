import { Button, Chip, Card, Avatar } from '@heroui/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Truck, Award, Headphones, Star, ChevronRight, Zap, Droplets } from 'lucide-react';
import { products, testimonials, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useEffect, useRef, useState } from 'react';

// Animated counter hook
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(start);
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

function StatItem({ target, label, suffix = '+' }) {
  const [count, ref] = useCounter(target);
  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-black gradient-text mb-1">{count.toLocaleString()}{suffix}</div>
      <div className="text-gray-400 text-sm font-medium">{label}</div>
    </div>
  );
}

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter(p => p.badge === 'BESTSELLER' || p.badge === 'TOP RATED' || p.badge === 'POPULAR');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden hero-bg pt-24">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-orange-600/5 rounded-full blur-2xl" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#ff6b35 1px, transparent 1px), linear-gradient(90deg, #ff6b35 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <Chip
              className="mb-6 bg-orange-500/10 text-orange-500 border border-orange-500/30 font-medium"
              startContent={<Zap className="w-3 h-3" />}
              size="sm"
            >
              Premium Lubricants Store
            </Chip>

            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-white leading-tight mb-6">
              Power Your
              <br />
              <span className="gradient-text">Engine</span>
              <br />
              With the Best
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Premium synthetic and mineral lubricants engineered for maximum performance.
              Protect your engine, extend service life, and unlock peak performance.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button
                as={Link} to="/products"
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-8 shadow-xl shadow-orange-600/30 hover:scale-105 transition-transform"
                endContent={<ArrowRight className="w-5 h-5" />}
                id="hero-shop-btn"
              >
                Shop Now
              </Button>
              <Button
                as={Link} to="/about"
                size="lg"
                variant="bordered"
                className="border-white/20 text-white hover:border-orange-500/60 hover:text-orange-500"
              >
                Learn More
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, text: 'Genuine Products' },
                { icon: Truck, text: 'Fast Delivery' },
                { icon: Award, text: 'ISO Certified' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-gray-400 text-sm">
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Hero visual */}
          <div className="relative flex justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Glow rings */}
              <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 rounded-full border border-red-500/15 animate-ping" style={{ animationDuration: '4s' }} />

              {/* Central image */}
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-orange-900/40 to-red-900/20 border border-orange-500/30 flex items-center justify-center float-animation overflow-hidden">
                <img
                  src="https://img.drz.lazcdn.com/static/lk/p/817f923663f1ef74e17cb9e0973b8294.jpg_720x720q80.jpg"
                  alt="Premium Engine Oil"
                  className="w-full h-full object-cover rounded-full opacity-80"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -left-16 top-16 glass rounded-2xl p-3 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Droplets className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">20w-50</div>
                    <div className="text-gray-400 text-[10px]">Full Synthetic</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-12 bottom-20 glass rounded-2xl p-3 shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <div>
                    <div className="text-white text-xs font-bold">4.9 Rating</div>
                    <div className="text-gray-400 text-[10px]">10K+ Reviews</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 right-8 glass rounded-xl p-2.5 shadow-xl">
                <div className="text-white text-xs font-bold">🏆 Bestseller</div>
                <div className="text-orange-500 text-[10px]">Servo 20w-50</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-0.5 h-8 bg-gradient-to-b from-orange-500 to-transparent rounded-full" />
          <div className="text-gray-500 text-xs">Scroll down</div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0d0d1a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem target={50000} label="Happy Customers" />
            <StatItem target={100} label="Product Variants" />
            <StatItem target={15} label="Years Experience" />
            <StatItem target={500} label="Cities Served" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 section-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Chip size="sm" className="mb-4 bg-orange-500/10 text-orange-500 border border-orange-500/30">Browse By Category</Chip>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Shop by <span className="gradient-text">Product Type</span></h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.filter(c => c.id !== 'all').map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all duration-300 text-center hover:-translate-y-1"
              >
                <div className="text-3xl mb-3 group-hover:scale-125 transition-transform duration-300">{cat.icon}</div>
                <div className="text-white font-semibold text-sm">{cat.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <Chip size="sm" className="mb-4 bg-orange-500/10 text-orange-500 border border-orange-500/30">Featured</Chip>
              <h2 className="text-3xl sm:text-4xl font-black text-white">Top <span className="gradient-text">Products</span></h2>
            </div>
            <Button
              as={Link} to="/products"
              variant="light"
              className="text-orange-500 hover:text-orange-400"
              endContent={<ChevronRight className="w-4 h-4" />}
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-red-900/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Chip size="sm" className="mb-4 bg-orange-500/10 text-orange-500 border border-orange-500/30">Why LubriMax</Chip>
            <h2 className="text-3xl sm:text-4xl font-black text-white">The <span className="gradient-text">LubriMax</span> Advantage</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: '100% Genuine', desc: 'All products are sourced directly from authorized manufacturers with full certification.', color: 'from-blue-500 to-cyan-600' },
              { icon: Truck, title: 'Express Delivery', desc: 'Get your orders delivered within 24–48 hours with real-time tracking support.', color: 'from-green-500 to-emerald-600' },
              { icon: Award, title: 'Premium Quality', desc: 'Only ISO and API certified lubricants that meet the highest international standards.', color: 'from-orange-600 to-red-600' },
              { icon: Headphones, title: '24/7 Support', desc: 'Expert technical assistance available around the clock for all your lubrication queries.', color: 'from-purple-500 to-violet-600' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:-translate-y-2 rounded-2xl">
                <div className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bestsellers Banner */}
      {/* <section className="py-20 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative rounded-3xl overflow-hidden h-72">
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop"
                alt="Industrial Lubricants"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-8">
                <div>
                  <Chip size="sm" className="mb-3 bg-orange-500 text-white">Up to 30% OFF</Chip>
                  <h3 className="text-white text-2xl font-black mb-2">Industrial Lubricants</h3>
                  <p className="text-gray-300 text-sm mb-4">For heavy machinery & manufacturing</p>
                  <Button as={Link} to="/products?category=Hydraulic Oil" size="sm" className="bg-white text-black font-bold">
                    Shop Industrial
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden h-72">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop"
                alt="Engine Oils"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-8">
                <div>
                  <Chip size="sm" className="mb-3 bg-amber-500 text-white">New Arrivals</Chip>
                  <h3 className="text-white text-2xl font-black mb-2">Synthetic Engine Oils</h3>
                  <p className="text-gray-300 text-sm mb-4">Full synthetic for peak performance</p>
                  <Button as={Link} to="/products?category=Engine Oil" size="sm" className="bg-white text-black font-bold">
                    Shop Engine Oils
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonials */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Chip size="sm" className="mb-4 bg-orange-500/10 text-orange-500 border border-orange-500/30">Testimonials</Chip>
            <h2 className="text-3xl sm:text-4xl font-black text-white">What Our <span className="gradient-text">Customers Say</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white/5 border border-white/10 hover:border-orange-500/30 transition-all rounded-2xl">
                <div className="p-6">
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.review}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={t.avatar}
                      className="bg-gradient-to-br from-orange-600 to-red-600 text-white font-bold text-sm"
                      size="sm"
                    />
                    <div>
                      <div className="text-white font-semibold text-sm">{t.name}</div>
                      <div className="text-gray-500 text-xs">{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/30 via-red-900/20 to-orange-900/30" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZjZiMzUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDB2Nmg2di02aC02em0tNiAwdjZoNnYtNmgtNnptMTggMHY2aDZ2LTZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ready to <span className="gradient-text">Upgrade</span> Your Lubrication?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Explore our complete range of premium lubricants. Free shipping above RS 50000. Genuine products. Expert support.
          </p>
          <Button
            as={Link} to="/products"
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-10 shadow-2xl shadow-orange-600/30 hover:scale-105 transition-transform"
            endContent={<ArrowRight className="w-5 h-5" />}
            id="cta-shop-btn"
          >
            Explore All Products
          </Button>
        </div>
      </section>
    </div>
  );
}
