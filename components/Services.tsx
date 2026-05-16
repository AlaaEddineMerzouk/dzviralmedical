'use client'

import { useEffect, useRef } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────

export interface TrustedClient {
  _id: string
  name: string
  order: number
}

interface ServicesProps {
  onOpenModal: () => void
  clients?: TrustedClient[]
}

// ── Fallback (shown if CMS has no entries yet) ────────────────────────────

const FALLBACK_CLIENTS = [
  'Clinic Oran', 'Dr. Benali', 'Aesthetic Alger', 'MediCenter DZ',
  'Dento Clinic', 'Skin Pro', 'Health Hub', 'CliniquePlus',
]

// ── Reveal hook ───────────────────────────────────────────────────────────

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

// ── Static data ───────────────────────────────────────────────────────────

const problemCards = [
  {
    title: 'Generic Content',
    desc: 'Copy-paste posts that look like every other clinic. No identity, no differentiation, no results.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="16" height="16" rx="3" stroke="#1B5EFF" strokeWidth="1.5"/>
        <path d="M7 11h8M7 8h5M7 14h6" stroke="#1B5EFF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Zero Trust Building',
    desc: 'Patients don\'t book from accounts they don\'t trust. Most clinics never build that trust online.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="10" width="14" height="9" rx="2" stroke="#1B5EFF" strokeWidth="1.5"/>
        <path d="M8 10V7a3 3 0 016 0v3" stroke="#1B5EFF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="15" r="1.5" fill="#1B5EFF"/>
      </svg>
    ),
  },
  {
    title: 'Weak Local Positioning',
    desc: 'No strategy to dominate their city. Invisible to patients searching for specialists nearby.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L11 5M3 11L5 11M17 11L19 11M11 17L11 19" stroke="#1B5EFF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="11" cy="11" r="4" stroke="#1B5EFF" strokeWidth="1.5"/>
        <circle cx="11" cy="11" r="1.5" fill="#1B5EFF"/>
      </svg>
    ),
  },
  {
    title: 'No Digital Authority',
    desc: 'Patients choose the clinic they perceive as best — not necessarily the best. Perception is everything.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L13.5 8.5L19 9.5L15 13.5L16 19L11 16.5L6 19L7 13.5L3 9.5L8.5 8.5Z" stroke="#1B5EFF" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const systems = [
  {
    num: '01',
    badge: 'Trust™ System',
    name: 'The Patient Trust System™',
    desc: 'Build deep patient trust before the first appointment. A multi-touchpoint framework that converts followers into booked patients through psychological authority building.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3C8 3 4 7 4 12C4 15.5 6 18.5 9 20L9 23L17 23L17 20C20 18.5 22 15.5 22 12C22 7 18 3 13 3Z" stroke="#1B5EFF" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M10 12L12 14L16 10" stroke="#1B5EFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '02',
    badge: 'Authority™ System',
    name: 'The Medical Authority System™',
    desc: 'Position your clinic as the definitive local reference. Expert content, case showcases, and educational pillars that elevate your perceived expertise above all competitors.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 3L15.5 9L22 10L17.5 14.5L18.5 21L13 18L7.5 21L8.5 14.5L4 10L10.5 9Z" stroke="#1B5EFF" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: '03',
    badge: 'Dominance™ System',
    name: 'The Local Dominance System™',
    desc: 'Own your city. Hyper-local content strategy, geo-targeted distribution, and community authority positioning to make your clinic impossible to ignore locally.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="9" stroke="#1B5EFF" strokeWidth="1.5"/>
        <path d="M13 4L13 13" stroke="#1B5EFF" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M13 13L18 8" stroke="#1B5EFF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="13" cy="13" r="2" fill="#1B5EFF"/>
      </svg>
    ),
  },
]

// ── Component ─────────────────────────────────────────────────────────────

