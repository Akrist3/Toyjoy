import { motion } from 'motion/react';
import { ShoppingCart, Heart, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
            <span className="text-white font-display text-2xl font-bold">T</span>
          </div>
          <span className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
            ToyJoy
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <a href="#" className="hover:text-orange-500 transition-colors">Shop All</a>
          <a href="#" className="hover:text-orange-500 transition-colors">New Arrivals</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Categories</a>
          <a href="#" className="hover:text-orange-500 transition-colors">Deals</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Search className="w-5 h-5 text-slate-600" />
          </button>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
            <Heart className="w-5 h-5 text-slate-600" />
          </button>
          <button 
            onClick={onOpenCart}
            className="p-2 bg-orange-100 hover:bg-orange-200 rounded-full transition-colors relative group"
          >
            <ShoppingCart className="w-5 h-5 text-orange-600" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
