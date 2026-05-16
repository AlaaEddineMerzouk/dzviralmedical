'use client'

interface CtaFinalProps {
  onOpenModal: () => void
}

export default function CtaFinal({ onOpenModal }: CtaFinalProps) {
  return (
    <section
      id="cta-final"
      className="py-[120px] px-[5vw] text-center relative overflow-hidden"
      /* Fixed background ensures readability in Dark Mode */
      style={{ background: '#0A0C16', color: '#fff' }}
    >
      {/* Animated orb */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle,rgba(27,94,255,.22) 0%,transparent 70%)',
          filter: 'blur(70px)',
          animation: 'floatA 9s ease-in-out infinite',
        }}
      />

      <span
        className="block text-[.68rem] font-bold tracking-[.22em] uppercase mb-[1.3rem] relative z-[1]"
        style={{ color: 'rgba(27,94,255,.9)' }}
      >
        Limited Partnerships Available
      </span>

      <h2
        className="font-heading font-extrabold tracking-[-0.05em] leading-[1.04] max-w-[720px] mx-auto mb-[1.3rem] relative z-[1]"
        style={{ fontSize: 'clamp(2.6rem,5vw,4.6rem)', color: '#fff' }}
      >
        We Don&apos;t Work<br />With <span style={{ color: 'rgba(27,94,255,.85)' }}>Every</span> Clinic.
      </h2>

      <p
        className="text-[1rem] max-w-[420px] mx-auto mb-[2.6rem] leading-[1.76] relative z-[1]"
        style={{ color: 'rgba(255,255,255,.48)' }}
      >
        We partner with a limited number of healthcare brands per city to guarantee exclusivity, focus, and results that move the needle.
      </p>

      <button
        onClick={onOpenModal}
        className="relative z-[1] bg-[#1B5EFF] text-white px-[42px] py-[15px] rounded-[12px] text-[1rem] font-bold inline-flex items-center gap-[11px] border-none cursor-pointer transition-all duration-350 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(27,94,255,.52)]"
        style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
      >
        Apply For Partnership →
      </button>

      <p
        className="mt-[1.3rem] text-[.76rem] relative z-[1]"
        style={{ color: 'rgba(255,255,255,.26)' }}
      >
        DM &ldquo;MEDICAL&rdquo; on Instagram · Free 20-min Strategy Call
      </p>
    </section>
  )
}