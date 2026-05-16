'use client'

interface HeroProps {
  onOpenModal: () => void
}

const mediaSlots = [
  { label: 'Clinic Photo' },
  { label: 'Before / After' },
  { label: 'Results Chart' },
  { label: 'Testimonial' },
  { label: 'Clinic Tour' },
  { label: 'Success Story' },
  { label: 'Brand Shot' },
  { label: 'Analytics' },
]

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-screen pt-[136px] pb-20 px-[5vw] flex flex-col justify-center relative overflow-hidden"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 75% 75% at 50% 28%, #000 20%, transparent 100%)',
        }}
      />

      {/* Orbs */}
      <div className="absolute top-[-100px] right-[-80px] w-[520px] h-[520px] rounded-full pointer-events-none blur-[72px] animate-float-a"
        style={{ background: 'radial-gradient(circle, rgba(27,94,255,.15) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[60px] left-[-40px] w-[250px] h-[250px] rounded-full pointer-events-none blur-[72px] animate-float-b"
        style={{ background: 'radial-gradient(circle, rgba(27,94,255,.09) 0%, transparent 70%)' }} />

      {/* Tag */}
      <div className="inline-flex items-center gap-[9px] bg-[var(--card)] border border-[var(--border)] px-4 py-[6px] rounded-full text-[0.76rem] font-semibold text-[var(--muted)] tracking-wider mb-7 w-fit animate-fade-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <span className="w-2 h-2 rounded-full bg-blue flex-shrink-0 animate-ping-slow" />
        Algeria&apos;s #1 Healthcare Marketing Agency
      </div>

      {/* Heading */}
      <h1 className="font-heading font-extrabold text-[clamp(2.6rem,5.5vw,5rem)] leading-[1.05] tracking-[-0.04em] max-w-[860px] animate-fade-up opacity-0" style={{ animationDelay: '0.28s', animationFillMode: 'forwards' }}>
        We Help Clinics<br />
        Become <span className="text-blue">The First Choice</span><br />
        In Their City.
      </h1>

      {/* Subtitle */}
      <p className="mt-5 text-[clamp(0.96rem,1.4vw,1.1rem)] text-[var(--muted)] max-w-[500px] leading-[1.78] font-normal animate-fade-up opacity-0" style={{ animationDelay: '0.44s', animationFillMode: 'forwards' }}>
        Specialized Healthcare Marketing &amp; Patient Trust Systems for Clinics, Doctors &amp; Aesthetic Centers across Algeria.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-[0.9rem] mt-9 flex-wrap animate-fade-up opacity-0" style={{ animationDelay: '0.58s', animationFillMode: 'forwards' }}>
        <button
          onClick={onOpenModal}
          className="bg-blue text-white px-8 py-[14px] rounded-[10px] text-[0.97rem] font-bold inline-flex items-center gap-[10px] group transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_14px_36px_rgba(27,94,255,0.44)]"
        >
          Book A Strategy Call
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[5px]">→</span>
        </button>
        <button
          onClick={() => document.getElementById('systems')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-transparent text-[var(--text)] px-[26px] py-[14px] rounded-[10px] text-[0.97rem] font-medium border border-[1.5px] border-[var(--border)] hover:border-blue hover:text-blue transition-all duration-300"
          style={{ borderWidth: '1.5px' }}
        >
          See Our Systems
        </button>
      </div>

      {/* Stats */}
      <div className="flex gap-11 mt-14 flex-wrap animate-fade-up opacity-0" style={{ animationDelay: '0.72s', animationFillMode: 'forwards' }}>
        {[
          { num: '50', suffix: '+', label: 'Clinics Helped' },
          { num: '3', suffix: '×', label: 'Patient Growth' },
          { num: '100', suffix: '%', label: 'Medical Focus' },
        ].map((s) => (
          <div key={s.label}>
            <div className="font-heading text-[2.1rem] font-extrabold leading-none tracking-[-0.03em]">
              {s.num}<b className="text-blue">{s.suffix}</b>
            </div>
            <div className="text-[0.76rem] text-[var(--muted)] mt-[3px] font-medium tracking-[0.04em] uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Media strip */}
      <div className="mt-14 animate-fade-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
        <div className="text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[var(--faint)] mb-3">
          Media Gallery — Add Your Content Below
        </div>
        <div className="overflow-hidden rounded-[16px] relative">
          <div className="absolute left-0 top-0 bottom-0 w-[100px] z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-[100px] z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }} />
          <div className="flex gap-4 w-max animate-scroll-left hover:[animation-play-state:paused]">
            {[...mediaSlots, ...mediaSlots].map((slot, i) => (
              <div key={i} className="w-[230px] h-[144px] flex-shrink-0 rounded-[16px] border-[1.5px] border-dashed border-[var(--border2)] bg-[var(--bg2)] flex flex-col items-center justify-center gap-[10px] cursor-pointer transition-all duration-300 hover:border-blue hover:bg-blue/5 hover:scale-[1.04] group">
                <svg className="opacity-30 group-hover:opacity-70 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect x="3" y="6" width="26" height="19" rx="3" stroke="#1B5EFF" strokeWidth="1.6"/>
                  <path d="M12 11L22 16L12 21Z" fill="#1B5EFF"/>
                </svg>
                <span className="text-[0.72rem] text-[var(--faint)] font-medium group-hover:text-[var(--muted)] transition-colors">{slot.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}