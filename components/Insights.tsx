'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Insight {
  _id: string
  category: string
  title: string
  description: string
  readTime: string
  thumbnail?: string
}

interface InsightsProps {
  insights: Insight[]
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

// Fallback thumbnail icons per category (used when no image uploaded in Sanity)
function FallbackIcon({ category }: { category: string }) {
  const cat = category?.toLowerCase() ?? ''

  if (cat.includes('social')) {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="5" y="5" width="30" height="30" rx="4" stroke="#1B5EFF" strokeWidth="1.6" />
        <path d="M11 29L20 11L29 29" stroke="#1B5EFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 23L27 23" stroke="#1B5EFF" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }

  if (cat.includes('brand')) {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 4L24.5 14L35 15.5L27.5 23L29.5 34L20 29L10.5 34L12.5 23L5 15.5L15.5 14Z" stroke="#1B5EFF" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    )
  }

  // Default — patient psychology / generic
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="5" y="5" width="30" height="30" rx="4" stroke="#1B5EFF" strokeWidth="1.6" />
      <path d="M11 29L11 17M17 29L17 11M23 29L23 16M29 29L29 8" stroke="#1B5EFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Insights({ insights }: InsightsProps) {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref as React.RefObject<HTMLElement>)

  return (
    <section
      id="insights"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[100px] px-[5vw] relative overflow-hidden bg-[var(--bg)]"
    >
      {/* Bg blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute rounded-full" style={{ width: 300, height: 300, top: -65, right: -25, background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 14s ease-in-out infinite', animationDelay: '-4s' }} />
        <div className="absolute rounded-full" style={{ width: 170, height: 170, bottom: -45, left: '6%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 11s ease-in-out infinite', animationDelay: '-7s' }} />
      </div>

      <p className="s-label rv">Insights</p>
      <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] tracking-[-0.045em] leading-[1.07] rv d1">
        Expert Knowledge.<br /><span className="text-blue">Free for Healthcare Pros.</span>
      </h2>
      <p className="text-[var(--muted)] mt-[.85rem] text-[1rem] max-w-[480px] leading-[1.78] rv d2">
        Deep dives into medical marketing, patient psychology, and healthcare branding in Algeria.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.3rem] mt-[2.6rem] relative z-[1]">
        {insights.map((a, i) => (
          <div
            key={a._id}
            className={`rv d${Math.min(i + 1, 4)} bg-[var(--card)] rounded-[var(--radius-card)] border border-[var(--border)] overflow-hidden cursor-pointer transition-all duration-350 hover:-translate-y-[6px] hover:shadow-[0_18px_38px_var(--sh)] group`}
            style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
          >
            {/* Thumbnail — real image from Sanity or fallback icon */}
            {a.thumbnail ? (
              <div className="h-[144px] relative overflow-hidden border-b border-[var(--border)]">
                <Image
                  src={a.thumbnail}
                  alt={a.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
            ) : (
              <div className="h-[144px] bg-[var(--bg2)] border-b border-dashed border-[var(--border)] flex items-center justify-center transition-colors duration-300 group-hover:bg-[rgba(27,94,255,.04)]">
                <div className="opacity-[.28] group-hover:opacity-[.68] group-hover:scale-[1.22] group-hover:-translate-y-1 transition-all duration-450" style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}>
                  <FallbackIcon category={a.category} />
                </div>
              </div>
            )}

            {/* Body */}
            <div className="p-[19px]">
              <span className="text-[.58rem] font-bold tracking-[.16em] uppercase text-blue mb-[6px] block">
                {a.category}
              </span>
              <h4 className="font-heading font-bold text-[.93rem] leading-[1.36] mb-[6px] tracking-[-0.02em]">
                {a.title}
              </h4>
              <p className="text-[.82rem] text-[var(--muted)] leading-[1.63]">{a.description}</p>
            </div>

            {/* Footer */}
            <div className="px-[19px] py-[12px] border-t border-[var(--border)] flex items-center justify-between">
              <span className="text-[.7rem] text-[var(--faint)]">{a.readTime}</span>
              <span className="text-blue font-semibold text-[.76rem] group-hover:translate-x-[3px] transition-transform duration-300 inline-block">
                Read →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}