import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';

const ProductCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const products = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      name: 'Premium Wool Suit',
      sku: 'GE-SUIT-001',
      category: 'Suits',
      sizesAvailable: ['M', 'L', 'XL'],
      price: 6800,
      description: 'Elegant wool suit perfect for formal occasions'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg',
      name: 'Leather Oxford Shoes',
      sku: 'GE-SHOE-002',
      category: 'Shoes',
      sizesAvailable: ['40', '41', '42', '43'],
      price: 4200,
      description: 'Handcrafted leather Oxford shoes for the discerning gentleman'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      name: 'Cotton Dress Shirt',
      sku: 'GE-SHIRT-003',
      category: 'Shirts',
      sizesAvailable: ['S', 'M', 'L', 'XL'],
      price: 1200,
      description: 'Premium cotton dress shirt with French cuffs'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      name: 'Silk Tie Collection',
      sku: 'GE-TIE-004',
      category: 'Accessories',
      sizesAvailable: ['One Size'],
      price: 1800,
      description: 'Luxurious silk ties in various patterns and colors'
    },
    {
      id: 5,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      name: 'Leather Belt',
      sku: 'GE-BELT-005',
      category: 'Accessories',
      sizesAvailable: ['30', '32', '34', '36'],
      price: 1000,
      description: 'Genuine leather belt with gold-plated buckle'
    },
    {
      id: 6,
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
      name: 'Formal Trousers',
      sku: 'GE-TROU-006',
      category: 'Trousers',
      sizesAvailable: ['30', '32', '34', '36', '38'],
      price: 2400,
      description: 'Tailored formal trousers in premium fabric'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Product Catalog</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="Suits">Suits</option>
            <option value="Shirts">Shirts</option>
            <option value="Trousers">Trousers</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <span className="text-sm text-gray-500">{product.sku}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{product.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {product.category}
                </span>
                <span className="text-lg font-bold text-green-600">
                  KES {product.price.toLocaleString()}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Available Sizes:</p>
                <div className="flex flex-wrap gap-1">
                  {product.sizesAvailable.map((size) => (
                    <span key={size} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-1">
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;