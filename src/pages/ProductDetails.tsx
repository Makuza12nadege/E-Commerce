import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Perfect for travel and work.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor and GPS. Track your workouts and stay connected.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    description: 'Durable water-resistant backpack with multiple compartments. Fits up to 15.6" laptops.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches. Great for gaming and typing.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
  },
  {
    id: 5,
    name: 'Coffee Maker',
    description: 'Automatic drip coffee maker with programmable timer. Wake up to fresh coffee every day.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
  },
  {
    id: 6,
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with extra thickness for comfort. Perfect for all yoga styles.',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop',
  },
];

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const mockProduct = MOCK_PRODUCTS.find(p => p.id === Number(id));
    if (mockProduct) {
      setProduct(mockProduct);
    } else {
      setError('Product not found');
    }
  }, [id]);



  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600 text-xl">{error}</p>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-blue-600 hover:underline"
        >
          <ArrowLeft size={20} />
          Back to products
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium"
      >
        <ArrowLeft size={20} />
        Back to products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-400 bg-gray-50">
              No image available
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <div className="text-4xl font-extrabold text-blue-700">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-3 text-xl font-bold shadow-lg hover:shadow-xl"
          >
            <ShoppingCart size={28} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
