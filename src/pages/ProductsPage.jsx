import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Input, Button, Chip, Slider, CheckboxGroup, Checkbox, Pagination } from '@heroui/react';
import { Search, SlidersHorizontal, X, Grid3X3, List } from 'lucide-react';
import { products, categories, brands } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const query = searchParams.get('q');
    if (query) setSearchQuery(query);
  }, [searchParams]);

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All Brands' || p.brand === selectedBrand;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.id - a.id;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE);
  const paginated = sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('All Brands');
    setPriceRange([0, 5000]);
    setSortBy('featured');
    setCurrentPage(1);
    setSearchParams({});
  };

  const hasFilters = searchQuery || selectedCategory !== 'all' || selectedBrand !== 'All Brands' || priceRange[0] > 0 || priceRange[1] < 5000;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 mb-4 text-sm">
            <Link to="/" className="text-gray-500 hover:text-orange-500 font-medium">Home</Link>
            <span className="text-gray-600">/</span>
            <span className="text-orange-500 font-medium">Products</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {selectedCategory === 'all' ? 'All Products' : selectedCategory}
          </h1>
          <p className="text-gray-400 mt-1">{filtered.length} products found</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-64 shrink-0`}>
            <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-5 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold">Filters</h3>
                {hasFilters && (
                  <Button size="sm" variant="light" className="text-orange-500 text-xs" onPress={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Category</h4>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${selectedCategory === cat.id
                        ? 'bg-orange-500/10 text-orange-500 border border-orange-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      <span>{cat.icon} {cat.name}</span>
                      <span className="text-xs opacity-60">
                        {products.filter(p => cat.id === 'all' || p.category === cat.id).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              {/* <div>
                <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Brand</h4>
                <div className="space-y-1">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => { setSelectedBrand(brand); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                        selectedBrand === brand
                          ? 'bg-orange-500/10 text-orange-500 border border-orange-500/30'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Price Range */}
              {/* <div>
                <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Price Range</h4>
                <Slider
                  minValue={0}
                  maxValue={5000}
                  step={100}
                  value={priceRange}
                  onChange={(val) => { setPriceRange(val); setCurrentPage(1); }}
                  classNames={{
                    track: 'bg-white/10',
                    filler: 'bg-gradient-to-r from-orange-600 to-red-600',
                    thumb: 'bg-orange-500 border-2 border-orange-400',
                  }}
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>LKR {priceRange[0].toLocaleString()}</span>
                  <span>LKR {priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* Availability */}
              {/* <div>
                <h4 className="text-gray-400 text-xs font-semibold uppercase tracking-widest mb-3">Availability</h4>
                <CheckboxGroup defaultValue={['inStock']}>
                  <Checkbox value="inStock" classNames={{ label: 'text-gray-300 text-sm' }}>In Stock</Checkbox>
                  <Checkbox value="outOfStock" classNames={{ label: 'text-gray-300 text-sm' }}>Out of Stock</Checkbox>
                </CheckboxGroup>
              </div> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex-1 min-w-48">
                {/* <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onValueChange={(v) => { setSearchQuery(v); setCurrentPage(1); }}
                  startContent={<Search className="w-4 h-4 text-gray-500" />}
                  endContent={searchQuery && (
                    <button onClick={() => setSearchQuery('')}>
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                  classNames={{
                    input: 'text-white text-sm',
                    inputWrapper: 'bg-white/5 border-white/10 hover:border-orange-500/50 focus-within:border-orange-500 focus-within:glow-amber transition-all duration-300'
                  }}
                  variant="bordered"
                  size="sm"
                /> */}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 text-gray-300 text-sm rounded-xl px-4 py-1.5 focus:border-orange-500/50 focus:outline-none w-40"
              >
                <option value="featured" className="bg-[#1a1a2e]">Featured</option>
                <option value="price-asc" className="bg-[#1a1a2e]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1a1a2e]">Price: High to Low</option>
                <option value="rating" className="bg-[#1a1a2e]">Best Rating</option>
                <option value="newest" className="bg-[#1a1a2e]">Newest First</option>
              </select>

              <div className="flex gap-1">
                <Button
                  isIconOnly size="sm" variant="light"
                  className={viewMode === 'grid' ? 'text-orange-500' : 'text-gray-500'}
                  onPress={() => setViewMode('grid')}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  isIconOnly size="sm" variant="light"
                  className={viewMode === 'list' ? 'text-orange-500' : 'text-gray-500'}
                  onPress={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button
                size="sm"
                variant="bordered"
                className="lg:hidden border-white/20 text-gray-400"
                startContent={<SlidersHorizontal className="w-4 h-4" />}
                onPress={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>

            {/* Active Filters */}
            {hasFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== 'all' && (
                  <Chip size="sm" onClose={() => setSelectedCategory('all')} className="bg-orange-500/10 text-orange-500 border border-orange-500/30">
                    {selectedCategory}
                  </Chip>
                )}
                {selectedBrand !== 'All Brands' && (
                  <Chip size="sm" onClose={() => setSelectedBrand('All Brands')} className="bg-orange-500/10 text-orange-500 border border-orange-500/30">
                    {selectedBrand}
                  </Chip>
                )}
                {searchQuery && (
                  <Chip size="sm" onClose={() => setSearchQuery('')} className="bg-orange-500/10 text-orange-500 border border-orange-500/30">
                    Search: {searchQuery}
                  </Chip>
                )}
              </div>
            )}

            {/* Products Grid */}
            {paginated.length > 0 ? (
              <>
                <div className={`grid gap-5 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
                  }`}>
                  {paginated.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-10">
                    <Pagination
                      total={totalPages}
                      page={currentPage}
                      onChange={setCurrentPage}
                      classNames={{
                        cursor: 'bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold',
                        item: 'bg-white/5 text-gray-400 border-white/10',
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-white text-xl font-bold mb-2">No products found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your filters or search query</p>
                <Button onPress={clearFilters} className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
