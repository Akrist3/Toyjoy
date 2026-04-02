import { useState } from 'react';
import { motion } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import { TOYS } from './constants';
import { Toy, CartItem } from './types';
import { Filter, ChevronDown } from 'lucide-react';

import FloatingToy from './components/FloatingToy';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const addToCart = (toy: Toy) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === toy.id);
      if (existing) {
        return prev.map(item => 
          item.id === toy.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...toy, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredToys = selectedCategory === 'all' 
    ? TOYS 
    : TOYS.filter(t => t.category === selectedCategory);

  const categories = ['all', ...new Set(TOYS.map(t => t.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
      />
      
      <main className="flex-grow">
        <Hero />

        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-4xl font-bold text-slate-800 mb-2">Explore Our Toys</h2>
              <p className="text-slate-500">Find the perfect gift for every age and interest.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl font-bold text-slate-700 hover:border-orange-300 transition-colors">
                  <Filter className="w-4 h-4 text-orange-500" />
                  <span className="capitalize">{selectedCategory}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl p-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-2 rounded-xl text-sm font-bold capitalize transition-colors ${
                        selectedCategory === cat ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-orange-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            layout
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredToys.map((toy) => (
              <ProductCard 
                key={toy.id} 
                toy={toy} 
                onAddToCart={addToCart} 
              />
            ))}
          </motion.div>
        </section>

        {/* Newsletter / Call to Action */}
        <section className="bg-gradient-to-br from-blue-500 to-indigo-600 py-20 px-4 text-center text-white overflow-hidden relative">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-64 h-64 border-4 border-white/10 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-80 h-80 border-4 border-white/10 rounded-full"
          />
          
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="font-display text-4xl font-bold mb-6">Join the ToyJoy Club!</h2>
            <p className="text-blue-100 mb-10 text-lg">
              Get exclusive deals, early access to new toys, and magical surprises delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md"
              />
              <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-2xl hover:bg-blue-50 transition-colors shadow-lg active:scale-95">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-100 py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-display font-bold">T</span>
              </div>
              <span className="font-display text-xl font-bold text-slate-800">ToyJoy</span>
            </div>
            <p className="text-slate-500 max-w-sm mb-6">
              Making childhood magical since 2024. We believe in the power of play to inspire the next generation of dreamers and doers.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Returns</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li>hello@toyjoy.com</li>
              <li>1-800-TOY-JOY</li>
              <li>123 Playful Lane, Imagination City</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-50 text-center text-slate-400 text-sm">
          © 2024 ToyJoy. All rights reserved. Built with magic and code.
        </div>
      </footer>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
      <FloatingToy />
    </div>
  );
}

