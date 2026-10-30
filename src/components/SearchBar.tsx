import React, { useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  resultCount?: number;
  isSearching: boolean;
}

const QUICK_TAGS = [
  'Preço',
  'Botox',
  'Reagendar',
  'Faltou',
  'Bioestimulador',
  'Retorno 15 dias',
  'Achei caro',
  'Lábios',
];

export const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  resultCount = 0,
  isSearching,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClear = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  const handleTagClick = (tag: string) => {
    onQueryChange(tag);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full">
      {/* Search Console Input */}
      <div className="relative flex items-center">
        <div className="absolute left-4 sm:left-5 text-bronze pointer-events-none flex items-center justify-center">
          <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[1.6]" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar situação, preço, botox, reagendar, faltou..."
          aria-label="Buscar scripts de resposta por palavra-chave ou situação"
          className="w-full bg-surface border border-sand/70 rounded-xl pl-11 sm:pl-13 pr-24 sm:pr-28 py-3.5 sm:py-4 text-sm sm:text-base text-espresso placeholder:text-greige/80 font-sans focus:outline-none focus:ring-1 focus:ring-cocoa focus:border-cocoa transition-all shadow-luxury-subtle"
        />

        {/* Right Search Actions */}
        <div className="absolute right-3 sm:right-4 flex items-center gap-2">
          {isSearching && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Limpar busca"
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-cocoa hover:text-espresso bg-champagne/60 hover:bg-champagne px-2.5 py-1.5 rounded-md transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso font-medium"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          )}

          {isSearching && (
            <span className="text-[11px] font-mono font-medium text-espresso bg-sand/30 border border-sand/60 px-2.5 py-1.5 rounded-md whitespace-nowrap">
              {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
            </span>
          )}
        </div>
      </div>

      {/* Editorial Search Keyword Tags */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className="text-[10.5px] uppercase tracking-[0.16em] text-greige font-medium mr-1 hidden sm:inline">
          Busca rápida:
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {QUICK_TAGS.map((tag) => {
            const isSelected = query.toLowerCase() === tag.toLowerCase();
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`text-[11px] px-2.5 py-1 rounded-md transition-all border ${
                  isSelected
                    ? 'bg-espresso text-ivory border-espresso font-medium shadow-sm'
                    : 'bg-surface/80 text-espresso/70 hover:text-espresso border-borderline hover:border-sand hover:bg-champagne/40'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
