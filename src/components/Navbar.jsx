import { Link, useLocation } from 'react-router-dom';
import { Button, Badge, Tooltip } from '@heroui/react';
import { ShoppingCart, Menu, X, Droplets, Phone, Search } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchFocused(false);
    setSearchQuery('');
  }, [location]);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.querySelector('input')?.focus();
      }
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchFocused(false);
    }
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
      ? 'bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 shadow-xl shadow-black/20'
      : 'bg-transparent'
      }`}>
      {/* Search Backdrop */}
      {isSearchFocused && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[-1] animate-in fade-in duration-500" />
      )}

      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-1.5 px-4 text-center text-sm text-white font-medium">
        🚚 Free Shipping on orders above Rs 50,000 | <a href="https://wa.me/923101883116" className="underline cursor-pointer">Contact Us</a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black text-white">Lubri</span>
              <span className="text-xl font-black gradient-text">Max</span>
              <div className="text-[9px] text-gray-400 font-medium tracking-widest uppercase -mt-1">Premium Lubricants</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 animated-underline ${isActive(link.href)
                  ? 'text-orange-500 bg-orange-500/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className={`relative hidden sm:block transition-all duration-500 ease-out ${isSearchFocused ? 'w-80' : 'w-48'}`} ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative group">
                <input
                  type="text"
                  placeholder="Search products... (Ctrl+K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className={`w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white/10 transition-all duration-300 ${isSearchFocused ? 'glow-amber border-orange-500/50' : 'hover:border-white/20'}`}
                />
                <Search className={`absolute left-3.5 top-2.5 w-4 h-4 transition-colors duration-300 ${isSearchFocused ? 'text-orange-500' : 'text-gray-500 group-hover:text-gray-400'}`} />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3.5 top-2.5 text-gray-500 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Live Results Dropdown */}
              {isSearchFocused && (searchQuery.trim().length > 0 || searchResults.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-3 glass rounded-2xl overflow-hidden shadow-2xl z-[60] animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {searchResults.length > 0 ? (
                      <div className="space-y-1">
                        <div className="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Products</div>
                        {searchResults.map((product) => (
                          <Link key={product.id} to={`/product/${product.id}`} className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 group transition-colors" onClick={() => setIsSearchFocused(false)}>
                            <div className="w-10 h-10 rounded-lg bg-white/5 p-1 overflow-hidden shrink-0">
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-medium text-white truncate group-hover:text-orange-500 transition-colors">{product.name}</div>
                              <div className="text-[10px] text-gray-400">{product.brand} • {product.category}</div>
                            </div>
                            <div className="text-sm font-bold text-orange-500">LKR {product.price}</div>
                          </Link>
                        ))}
                      </div>
                    ) : searchQuery.trim().length > 0 ? (
                      <div className="py-8 text-center">
                        <div className="text-2xl mb-2">🔍</div>
                        <div className="text-sm text-gray-400">No products found for "{searchQuery}"</div>
                      </div>
                    ) : null}

                    {searchQuery.trim().length > 0 && (
                      <div className="mt-2 pt-2 border-t border-white/5">
                        <button onClick={handleSearchSubmit} className="w-full py-2 px-3 text-xs text-center text-orange-500 font-bold hover:bg-orange-500/10 rounded-lg transition-colors flex items-center justify-center gap-2">
                          View all results for "{searchQuery}" <Search className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Tooltip content={`${totalItems} items in cart`} placement="bottom">
              <Button onPress={() => navigate('/cart')} isIconOnly variant="light" className="text-gray-400 hover:text-orange-500 relative" size="sm" id="navbar-cart-btn">
                <ShoppingCart className="w-9 h-5" />
                {totalItems > 0 && <span className="cart-badge text-white text-[10px] font-bold">{totalItems}</span>}
              </Button>
            </Tooltip>

            {/* <div className="hidden md:flex">
              <Button as={Link} to="/products" size="sm" className="bg-gradient from-orange-600 to-red-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform" id="navbar-shop-btn">
                Shop Now
              </Button>
            </div> */}

            <Button isIconOnly variant="light" className="md:hidden text-gray-400" onPress={() => setIsMenuOpen(!isMenuOpen)} size="sm">
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0d0d1a]/98 backdrop-blur-xl border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
            </form>
            {/* <div className="space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className={`block px-4 py-3 rounded-xl font-medium transition-all ${isActive(link.href) ? 'text-orange-500 bg-orange-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button as={Link} to="/products" fullWidth className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold">
                  Shop Now
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
}
