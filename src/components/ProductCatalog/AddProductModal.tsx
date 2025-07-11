import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Props {
  onClose: () => void;
  onProductAdded: () => void;
}

const AddProductModal: React.FC<Props> = ({ onClose, onProductAdded }) => {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    category: '',
    sizes_available: '',
    price: '',
    description: '',
    image_url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, sku, category, sizes_available, price, description, image_url } = form;

    const { error } = await supabase.from('products').insert([
      {
        name,
        sku,
        category,
        sizes_available: sizes_available.split(',').map(s => s.trim()),
        price: Number(price),
        description,
        image_url,
      },
    ]);

    if (!error) {
      onProductAdded();
      onClose();
    } else {
      alert('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Product Name" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="sku" placeholder="SKU" onChange={handleChange} required className="w-full border p-2 rounded" />
          <select name="category" onChange={handleChange} required className="w-full border p-2 rounded">
            <option value="">Select Category</option>
            <option value="Suits">Suits</option>
            <option value="Shirts">Shirts</option>
            <option value="Trousers">Trousers</option>
            <option value="Shoes">Shoes</option>
            <option value="Accessories">Accessories</option>
          </select>
          <input name="sizes_available" placeholder="Sizes (comma-separated)" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="price" type="number" placeholder="Price (KES)" onChange={handleChange} required className="w-full border p-2 rounded" />
          <textarea name="description" placeholder="Description" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input name="image_url" placeholder="Image URL" onChange={handleChange} className="w-full border p-2 rounded" />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
