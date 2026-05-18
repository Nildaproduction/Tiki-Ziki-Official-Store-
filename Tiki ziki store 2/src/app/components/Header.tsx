import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onCartClick: () => void;
  cartCount: number;
}

export function Header({ onCartClick, cartCount }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center gap-12">
            <button
              className="lg:hidden p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="flex flex-col">
              <span className="tracking-[0.3em] uppercase" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                Artist
              </span>
              <span className="text-muted-foreground tracking-widest uppercase" style={{ fontSize: '0.625rem' }}>
                Official Store
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <a href="#new" className="text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
                New Arrivals
              </a>
              <a href="#apparel" className="text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
                Apparel
              </a>
              <a href="#music" className="text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
                Music
              </a>
              <a href="#accessories" className="text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
                Accessories
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-2.5 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </button>
            <button className="hidden sm:flex p-2.5 hover:bg-muted rounded-lg transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button
              className="p-2.5 hover:bg-muted rounded-lg transition-colors relative"
              onClick={onCartClick}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center" style={{ fontSize: '0.75rem' }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="py-4 border-t border-border">
            <input
              type="search"
              placeholder="Search for products..."
              className="w-full px-4 py-3 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              autoFocus
            />
          </div>
        )}

        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-border space-y-4">
            <a href="#new" className="block text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
              New Arrivals
            </a>
            <a href="#apparel" className="block text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
              Apparel
            </a>
            <a href="#music" className="block text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
              Music
            </a>
            <a href="#accessories" className="block text-sm uppercase tracking-wide hover:text-muted-foreground transition-colors">
              Accessories
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
