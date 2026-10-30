import React from 'react';
import { ALL_SCRIPTS } from '../data/scripts';
import { ArrowDown } from 'lucide-react';

export const Header: React.FC = () => {
  const totalCount = ALL_SCRIPTS.length;

  const scrollToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('biblioteca');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full border-b border-borderline/80 bg-ivory/95 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-luxury mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Left: Launch Brand Masthead */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          <a
            href="#"
            className="flex items-baseline gap-2 group focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso rounded-sm"
          >
            <span className="font-serif text-[17px] xs:text-[19px] sm:text-2xl font-medium tracking-[0.14em] text-espresso uppercase group-hover:text-cocoa transition-colors">
              Recepção que Vende
            </span>
          </a>
          <span className="text-sand/80 select-none text-xs hidden sm:inline" aria-hidden="true">—</span>
          <span className="inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded text-[9.5px] sm:text-[10px] uppercase tracking-widest font-sans font-semibold bg-champagne/50 text-cocoa border border-sand/70">
            Edição HOF
          </span>
        </div>

        {/* Right: Launch CTA Button & Discrete Counter */}
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden md:flex items-center gap-2 text-xs font-sans text-greige">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-dark inline-block animate-pulse" aria-hidden="true" />
            <span className="font-mono text-espresso font-semibold">{totalCount}</span>
            <span>respostas comerciais</span>
          </div>

          <a
            href="#biblioteca"
            onClick={scrollToLibrary}
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-lg bg-espresso text-ivory text-[10.5px] sm:text-[11.5px] uppercase tracking-editorial font-medium hover:bg-cocoa active:scale-[0.98] transition-all shadow-luxury-subtle border border-gold-dark/30 group"
          >
            <span>Acessar Scripts</span>
            <ArrowDown className="w-3.5 h-3.5 text-gold group-hover:translate-y-0.5 transition-transform stroke-[2]" />
          </a>
        </div>
      </div>
    </header>
  );
};
