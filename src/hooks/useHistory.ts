import { useState, useCallback } from 'react'

export interface HistoryEntry {
  id: string
  phone: string
  url: string
  label: string
  createdAt: number
}

const STORAGE_KEY = 'linkzap-history'
const MAX_ENTRIES = 10

function load(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : []
  } catch {
    return []
  }
}

function save(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // storage full or private browsing
  }
}

export function useHistory() {
  const [entries, setEntries] = useState<HistoryEntry[]>(load)

  const add = useCallback((entry: Omit<HistoryEntry, 'id' | 'createdAt'>) => {
    setEntries(prev => {
      const next = [
        { ...entry, id: crypto.randomUUID(), createdAt: Date.now() },
        ...prev.filter(e => e.url !== entry.url),
      ].slice(0, MAX_ENTRIES)
      save(next)
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setEntries(prev => {
      const next = prev.filter(e => e.id !== id)
      save(next)
      return next
    })
  }, [])

  const clear = useCallback(() => {
    setEntries([])
    save([])
  }, [])

  return { entries, add, remove, clear }
}
