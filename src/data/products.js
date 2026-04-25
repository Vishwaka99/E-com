// Product data for the e-commerce store
export const products = [
  {
    id: 1,
    name: "Servo Pride Alt 15W-40",
    brand: "Servo",
    category: "Engine Oil",
    price: 2499,
    originalPrice: 2999,
    rating: 4.8,
    reviewCount: 324,
    badge: "BESTSELLER",
    badgeType: "hot",
    image: "https://img.drz.lazcdn.com/static/lk/p/e77147ace56476da51be9a904d8f27f7.png_2200x2200q80.png_.webp",
    description: "Full synthetic engine oil engineered for high-performance vehicles. Provides superior protection against wear, deposits, and thermal breakdown.",
    features: ["Full Synthetic Formula", "Extended 10,000km Change Interval", "API SN+ Certified", "Fuel Economy Optimized"],
    viscosity: "5W-30",
    volume: "4L",
    inStock: true,
    specs: {
      type: "Full Synthetic",
      baseOil: "Group IV PAO",
      application: "Petrol & Diesel Engines",
      temperature: "-35°C to 150°C"
    }
  },
  {
    id: 2,
    name: "Servo 20W-50",
    brand: "Servo",
    category: "Engine Oil",
    price: 1899,
    originalPrice: 2200,
    rating: 4.6,
    reviewCount: 218,
    badge: "NEW",
    badgeType: "new",
    image: "https://img.drz.lazcdn.com/static/lk/p/feb00d389f4229bc4b2557f9d0268eb4.jpg_2200x2200q80.jpg_.webp",
    description: "Semi-synthetic motor oil with enhanced turbocharger protection. Ideal for older engines requiring robust protection.",
    features: ["Turbo Protection", "Anti-foam Formula", "Anti-Oxidant Additives", "Corrosion Inhibitor"],
    viscosity: "10W-40",
    volume: "1L",
    inStock: true,
    specs: {
      type: "Semi-Synthetic",
      baseOil: "Group III+",
      application: "Turbocharged Engines",
      temperature: "-25°C to 160°C"
    }
  },
  {
    id: 3,
    name: "Mobil 20W-50",
    brand: "Mobil",
    category: "Engine Oil",
    price: 1299,
    originalPrice: 1499,
    rating: 4.7,
    reviewCount: 156,
    badge: "SALE",
    badgeType: "sale",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmWcXhtyiRS9aZB7N6rr4IrmiirExzXNBAZQ&s",
    description: "Extreme pressure gear oil for manual transmissions and differentials. Provides long-lasting protection under heavy loads.",
    features: ["EP Additives", "Anti-Wear Protection", "Oxidation Stable", "All-Season Performance"],
    viscosity: "80W-90",
    volume: "1L",
    inStock: true,
    specs: {
      type: "Mineral",
      baseOil: "Group II",
      application: "Manual Gearboxes & Differentials",
      temperature: "-15°C to 140°C"
    }
  },
  {
    id: 4,
    name: "Caltex 20w-50",
    brand: "Caltex",
    category: "Engine Oil",
    price: 3299,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 89,
    badge: "TOP RATED",
    badgeType: "hot",
    image: "https://caltex.lk/wp-content/uploads/2023/07/3-1.png",
    description: "Anti-wear hydraulic fluid for industrial and mobile hydraulic systems. Exceptional contamination control and foam resistance.",
    features: ["Anti-Wear AW Additives", "High VI Formula", "Foam Suppressor", "Rust Inhibited"],
    viscosity: "ISO VG 46",
    volume: "20L",
    inStock: true,
    specs: {
      type: "Mineral",
      baseOil: "Group II",
      application: "Hydraulic Systems",
      temperature: "-10°C to 80°C"
    }
  },
  {
    id: 5,
    name: "Veedol 20w-50",
    brand: "Veedol",
    category: "Engine Oil",
    price: 449,
    originalPrice: 599,
    rating: 4.5,
    reviewCount: 402,
    badge: "POPULAR",
    badgeType: "hot",
    image: "https://veedol.lk/wp-content/uploads/2023/02/Take-Off.png",
    description: "Fast-penetrating chain lubricant in aerosol format. Cleans, lubricates, and protects chains from rust and corrosion.",
    features: ["Deep Penetration", "Anti-Rust Formula", "Water Resistant", "No Fling-Off"],
    viscosity: "N/A",
    volume: "400ml",
    inStock: true,
    specs: {
      type: "Spray Lubricant",
      baseOil: "Mineral + PTFE",
      application: "Chains, Cables, Hinges",
      temperature: "-20°C to 120°C"
    }
  },
  {
    id: 6,
    name: "Veedol 10w-30",
    brand: "Veedol",
    category: "Engine Oil",
    price: 899,
    originalPrice: 1099,
    rating: 4.6,
    reviewCount: 134,
    badge: "SALE",
    badgeType: "sale",
    image: "https://veedol.lk/wp-content/uploads/2023/02/Take-Off-4T.png",
    description: "Multipurpose NLGI 2 lithium grease for bearings, chassis, and general industrial applications. High mechanical stability.",
    features: ["NLGI Grade 2", "Lithium Thickener", "EP Additives", "Water Resistant"],
    viscosity: "NLGI 2",
    volume: "500g",
    inStock: true,
    specs: {
      type: "Grease",
      baseOil: "Mineral",
      application: "Bearings, Chassis, Joints",
      temperature: "-20°C to 130°C"
    }
  },
  {
    id: 7,
    name: "Servo Grease Mp3",
    brand: "Servo",
    category: "Grease",
    price: 1699,
    originalPrice: 1699,
    rating: 4.7,
    reviewCount: 97,
    badge: "NEW",
    badgeType: "new",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThCRn0kGGA7XrRxHbqGojoKxZqZ6Y8YI53qw&s",
    description: "Fully licensed Dexron VI automatic transmission fluid for modern GM and compatible vehicles. Smooth shifting, extended drain.",
    features: ["Dexron VI Licensed", "Low Viscosity", "Oxidation Resistant", "Seal Compatible"],
    viscosity: "Dexron VI",
    volume: "1L",
    inStock: true,
    specs: {
      type: "Full Synthetic ATF",
      baseOil: "Group IV",
      application: "Automatic Transmissions",
      temperature: "-40°C to 170°C"
    }
  },
  {
    id: 8,
    name: "Veedol Grease Mp3",
    brand: "Veedol",
    category: "Grease",
    price: 799,
    originalPrice: 999,
    rating: 4.4,
    reviewCount: 289,
    badge: "SALE",
    badgeType: "sale",
    image: "https://m.media-amazon.com/images/I/419ow+am79L._AC_UF1000,1000_QL80_.jpg",
    description: "Ethylene glycol based engine coolant concentrate with extended life organic acid technology (OAT). Protects all metals.",
    features: ["OAT Technology", "5-Year Protection", "Anti-Freeze", "Anti-Boil"],
    viscosity: "N/A",
    volume: "2L",
    inStock: true,
    specs: {
      type: "Coolant Concentrate",
      baseOil: "Ethylene Glycol",
      application: "Engine Cooling Systems",
      temperature: "-37°C to 108°C"
    }
  }
];

