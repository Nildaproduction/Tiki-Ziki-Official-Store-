import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  sizes?: string[];
  badge?: string;
  onAddToCart: (id: number, size?: string) => void;
}

export function ProductCard({ id, name, price, image, category, sizes, badge, onAddToCart }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(sizes?.[0]);

  const handleAddToCart = () => {
    onAddToCart(id, selectedSize);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted mb-4 rounded-sm">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {badge && (
          <div className="absolute top-4 left-4 bg-destructive text-destructive-foreground px-3 py-1.5 text-xs uppercase tracking-widest">
            {badge}
          </div>
        )}

        <button
          className="absolute top-4 right-4 p-2.5 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-all shadow-lg"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              isFavorite ? 'fill-destructive stroke-destructive scale-110' : 'stroke-foreground'
            }`}
          />
        </button>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-4 left-4 right-4 space-y-3"
            >
              {sizes && sizes.length > 0 && (
                <div className="flex gap-2 justify-center">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-2 text-sm uppercase tracking-wide transition-all ${
                        selectedSize === size
                          ? 'bg-background text-foreground'
                          : 'bg-background/70 text-foreground/70 hover:bg-background/90'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground py-3.5 uppercase tracking-wide hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <ShoppingBag className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                Add to Cart
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{category}</p>
        <h3 className="font-medium leading-tight">{name}</h3>
        <p className="font-medium">${price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
}
