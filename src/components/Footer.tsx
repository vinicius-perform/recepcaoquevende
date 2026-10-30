import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-borderline/80 bg-surface/30 mt-20 sm:mt-28 py-12 sm:py-16 text-center">
      <div className="max-w-luxury mx-auto px-4 sm:px-8 space-y-3.5">
        <div className="font-serif text-xl sm:text-2xl text-espresso font-normal tracking-[0.12em] uppercase">
          Kit Recepção que Vende <span className="text-sand mx-1.5">—</span> Edição HOF
        </div>
        <p className="font-sans text-xs sm:text-sm text-espresso/70 font-light max-w-md mx-auto leading-relaxed">
          Atendimento mais preparado. Conversas com mais direção.
        </p>
        <div className="pt-4 flex items-center justify-center gap-3 text-3xs sm:text-2xs uppercase tracking-widest text-greige/80 font-medium">
          <span>Ferramenta de uso instantâneo</span>
          <span className="text-sand/80">•</span>
          <span>100% gratuita</span>
          <span className="text-sand/80">•</span>
          <span>Sem cadastro</span>
        </div>
      </div>
    </footer>
  );
};
