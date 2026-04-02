import { motion } from 'motion/react';
import { Star, ShoppingCart, Plus } from 'lucide-react';
import { Toy } from '../types';
import { cn } from '../lib/utils';

interface ProductCardProps {
  key?: string;
  toy: Toy;
  onAddToCart: (toy: Toy) => void;
}

export default function ProductCard({ toy, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden toy-card-shadow border border-slate-100 flex flex-col h-full"
    >
      <div className={cn("relative aspect-square overflow-hidden", toy.color)}>
        <motion.img
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
          src={toy.image}
          alt={toy.name}
          className="w-full h-full object-cover mix-blend-multiply opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span className="text-xs font-bold text-slate-700">{toy.rating}</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1 block">
            {toy.category}
          </span>
          <h3 className="font-display text-lg font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">
            {toy.name}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 mb-4">
            {toy.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <span className="text-xl font-bold text-slate-900">${toy.price}</span>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart(toy)}
            className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-2xl shadow-lg shadow-orange-200 transition-colors flex items-center justify-center"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
