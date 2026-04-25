import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();
  const userId = localStorage.getItem('lubrimax-userId');

  const hasActiveCart = cart && cart.items && cart.items.length > 0;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`/api/orders/${userId}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (orders.length === 0 && !hasActiveCart) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Package className="w-10 h-10 text-gray-500" />
        </div>
        <h2 className="text-2xl font-black text-white mb-3">No orders yet</h2>
        <p className="text-gray-400 mb-6">Looks like you haven't placed any orders.</p>
        <Link to="/products" className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4">
          <Link to="/" className="text-gray-500 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-3xl font-black text-white">Your Orders</h1>
        </div>

        {hasActiveCart && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" /> Active Order (In Cart)
            </h2>
            <div className="bg-white/5 border border-amber-500/40 rounded-2xl overflow-hidden shadow-lg shadow-amber-500/5">
              <div className="bg-white/[0.02] border-b border-white/10 p-5 flex flex-wrap gap-4 items-center justify-between">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Status</div>
                  <div className="text-amber-400 font-bold">Pending Checkout</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Total Amount</div>
                  <div className="text-amber-400 font-bold text-lg">LKR {cart.items.reduce((s, i) => s + i.price * i.quantity, 0).toLocaleString()}</div>
                </div>
                <div>
                  <Link to="/cart" className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold rounded-xl text-sm shadow-lg hover:scale-105 transition-transform inline-block">
                    Complete Checkout
                  </Link>
                </div>
              </div>
              <div className="p-5 space-y-4">
                {cart.items.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-gray-900 border border-white/10" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-semibold truncate">{item.name}</h4>
                      <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity} × LKR {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {orders.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Past Orders</h2>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order._id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all hover:border-white/20">
                  <div className="bg-white/[0.02] border-b border-white/10 p-5 flex flex-wrap gap-4 items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Order ID</div>
                      <div className="text-white font-mono text-sm">#{order._id.slice(-8).toUpperCase()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Date Placed</div>
                      <div className="text-white text-sm">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Total Amount</div>
                      <div className="text-white font-bold">LKR {order.totalAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}>
                        {order.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {order.status}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-gray-900 border border-white/10" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white text-sm font-semibold truncate">{item.name}</h4>
                          <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity} × LKR {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
