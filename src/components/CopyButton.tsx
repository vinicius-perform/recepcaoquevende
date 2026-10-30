import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  textToCopy: string;
  variant?: 'primary' | 'secondary';
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  variant = 'primary',
  label = 'Copiar mensagem',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) throw new Error('execCommand failed');
      }

      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 3000);
    }
  };

  const isPrimary = variant === 'primary';

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Mensagem copiada para a área de transferência' : label}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-lg text-[11px] uppercase tracking-editorial font-medium transition-all duration-250 min-h-[44px] px-4 sm:px-5 select-none focus:outline-none focus-visible:ring-1 focus-visible:ring-espresso focus-visible:ring-offset-2 ${
          copied
            ? 'bg-[#2E2018] text-sand border border-cocoa/60 shadow-sm'
            : isPrimary
            ? 'bg-espresso text-ivory border border-espresso hover:bg-cocoa active:scale-[0.99] shadow-luxury-subtle'
            : 'bg-surface text-espresso border border-borderline hover:border-sand hover:bg-champagne/30 active:scale-[0.99]'
        } ${className}`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-sand animate-in fade-in zoom-in duration-200 stroke-[2.2]" />
            <span className="font-semibold text-sand tracking-editorial">Copiado</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity stroke-[1.6]" />
            <span>{label}</span>
          </>
        )}
      </button>

      {/* Accessible live announcement for screen readers */}
      <div aria-live="polite" className="sr-only">
        {copied && 'Texto copiado com sucesso para a área de transferência.'}
      </div>

      {copyFailed && (
        <span className="absolute -bottom-6 left-0 text-[11px] text-[#A2423D] whitespace-nowrap">
          Selecione o texto manualmente para copiar
        </span>
      )}
    </div>
  );
};
