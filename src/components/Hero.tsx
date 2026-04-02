import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-32 px-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl -z-10 animate-pulse delay-700" />
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>New Collection is Here!</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-slate-900 leading-tight mb-6">
            Where Every <span className="text-orange-500">Toy</span> Tells a <span className="text-pink-500">Story</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg">
            Discover a world of imagination with our curated collection of toys designed to inspire, educate, and bring endless joy to your little ones.
          </p>
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-orange-200 flex items-center gap-2 transition-colors"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white hover:bg-slate-50 text-slate-700 px-8 py-4 rounded-2xl font-bold shadow-lg border border-slate-100 transition-colors"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: 'spring' }}
          className="relative"
        >
          <div className="relative z-10 bg-gradient-to-br from-orange-400 to-pink-500 p-2 rounded-[3rem] shadow-2xl overflow-hidden">
            <img 
              src="https://picsum.photos/seed/toyhero/800/800" 
              alt="Hero Toy" 
              className="w-full h-full object-cover rounded-[2.5rem]"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Floating elements */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 rounded-3xl shadow-xl flex items-center justify-center transform rotate-12 z-20"
          >
            <Sparkles className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400 rounded-full shadow-xl flex items-center justify-center z-20"
          >
            <div className="text-white font-display font-bold text-xl">SALE!</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
