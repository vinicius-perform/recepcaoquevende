import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BenefitsSection } from './components/BenefitsSection';
import { ModulesOverview } from './components/ModulesOverview';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { PackAccordion } from './components/PackAccordion';
import { Footer } from './components/Footer';
import { PACKS } from './data/packs';
import { ALL_SCRIPTS, getScriptsByPack } from './data/scripts';
import { searchScripts } from './utils/search';
import { ArrowDown, Sparkles } from 'lucide-react';

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

  const handleSelectModule = (packId: '01' | '02' | '03') => {
    setOpenPackIds({
      '01': packId === '01',
      '02': packId === '02',
      '03': packId === '03',
    });
    setSearchQuery('');

    // Smooth scroll to selected pack accordion
    setTimeout(() => {
      const el = document.getElementById(`pack-accordion-${packId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        const bib = document.getElementById('biblioteca');
        bib?.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const scrollToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('biblioteca');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-espresso flex flex-col selection:bg-gold-light selection:text-espresso">
      {/* 1. Launch Header */}
      <Header />

      {/* 2. Monumental Launch Hero */}
      <Hero />

      {/* 3. Section: Benefits & Pillars */}
      <BenefitsSection />

      {/* 4. Section: 3 Modules Overview (Giant Gold Numerals inspired by reference) */}
      <ModulesOverview onSelectModule={handleSelectModule} />

      {/* 5. Intermediate Callout & Transition Banner */}
      <section className="w-full py-12 sm:py-16 bg-gradient-to-r from-surface via-champagne/40 to-surface border-b border-borderline/80">
        <div className="max-w-luxury mx-auto px-4 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-3 text-gold-dark text-xs uppercase tracking-widest font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Acesso Livre e Imediato</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-espresso font-normal max-w-2xl mx-auto mb-4 text-balance">
            Encontre a resposta exata para qualquer situação no WhatsApp da sua clínica.
          </h3>

          <p className="text-sm sm:text-base text-espresso/70 font-sans font-light max-w-xl mx-auto mb-6">
            Utilize a busca inteligente abaixo ou navegue diretamente pelos módulos para copiar e enviar a mensagem em segundos.
          </p>

          <a
            href="#biblioteca"
            onClick={scrollToLibrary}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-espresso hover:bg-cocoa text-ivory text-xs uppercase tracking-wider font-semibold shadow-luxury-subtle transition-all duration-200"
          >
            <span>Ir para a Busca & Scripts</span>
            <ArrowDown className="w-3.5 h-3.5 text-gold" />
          </a>
        </div>
      </section>

      {/* 6. Interactive Library Section: Search & 3 Pack Accordions */}
      <main id="biblioteca" className="flex-1 max-w-luxury mx-auto w-full px-4 sm:px-8 py-16 sm:py-24 scroll-mt-20">
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

      {/* 7. Launch Footer */}
      <Footer />
    </div>
  );
};

export default App;
