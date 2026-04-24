import { useState, useRef, useId } from 'react'
import { Zap, MessageCircle, ChevronDown, AlertCircle } from 'lucide-react'

interface Country {
  code: string
  dial: string
  flag: string
  name: string
  mask: string
}

const COUNTRIES: Country[] = [
  { code: 'BR',    dial: '55',  flag: '🇧🇷', name: 'Brasil',       mask: '(11) 99999-9999' },
  { code: 'US',    dial: '1',   flag: '🇺🇸', name: 'EUA / Canadá', mask: '(555) 555-0100'  },
  { code: 'PT',    dial: '351', flag: '🇵🇹', name: 'Portugal',     mask: '912 345 678'      },
  { code: 'AR',    dial: '54',  flag: '🇦🇷', name: 'Argentina',    mask: '011 1234-5678'    },
  { code: 'MX',    dial: '52',  flag: '🇲🇽', name: 'México',       mask: '55 1234 5678'     },
  { code: 'CO',    dial: '57',  flag: '🇨🇴', name: 'Colômbia',     mask: '310 1234567'      },
  { code: 'ES',    dial: '34',  flag: '🇪🇸', name: 'Espanha',      mask: '612 345 678'      },
  { code: 'OTHER', dial: '',    flag: '🌍',  name: 'Outro país',   mask: ''                  },
]

function stripNonDigits(v: string) {
  return v.replace(/\D/g, '')
}

interface Props {
  onGenerate: (url: string, phone: string, label: string) => void
}

export function PhoneForm({ onGenerate }: Props) {
  const [country, setCountry]         = useState<Country>(COUNTRIES[0])
  const [phone, setPhone]             = useState('')
  const [message, setMessage]         = useState('')
  const [error, setError]             = useState('')
  const [showCountries, setShowCountries] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const phoneId   = useId()
  const messageId = useId()
  const errorId   = useId()
  const inputRef  = useRef<HTMLInputElement>(null)

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('')
    const cleaned = e.target.value.replace(/[^\d\s\-().]/g, '')
    setPhone(cleaned)
  }

  function validate(): string | null {
    const digits = stripNonDigits(phone)
    if (!digits)         return 'Informe um número de telefone.'
    if (digits.length < 6)  return 'Número muito curto. Verifique e tente novamente.'
    if (digits.length > 15) return 'Número muito longo. Verifique e tente novamente.'
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const err = validate()
    if (err) {
      setError(err)
      inputRef.current?.focus()
      return
    }

    const digits   = stripNonDigits(phone)
    const full     = country.dial ? `${country.dial}${digits}` : digits
    const msgParam = message.trim()
      ? `?text=${encodeURIComponent(message.trim())}`
      : ''
    const url   = `https://wa.me/${full}${msgParam}`
    const label = `${country.flag} +${country.dial || '?'} ${phone.trim()}`

    onGenerate(url, phone.trim(), label)
  }

  function selectCountry(c: Country) {
    setCountry(c)
    setShowCountries(false)
    setPhone('')
    setError('')
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de geração de link">
      <div className="space-y-4">

        {/* Label */}
        <div>
          <label htmlFor={phoneId} className="block text-sm font-semibold text-slate-700 mb-2">
            Número de telefone
          </label>

          <div className="flex gap-2">
            {/* Country selector */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setShowCountries(v => !v)}
                aria-expanded={showCountries}
                aria-haspopup="listbox"
                aria-label={`País: ${country.name}${country.dial ? `, DDI +${country.dial}` : ''}`}
                className="input-field px-3 flex items-center gap-1.5 no-tap-highlight select-none"
                style={{ width: 90 }}
              >
                <span className="text-lg leading-none" aria-hidden="true">{country.flag}</span>
                {country.dial && (
                  <span className="text-slate-600 font-semibold text-sm">+{country.dial}</span>
                )}
                <ChevronDown
                  size={13}
                  className={`text-slate-400 ml-auto transition-transform duration-200 ${showCountries ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              {showCountries && (
                <>
                  {/* Overlay to close */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowCountries(false)}
                    aria-hidden="true"
                  />
                  <div
                    role="listbox"
                    aria-label="Selecione o país"
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-card-hover border border-slate-100 overflow-hidden z-50 animate-slide-down"
                  >
                    {COUNTRIES.map(c => (
                      <button
                        key={c.code}
                        type="button"
                        role="option"
                        aria-selected={country.code === c.code}
                        onClick={() => selectCountry(c)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 text-left
                          transition-colors duration-150 no-tap-highlight
                          hover:bg-zap-50 active:bg-zap-100
                          ${country.code === c.code ? 'bg-zap-50 text-zap-700' : 'text-slate-700'}
                        `}
                      >
                        <span className="text-xl shrink-0" aria-hidden="true">{c.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{c.name}</div>
                          {c.dial && (
                            <div className="text-xs text-slate-400">+{c.dial}</div>
                          )}
                        </div>
                        {country.code === c.code && (
                          <div className="w-2 h-2 rounded-full bg-zap-500 shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Phone input */}
            <input
              ref={inputRef}
              id={phoneId}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder={country.mask || 'Número com DDD'}
              aria-describedby={error ? errorId : undefined}
              aria-invalid={!!error}
              className={`
                input-field flex-1 min-w-0
                ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-400/10' : ''}
              `}
            />
          </div>

          {error && (
            <div
              id={errorId}
              role="alert"
              className="flex items-center gap-2 mt-2 text-red-600 text-sm font-medium animate-fade-in"
            >
              <AlertCircle size={15} aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Optional message */}
        <div>
          <button
            type="button"
            onClick={() => setShowMessage(v => !v)}
            aria-expanded={showMessage}
            className="flex items-center gap-2 text-sm text-slate-500 font-medium hover:text-zap-600 transition-colors no-tap-highlight"
          >
            <MessageCircle size={15} aria-hidden="true" />
            <span>
              {showMessage ? 'Remover mensagem inicial' : 'Mensagem inicial (opcional)'}
            </span>
          </button>

          {showMessage && (
            <div className="mt-3 animate-fade-up">
              <label htmlFor={messageId} className="sr-only">Mensagem inicial</label>
              <textarea
                id={messageId}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Ex: Olá! Vim pelo seu site e gostaria de mais informações…"
                rows={3}
                maxLength={1000}
                className="w-full bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 hover:border-slate-300 focus:border-zap-500 focus:ring-4 focus:ring-zap-500/10 focus:outline-none resize-none"
              />
              <div className="text-right text-xs text-slate-400 mt-1">
                {message.length}/1000
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary w-full">
          <Zap size={18} className="fill-white" aria-hidden="true" />
          Gerar Link WhatsApp
        </button>
      </div>
    </form>
  )
}
