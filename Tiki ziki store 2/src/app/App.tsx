import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { Newsletter } from './components/Newsletter';
import { CartSidebar } from './components/CartSidebar';
import { FilterBar } from './components/FilterBar';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'apparel' | 'music' | 'accessories';
  sizes?: string[];
  badge?: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  quantity: number;
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('featured');

  const products: Product[] = [
    {
      id: 1,
      name: '2026 Tour T-Shirt',
      price: 35.00,
      image: 'https://images.unsplash.com/photo-1763194197001-573c8955cef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'apparel',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      badge: 'New',
    },
    {
      id: 2,
      name: 'World Tour Hoodie',
      price: 65.00,
      image: 'https://images.unsplash.com/photo-1769903592007-27276b6d1693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'apparel',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      badge: 'Best Seller',
    },
    {
      id: 3,
      name: 'Limited Edition Vinyl',
      price: 45.00,
      image: 'https://images.unsplash.com/photo-1620577610365-86c411bad78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'music',
      badge: 'Limited',
    },
    {
      id: 4,
      name: 'Tour Poster Set',
      price: 25.00,
      image: 'https://images.unsplash.com/photo-1595971294624-80bcf0d7eb24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'accessories',
    },
    {
      id: 5,
      name: 'Signature Cap',
      price: 30.00,
      image: 'https://images.unsplash.com/photo-1501962679900-bea61483313b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'accessories',
    },
    {
      id: 6,
      name: 'Band Logo Longsleeve',
      price: 42.00,
      image: 'https://images.unsplash.com/photo-1583795311768-2ef98ac78740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'apparel',
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      id: 7,
      name: 'Deluxe Album Box Set',
      price: 120.00,
      image: 'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'music',
      badge: 'New',
    },
    {
      id: 8,
      name: 'Tour Tote Bag',
      price: 22.00,
      image: 'https://images.unsplash.com/photo-1597656370793-12900b6d9a28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'accessories',
    },
    {
      id: 9,
      name: 'Vintage Band Tee',
      price: 38.00,
      image: 'https://images.unsplash.com/photo-1565035010268-a3816f98589a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'apparel',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
    },
    {
      id: 10,
      name: 'Concert Photo Book',
      price: 50.00,
      image: 'https://images.unsplash.com/photo-1569949237615-e2defbeb5d0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'accessories',
      badge: 'Limited',
    },
    {
      id: 11,
      name: 'Album CD',
      price: 15.00,
      image: 'https://images.unsplash.com/photo-1620577610365-86c411bad78d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'music',
    },
    {
      id: 12,
      name: 'Stadium Tour Crewneck',
      price: 55.00,
      image: 'https://images.unsplash.com/photo-1501962679900-bea61483313b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
      category: 'apparel',
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
    },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = activeFilter === 'all'
      ? products
      : products.filter(p => p.category === activeFilter);

    switch (activeSort) {
      case 'newest':
        return [...filtered].reverse();
      case 'price-low':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...filtered].sort((a, b) => b.price - a.price);
      default:
        return filtered;
    }
  }, [activeFilter, activeSort]);

  const handleAddToCart = (productId: number, size?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItemIndex = cartItems.findIndex(
      item => item.id === productId && item.size === size
    );

    if (existingItemIndex >= 0) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: 1,
        },
      ]);
    }

    toast.success('Added to cart!');
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(
        cartItems.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success('Removed from cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      <Header
        onCartClick={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <Hero />

      <FilterBar
        onFilterChange={setActiveFilter}
        onSortChange={setActiveSort}
        activeFilter={activeFilter}
        activeSort={activeSort}
      />

      <section className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="mb-6 uppercase tracking-wider">Limited Edition Drops</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Exclusive merchandise available only during the tour. Once they're gone, they're gone forever.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {products.filter(p => p.badge === 'Limited').map((product) => (
              <ProductCard
                key={`limited-${product.id}`}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />

      <footer className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="mb-4 uppercase tracking-wider">Shop</h3>
              <div className="space-y-3 text-sm text-background/70">
                <a href="#apparel" className="block hover:text-background transition-colors">Apparel</a>
                <a href="#music" className="block hover:text-background transition-colors">Music</a>
                <a href="#accessories" className="block hover:text-background transition-colors">Accessories</a>
                <a href="#new" className="block hover:text-background transition-colors">New Arrivals</a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 uppercase tracking-wider">Support</h3>
              <div className="space-y-3 text-sm text-background/70">
                <a href="#contact" className="block hover:text-background transition-colors">Contact Us</a>
                <a href="#shipping" className="block hover:text-background transition-colors">Shipping & Returns</a>
                <a href="#faq" className="block hover:text-background transition-colors">FAQ</a>
                <a href="#size-guide" className="block hover:text-background transition-colors">Size Guide</a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 uppercase tracking-wider">About</h3>
              <div className="space-y-3 text-sm text-background/70">
                <a href="#tour" className="block hover:text-background transition-colors">Tour Dates</a>
                <a href="#story" className="block hover:text-background transition-colors">Our Story</a>
                <a href="#press" className="block hover:text-background transition-colors">Press</a>
                <a href="#careers" className="block hover:text-background transition-colors">Careers</a>
              </div>
            </div>

            <div>
              <h3 className="mb-4 uppercase tracking-wider">Connect</h3>
              <div className="space-y-3 text-sm text-background/70">
                <a href="#instagram" className="block hover:text-background transition-colors">Instagram</a>
                <a href="#tiktok" className="block hover:text-background transition-colors">TikTok</a>
                <a href="#spotify" className="block hover:text-background transition-colors">Spotify</a>
                <a href="#youtube" className="block hover:text-background transition-colors">YouTube</a>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-background/60">
              <p>&copy; 2026 Artist Official Store. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#privacy" className="hover:text-background transition-colors">Privacy Policy</a>
                <a href="#terms" className="hover:text-background transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}