'use client'

import { useState, useEffect } from 'react'

interface NavProps {
  onOpenModal: () => void
}

export default function Nav({ onOpenModal }: NavProps) {
  const [stuck, setStuck] = useState(false)
  const [dark, setDark] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLinks = [
    { label: 'Systems', id: 'systems' },
    { label: 'Case Studies', id: 'cases' },
    { label: 'Process', id: 'process' },
    { label: 'About', id: 'founder' },
    { label: 'Insights', id: 'insights' },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[300] h-[68px] px-[5vw] flex items-center justify-between transition-all duration-500 border-b ${
          stuck
            ? 'bg-white/88 backdrop-blur-xl border-[var(--border)]'
            : 'border-transparent'
        }`}
        style={stuck ? { background: 'color-mix(in srgb, var(--bg) 88%, transparent)' } : {}}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-[9px] cursor-pointer select-none group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="font-heading font-extrabold text-[1.28rem] tracking-tight leading-none flex items-baseline transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
            <span className="text-blue">DZ</span>
            <span className="text-[var(--text)]">VIRAL</span>
          </div>
          <span className="font-body text-[0.56rem] font-bold tracking-[0.16em] uppercase text-blue border border-blue/30 px-2 py-[2px] rounded-full transition-colors group-hover:bg-blue/10">
            Medical
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollTo(link.id)}
                className="text-[0.875rem] font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-[3px] left-0 right-0 h-[1.5px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="w-[42px] h-[42px] rounded-[11px] border border-[var(--border)] bg-[var(--card)] flex items-center justify-center relative overflow-hidden transition-all duration-300 hover:border-blue hover:scale-105 hover:shadow-[0_4px_16px_rgba(27,94,255,0.2)]"
          >
            {/* Sun */}
            <svg
              className={`absolute transition-all duration-300 ${dark ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              width="18" height="18" viewBox="0 0 18 18" fill="none"
            >
              <circle cx="9" cy="9" r="3.5" stroke="#1B5EFF" strokeWidth="1.6"/>
              <path d="M9 1.5V3M9 15V16.5M1.5 9H3M15 9H16.5M3.7 3.7L4.76 4.76M13.24 13.24L14.3 14.3M14.3 3.7L13.24 4.76M4.76 13.24L3.7 14.3" stroke="#1B5EFF" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            {/* Moon */}
            <svg
              className={`absolute transition-all duration-300 ${dark ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              width="18" height="18" viewBox="0 0 18 18" fill="none"
            >
              <path d="M15.5 10.5A7 7 0 017.5 2.5a7 7 0 100 13 7 7 0 008-5z" stroke="#1B5EFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Book button */}
          <button
            onClick={onOpenModal}
            className="hidden md:block bg-blue text-white px-5 py-[9px] rounded-[9px] text-[0.875rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,94,255,0.4)]"
          >
            Book a Call
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-[42px] h-[42px] rounded-[11px] border border-[var(--border)] bg-[var(--card)] flex flex-col items-center justify-center gap-[5px] p-[11px] hover:border-blue transition-colors"
          >
            <span className={`block w-full h-[1.8px] bg-[var(--text)] rounded transition-all duration-300 ${menuOpen ? 'translate-y-[6.8px] rotate-45' : ''}`} />
            <span className={`block w-full h-[1.8px] bg-[var(--text)] rounded transition-all duration-300 ${menuOpen ? 'opacity-0 w-0' : ''}`} />
            <span className={`block w-full h-[1.8px] bg-[var(--text)] rounded transition-all duration-300 ${menuOpen ? '-translate-y-[6.8px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-[68px] left-0 right-0 z-[250] bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-[400px]' : 'max-h-0'
        }`}
      >
        <div className="px-[5vw] pt-4 pb-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left font-heading text-base font-semibold text-[var(--muted)] py-[11px] border-b border-[var(--border)] last:border-b-0 hover:text-blue hover:pl-2 transition-all duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onOpenModal(); setMenuOpen(false) }}
            className="mt-4 w-full bg-blue text-white py-[13px] rounded-[10px] text-base font-bold hover:shadow-[0_8px_24px_rgba(27,94,255,0.4)] transition-shadow"
          >
            Book a Strategy Call →
          </button>
        </div>
      </div>
    </>
  )
}