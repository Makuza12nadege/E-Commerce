import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Store } from 'lucide-react';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
            <Store size={28} />
            Ecomus Store
          </Link>
          
          <nav className="flex flex-wrap items-center gap-4 md:gap-6">
            <Link to="/" className="hover:text-blue-200 transition font-medium">
              Products
            </Link>
            
            <Link to="/cart" className="relative hover:text-blue-200 transition">
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-2 text-blue-100">
                  <User size={20} />
                  {user?.email}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-blue-700 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
