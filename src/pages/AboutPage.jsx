import { Chip, Card } from '@heroui/react';
import { Award, Users, Leaf, Factory, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  const team = [
    { name: 'Arjun Patel', role: 'Founder & CEO', initials: 'AP', color: 'from-orange-600 to-red-600' },
    { name: 'Meera Nair', role: 'Head of Product', initials: 'MN', color: 'from-blue-500 to-cyan-600' },
    { name: 'Suresh Rao', role: 'Chief Engineer', initials: 'SR', color: 'from-green-500 to-emerald-600' },
    { name: 'Kavya Singh', role: 'Customer Success', initials: 'KS', color: 'from-purple-500 to-violet-600' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-transparent to-red-900/20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Chip size="sm" className="mb-6 bg-orange-500/10 text-orange-500 border border-orange-500/30">Our Story</Chip>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-6">
            Powering India's <span className="gradient-text">Machines</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Founded in 2009, LubriMax has grown from a small workshop supplier to India's most trusted online destination
            for premium lubricants and industrial fluids. We believe every machine deserves the best protection.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Our Mission', color: 'from-orange-600 to-red-600', text: 'To make premium-grade lubricants accessible to every workshop, fleet, and industrial facility across India with guaranteed authenticity and expert support.' },
              { icon: Heart, title: 'Our Vision', color: 'from-blue-500 to-cyan-600', text: 'To be the #1 trusted lubrication brand in South Asia, known for innovation, quality, and exceptional customer service.' },
              { icon: Leaf, title: 'Our Values', color: 'from-green-500 to-emerald-600', text: 'Quality, Integrity, Sustainability. We stock only certified products, operate transparently, and are committed to eco-friendly packaging and practices.' },
            ].map(({ icon: Icon, title, color, text }) => (
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0d0d1a] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '15+', label: 'Years in Business' },
              { value: '50,000+', label: 'Happy Customers' },
              { value: '100+', label: 'Product Variants' },
              { value: '500+', label: 'Cities Covered' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-black gradient-text mb-2">{value}</div>
                <div className="text-gray-400 text-sm font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Brands */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">Authorized <span className="gradient-text">Brands</span></h2>
            <p className="text-gray-400 mt-2">We are authorized distributors for all leading lubricant brands</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Servo', logo: 'https://logowiki.net/wp-content/uploads/imgp/Servo-Logo-1-6780.jpg' },
              { name: 'Veedol', logo: 'https://iconape.com/wp-content/files/oh/161801/svg/161801.svg' },
              { name: 'Mobil', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Mobil_logo.svg/3840px-Mobil_logo.svg.png' },
              { name: 'Shell', logo: 'https://logos-world.net/wp-content/uploads/2020/11/Shell-Logo.png' },
              { name: 'Castrol', logo: 'https://static.vecteezy.com/system/resources/previews/014/414/709/non_2x/castrol-logo-on-transparent-background-free-vector.jpg' },
              { name: 'Valvoline', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdVyDcYHZcAA4zuLr7gGh-4_Xg6b7H-Gvq-w&s' },
            ].map((brand) => (
              <div key={brand.name} className="group flex flex-col items-center justify-center gap-4 transition-all duration-300">
                <div className="w-full aspect-[3/2] flex items-center justify-center  group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-[120px] max-h-[60px] object-contain filter brightness-100 hover:brightness-100 transition-all"
                  />
                </div>
                <div className="text-gray-500 group-hover:text-orange-500 font-bold text-[9px] tracking-widest uppercase transition-colors opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-16 bg-[#0d0d1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white">Meet the <span className="gradient-text">Team</span></h2>
            <p className="text-gray-400 mt-2">The passionate people behind LubriMax</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(({ name, role, initials, color }) => (
              <div key={name} className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500/30 transition-all hover:-translate-y-1 group">
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-2xl font-black mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {initials}
                </div>
                <div className="text-white font-bold">{name}</div>
                <div className="text-gray-400 text-sm mt-1">{role}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Certifications */}
      {/* <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">Our <span className="gradient-text">Certifications</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'ISO 9001:2015', sub: 'Quality Management' },
              { icon: Factory, title: 'API Certified', sub: 'Performance Standards' },
              { icon: Leaf, title: 'GreenOil Certified', sub: 'Eco-Friendly Products' },
              { icon: Users, title: 'BIS Approved', sub: 'Bureau of Indian Standards' },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="p-5 text-center bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500/30 transition-all">
                <Award className="w-10 h-10 text-orange-500 mx-auto mb-3" />
                <div className="text-white font-bold">{title}</div>
                <div className="text-gray-400 text-xs mt-1">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}