export default function Services({ onOpenModal, clients = [] }: ServicesProps) {
  const problemRef = useRef<HTMLElement>(null)
  const systemsRef = useRef<HTMLElement>(null)
  useReveal(problemRef as React.RefObject<HTMLElement>)
  useReveal(systemsRef as React.RefObject<HTMLElement>)

  // Use CMS clients if available, otherwise fall back to hardcoded list
  const names = clients.length > 0
    ? clients.map((c) => c.name)
    : FALLBACK_CLIENTS

  // Duplicate for seamless infinite scroll
  const scrollItems = [...names, ...names]

  return (
    <>
      {/* ── TRUST STRIP ── */}
      <div className="py-[42px] px-[5vw] overflow-hidden border-t border-b border-[var(--border)] bg-[var(--bg2)]">
        <div className="flex items-center gap-6">
          <span className="text-[.68rem] font-bold text-[var(--faint)] uppercase tracking-[.15em] whitespace-nowrap min-w-[100px]">Trusted by</span>
          <div className="overflow-hidden flex-1 relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--bg2), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--bg2), transparent)' }} />
            <div className="flex gap-[1.4rem] w-max animate-trust-scroll items-center">
              {scrollItems.map((name, i) => (
                <span
                  key={i}
                  className="h-[34px] rounded-[8px] bg-[var(--card)] border border-[var(--border)] px-[18px] flex items-center font-heading font-bold text-[.8rem] text-[var(--muted)] whitespace-nowrap flex-shrink-0 cursor-default transition-colors duration-300 hover:border-blue hover:text-blue"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── PROBLEM SECTION ── */}
      <section id="problem" ref={problemRef as React.RefObject<HTMLElement>} className="py-[100px] px-[5vw] relative overflow-hidden bg-[var(--bg)]">
        {/* Bg blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute rounded-full" style={{ width:380,height:380,top:-80,right:-50,background:'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)',animation:'drift 13s ease-in-out infinite' }} />
          <div className="absolute rounded-full" style={{ width:220,height:220,bottom:-60,left:'5%',background:'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)',animation:'drift 10s ease-in-out infinite',animationDelay:'-4s' }} />
        </div>
        <svg className="g-arrow" width="300" height="300" viewBox="0 0 300 300" fill="none">
          <path d="M50 150L250 150M175 75L250 150L175 225" stroke="#1B5EFF" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[4rem] items-center mt-[3.8rem] relative z-[1]">
          <div>
            <p className="s-label rv">The Problem</p>
            <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] tracking-[-0.045em] leading-[1.07] max-w-[640px] rv d1">
              Why Most Clinics Fail<br />On <span className="text-blue">Social Media</span>
            </h2>
            <p className="text-[var(--muted)] mt-[.85rem] text-[1rem] max-w-[480px] leading-[1.78] font-normal rv d2">
              Healthcare providers are losing patients to competitors — not because they&apos;re less skilled, but because they&apos;re invisible online.
            </p>

            <div className="flex flex-col gap-[.85rem] mt-8">
              {problemCards.map((card, i) => (
                <div
                  key={card.title}
                  className={`rv d${i + 1} flex gap-[15px] items-start p-[18px_20px] rounded-[16px] border border-[var(--border)] bg-[var(--card)] cursor-default transition-all duration-350 hover:border-blue hover:translate-x-2 hover:shadow-[0_6px_22px_var(--sh)]`}
                >
                  <div className="w-11 h-11 rounded-[12px] bg-[var(--blue-pale)] flex items-center justify-center flex-shrink-0 transition-all duration-350 hover:bg-[rgba(27,94,255,.18)] hover:scale-110 hover:rotate-[-6deg]">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[.93rem] mb-[3px] tracking-[-0.02em]">{card.title}</h4>
                    <p className="text-[.84rem] text-[var(--muted)] leading-[1.64]">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Blue CTA box */}
          <div className="rv d2 bg-blue rounded-[24px] p-[42px_38px] text-white flex flex-col gap-[1.3rem] relative overflow-hidden">
            <div className="absolute inset-0 rounded-[24px]" style={{ background: 'radial-gradient(ellipse 68% 68% at 88% 14%,rgba(255,255,255,.13) 0%,transparent 60%)' }} />
            <h3 className="font-heading font-extrabold text-[clamp(1.45rem,2.5vw,1.9rem)] leading-[1.15] tracking-[-0.04em] relative z-[1]">
              Ready to be the most <span className="font-light">trusted</span> clinic in your city?
            </h3>
            <p className="opacity-80 text-[.93rem] leading-[1.74] relative z-[1]">
              We&apos;ve built specialized systems to turn your clinic&apos;s social media into a 24/7 patient acquisition engine.
            </p>
            <button
              onClick={onOpenModal}
              className="self-start bg-white text-blue px-6 py-3 rounded-[9px] text-[.93rem] font-bold relative z-[1] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,.2)]"
            >
              Book a Strategy Call →
            </button>
            <div className="relative z-[1] rounded-[12px] h-36 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors duration-300" style={{ background: 'rgba(255,255,255,.09)', border: '1px dashed rgba(255,255,255,.22)' }}>
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="3" y="5" width="20" height="15" rx="2.5" stroke="rgba(255,255,255,.45)" strokeWidth="1.4"/>
                <path d="M10 9L18 13L10 17Z" fill="rgba(255,255,255,.35)"/>
              </svg>
              <span className="text-[.76rem] text-white/40">Add image or video here</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SYSTEMS SECTION ── */}
      <section id="systems" ref={systemsRef as React.RefObject<HTMLElement>} className="py-[100px] px-[5vw] relative overflow-hidden bg-[var(--bg2)]">
        {/* Bg blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute rounded-full" style={{ width:320,height:320,top:-60,left:-30,background:'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)',animation:'drift 12s ease-in-out infinite',animationDelay:'-2s' }} />
          <div className="absolute rounded-full" style={{ width:200,height:200,bottom:-50,right:'8%',background:'radial-gradient(circle,rgba(27,94,255,.065) 0%,transparent 70%)',animation:'drift 9s ease-in-out infinite',animationDelay:'-5s' }} />
        </div>
        <svg className="g-arrow left" width="260" height="260" viewBox="0 0 260 260" fill="none">
          <circle cx="130" cy="130" r="94" stroke="#1B5EFF" strokeWidth="20" strokeDasharray="32 20"/>
        </svg>

        <p className="s-label rv">Our Systems</p>
        <h2 className="font-heading font-extrabold text-[clamp(1.9rem,3.4vw,3rem)] tracking-[-0.045em] leading-[1.07] max-w-[640px] rv d1">
          Proprietary Frameworks<br />Built for <span className="text-blue">Healthcare</span>
        </h2>
        <p className="text-[var(--muted)] mt-[.85rem] text-[1rem] max-w-[480px] leading-[1.78] rv d2">
          Every system is designed with one goal: making your clinic the undeniable first choice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.3rem] mt-[2.6rem] relative z-[1]">
          {systems.map((sys, i) => (
            <div
              key={sys.num}
              className={`rv d${i + 1} bg-[var(--card)] rounded-[20px] border border-[var(--border)] p-[30px_26px] relative overflow-hidden cursor-default transition-all duration-420 hover:-translate-y-2.5 hover:shadow-[0_28px_56px_var(--sh2)] hover:border-blue-dim group`}
              style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
            >
              <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(135deg,rgba(27,94,255,.055) 0%,transparent 55%)' }} />
              <div className="font-heading font-extrabold text-[3.6rem] text-blue leading-none mb-[-10px] tracking-[-0.05em] opacity-[.09] group-hover:opacity-[.18] transition-opacity duration-400">
                {sys.num}
              </div>
              <div className="w-[50px] h-[50px] rounded-[13px] bg-[var(--blue-pale)] flex items-center justify-center mb-[.9rem] relative z-[1] transition-all duration-450 group-hover:bg-[rgba(27,94,255,.18)] group-hover:scale-110 group-hover:rotate-[-7deg]" style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}>
                {sys.icon}
              </div>
              <span className="inline-flex text-[.58rem] font-bold tracking-[.14em] uppercase text-blue border border-[rgba(27,94,255,.26)] px-[9px] py-[2px] rounded-full mb-[9px] relative z-[1]">
                {sys.badge}
              </span>
              <h3 className="font-heading font-extrabold text-[.97rem] mb-[7px] tracking-[-0.03em] relative z-[1]">{sys.name}</h3>
              <p className="text-[.85rem] text-[var(--muted)] leading-[1.66] relative z-[1]">{sys.desc}</p>
            </div>
          ))}
        </div>

        {/* Media slots */}
        <div className="grid grid-cols-3 gap-4 mt-[1.3rem] relative z-[1]">
          {[
            { label: 'Explainer Video', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="5" width="20" height="14" rx="2.5" stroke="#1B5EFF" strokeWidth="1.4"/><path d="M10 9L18 13L10 17Z" fill="#1B5EFF"/></svg> },
            { label: 'Results Graphic', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="3" width="20" height="20" rx="3" stroke="#1B5EFF" strokeWidth="1.4"/><path d="M6 19L9 12L13 16L16 9L20 19Z" stroke="#1B5EFF" strokeWidth="1.4" strokeLinejoin="round" fill="none"/></svg> },
            { label: 'Clinic Photo', icon: <svg width="26" height="26" viewBox="0 0 26 26" fill="none"><rect x="3" y="3" width="20" height="20" rx="3" stroke="#1B5EFF" strokeWidth="1.4"/><circle cx="13" cy="13" r="5" stroke="#1B5EFF" strokeWidth="1.4"/></svg> },
          ].map((slot, i) => (
            <div key={i} className={`rv d${i + 1} rounded-[16px] border-[1.5px] border-dashed border-[var(--border2)] bg-[var(--bg)] h-[100px] flex flex-col items-center justify-center gap-[7px] cursor-pointer transition-all duration-300 hover:border-blue hover:bg-[var(--blue-pale)] hover:scale-[1.04] group`}>
              <div className="opacity-30 group-hover:opacity-70 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-350">{slot.icon}</div>
              <span className="text-[.72rem] text-[var(--faint)] group-hover:text-[var(--muted)] transition-colors">{slot.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}