import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../utils/helpers';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-6 text-center bg-white text-slate-900">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
          <ShoppingBag className="w-8 h-8 text-slate-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/marketplace" className="btn-primary">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 bg-white text-slate-900">
      <header className="mb-12">
        <Link to="/marketplace" className="text-xs font-semibold text-blue-600 flex items-center gap-1 mb-4 hover:underline">
          <ArrowLeft size={12} /> Back to Marketplace
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Shopping Cart ({cartCount})</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-tight">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-tight text-center">Quantity</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-tight text-right">Price</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cart.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-6 py-6 font-medium text-slate-900">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                          {item.product_image ? (
                            <img src={getImageUrl(item.product_image)} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300"><ShoppingBag size={16}/></div>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{item.name}</div>
                          <div className="text-xs text-slate-400">{item.category_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded border border-slate-200 hover:bg-slate-50"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded border border-slate-200 hover:bg-slate-50"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right text-sm font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-6 py-6 text-right">
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Summary Checkout */}
        <aside className="lg:col-span-1">
          <div className="bg-white border border-slate-200 rounded-lg p-6 sticky top-24">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-tight mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="text-slate-900">Calculated at checkout</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between">
                <span className="text-base font-bold text-slate-900">Total</span>
                <span className="text-base font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full btn-primary py-3 flex items-center justify-center gap-2">
              Proceed to Checkout
            </button>
            <p className="mt-4 text-[10px] text-slate-400 text-center uppercase tracking-tight">
              Secure checkout verified by Silvora Labs
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CartPage;
