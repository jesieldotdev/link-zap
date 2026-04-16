import { Trash2, ExternalLink, Copy, Check, Clock } from 'lucide-react'
import { useCopyToClipboard } from '../hooks/useCopyToClipboard'
import type { HistoryEntry } from '../hooks/useHistory'

interface RowProps {
  entry: HistoryEntry
  onRemove: (id: string) => void
}

function HistoryRow({ entry, onRemove }: RowProps) {
  const { copied, copy } = useCopyToClipboard()

  function formatDate(ts: number) {
    const d = new Date(ts)
    const now = new Date()
    const diffMin = Math.round((now.getTime() - d.getTime()) / 60000)
    if (diffMin < 1)   return 'agora mesmo'
    if (diffMin < 60)  return `${diffMin} min atrás`
    if (diffMin < 1440) return `${Math.round(diffMin / 60)}h atrás`
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  }

  return (
    <li className="flex items-center gap-3 py-3 px-1 border-b border-slate-100 last:border-0 animate-fade-in group">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-slate-700 truncate">
            {entry.label}
          </span>
        </div>
        <p className="text-xs text-slate-400 truncate">{entry.url}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Clock size={11} className="text-slate-300" aria-hidden="true" />
          <span className="text-xs text-slate-400">{formatDate(entry.createdAt)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => copy(entry.url)}
          className="btn-ghost px-2 py-2"
          aria-label={copied ? 'Copiado!' : `Copiar link de ${entry.label}`}
          title={copied ? 'Copiado!' : 'Copiar link'}
        >
          {copied
            ? <Check size={15} className="text-zap-600" aria-hidden="true" />
            : <Copy size={15} aria-hidden="true" />
          }
        </button>

        <a
          href={entry.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost px-2 py-2"
          aria-label={`Abrir link de ${entry.label} no WhatsApp`}
          title="Abrir no WhatsApp"
        >
          <ExternalLink size={15} aria-hidden="true" />
        </a>

        <button
          onClick={() => onRemove(entry.id)}
          className="btn-ghost px-2 py-2 hover:text-red-500 hover:bg-red-50"
          aria-label={`Remover ${entry.label} do histórico`}
          title="Remover"
        >
          <Trash2 size={15} aria-hidden="true" />
        </button>
      </div>
    </li>
  )
}

interface Props {
  entries: HistoryEntry[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function HistoryList({ entries, onRemove, onClear }: Props) {
  if (entries.length === 0) return null

  return (
    <section aria-label="Histórico de links gerados" className="animate-fade-up">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wide">
          Histórico
        </h2>
        <button
          onClick={onClear}
          className="btn-ghost px-2 py-1 text-xs text-slate-400 hover:text-red-500 hover:bg-red-50"
          aria-label="Limpar todo o histórico"
        >
          Limpar tudo
        </button>
      </div>

      <ul className="history-scroll divide-y divide-slate-100" aria-live="polite">
        {entries.map(entry => (
          <HistoryRow key={entry.id} entry={entry} onRemove={onRemove} />
        ))}
      </ul>
    </section>
  )
}
