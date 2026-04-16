import { useState } from 'react'
import { Header }      from './components/Header'
import { PhoneForm }   from './components/PhoneForm'
import { LinkResult }  from './components/LinkResult'
import { HistoryList } from './components/HistoryList'
import { Footer }      from './components/Footer'
import { useHistory }  from './hooks/useHistory'

interface GeneratedLink {
  url: string
  label: string
}

export default function App() {
  const [result, setResult] = useState<GeneratedLink | null>(null)
  const { entries, add, remove, clear } = useHistory()

  function handleGenerate(url: string, _phone: string, label: string) {
    const link = { url, label }
    setResult(link)
    add({ url, phone: _phone, label })
    // Scroll result into view on mobile
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }, 100)
  }

  return (
    <div className="min-h-screen min-h-dvh bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-zap-700 focus:rounded-xl focus:shadow-lg focus:font-semibold"
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="main-content" className="relative -mt-12 px-4 pb-4 max-w-lg mx-auto">

        {/* Main card — overlaps the header gradient */}
        <div className="card p-5 shadow-card mb-4">
          <PhoneForm onGenerate={handleGenerate} />
        </div>

        {/* Result */}
        {result && (
          <div id="result-section" className="card p-5 mb-4">
            <LinkResult url={result.url} label={result.label} />
          </div>
        )}

        {/* History */}
        {entries.length > 0 && (
          <div className="card p-5 mb-4">
            <HistoryList entries={entries} onRemove={remove} onClear={clear} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
