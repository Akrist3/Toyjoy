import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

export default function CartDrawer({ isOpen, onClose, items, onUpdateQuantity, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="font-display text-xl font-bold text-slate-800">Your Cart</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-slate-200" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-400">Your cart is empty</p>
                    <p className="text-sm text-slate-300">Time to find some magic!</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    key={item.id} 
                    className="flex gap-4 group"
                  >
                    <div className={`w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 ${item.color}`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-400 mb-3">${item.price}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center bg-slate-50 rounded-lg p-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Minus className="w-3 h-3 text-slate-600" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-slate-700">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus className="w-3 h-3 text-slate-600" />
                          </button>
                        </div>
                        <span className="text-sm font-bold text-slate-800 ml-auto">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
              <div className="flex justify-between mb-4">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
              </div>
              <button 
                disabled={items.length === 0}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95"
              >
                Checkout Now
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest font-bold">
                Free shipping on orders over $100
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
