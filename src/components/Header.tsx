import { Zap } from 'lucide-react'

export function Header() {
  return (
    <header className="w-full">
      {/* Green gradient banner */}
      <div className="bg-gradient-to-br from-zap-700 via-zap-600 to-zap-500 px-4 pt-12 pb-20">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <Zap size={22} className="text-white fill-white" aria-hidden="true" />
            </div>
            <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
              Link Zap
            </span>
          </div>

          <h1 className="text-white text-3xl font-bold leading-tight text-balance">
            Gere links para
            <br />
            <span className="text-white/90">WhatsApp</span> em segundos
          </h1>

          <p className="mt-2 text-white/70 text-sm leading-relaxed">
            Cole o link em qualquer lugar e abra uma conversa direta —
            sem precisar salvar o número.
          </p>
        </div>
      </div>
    </header>
  )
}
