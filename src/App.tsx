import React, { useState, useMemo } from 'react';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { PackAccordion } from './components/PackAccordion';
import { Footer } from './components/Footer';
import { PACKS } from './data/packs';
import { ALL_SCRIPTS, getScriptsByPack } from './data/scripts';
import { searchScripts } from './utils/search';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openPackIds, setOpenPackIds] = useState<Record<string, boolean>>({
    '01': true,
    '02': false,
    '03': false,
  });

  const isSearching = searchQuery.trim().length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return searchScripts(searchQuery);
  }, [searchQuery, isSearching]);

  const togglePack = (packId: string) => {
    setOpenPackIds((prev) => ({
      ...prev,
      [packId]: !prev[packId],
    }));
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col selection:bg-gold-light selection:text-espresso">
      {/* Monumental Editorial Hero */}
      <Hero />

      {/* Interactive Library Section: Search & 3 Pack Accordions */}
      <main id="biblioteca" className="flex-1 max-w-luxury mx-auto w-full px-4 sm:px-8 py-12 sm:py-16 scroll-mt-6">
        <section aria-label="Biblioteca de Respostas Comerciais">
          
          {/* Section Heading */}
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="w-6 h-px bg-gold-dark" aria-hidden="true" />
              <span className="text-[10.5px] sm:text-xs font-sans tracking-[0.2em] uppercase text-cocoa font-bold">
                Biblioteca Interativa
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 sm:gap-4">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] text-espresso font-normal tracking-tight text-balance">
                Encontre a resposta certa.
              </h2>
              <span className="text-xs sm:text-sm text-greige font-sans font-light flex-shrink-0">
                {ALL_SCRIPTS.length} respostas validadas para a rotina de HOF
              </span>
            </div>
          </div>

          {/* Search Console */}
          <div className="mb-10 sm:mb-12">
            <SearchBar
              query={searchQuery}
              onQueryChange={setSearchQuery}
              resultCount={searchResults.length}
              isSearching={isSearching}
            />
          </div>

          {/* Dynamic Content: Search Results or 3 Packs */}
          {isSearching ? (
            <SearchResults
              query={searchQuery}
              results={searchResults}
              onClear={handleClearSearch}
            />
          ) : (
            <div className="space-y-6 sm:space-y-8">
              {PACKS.map((pack) => {
                const packScripts = getScriptsByPack(pack.id);
                return (
                  <PackAccordion
                    key={pack.id}
                    pack={pack}
                    scripts={packScripts}
                    isOpen={!!openPackIds[pack.id]}
                    onToggle={() => togglePack(pack.id)}
                  />
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
