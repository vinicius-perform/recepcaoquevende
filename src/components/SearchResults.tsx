import React from 'react';
import { SearchMatch } from '../types';
import { ScriptAccordion } from './ScriptAccordion';
import { RotateCcw, SearchX } from 'lucide-react';

interface SearchResultsProps {
  query: string;
  results: SearchMatch[];
  onClear: () => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  query,
  results,
  onClear,
}) => {
  if (results.length === 0) {
    return (
      <div className="bg-surface border border-sand/70 rounded-2xl p-8 sm:p-14 text-center max-w-xl mx-auto shadow-luxury-subtle my-6">
        <div className="w-12 h-12 rounded-full bg-champagne/60 text-cocoa flex items-center justify-center mx-auto mb-4 border border-sand/60">
          <SearchX className="w-5 h-5 stroke-[1.6]" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-espresso mb-2.5 font-normal">
          Nenhuma resposta encontrada
        </h3>
        <p className="text-sm text-espresso/70 font-sans font-light leading-relaxed mb-6">
          Não localizamos nenhum script correspondente a <strong className="text-espresso font-medium font-mono">"{query}"</strong>. Tente buscar por termos clínicos como <span className="underline decoration-sand underline-offset-4">botox</span>, <span className="underline decoration-sand underline-offset-4">preço</span>, <span className="underline decoration-sand underline-offset-4">reagendar</span>, <span className="underline decoration-sand underline-offset-4">faltou</span> ou <span className="underline decoration-sand underline-offset-4">lábios</span>.
        </p>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-espresso text-ivory text-[11px] uppercase tracking-editorial font-medium hover:bg-cocoa transition-colors shadow-luxury-subtle"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpar busca e ver os 3 packs</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 my-6 animate-luxury-fade">
      {/* Search Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-borderline">
        <div className="text-[11px] uppercase tracking-widest text-greige font-medium">
          Resultados encontrados para <span className="text-espresso font-semibold font-mono">"{query}"</span> ({results.length}):
        </div>
        <button
          type="button"
          onClick={onClear}
          className="text-xs font-sans text-cocoa hover:text-espresso underline decoration-sand underline-offset-4 transition-colors duration-200 font-medium cursor-pointer"
        >
          Limpar busca e ver os 3 packs
        </button>
      </div>

      {/* Results List */}
      <div className="space-y-3.5">
        {results.map(({ script, pack, category }) => (
          <ScriptAccordion
            key={script.id}
            script={script}
            category={category}
            packBadge={`Pack ${pack.number}`}
          />
        ))}
      </div>
    </div>
  );
};
