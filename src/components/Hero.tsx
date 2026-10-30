import React from 'react';
import { ALL_SCRIPTS } from '../data/scripts';
import { PACKS } from '../data/packs';
import { ArrowDown, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const totalScripts = ALL_SCRIPTS.length;
  const totalPacks = PACKS.length;
  const totalCategories = PACKS.reduce((acc, p) => acc + p.categories.length, 0);

  const scrollToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('biblioteca');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToModules = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('modulos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full pt-10 pb-14 sm:pt-18 sm:pb-24 border-b border-borderline/80 bg-ivory relative overflow-hidden">
      {/* Background Monumental Editorial Monogram & Arcs (Inspired by reference launch aesthetic) */}
      <div 
        className="absolute top-2 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.045] font-serif italic text-[240px] sm:text-[380px] md:text-[500px] leading-none text-cocoa whitespace-nowrap z-0 font-normal tracking-tighter"
        aria-hidden="true"
      >
        HOF
      </div>

      {/* Decorative Golden Arch Frame */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] md:w-[1100px] h-[400px] sm:h-[550px] rounded-full border border-gold/20 pointer-events-none z-0"
        aria-hidden="true"
      />
      <div 
        className="absolute -top-20 left-1/2 -translate-x-1/2 w-[450px] sm:w-[650px] md:w-[850px] h-[300px] sm:h-[420px] rounded-full border border-sand/30 pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Ambient warm glow */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 sm:w-[600px] h-72 sm:h-96 rounded-full bg-gold-light/40 blur-3xl pointer-events-none z-0" 
        aria-hidden="true" 
      />

      <div className="max-w-luxury mx-auto px-4 sm:px-8 relative z-10 text-center">
        
        {/* Launch Overline Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-sand/70 shadow-luxury-subtle mb-6 sm:mb-8 animate-in fade-in slide-in-from-top-3 duration-500">
          <Sparkles className="w-3.5 h-3.5 text-gold-dark" />
          <span className="text-[10px] sm:text-[11.5px] font-sans tracking-[0.18em] uppercase text-cocoa font-semibold">
            Arsenal Comercial Gratuito • Edição Harmonização Orofacial
          </span>
        </div>

        {/* Monumental Launch Headline */}
        <h1 className="font-serif text-[38px] leading-[1.06] sm:text-6xl md:text-7xl lg:text-[80px] font-normal text-espresso tracking-tight max-w-4xl mx-auto mb-6 sm:mb-8 text-balance">
          Sua recepção segura nas conversas.{' '}
          <span className="block mt-1 sm:mt-2 text-cocoa italic font-serif font-light">
            Sua agenda de HOF <span className="underline decoration-gold-warm decoration-2 underline-offset-8">sempre cheia.</span>
          </span>
        </h1>

        {/* Persuasive Transformation Subtitle */}
        <p className="text-base sm:text-xl md:text-[21px] leading-[1.6] text-espresso/80 font-sans font-light max-w-2xl mx-auto text-pretty mb-8 sm:mb-10">
          As <strong>120 respostas prontas</strong> de WhatsApp para transformar perguntas sobre preços de Botox e procedimentos em consultas confirmadas, blindar horários e resgatar pacientes antigos.
        </p>

        {/* Primary Launch Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
          <a
            href="#biblioteca"
            onClick={scrollToLibrary}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-4 rounded-xl bg-espresso hover:bg-cocoa text-ivory text-xs sm:text-[13px] uppercase tracking-[0.16em] font-semibold transition-all duration-200 shadow-luxury-card hover:shadow-luxury-hover border border-gold-dark/40 active:scale-[0.98] group"
          >
            <span>Acessar os 120 Scripts Agora</span>
            <ArrowDown className="w-4 h-4 text-gold group-hover:translate-y-1 transition-transform stroke-[2]" />
          </a>

          <a
            href="#modulos"
            onClick={scrollToModules}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-4 rounded-xl bg-surface hover:bg-champagne/40 text-espresso text-xs sm:text-[13px] uppercase tracking-[0.14em] font-medium transition-all duration-200 border border-sand hover:border-gold-dark/60 shadow-luxury-subtle"
          >
            <span>Conhecer os 3 Módulos</span>
          </a>
        </div>

        {/* Launch Trust & Value Indicators Strip */}
        <div className="max-w-3xl mx-auto pt-6 border-t border-borderline/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-left">
            
            <div className="flex items-center gap-2.5 bg-surface/80 p-3 sm:p-3.5 rounded-xl border border-borderline/90 shadow-luxury-subtle">
              <CheckCircle2 className="w-4 h-4 text-gold-dark flex-shrink-0" />
              <div>
                <div className="font-mono text-sm sm:text-base font-bold text-espresso">{totalScripts} Scripts</div>
                <div className="text-[10.5px] uppercase tracking-wider text-greige font-sans">100% Prontos</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-surface/80 p-3 sm:p-3.5 rounded-xl border border-borderline/90 shadow-luxury-subtle">
              <Zap className="w-4 h-4 text-gold-dark flex-shrink-0" />
              <div>
                <div className="font-mono text-sm sm:text-base font-bold text-espresso">0{totalPacks} Módulos</div>
                <div className="text-[10.5px] uppercase tracking-wider text-greige font-sans">Estratégicos</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-surface/80 p-3 sm:p-3.5 rounded-xl border border-borderline/90 shadow-luxury-subtle">
              <ShieldCheck className="w-4 h-4 text-gold-dark flex-shrink-0" />
              <div>
                <div className="font-mono text-sm sm:text-base font-bold text-espresso">{totalCategories} Categorias</div>
                <div className="text-[10.5px] uppercase tracking-wider text-greige font-sans">Rotina de HOF</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 bg-surface/80 p-3 sm:p-3.5 rounded-xl border border-borderline/90 shadow-luxury-subtle">
              <Sparkles className="w-4 h-4 text-gold-dark flex-shrink-0" />
              <div>
                <div className="font-mono text-sm sm:text-base font-bold text-espresso">1 Clique</div>
                <div className="text-[10.5px] uppercase tracking-wider text-greige font-sans">Copie e Envie</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