export const categories = [
  { id: 'all', name: 'All Products', icon: '🛢️' },
  { id: 'Engine Oil', name: 'Engine Oils', icon: '⚙️' },
  { id: 'Gear Oil', name: 'Gear Oils', icon: '🔧' },
  { id: 'Hydraulic Oil', name: 'Hydraulic Oils', icon: '💧' },
  { id: 'Chain Lubricant', name: 'Chain Lubricants', icon: '⛓️' },
  { id: 'Grease', name: 'Greases', icon: '🏭' },
  { id: 'Transmission Fluid', name: 'Transmission', icon: '🚗' },
  { id: 'Coolant', name: 'Coolants', icon: '❄️' },
];

export const brands = ['All Brands', 'LubriTech', 'OmegaLube', 'FluidPro', 'QuickLube', 'TechLube', 'ThermoGuard'];

export const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Fleet Manager",
    company: "Kumar Logistics",
    rating: 5,
    review: "LubriMax's ProMax Engine Oil has dramatically reduced our fleet maintenance costs. Our trucks run smoother and engine wear has dropped by 40%.",
    avatar: "RK"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Auto Workshop Owner",
    company: "Sharma Auto Works",
    rating: 5,
    review: "I've been recommending LubriMax products to all my customers for 3 years. The quality is consistently excellent and the pricing is very competitive.",
    avatar: "PS"
  },
  {
    id: 3,
    name: "Amit Singh",
    role: "Heavy Equipment Operator",
    company: "Singh Constructions",
    rating: 4,
    review: "HydraMax AW 46 is the best hydraulic oil I've used for my excavators. Zero issues in harsh conditions and extended service intervals.",
    avatar: "AS"
  }
];
