import React, { useState } from 'react';
import { ChevronDown, CornerDownRight, MessageSquareText } from 'lucide-react';
import { Script, Category } from '../types';
import { CopyButton } from './CopyButton';

interface ScriptAccordionProps {
  script: Script;
  category?: Category;
  isOpenDefault?: boolean;
  packBadge?: string;
}

export const ScriptAccordion: React.FC<ScriptAccordionProps> = ({
  script,
  category,
  isOpenDefault = false,
  packBadge,
}) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  // Renders bracket variables like [Nome] with refined editorial highlight
  const renderMessageWithHighlights = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[') && part.endsWith(']')) {
        return (
          <span
            key={index}
            className="inline-block bg-champagne/70 text-cocoa font-mono text-[13px] sm:text-[13.5px] px-1.5 py-0.5 rounded border border-sand/60 font-medium mx-0.5 select-text"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div
      className={`border rounded-xl transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'bg-surface border-sand shadow-luxury-subtle'
          : 'bg-surface/70 border-borderline hover:border-sand hover:bg-surface'
      }`}
    >
      {/* Script Header Button */}
      <button
        type="button"
        onClick={toggleOpen}
        aria-expanded={isOpen}
        aria-controls={`script-content-${script.id}`}
        className="group w-full text-left px-4 sm:px-6 py-4 flex items-start justify-between gap-3 sm:gap-5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso"
      >
        <div className="flex-1 min-w-0">
          {/* Metadata Micro-line */}
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            {packBadge && (
              <span className="text-[10px] uppercase tracking-wider font-semibold text-espresso bg-champagne/70 border border-sand/60 px-2 py-0.5 rounded">
                {packBadge}
              </span>
            )}
            {category && (
              <span className="text-[10.5px] uppercase tracking-widest text-greige font-medium">
                {category.title}
              </span>
            )}
            {script.followUps && script.followUps.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-cocoa font-medium bg-sand/20 px-2 py-0.5 rounded border border-sand/40">
                <CornerDownRight className="w-2.5 h-2.5 text-bronze" />
                + Continuações
              </span>
            )}
          </div>

          {/* Situation Title */}
          <h3 className="font-sans text-[15px] sm:text-[16px] font-medium text-espresso leading-snug group-hover:text-cocoa transition-colors">
            {script.title}
          </h3>
        </div>

        {/* Minimal Hairline Chevron */}
        <div className="flex-shrink-0 pt-0.5">
          <div
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-borderline flex items-center justify-center transition-all duration-200 ${
              isOpen ? 'bg-espresso text-ivory border-espresso' : 'bg-surface text-greige group-hover:border-sand group-hover:text-espresso'
            }`}
          >
            <ChevronDown
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 stroke-[1.8] ${
                isOpen ? 'transform rotate-180 text-ivory' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {/* Accordion Expanded Content */}
      {isOpen && (
        <div
          id={`script-content-${script.id}`}
          className="px-4 sm:px-6 pb-6 pt-1 border-t border-borderline/70 bg-surface/90"
        >
          {/* Main WhatsApp Script Card */}
          <div className="mt-3 bg-ivory/50 border border-sand/70 rounded-xl p-4 sm:p-5 relative shadow-luxury-subtle">
            <div className="flex items-center justify-between gap-3 mb-3 text-[10.5px] uppercase tracking-widest text-greige font-medium border-b border-borderline/80 pb-2.5">
              <span className="flex items-center gap-1.5 text-cocoa font-semibold">
                <MessageSquareText className="w-3.5 h-3.5 text-bronze" />
                Mensagem Formatada para WhatsApp
              </span>
              <span className="text-greige/80 font-sans hidden sm:inline normal-case">
                substitua os campos destacados
              </span>
            </div>

            {/* Formatted Script Body */}
            <div className="font-sans text-[15px] sm:text-[15.5px] text-espresso leading-[1.75] whitespace-pre-line select-text">
              {renderMessageWithHighlights(script.message)}
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-3.5 border-t border-borderline/80 flex items-center justify-between flex-wrap gap-3">
              <div className="text-xs text-greige font-sans">
                Copie e cole diretamente na conversa com a paciente.
              </div>
              <CopyButton textToCopy={script.message} label="Copiar mensagem" />
            </div>
          </div>

          {/* Follow-up / Continuations Section */}
          {script.followUps && script.followUps.length > 0 && (
            <div className="mt-5 space-y-3">
              <div className="text-[11px] uppercase tracking-widest font-semibold text-cocoa flex items-center gap-1.5 pt-1">
                <CornerDownRight className="w-3.5 h-3.5 text-bronze" />
                Respostas de Continuação Recomendadas:
              </div>

              {script.followUps.map((followUp) => (
                <div
                  key={followUp.id}
                  className="bg-sand/15 border border-sand/60 rounded-xl p-4 text-sm"
                >
                  <div className="font-sans font-medium text-xs text-cocoa mb-2 flex items-center gap-1.5">
                    <span>↳ {followUp.trigger}</span>
                  </div>
                  <div className="font-sans text-[14px] sm:text-[14.5px] text-espresso leading-[1.65] whitespace-pre-line mb-3 select-text bg-surface/95 p-3.5 rounded-lg border border-borderline">
                    {renderMessageWithHighlights(followUp.message)}
                  </div>
                  <div className="flex justify-end">
                    <CopyButton
                      textToCopy={followUp.message}
                      variant="secondary"
                      label="Copiar resposta rápida"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
