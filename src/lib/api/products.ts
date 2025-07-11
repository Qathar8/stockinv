import { supabase } from '@/lib/supabase';

export async function getProducts() {
  const { data, error } = await supabase.from('products').select('*');
  if (error) throw error;
  return data;
}

export async function deleteProduct(id: string) {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

export async function addProduct(product: {
  name: string;
  sku: string;
  category: string;
  sizesAvailable: string[];
  price: number;
  description?: string;
  image?: string;
}) {
  const { error } = await supabase.from('products').insert([product]);
  if (error) throw error;
}
