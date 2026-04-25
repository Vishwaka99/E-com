import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Chip } from '@heroui/react';
import { MapPin, CreditCard, Smartphone, Wallet, Shield, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const STEPS = ['Address', 'Payment', 'Confirmation'];

export default function CheckoutPage() {
  const { cart, totalPrice, totalItems, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', pincode: '',
  });

  const shippingFee = totalPrice >= 2000 ? 0 : 149;
  const finalTotal = totalPrice + shippingFee;

  const handleFormChange = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handlePlaceOrder = async () => {
    try {
      const userId = localStorage.getItem('lubrimax-userId');
      await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          items: cart.items,
          shippingAddress: form,
          paymentMethod,
          totalAmount: finalTotal
        })
      });
      setPlaced(true);
      dispatch({ type: 'CLEAR_CART' });
      setTimeout(() => navigate('/orders'), 4000);
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Failed to place order. Please try again.');
    }
  };

  if (placed) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-center px-4">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Order Placed Successfully!</h2>
          <p className="text-gray-400 mb-2">Thank you for your order. Your lubricants are on their way! 🚚</p>
          <p className="text-amber-400 text-sm font-medium mb-6">Order ID: LMX{Date.now().toString().slice(-8)}</p>
          <p className="text-gray-500 text-sm">Redirecting to homepage in 4 seconds...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="light" size="sm"
            className="text-gray-400 mb-4"
            startContent={<ArrowLeft className="w-4 h-4" />}
            as={Link} to="/cart"
          >
            Back to Cart
          </Button>
          <h1 className="text-3xl font-black text-white">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-0 mb-10">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`flex items-center gap-2 ${i <= step ? 'text-amber-400' : 'text-gray-600'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                  i < step ? 'bg-amber-500 border-amber-500 text-black' :
                  i === step ? 'border-amber-400 text-amber-400' :
                  'border-gray-700 text-gray-600'
                }`}>
                  {i < step ? '✓' : i + 1}
                </div>
                <span className="text-sm font-semibold hidden sm:block">{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-amber-500' : 'bg-gray-800'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Steps */}
          <div className="lg:col-span-2">
            {/* Step 0: Address */}
            {step === 0 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-400" /> Delivery Address
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name" placeholder="Rajesh" value={form.firstName}
                    onValueChange={(v) => handleFormChange('firstName', v)}
                    isRequired variant="bordered"
                    classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                  />
                  <Input
                    label="Last Name" placeholder="Kumar" value={form.lastName}
                    onValueChange={(v) => handleFormChange('lastName', v)}
                    isRequired variant="bordered"
                    classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                  />
                  <Input
                    label="Email" type="email" placeholder="rajesh@example.com" value={form.email}
                    onValueChange={(v) => handleFormChange('email', v)}
                    isRequired variant="bordered"
                    classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                  />
                  <Input
                    label="Phone" type="tel" placeholder="+91 98765 43210" value={form.phone}
                    onValueChange={(v) => handleFormChange('phone', v)}
                    isRequired variant="bordered"
                    classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                  />
                  <Input
                    label="Address" placeholder="Street, Area, Landmark" value={form.address}
                    onValueChange={(v) => handleFormChange('address', v)}
                    isRequired variant="bordered"
                    className="sm:col-span-2"
                    classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                  />
                  <Input
                    label="City" placeholder="Chennai" value={form.city}
                    onValueChange={(v) => handleFormChange('city', v)}
                    isRequired variant="bordered"
                    classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                  />
                  <Input
                    label="PIN Code" placeholder="600001" value={form.pincode}
                    onValueChange={(v) => handleFormChange('pincode', v)}
                    isRequired variant="bordered"
                    classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                  />
                  <select
                    className="sm:col-span-2 bg-white/5 border border-white/15 text-white rounded-xl px-4 py-2 focus:border-amber-400/50 focus:outline-none"
                    value={form.state}
                    onChange={(e) => handleFormChange('state', e.target.value)}
                  >
                    <option value="" disabled className="text-gray-400">Select state</option>
                    {['Tamil Nadu', 'Maharashtra', 'Karnataka', 'Delhi', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal'].map(s => (
                      <option key={s} value={s} className="bg-[#1a1a2e] text-white">{s}</option>
                    ))}
                  </select>
                </div>

                <Button
                  fullWidth size="lg" className="mt-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold"
                  onPress={() => setStep(1)}
                  id="checkout-next-address"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-400" /> Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    { value: 'upi', icon: Smartphone, label: 'UPI Payment', sub: 'PhonePe, GPay, Paytm, BHIM' },
                    { value: 'card', icon: CreditCard, label: 'Credit / Debit Card', sub: 'Visa, Mastercard, Rupay' },
                    { value: 'netbanking', icon: Wallet, label: 'Net Banking', sub: 'All major banks supported' },
                    { value: 'cod', icon: Wallet, label: 'Cash on Delivery', sub: 'Pay when you receive' },
                  ].map(({ value, icon: Icon, label, sub }) => (
                    <div
                      key={value}
                      onClick={() => setPaymentMethod(value)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        paymentMethod === value
                          ? 'border-amber-400/50 bg-amber-400/5'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <input type="radio" value={value} checked={paymentMethod === value} readOnly className="accent-amber-400" />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${paymentMethod === value ? 'bg-amber-400/20' : 'bg-white/5'}`}>
                        <Icon className={`w-5 h-5 ${paymentMethod === value ? 'text-amber-400' : 'text-gray-500'}`} />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{label}</div>
                        <div className="text-gray-500 text-xs">{sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {paymentMethod === 'upi' && (
                  <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Input
                      label="UPI ID" placeholder="yourname@paytm" variant="bordered"
                      classNames={{ input: 'text-white', inputWrapper: 'bg-white/5 border-white/15 hover:border-amber-400/50', label: 'text-gray-400' }}
                    />
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button variant="bordered" className="border-white/20 text-gray-400" onPress={() => setStep(0)}>Back</Button>
                  <Button
                    fullWidth size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold"
                    onPress={() => setStep(2)}
                    id="checkout-next-payment"
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Confirm */}
            {step === 2 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h2 className="text-white font-bold text-xl mb-6">Order Review</h2>

                <div className="space-y-3 mb-6">
                  {cart.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-semibold">{item.name}</div>
                        <div className="text-gray-500 text-xs">Qty: {item.quantity} · {item.volume}</div>
                      </div>
                      <div className="text-amber-400 font-bold text-sm">LKR {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10 mb-6 text-sm space-y-2">
                  <div className="text-gray-400 font-semibold mb-2">Deliver to:</div>
                  <div className="text-white">{form.firstName} {form.lastName}</div>
                  <div className="text-gray-400">{form.address}, {form.city}, {form.state} — {form.pincode}</div>
                  <div className="text-gray-400">📞 {form.phone}</div>
                </div>

                <div className="flex gap-3">
                  <Button variant="bordered" className="border-white/20 text-gray-400" onPress={() => setStep(1)}>Back</Button>
                  <Button
                    fullWidth size="lg"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-xl shadow-green-500/20"
                    startContent={<CheckCircle2 className="w-5 h-5" />}
                    onPress={handlePlaceOrder}
                    id="place-order-btn"
                  >
                    Place Order · LKR {finalTotal.toLocaleString()}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right: Summary */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-bold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4 text-sm">
                {cart.items.map(item => (
                  <div key={item.id} className="flex justify-between text-gray-400">
                    <span className="truncate pr-2">{item.name} × {item.quantity}</span>
                    <span className="shrink-0">LKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <hr className="border-white/10 mb-4" />
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>LKR {totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className={shippingFee === 0 ? 'text-green-400' : ''}>{shippingFee === 0 ? 'FREE' : `LKR ${shippingFee}`}</span>
                </div>
              </div>
              <hr className="border-white/10 mb-4" />
              <div className="flex justify-between font-black text-lg">
                <span className="text-white">Total</span>
                <span className="gradient-text">LKR {finalTotal.toLocaleString()}</span>
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3 text-green-400" />
                <span>Secured with 256-bit SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
