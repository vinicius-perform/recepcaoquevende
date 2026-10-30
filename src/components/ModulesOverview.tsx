import React from 'react';
import { PACKS } from '../data/packs';
import { getPackScriptCount } from '../data/scripts';
import { ArrowDown, Layers } from 'lucide-react';

interface ModulesOverviewProps {
  onSelectModule: (packId: '01' | '02' | '03') => void;
}

export const ModulesOverview: React.FC<ModulesOverviewProps> = ({ onSelectModule }) => {
  return (
    <section id="modulos" className="w-full py-16 sm:py-24 border-b border-borderline/80 bg-ivory relative">
      <div className="max-w-luxury mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-gold-dark" aria-hidden="true" />
            <span className="text-[10.5px] sm:text-xs font-sans tracking-[0.2em] uppercase text-cocoa font-bold">
              Estrutura Completa do Kit
            </span>
            <span className="w-6 h-px bg-gold-dark" aria-hidden="true" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-espresso leading-tight tracking-tight mb-4 text-balance">
            Os 3 Módulos Estratégicos de Conversão
          </h2>

          <p className="text-sm sm:text-base text-espresso/70 font-sans font-light leading-relaxed">
            Cada módulo cobre uma etapa crítica da rotina da secretária: desde a primeira mensagem até o retorno de manutenção preventiva.
          </p>
        </div>

        {/* 3 Large Monumental Module Cards (Inspired by the Reference Image with Big Golden Numerals) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {PACKS.map((pack) => {
            const count = getPackScriptCount(pack.id);
            const num = parseInt(pack.number, 10);

            return (
              <div
                key={pack.id}
                className="bg-surface border border-sand hover:border-gold-dark rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-luxury-subtle hover:shadow-luxury-card relative overflow-hidden group"
              >
                {/* Gigantic Translucent Gold Numeral in Background (Key visual from reference image) */}
                <div
                  className="absolute -top-6 right-2 sm:right-4 font-serif italic text-[140px] sm:text-[170px] leading-none text-gold/20 select-none pointer-events-none group-hover:text-gold/30 transition-colors font-bold"
                  aria-hidden="true"
                >
                  {num}
                </div>

                <div className="relative z-10">
                  {/* Module Badge & Script Count */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-[10.5px] uppercase tracking-widest font-mono font-bold bg-champagne/70 text-cocoa border border-sand/70">
                      <Layers className="w-3 h-3 text-gold-dark" />
                      Módulo 0{num}
                    </span>

                    <span className="font-mono text-xs font-semibold text-espresso bg-surface px-2.5 py-1 rounded border border-borderline">
                      {count} scripts
                    </span>
                  </div>

                  {/* Module Title */}
                  <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-espresso leading-snug mb-3 group-hover:text-cocoa transition-colors">
                    {pack.title}
                  </h3>

                  {/* Module Promise */}
                  <p className="text-sm text-espresso/75 font-sans font-light leading-relaxed mb-6">
                    {pack.subtitle}
                  </p>

                  {/* Categories Breakdown */}
                  <div className="pt-4 border-t border-borderline/80 space-y-2 mb-6">
                    <div className="text-[10.5px] uppercase tracking-wider text-greige font-semibold">
                      {pack.categories.length} Categorias Inclusas:
                    </div>
                    <ul className="text-xs text-espresso/80 font-sans space-y-1.5 font-light">
                      {pack.categories.map((c) => (
                        <li key={c.id} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-dark flex-shrink-0" />
                          <span className="truncate">{c.title} ({c.targetCount})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Module Action Trigger */}
                <div className="relative z-10 pt-4 border-t border-borderline/80">
                  <button
                    type="button"
                    onClick={() => onSelectModule(pack.id)}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-ivory hover:bg-espresso text-espresso hover:text-ivory text-xs uppercase tracking-wider font-semibold transition-all duration-200 border border-sand hover:border-espresso group/btn shadow-luxury-subtle"
                  >
                    <span>Abrir Módulo 0{num} na Biblioteca</span>
                    <ArrowDown className="w-3.5 h-3.5 text-gold-dark group-hover/btn:text-gold group-hover/btn:translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

