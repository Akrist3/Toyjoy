import { motion } from 'motion/react';

export default function FloatingToy() {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="fixed bottom-10 left-10 z-30 pointer-events-none hidden md:block"
    >
      <div className="bg-white p-4 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-3">
        <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center">
          <span className="text-2xl">🧸</span>
        </div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Friend!</p>
          <p className="text-sm font-bold text-slate-800">Teddy is here!</p>
        </div>
      </div>
    </motion.div>
  );
}
