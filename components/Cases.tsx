'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface CasesProps {
  onOpenModal: () => void
  cases: {
    _id: string
    tag: string
    title: string
    description: string
    image?: string
    metrics: { num: string; label: string }[]
  }[]
  testimonials: {
    _id: string
    quote: string
    name: string
    role: string
    initials: string
    photo?: string
  }[]
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

// Unique SVG icon per case card index — matching the HTML original
function ThumbIcon({ index }: { index: number }) {
  if (index === 1) return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <rect x="4" y="9" width="34" height="23" rx="4" stroke="#1B5EFF" strokeWidth="1.6" opacity=".3" />
      <path d="M16 15L30 21L16 27Z" fill="#1B5EFF" opacity=".45" />
    </svg>
  )
  if (index === 2) return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <rect x="4" y="4" width="34" height="34" rx="5" stroke="#1B5EFF" strokeWidth="1.6" opacity=".3" />
      <path d="M9 33L16 19L22 27L28 13L33 33Z" stroke="#1B5EFF" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    </svg>
  )
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      <rect x="4" y="4" width="34" height="34" rx="5" stroke="#1B5EFF" strokeWidth="1.6" opacity=".3" />
      <circle cx="21" cy="21" r="8" stroke="#1B5EFF" strokeWidth="1.6" opacity=".5" />
      <circle cx="21" cy="21" r="2.5" fill="#1B5EFF" />
    </svg>
  )
}

