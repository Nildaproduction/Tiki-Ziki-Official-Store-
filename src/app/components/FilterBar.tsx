import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onSortChange: (sort: string) => void;
  activeFilter: string;
  activeSort: string;
}

export function FilterBar({ onFilterChange, onSortChange, activeFilter, activeSort }: FilterBarProps) {
  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'music', label: 'Music' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const sortOptions = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
  ];

  return (
    <div className="border-y border-border bg-background sticky top-20 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => onFilterChange(filter.id)}
                  className={`px-4 py-2 text-sm uppercase tracking-wide whitespace-nowrap transition-all ${
                    activeFilter === filter.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/70'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm text-muted-foreground whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort"
              value={activeSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 bg-muted border-0 text-sm uppercase tracking-wide focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
