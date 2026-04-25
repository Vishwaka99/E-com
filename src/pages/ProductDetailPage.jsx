import { Button, Chip, Tabs, Tab, Tooltip } from '@heroui/react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Star, Shield, Truck, RefreshCw, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-white mb-4">Product not found</h2>
          <Button as={Link} to="/products" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-gray-500 hover:text-orange-500 font-medium">Home</Link>
          <span className="text-gray-600">/</span>
          <Link to="/products" className="text-gray-500 hover:text-orange-500 font-medium">Products</Link>
          <span className="text-gray-600">/</span>
          <span className="text-orange-500 font-medium">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className={`absolute top-4 left-4 badge-${product.badgeType} text-white text-xs font-bold px-3 py-1.5 rounded-xl`}>
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl">
                  -{discount}% OFF
                </div>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg bg-red-600 px-6 py-2 rounded-xl">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Thumbnail row (visual only) */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className={`aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? 'border-orange-500' : 'border-white/10 hover:border-orange-500/50'}`}>
                  <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-cover opacity-80"
                    style={{ filter: `hue-rotate(${i * 20}deg)` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <Chip size="sm" className="mb-3 bg-orange-500/10 text-orange-500 border border-orange-500/30">
              {product.category}
            </Chip>

            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{product.name}</h1>
            <p className="text-gray-400 mb-4">{product.brand} · {product.volume} · Viscosity: {product.viscosity}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}`} />
                ))}
              </div>
              <span className="text-orange-500 font-bold">{product.rating}</span>
              <span className="text-gray-500 text-sm">({product.reviewCount} reviews)</span>
              <Chip size="sm" color={product.inStock ? 'success' : 'danger'} variant="flat" className="text-xs">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Chip>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-white">LKR {product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-gray-500 text-xl line-through">LKR {product.originalPrice.toLocaleString()}</span>
                )}
                {discount > 0 && (
                  <span className="text-green-400 font-bold text-sm">You save LKR {(product.originalPrice - product.price).toLocaleString()}</span>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-1">Inclusive of all taxes</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-400 text-sm font-medium">Quantity:</span>
              <div className="flex items-center gap-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden focus-within:border-orange-500 transition-colors">
                <Button
                  isIconOnly size="sm" variant="light"
                  className="text-gray-400 hover:text-orange-500 rounded-none h-10 w-10 active:bg-orange-500/10"
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center text-white font-bold text-base">{quantity}</span>
                <Button
                  isIconOnly size="sm" variant="light"
                  className="text-gray-400 hover:text-orange-500 rounded-none h-10 w-10 active:bg-orange-500/10"
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                fullWidth
                size="lg"
                isDisabled={!product.inStock}
                onPress={handleAddToCart}
                className={`font-black h-14 text-base transition-all duration-300 active:scale-95 shadow-lg ${
                  added 
                    ? 'bg-green-500 text-white btn-glow-green' 
                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:scale-[1.02] hover:shadow-orange-600/40 shimmer-btn btn-glow-amber'
                }`}
                startContent={added ? <span className="animate-bounce text-xl">✓</span> : <ShoppingCart className="w-5 h-5" />}
                id="detail-add-to-cart"
              >
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="bordered"
                isDisabled={!product.inStock}
                onPress={handleBuyNow}
                className="border-2 border-orange-600 text-orange-500 hover:bg-orange-600 hover:text-white font-black h-14 text-base transition-all duration-300 active:scale-95 hover:shadow-xl hover:shadow-orange-600/20"
                id="detail-buy-now"
              >
                Buy Now
              </Button>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-3 mb-8">
              <Button
                variant="light"
                size="sm"
                className={`text-sm ${isWishlisted ? 'text-red-400' : 'text-gray-400'}`}
                startContent={<Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />}
                onPress={() => setIsWishlisted(!isWishlisted)}
              >
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </Button>
              <Button variant="light" size="sm" className="text-gray-400 text-sm" startContent={<Share2 className="w-4 h-4" />}>
                Share
              </Button>
            </div>

            {/* Trust Icons */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
              {[
                { icon: Shield, label: 'Genuine Product', sub: 'Verified authenticity' },
                { icon: Truck, label: 'Fast Delivery', sub: '24–48 hours' },
                { icon: RefreshCw, label: 'Easy Returns', sub: '7-day policy' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="text-center">
                  <Icon className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                  <div className="text-white text-xs font-semibold">{label}</div>
                  <div className="text-gray-500 text-[10px]">{sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <Tabs
            classNames={{
              tabList: 'bg-white/5 border border-white/10 rounded-xl p-1',
              tab: 'text-gray-400 data-[selected=true]:text-white',
              cursor: 'bg-gradient-to-r from-orange-600 to-red-600',
              panel: 'pt-6'
            }}
          >
            <Tab key="overview" title="Overview">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">Description</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{product.description}</p>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="w-5 h-5 rounded-full bg-orange-500/20 text-orange-500 flex items-center justify-center text-xs">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Tab>

            <Tab key="specs" title="Specifications">
              <div className="max-w-lg">
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['Product Name', product.name],
                      ['Brand', product.brand],
                      ['Category', product.category],
                      ['Viscosity Grade', product.viscosity],
                      ['Volume', product.volume],
                      ['Oil Type', product.specs.type],
                      ['Base Oil', product.specs.baseOil],
                      ['Application', product.specs.application],
                      ['Temperature Range', product.specs.temperature],
                    ].map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? 'bg-white/5' : ''}>
                        <td className="py-3 px-4 text-gray-400 font-medium w-44 rounded-l-lg">{key}</td>
                        <td className="py-3 px-4 text-gray-200 rounded-r-lg">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Tab>

            <Tab key="reviews" title={`Reviews (${product.reviewCount})`}>
              <div className="space-y-4">
                {[
                  { name: 'Vikram P.', rating: 5, date: '2 days ago', review: 'Excellent product! My engine runs much smoother and quieter since switching to this oil.' },
                  { name: 'Sanjay M.', rating: 4, date: '1 week ago', review: 'Very good quality. The packaging is sturdy and delivery was fast. Highly recommended.' },
                  { name: 'Arjun K.', rating: 5, date: '2 weeks ago', review: 'Best engine oil I\'ve used. Notable improvement in fuel efficiency and engine response.' },
                ].map((rev, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                          {rev.name[0]}
                        </div>
                        <span className="text-white font-semibold text-sm">{rev.name}</span>
                      </div>
                      <span className="text-gray-500 text-xs">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < rev.rating ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}`} />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">{rev.review}</p>
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Related <span className="gradient-text">Products</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