export default function Cases({ onOpenModal, cases, testimonials }: CasesProps) {
  const casesRef = useRef<HTMLElement>(null)
  const testiRef = useRef<HTMLElement>(null)
  useReveal(casesRef as React.RefObject<HTMLElement>)
  useReveal(testiRef as React.RefObject<HTMLElement>)

  return (
    <>
      {/* ── CASES ── */}
      <section
        id="cases"
        ref={casesRef as React.RefObject<HTMLElement>}
        className="py-[100px] px-[5vw] relative overflow-hidden bg-[var(--bg2)]"
      >
        {/* Bg blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute rounded-full" style={{ width: 340, height: 340, top: -70, left: -30, background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 14s ease-in-out infinite', animationDelay: '-1s' }} />
          <div className="absolute rounded-full" style={{ width: 190, height: 190, bottom: -50, right: '6%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 11s ease-in-out infinite', animationDelay: '-7s' }} />
          <div className="absolute rounded-full" style={{ width: 130, height: 130, top: '52%', left: '52%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 19s ease-in-out infinite', animationDelay: '-4s' }} />
        </div>

        <svg className="g-arrow left" width="280" height="280" viewBox="0 0 280 280" fill="none">
          <path d="M240 140L40 140M115 65L40 140L115 215" stroke="#1B5EFF" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        <p className="s-label rv">Case Studies</p>
        <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] tracking-[-0.045em] leading-[1.07] rv d1">
          Real Clinics.<br /><span className="text-blue">Real Results.</span>
        </h2>
        <p className="text-[var(--muted)] mt-[.85rem] text-[1rem] max-w-[480px] leading-[1.78] rv d2">
          Each partnership is a full strategic transformation — not just social media management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1.3rem] mt-[2.6rem] relative z-[1]">
          {cases.map((c, i) => (
            <div
              key={c._id}
              className={`rv d${Math.min(i + 1, 4)} bg-[var(--card)] rounded-[20px] border border-[var(--border)] overflow-hidden transition-all duration-[420ms] hover:-translate-y-2 hover:shadow-[0_26px_52px_var(--sh2)] group`}
              style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
            >
              {/* Thumbnail */}
              {c.image ? (
                <div className="h-[190px] relative overflow-hidden border-b border-[var(--border)]">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
              ) : (
                <div className="h-[190px] bg-[var(--bg2)] border-b border-dashed border-[var(--border)] flex flex-col items-center justify-center gap-[9px] text-[var(--faint)] text-[.76rem] cursor-pointer transition-colors duration-300 group-hover:bg-[rgba(27,94,255,.04)]">
                  <div
                    className="opacity-[.26] group-hover:opacity-[.62] group-hover:scale-[1.22] group-hover:-translate-y-1 transition-all duration-[450ms]"
                    style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
                  >
                    <ThumbIcon index={i} />
                  </div>
                  <span>Add Photo / Video</span>
                </div>
              )}

              {/* Body */}
              <div className="p-[22px]">
                <span className="inline-block text-[.58rem] font-bold tracking-[.14em] uppercase text-blue bg-[rgba(27,94,255,.08)] px-[10px] py-[3px] rounded-full mb-[9px]">
                  {c.tag}
                </span>
                <h4 className="font-heading font-extrabold text-[1.02rem] mb-[6px] tracking-[-0.03em]">{c.title}</h4>
                <p className="text-[.85rem] text-[var(--muted)] leading-[1.63] mb-[13px]">{c.description}</p>
                <div className="flex gap-[1.4rem] pt-[13px] border-t border-[var(--border)]">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-heading font-extrabold text-[1.28rem] text-blue leading-none tracking-[-0.03em]">{m.num}</div>
                      <div className="text-[.68rem] text-[var(--faint)] mt-[2px]">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* CTA card */}
          <div
            className="rv d4 rounded-[20px] overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#1B5EFF,#1045d6)', border: 'none' }}
          >
            <div className="p-[38px_26px] text-white h-full flex flex-col justify-between min-h-[300px]">
              <div>
                <span className="text-[.58rem] font-bold tracking-[.18em] uppercase opacity-60">Ready?</span>
                <h4 className="font-heading font-extrabold text-[1.6rem] leading-[1.16] tracking-[-0.04em] my-[.7rem]">
                  Your clinic could be the next success story.
                </h4>
                <p className="text-[.9rem] opacity-75 leading-[1.72]">
                  We partner with a limited number of clinics per city to guarantee exclusivity and focus.
                </p>
              </div>
              <button
                onClick={onOpenModal}
                className="mt-[1.8rem] self-start bg-white text-blue px-6 py-[11px] rounded-[9px] text-[.9rem] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,.22)]"
              >
                Apply For Partnership →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section
        id="testimonials"
        ref={testiRef as React.RefObject<HTMLElement>}
        className="py-[100px] px-[5vw] relative overflow-hidden bg-[var(--bg)]"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute rounded-full" style={{ width: 280, height: 280, top: -55, right: 0, background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 12s ease-in-out infinite', animationDelay: '-2s' }} />
          <div className="absolute rounded-full" style={{ width: 170, height: 170, bottom: -40, left: '20%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 16s ease-in-out infinite', animationDelay: '-8s' }} />
        </div>

        <p className="s-label rv">Testimonials</p>
        <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] tracking-[-0.045em] leading-[1.07] rv d1">
          What Our Partners <span className="text-blue">Say</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.3rem] mt-[2.6rem] relative z-[1]">
          {testimonials.map((t, i) => (
            <div
              key={t._id}
              className={`rv d${Math.min(i + 1, 4)} bg-[var(--card)] rounded-[var(--radius-card)] border border-[var(--border)] p-[26px] transition-all duration-[380ms] hover:-translate-y-[5px] hover:shadow-[0_14px_32px_var(--sh)]`}
              style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
            >
              <div className="text-[#F59E0B] text-[.85rem] tracking-[2px] mb-[11px]">★★★★★</div>
              <p className="font-heading font-normal text-[.93rem] text-[var(--muted)] leading-[1.76] mb-[17px]">
                {t.quote}
              </p>
              <div className="flex items-center gap-[10px]">
                {t.photo ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
                    <Image src={t.photo} alt={t.name} fill className="object-cover" />
                  </div>
                ) : (
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-heading font-extrabold text-[.86rem] text-white"
                    style={{ background: 'linear-gradient(135deg,#1B5EFF,#60a5fa)' }}
                  >
                    {t.initials}
                  </div>
                )}
                <div>
                  <div className="font-heading font-bold text-[.875rem] tracking-[-0.01em]">{t.name}</div>
                  <div className="text-[.72rem] text-[var(--faint)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video testimonial slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[1.3rem] relative z-[1]">
          {['Video Testimonial 1', 'Video Testimonial 2', 'Video Testimonial 3'].map((label, i) => (
            <div
              key={i}
              className={`rv d${i + 1} h-[104px] rounded-[16px] border-[1.5px] border-dashed border-[var(--border2)] bg-[var(--bg2)] flex flex-col items-center justify-center gap-[7px] cursor-pointer transition-all duration-300 hover:border-blue hover:bg-[var(--blue-pale)] hover:scale-[1.04] group`}
            >
              <div
                className="opacity-[.32] group-hover:opacity-[.72] group-hover:scale-[1.2] group-hover:-translate-y-[3px] transition-all duration-[420ms]"
                style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="14" rx="2.5" stroke="#1B5EFF" strokeWidth="1.4" />
                  <path d="M9 8L17 12L9 16Z" fill="#1B5EFF" opacity=".5" />
                </svg>
              </div>
              <span className="text-[.72rem] text-[var(--faint)] group-hover:text-[var(--muted)] transition-colors">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}