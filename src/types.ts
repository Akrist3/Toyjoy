export interface Toy {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'educational' | 'action' | 'plush' | 'creative';
  image: string;
  rating: number;
  color: string;
}

export interface CartItem extends Toy {
  quantity: number;
}
