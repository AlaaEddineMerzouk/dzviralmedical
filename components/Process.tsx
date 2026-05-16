'use client'

import { useEffect, useRef } from 'react'

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

const steps = [
  { num: '01', title: 'Audit', desc: 'Deep analysis of your digital presence, competitors, and positioning gaps in your local market.' },
  { num: '02', title: 'Strategy', desc: "A custom roadmap aligned with your clinic's specialty, city, and growth targets. No templates." },
  { num: '03', title: 'Production', desc: 'Premium content creation — video, photo, graphics — built to convert and establish authority.' },
  { num: '04', title: 'Optimization', desc: 'Continuous A/B testing and format iteration based on real engagement data.' },
  { num: '05', title: 'Growth', desc: 'Scaling what works — expanding reach, growing follower quality, driving appointment volume.' },
  { num: '06', title: 'Reporting', desc: 'Monthly transparent reports: follower growth, reach, engagement, and patient conversions.' },
]

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref as React.RefObject<HTMLElement>)

  return (
    <section
      id="process"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-[100px] px-[5vw] relative overflow-hidden bg-[var(--bg)]"
    >
      {/* Bg blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute rounded-full" style={{ width: 280, height: 280, top: -50, right: '6%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 11s ease-in-out infinite', animationDelay: '-3s' }} />
        <div className="absolute rounded-full" style={{ width: 170, height: 170, bottom: -40, left: '9%', background: 'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)', animation: 'drift 15s ease-in-out infinite', animationDelay: '-6s' }} />
      </div>

      {/* Ghost arrow */}
      <svg className="g-arrow" width="280" height="280" viewBox="0 0 280 280" fill="none">
        <path d="M40 140L240 140M165 65L240 140L165 215" stroke="#1B5EFF" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] relative z-[1]">
        {/* Left: timeline */}
        <div>
          <p className="s-label rv">How It Works</p>
          <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] tracking-[-0.045em] leading-[1.07] max-w-[640px] rv d1">
            A System Built for<br /><span className="text-blue">Consistent Growth</span>
          </h2>
          <p className="text-[var(--muted)] mt-[.85rem] text-[1rem] max-w-[480px] leading-[1.78] rv d2">
            From the first audit to ongoing reporting, every step compounds your clinic&apos;s digital authority.
          </p>

          {/* Timeline */}
          <div className="mt-8 flex flex-col gap-0 relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-[10px] bottom-[10px] w-[2px] bg-[var(--border)] z-0" />
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`rv d${Math.min(i, 5)} flex gap-[18px] items-start relative z-[1] pb-7 last:pb-0 group cursor-default`}
              >
                {/* Dot */}
                <div className="w-10 h-10 rounded-full bg-[var(--card)] border-2 border-[var(--border)] flex items-center justify-center flex-shrink-0 font-heading font-extrabold text-[.62rem] text-blue tracking-[.04em] transition-all duration-300 group-hover:border-blue group-hover:bg-[var(--blue-pale)] group-hover:scale-110" style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}>
                  {step.num}
                </div>
                <div className="pt-[6px]">
                  <h4 className="font-heading font-bold text-[.97rem] mb-[3px] tracking-[-0.02em] transition-colors duration-300 group-hover:text-blue">{step.title}</h4>
                  <p className="text-[.84rem] text-[var(--muted)] leading-[1.64]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: media placeholders */}
        <div className="rv d2 flex flex-col gap-4">
          {/* Big media slot */}
          <div
            className="flex-1 min-h-[280px] rounded-[20px] border-[1.5px] border-dashed border-[var(--border2)] bg-[var(--bg2)] flex flex-col items-center justify-center gap-[14px] cursor-pointer transition-all duration-300 hover:border-blue hover:bg-[var(--blue-pale)] group"
          >
            <svg className="opacity-30 group-hover:opacity-70 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" width="44" height="44" viewBox="0 0 44 44" fill="none">
              <rect x="5" y="9" width="34" height="24" rx="4" stroke="#1B5EFF" strokeWidth="1.8" opacity=".35" />
              <path d="M17 16L28 22L17 28Z" fill="#1B5EFF" opacity=".4" />
            </svg>
            <span className="text-[.78rem] text-[var(--faint)] font-medium group-hover:text-[var(--muted)] transition-colors">Add process video or infographic</span>
          </div>

          {/* Small slots row */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Before/After', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" stroke="#1B5EFF" strokeWidth="1.4" /><path d="M6 18L9 12L12 15L15 9L18 18Z" stroke="#1B5EFF" strokeWidth="1.4" strokeLinejoin="round" fill="none" /></svg> },
              { label: 'Growth Chart', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 19L5 13M9 19L9 7M13 19L13 11M17 19L17 4M21 19L21 9" stroke="#1B5EFF" strokeWidth="1.8" strokeLinecap="round" /></svg> },
            ].map((slot, i) => (
              <div key={i} className="h-[100px] rounded-[16px] border-[1.5px] border-dashed border-[var(--border2)] bg-[var(--bg2)] flex flex-col items-center justify-center gap-[7px] cursor-pointer transition-all duration-300 hover:border-blue hover:bg-[var(--blue-pale)] hover:scale-[1.04] group">
                <div className="opacity-30 group-hover:opacity-70 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">{slot.icon}</div>
                <span className="text-[.72rem] text-[var(--faint)] group-hover:text-[var(--muted)] transition-colors">{slot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}