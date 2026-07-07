import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingCart className="mx-auto text-gray-300 mb-6" size={100} />
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          <ArrowLeft size={20} />
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl shadow-md p-6 flex gap-6 items-center"
            >
              <Link to={`/product/${item.product.id}`}>
                <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
              </Link>

              <div className="flex-1">
                <Link
                  to={`/product/${item.product.id}`}
                  className="text-xl font-bold text-gray-800 hover:text-blue-600 transition"
                >
                  {item.product.name}
                </Link>
                <p className="text-2xl font-bold text-blue-700 mt-2">
                  ${item.product.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-6 mt-4 flex-wrap">
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-6 py-2 font-bold text-lg">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 flex items-center gap-2 font-medium"
                  >
                    <Trash2 size={20} />
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-extrabold text-gray-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-600 text-lg">
                <span>Subtotal</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="border-t-2 pt-4 flex justify-between text-2xl font-extrabold text-gray-900">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-bold text-lg shadow-lg hover:shadow-xl mb-4">
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl hover:bg-gray-50 transition font-medium"
            >
              Clear Cart
            </button>

            <Link
              to="/"
              className="block text-center mt-6 text-blue-600 hover:text-blue-800 font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
