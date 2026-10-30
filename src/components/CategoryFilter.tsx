import React from 'react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  getCategoryCount: (categoryId: string) => number;
  totalPackCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
  getCategoryCount,
  totalPackCount,
}) => {
  return (
    <div className="w-full">
      {/* Horizontal scroll on mobile, wrap on tablet/desktop */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 -mx-1 sm:mx-0 sm:flex-wrap">
        {/* "Todas" Tab */}
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all select-none border focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso ${
            selectedCategoryId === null
              ? 'bg-espresso text-ivory border-espresso shadow-luxury-subtle'
              : 'bg-surface text-espresso/70 hover:text-espresso border-borderline hover:border-sand hover:bg-champagne/30'
          }`}
        >
          <span>Todas</span>
          <span
            className={`text-[10.5px] font-mono ${
              selectedCategoryId === null ? 'text-sand font-semibold' : 'text-greige'
            }`}
          >
            ({totalPackCount})
          </span>
        </button>

        {/* Category Tabs */}
        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          const count = getCategoryCount(category.id);

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all select-none border focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso ${
                isSelected
                  ? 'bg-espresso text-ivory border-espresso shadow-luxury-subtle'
                  : 'bg-surface text-espresso/70 hover:text-espresso border-borderline hover:border-sand hover:bg-champagne/30'
              }`}
            >
              <span>{category.title}</span>
              <span
                className={`text-[10.5px] font-mono ${
                  isSelected ? 'text-sand font-semibold' : 'text-greige'
                }`}
              >
                ({count})
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
