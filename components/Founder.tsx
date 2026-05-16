'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface FounderData {
  name: string
  role: string
  bio: string
  photo?: string
  chips: string[]
}

interface FounderProps {
  onOpenModal: () => void
  founder: FounderData | null
}

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('on') }),
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    )
    el.querySelectorAll('.rv').forEach((node) => obs.observe(node))
    return () => obs.disconnect()
  }, [ref])
}

export default function Founder({ onOpenModal, founder }: FounderProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref as React.RefObject<HTMLElement>)

  // Fallback values while Sanity content isn't filled yet
  const name  = founder?.name  ?? 'Wassim Lebrima'
  const role  = founder?.role  ?? 'Founder of DZ Viral Medical — Healthcare Branding Specialist'
  const bio   = founder?.bio   ?? 'Specialized in healthcare branding and authority-driven content systems. Wassim built DZ Viral Medical with one mission: giving Algerian clinics and doctors the digital presence they deserve — premium, trustworthy, and patient-attracting.'
  const chips = founder?.chips ?? ['Healthcare Marketing', 'Patient Psychology', 'Medical Branding', 'Content Strategy', 'Social Media Growth']
  const photo = founder?.photo ?? null

  return (
    <section
      id="founder"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[100px] px-[5vw] relative overflow-hidden bg-[var(--bg2)]"
    >
      {/* Bg blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute rounded-full" style={{ width: 340, height: 340, bottom: -70, right: -30, background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 13s ease-in-out infinite', animationDelay: '-5s' }} />
        <div className="absolute rounded-full" style={{ width: 190, height: 190, top: -40, left: '8%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 10s ease-in-out infinite', animationDelay: '-2s' }} />
        <div className="absolute rounded-full" style={{ width: 130, height: 130, top: '42%', left: '42%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 18s ease-in-out infinite', animationDelay: '-9s' }} />
      </div>

      <svg className="g-arrow" width="280" height="280" viewBox="0 0 280 280" fill="none">
        <circle cx="140" cy="140" r="104" stroke="#1B5EFF" strokeWidth="18" strokeDasharray="40 24" />
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-[5rem] items-center relative z-[1]">

        {/* Photo — real image from Sanity or placeholder */}
        {photo ? (
          <div className="rv aspect-[3/4] rounded-[22px] overflow-hidden relative border-2 border-[var(--border2)]">
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover object-top transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="rv aspect-[3/4] rounded-[22px] bg-[var(--card)] border-2 border-dashed border-[var(--border2)] flex flex-col items-center justify-center gap-[13px] text-[var(--faint)] text-[.78rem] cursor-pointer transition-all duration-350 hover:border-blue hover:scale-[1.01] group" style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}>
            <svg className="opacity-[.28] group-hover:opacity-[.62] group-hover:scale-[1.2] group-hover:-translate-y-1 transition-all duration-350" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="18" r="9.5" stroke="#1B5EFF" strokeWidth="1.6" />
              <path d="M9 44C9 34 39 34 39 44" stroke="#1B5EFF" strokeWidth="1.6" strokeLinecap="round" fill="none" />
            </svg>
            <span>Add founder photo in Sanity</span>
          </div>
        )}

        {/* Text content */}
        <div>
          <p className="s-label rv">The Founder</p>
          <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3vw,2.7rem)] tracking-[-0.04em] mb-[.4rem] rv d1">
            {name}
          </h2>
          <p className="text-blue text-[.88rem] font-semibold mb-[1.3rem] tracking-[.01em] rv d2">
            {role}
          </p>
          <p className="text-[var(--muted)] text-[1rem] leading-[1.8] mb-[1.7rem] max-w-[460px] rv d3">
            {bio}
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-[7px] mb-[1.8rem] rv d4">
            {chips.map((chip) => (
              <span
                key={chip}
                className="bg-[var(--card)] border border-[var(--border)] px-[13px] py-[6px] rounded-full text-[.76rem] font-semibold text-[var(--muted)] font-heading cursor-default transition-all duration-300 hover:border-blue hover:text-blue hover:-translate-y-0.5"
                style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
              >
                {chip}
              </span>
            ))}
          </div>

          <button
            onClick={onOpenModal}
            className="rv d5 bg-blue text-white px-8 py-[14px] rounded-[10px] text-[.97rem] font-bold inline-flex items-center gap-[10px] group transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_14px_36px_rgba(27,94,255,0.44)]"
          >
            Work With {name.split(' ')[0]}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-[5px]">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}