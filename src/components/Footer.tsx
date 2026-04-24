import { ShieldCheck } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-8 pb-8 px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-1">
        <ShieldCheck size={13} aria-hidden="true" />
        <span>Seus dados não são armazenados em nenhum servidor.</span>
      </div>
      <p className="text-xs text-slate-300">
        Feito por{' '}
        <span className="font-semibold text-slate-400">JesielLabs</span>
        {' '}· {new Date().getFullYear()}
      </p>
    </footer>
  )
}
