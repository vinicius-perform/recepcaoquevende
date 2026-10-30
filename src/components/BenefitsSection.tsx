import React from 'react';
import { CalendarCheck, MessageSquare, Clock, UserCheck } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      number: '01',
      icon: MessageSquare,
      title: 'Respostas Transparentes sobre Preços & Procedimentos',
      description:
        'Responda com autoridade sobre Botox, ácido hialurônico e bioestimuladores sem afastar a paciente e sem desvalorizar a consulta.',
      highlight: 'Fim do sumiço após a pergunta "Quanto custa?"',
    },
    {
      number: '02',
      icon: CalendarCheck,
      title: 'Condução Natural para a Consulta Avaliativa',
      description:
        'Técnicas de fechamento suave com duas opções de horários, superação de objeções ("achei caro", "falar com marido") sem pressão comercial.',
      highlight: 'Conversas que viram horário marcado na cadeira',
    },
    {
      number: '03',
      icon: Clock,
      title: 'Confirmações Inteligentes & Redução Drástica de Faltas',
      description:
        'Lembretes em timing estratégico (48h e 24h), orientações prévias de preparo e recuperação cordial e imediata de no-show.',
      highlight: 'Blindagem de horários e aproveitamento de encaixes',
    },
    {
      number: '04',
      icon: UserCheck,
      title: 'Recall de HOF & Reativação de Contatos Adormecidos',
      description:
        'Lembretes de retorno aos 15 dias de toxina botulínica, manutenção aos 4 a 6 meses e reativação afetuosa de pacientes sumidas há mais de 6 meses.',
      highlight: 'Geração contínua de novas consultas com sua própria base',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-24 border-b border-borderline/80 bg-surface/50 relative">
      <div className="max-w-luxury mx-auto px-4 sm:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-gold-dark" aria-hidden="true" />
            <span className="text-[10.5px] sm:text-xs font-sans tracking-[0.2em] uppercase text-cocoa font-bold">
              O que sua recepção vai dominar na prática
            </span>
            <span className="w-6 h-px bg-gold-dark" aria-hidden="true" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-[44px] font-normal text-espresso leading-tight tracking-tight mb-4 text-balance">
            Uma comunicação que transmite o valor de um consultório de alto padrão.
          </h2>

          <p className="text-sm sm:text-base text-espresso/70 font-sans font-light leading-relaxed">
            Sem respostas genéricas, sem gírias e sem parecer insistente. Scripts testados na rotina diária das clínicas de maior faturamento do Brasil.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.number}
                className="bg-surface border border-sand/80 hover:border-gold-dark/70 rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-luxury-subtle hover:shadow-luxury-card group relative overflow-hidden"
              >
                {/* Subtle gold corner accent */}
                <div 
                  className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-light/40 to-transparent pointer-events-none rounded-tr-2xl" 
                  aria-hidden="true" 
                />

                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-champagne/60 border border-sand/70 flex items-center justify-center text-cocoa group-hover:bg-gold-light group-hover:text-espresso transition-colors">
                    <Icon className="w-5 h-5 stroke-[1.75]" />
                  </div>
                  <span className="font-serif italic font-semibold text-2xl sm:text-3xl text-sand/80 select-none">
                    {b.number}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-[22px] font-normal text-espresso leading-snug mb-2.5 group-hover:text-cocoa transition-colors">
                  {b.title}
                </h3>

                <p className="text-sm sm:text-[14.5px] text-espresso/70 font-sans font-light leading-relaxed mb-4">
                  {b.description}
                </p>

                <div className="pt-3 border-t border-borderline/70 flex items-center gap-2 text-2xs uppercase tracking-wider font-semibold text-gold-dark">
                  <span>✦</span>
                  <span>{b.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

