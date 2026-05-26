import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { marketplaceService } from '../services/dataService';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchBar from '../components/SearchBar';

const MarketplacePage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: products, isLoading: isProductsLoading, error: productsError } = useQuery({
    queryKey: ['products', search, selectedCategory],
    queryFn: () => marketplaceService.getProducts({ 
      search, 
      category: selectedCategory === 'all' ? null : selectedCategory 
    }),
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: marketplaceService.getCategories,
  });

  if (productsError) return <div className="p-12 text-center text-red-500">Error loading products.</div>;

  return (
    <div className="py-12 max-w-7xl mx-auto px-6 bg-white text-slate-900">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Marketplace</h1>
            <p className="text-slate-500">Digital assets and tools for modern developers.</p>
          </div>
          <div className="w-full md:w-64">
            <SearchBar onSearch={setSearch} placeholder="Search products..." />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
              !selectedCategory || selectedCategory === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All
          </button>
          {categories?.results?.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </header>

      {isProductsLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <SkeletonLoader key={i} className="h-80" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.results?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {(!products?.results || products.results.length === 0) && (
            <div className="col-span-full text-center py-20 bg-slate-50 rounded-lg border border-dashed border-slate-200">
              <p className="text-slate-400 italic">No products found for this criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
