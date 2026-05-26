import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../utils/helpers';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <div className="group bg-white border border-slate-200 rounded-lg flex flex-col h-full hover:border-slate-300 transition-colors">
      <div className="aspect-square bg-slate-50 overflow-hidden border-b border-slate-100">
        {product.product_image ? (
          <img 
            src={getImageUrl(product.product_image)} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            Preview
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow">
        <div className="mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {product.category_name || 'Asset'}
        </div>
        <h3 className="text-sm font-semibold text-slate-900 mb-1">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-blue-600 mb-4">
          ${product.price}
        </p>
      </div>

      <div className="p-4 pt-0 mt-auto">
        <button 
          onClick={handleAdd}
          className={`w-full py-2 rounded text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
            isAdded ? 'bg-green-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {isAdded ? <Check size={14} /> : <ShoppingCart size={14} />}
          {isAdded ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
