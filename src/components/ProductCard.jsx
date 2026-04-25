import { Link } from 'react-router-dom';
import { Button, Chip, Tooltip } from '@heroui/react';
import { ShoppingCart, Eye, Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? 'fill-orange-500 text-orange-500' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const badgeColors = {
    hot: 'from-orange-600 to-red-700',
    new: 'from-blue-500 to-cyan-600',
    sale: 'from-red-600 to-pink-600',
  };

  return (
    <div className="product-card-hover group relative bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
      {/* Product Image */}
      <Link to={`/products/${product.id}`} className="block relative aspect-square overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-3 left-3 bg-gradient-to-r ${badgeColors[product.badgeType] || badgeColors.hot} text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider shadow-lg`}>
            {product.badge}
          </div>
        )}

        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-lg">Out of Stock</span>
          </div>
        )}

        {/* Hover actions */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <Tooltip content="Quick view">
            <Button
              as={Link}
              to={`/products/${product.id}`}
              isIconOnly
              size="sm"
              className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-orange-600"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </Tooltip>
          <Tooltip content={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}>
            <Button
              isIconOnly
              size="sm"
              className={`backdrop-blur-sm border ${isWishlisted ? 'bg-red-500/80 border-red-400 text-white' : 'bg-white/20 border-white/30 text-white'} hover:bg-red-500`}
              onPress={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </Button>
          </Tooltip>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category chip */}
        <Chip size="sm" variant="flat" className="mb-2 bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px]">
          {product.category}
        </Chip>

        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-white text-sm mb-0.5 line-clamp-2 hover:text-orange-500 transition-colors leading-tight">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-xs mb-2">{product.brand} · {product.volume}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-orange-500 text-xs font-semibold">{product.rating}</span>
          <span className="text-gray-500 text-xs">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-white">LKR {product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-gray-500 text-sm line-through">LKR {product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          fullWidth
          onPress={handleAddToCart}
          isDisabled={!product.inStock}
          className={`font-bold text-sm h-11 transition-all duration-300 active:scale-95 ${
            addedToCart
              ? 'bg-green-500 text-white btn-glow-green'
              : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-600/30 shimmer-btn btn-glow-amber'
          }`}
          startContent={addedToCart ? <span className="animate-bounce">✓</span> : <ShoppingCart className="w-4 h-4" />}
          id={`add-to-cart-${product.id}`}
        >
          {addedToCart ? 'Added!' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}
