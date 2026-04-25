import { Link, useNavigate } from 'react-router-dom';
import { Button, Chip, Input } from '@heroui/react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Shield, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function CartPage() {
  const { cart, dispatch, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');

  const shippingFee = totalPrice >= 2000 ? 0 : 149;
  const discount = couponApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = totalPrice + shippingFee - discount;

  const handleApplyCoupon = () => {
    if (coupon.toUpperCase() === 'LUBRI10') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setCouponApplied(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center px-4">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-600" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
          <Button
            as={Link} to="/products"
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-10"
            endContent={<ArrowRight className="w-5 h-5" />}
            id="cart-browse-btn"
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-gray-400">{totalItems} item{totalItems > 1 ? 's' : ''} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-400/20 transition-all"
              >
                {/* Product image */}
                <Link to={`/products/${item.id}`} className="shrink-0">
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-900">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div>
                      <Chip size="sm" className="mb-1 bg-amber-400/10 text-amber-400 text-[10px]">{item.category}</Chip>
                      <Link to={`/products/${item.id}`}>
                        <h3 className="text-white font-semibold text-sm hover:text-amber-400 transition-colors line-clamp-2">{item.name}</h3>
                      </Link>
                      <p className="text-gray-500 text-xs mt-0.5">{item.brand} · {item.volume}</p>
                    </div>
                    <Button
                      isIconOnly size="sm" variant="light"
                      className="text-gray-500 hover:text-red-400 shrink-0"
                      onPress={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity */}
                    <div className="flex items-center gap-0 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      <Button
                        isIconOnly size="sm" variant="light"
                        className="text-gray-400 hover:text-amber-400 rounded-none h-8"
                        onPress={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-10 text-center text-white font-bold text-sm">{item.quantity}</span>
                      <Button
                        isIconOnly size="sm" variant="light"
                        className="text-gray-400 hover:text-amber-400 rounded-none h-8"
                        onPress={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-white font-bold">LKR {(item.price * item.quantity).toLocaleString()}</div>
                      {item.quantity > 1 && (
                        <div className="text-gray-500 text-xs">LKR {item.price.toLocaleString()} each</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2">
              <Button
                variant="light"
                as={Link} to="/products"
                className="text-amber-400 text-sm"
                startContent={<ShoppingBag className="w-4 h-4" />}
              >
                Continue Shopping
              </Button>
              <Button
                variant="light"
                className="text-red-400 text-sm"
                onPress={() => dispatch({ type: 'CLEAR_CART' })}
                startContent={<Trash2 className="w-4 h-4" />}
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            {/* Coupon */}
            {/* <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" /> Apply Coupon
              </h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={coupon}
                  onValueChange={setCoupon}
                  variant="bordered"
                  size="sm"
                  classNames={{
                    input: 'text-white text-sm uppercase',
                    inputWrapper: 'bg-white/5 border-white/10 hover:border-amber-400/50',
                  }}
                  isInvalid={!!couponError}
                  errorMessage={couponError}
                />
                <Button
                  size="sm"
                  className={`shrink-0 font-semibold ${couponApplied ? 'bg-green-500 text-white' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}
                  onPress={handleApplyCoupon}
                >
                  {couponApplied ? '✓' : 'Apply'}
                </Button>
              </div>
              {couponApplied && (
                <p className="text-green-400 text-xs mt-2">✓ LUBRI10 applied — 10% discount!</p>
              )}
              <p className="text-gray-500 text-xs mt-2">Try: <span className="text-amber-400 font-mono cursor-pointer" onClick={() => setCoupon('LUBRI10')}>LUBRI10</span> for 10% off</p>
            </div> */}

            {/* Summary */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-white font-bold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({totalItems} items)</span>
                  <span className="text-gray-200">LKR {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className={shippingFee === 0 ? 'text-green-400 font-semibold' : 'text-gray-200'}>
                    {shippingFee === 0 ? 'FREE' : `LKR ${shippingFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Coupon Discount</span>
                    <span className="text-green-400">-LKR {discount.toLocaleString()}</span>
                  </div>
                )}
                {shippingFee > 0 && (
                  <p className="text-xs text-amber-400 bg-amber-400/10 rounded-lg p-2">
                    🚚 Add LKR {(2000 - totalPrice).toLocaleString()} more for free shipping!
                  </p>
                )}
              </div>

              <hr className="border-white/10 mb-4" />

              <div className="flex justify-between text-lg font-black mb-5">
                <span className="text-white">Total</span>
                <span className="gradient-text">LKR {finalTotal.toLocaleString()}</span>
              </div>

              <Button
                fullWidth
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-transform"
                endContent={<ArrowRight className="w-5 h-5" />}
                onPress={() => navigate('/checkout')}
                id="proceed-to-checkout-btn"
              >
                Proceed to Checkout
              </Button>

              <div className="mt-4 flex items-center gap-2 justify-center text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Secure checkout with SSL encryption</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
              <div className="flex items-center gap-2 text-green-400">
                <Truck className="w-4 h-4" />
                <span className="font-semibold text-sm">Estimated Delivery: 24–48 hours</span>
              </div>
              <p className="text-gray-400 text-xs mt-1 ml-6">Order before 5 PM for next-day dispatch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
