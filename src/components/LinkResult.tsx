import { CheckCircle2, Copy, ExternalLink, Share2, Check } from 'lucide-react'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

interface Props {
  url: string
  label: string
}

export function LinkResult({ url, label }: Props) {
  const { copied, copy } = useCopyToClipboard()

  const canShare = typeof navigator !== 'undefined' && 'share' in navigator

  async function handleShare() {
    try {
      await navigator.share({
        title: 'Link WhatsApp',
        text: `Abra esta conversa no WhatsApp: ${url}`,
        url,
      })
    } catch {
      // user cancelled or not supported
    }
  }

  return (
    <div className="animate-fade-up" role="region" aria-label="Link gerado com sucesso">
      {/* Success badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded-full bg-zap-500 flex items-center justify-center shrink-0">
          <CheckCircle2 size={14} className="text-white" aria-hidden="true" />
        </div>
        <span className="text-sm font-semibold text-zap-700">Link gerado com sucesso!</span>
      </div>

      {/* Link box */}
      <div
        className="bg-zap-50 border border-zap-200 rounded-2xl p-4 mb-4"
        aria-label="Link gerado"
      >
        <p className="text-xs font-medium text-zap-600 mb-1 uppercase tracking-wide">
          {label}
        </p>
        <p
          className="text-sm text-slate-700 font-mono break-all leading-relaxed"
          aria-label={`Link: ${url}`}
        >
          {url}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => copy(url)}
          className="btn-secondary flex-1"
          aria-label={copied ? 'Link copiado!' : 'Copiar link'}
        >
          {copied ? (
            <>
              <Check size={16} className="text-zap-600" aria-hidden="true" />
              <span className="text-zap-700">Copiado!</span>
            </>
          ) : (
            <>
              <Copy size={16} aria-hidden="true" />
              <span>Copiar</span>
            </>
          )}
        </button>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary flex-1"
          aria-label="Abrir link no WhatsApp (abre em nova aba)"
        >
          <ExternalLink size={16} aria-hidden="true" />
          <span>Abrir</span>
        </a>

        {canShare && (
          <button
            onClick={handleShare}
            className="btn-ghost"
            aria-label="Compartilhar link"
          >
            <Share2 size={16} aria-hidden="true" />
            <span>Compartilhar</span>
          </button>
        )}
      </div>
    </div>
  )
}
