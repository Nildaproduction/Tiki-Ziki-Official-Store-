import { motion } from 'motion/react';

export function Hero() {
  return (
    <div className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden">
      <motion.img
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src="https://images.unsplash.com/photo-1565035010268-a3816f98589a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
        alt="Live Performance"
        className="absolute inset-0 w-full h-full object-cover opacity-75"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-sm uppercase tracking-[0.3em] mb-6 text-white/80">
            Official Merchandise
          </p>
          <h1 className="mb-6 tracking-tight leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 700 }}>
            2026 WORLD TOUR
          </h1>
          <p className="mb-10 text-white/90 max-w-2xl mx-auto" style={{ fontSize: '1.125rem', lineHeight: 1.6 }}>
            Exclusive collection featuring limited edition apparel, vinyl records, and collectibles
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-10 py-4 bg-white text-black uppercase tracking-wide hover:bg-white/90 transition-all hover:scale-105">
              Shop Collection
            </button>
            <button className="px-10 py-4 bg-transparent border-2 border-white text-white uppercase tracking-wide hover:bg-white/10 transition-all">
              Tour Dates
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm uppercase tracking-widest">
        Scroll to explore
      </div>
    </div>
  );
}
