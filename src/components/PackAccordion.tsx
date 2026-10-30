import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Pack, Script } from '../types';
import { CategoryFilter } from './CategoryFilter';
import { ScriptAccordion } from './ScriptAccordion';

interface PackAccordionProps {
  pack: Pack;
  scripts: Script[];
  isOpen: boolean;
  onToggle: () => void;
}

export const PackAccordion: React.FC<PackAccordionProps> = ({
  pack,
  scripts,
  isOpen,
  onToggle,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const filteredScripts = selectedCategoryId
    ? scripts.filter((s) => s.categoryId === selectedCategoryId)
    : scripts;

  const getCategoryCount = (catId: string) => {
    return scripts.filter((s) => s.categoryId === catId).length;
  };

  const getCategoryForScript = (catId: string) => {
    return pack.categories.find((c) => c.id === catId);
  };

  return (
    <div
      id={`pack-accordion-${pack.id}`}
      className={`border rounded-2xl transition-all duration-300 overflow-hidden scroll-mt-24 ${
        isOpen
          ? 'bg-surface border-sand/90 shadow-luxury-card'
          : 'bg-surface/85 border-borderline hover:border-sand hover:bg-surface hover:shadow-luxury-subtle'
      }`}
    >
      {/* Pack Header Toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`pack-content-${pack.id}`}
        className="group w-full text-left p-5 sm:p-7 md:p-8 flex items-start justify-between gap-4 sm:gap-6 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso"
      >
        <div className="flex items-start gap-4 sm:gap-7 min-w-0">
          {/* Monumental Editorial Numeral */}
          <span className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-sand/80 font-normal select-none leading-none pt-0.5 group-hover:text-cocoa/70 transition-colors">
            {pack.number}
          </span>

          <div className="flex-1 min-w-0">
            {/* Metadata Bar */}
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 flex-wrap">
              <span className="text-[10px] sm:text-[10.5px] uppercase tracking-[0.18em] font-sans text-greige font-medium">
                PACK {pack.number}
              </span>
              <span className="text-sand text-xs" aria-hidden="true">•</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-2xs font-mono font-medium bg-champagne/60 text-espresso border border-sand/60">
                {scripts.length} scripts
              </span>
              <span className="text-sand text-xs hidden xs:inline" aria-hidden="true">•</span>
              <span className="text-[10.5px] uppercase tracking-wider text-greige hidden xs:inline">
                {pack.categories.length} categorias
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-[32px] font-normal text-espresso leading-snug tracking-tight mb-1 sm:mb-2 group-hover:text-cocoa transition-colors">
              {pack.title}
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-xs sm:text-sm md:text-[15px] text-espresso/70 leading-relaxed max-w-2xl font-light">
              {pack.subtitle}
            </p>
          </div>
        </div>

        {/* Minimal Hairline Expand Button */}
        <div className="flex-shrink-0 pt-1.5 sm:pt-2">
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-sand/70 flex items-center justify-center transition-all duration-250 ${
              isOpen
                ? 'bg-espresso text-ivory border-espresso shadow-sm'
                : 'bg-surface text-espresso group-hover:bg-champagne/40 group-hover:border-cocoa/40'
            }`}
          >
            <ChevronDown
              className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform duration-250 stroke-[1.8] ${
                isOpen ? 'transform rotate-180 text-ivory' : 'text-espresso'
              }`}
            />
          </div>
        </div>
      </button>

      {/* Expanded Inner Library Content */}
      {isOpen && (
        <div
          id={`pack-content-${pack.id}`}
          className="px-4 sm:px-8 pb-8 pt-3 border-t border-borderline/80 bg-surface/40"
        >
          {/* Category Filter Navigation */}
          <div className="pt-2 pb-5 border-b border-borderline/70">
            <div className="text-[10.5px] uppercase tracking-[0.16em] text-greige font-medium mb-2.5">
              Categorias do Pack {pack.number}:
            </div>
            <CategoryFilter
              categories={pack.categories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={setSelectedCategoryId}
              getCategoryCount={getCategoryCount}
              totalPackCount={scripts.length}
            />
          </div>

          {/* Situations List */}
          <div className="pt-5 space-y-3.5">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-greige font-medium px-1 mb-1">
              <span>
                {selectedCategoryId
                  ? `${pack.categories.find((c) => c.id === selectedCategoryId)?.title} (${filteredScripts.length})`
                  : `Todas as situações do Pack ${pack.number} (${filteredScripts.length})`}
              </span>
              <span className="hidden sm:inline normal-case text-greige/80 text-xs">
                Selecione para visualizar e copiar a resposta
              </span>
            </div>

            {filteredScripts.map((script, index) => (
              <ScriptAccordion
                key={script.id}
                script={script}
                category={getCategoryForScript(script.categoryId)}
                isOpenDefault={index === 0}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
