'use client'

interface FooterProps {
  onOpenModal: () => void
}

const serviceLinks = [
  { label: 'Patient Trust System™', href: '#systems' },
  { label: 'Medical Authority™', href: '#systems' },
  { label: 'Local Dominance™', href: '#systems' },
  { label: 'Our Process', href: '#process' },
]

const companyLinks = [
  { label: 'Case Studies', href: '#cases' },
  { label: 'About Wassim', href: '#founder' },
  { label: 'Insights', href: '#insights' },
  { label: 'Apply', href: null, modal: true },
]

const contactLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'TikTok', href: '#' },
  { label: 'DM "MEDICAL"', href: null, modal: true },
]

function scrollTo(id: string) {
  const target = document.getElementById(id.replace('#', ''))
  if (target) target.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer({ onOpenModal }: FooterProps) {
  return (
    <footer
      className="px-[5vw] pt-[56px] pb-[36px] border-t"
      style={{
        /* Using a fixed dark color so white text is always visible */
        background: '#0A0C16', 
        color: 'rgba(255,255,255,.44)',
        borderTopColor: 'rgba(255,255,255,.05)',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-[3rem] mb-[2.8rem]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-[.85rem]">
            <span
              className="font-heading font-extrabold text-[1.18rem] tracking-[-0.04em]"
              style={{ letterSpacing: '-.04em' }}
            >
              <span style={{ color: '#1B5EFF' }}>DZ</span>
              <span style={{ color: '#fff' }}>VIRAL</span>
            </span>
            <span
              className="font-body text-[.56rem] font-bold tracking-[.16em] uppercase px-2 py-[2px] rounded-full"
              style={{ color: '#1B5EFF', border: '1.5px solid rgba(27,94,255,.3)' }}
            >
              Medical
            </span>
          </div>
          <p className="text-[.84rem] leading-[1.74] max-w-[240px]" style={{ color: 'rgba(255,255,255,.44)' }}>
            Algeria&apos;s specialized healthcare marketing agency. Turning clinics into the first choice in their city.
          </p>
        </div>

        {/* Services */}
        <div>
          <h5 className="font-heading font-bold text-[.84rem] tracking-[.04em] mb-[.85rem]" style={{ color: '#fff' }}>
            Services
          </h5>
          <ul className="flex flex-col gap-[.4rem]">
            {serviceLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={() => scrollTo(l.href)}
                  className="text-[.84rem] bg-transparent border-none cursor-pointer p-0 transition-colors duration-250 hover:text-[#1B5EFF] text-left"
                  style={{ color: 'rgba(255,255,255,.38)', fontFamily: 'inherit' }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h5 className="font-heading font-bold text-[.84rem] tracking-[.04em] mb-[.85rem]" style={{ color: '#fff' }}>
            Company
          </h5>
          <ul className="flex flex-col gap-[.4rem]">
            {companyLinks.map((l) => (
              <li key={l.label}>
                <button
                  onClick={l.modal ? onOpenModal : () => scrollTo(l.href!)}
                  className="text-[.84rem] bg-transparent border-none cursor-pointer p-0 transition-colors duration-250 hover:text-[#1B5EFF] text-left"
                  style={{ color: 'rgba(255,255,255,.38)', fontFamily: 'inherit' }}
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-heading font-bold text-[.84rem] tracking-[.04em] mb-[.85rem]" style={{ color: '#fff' }}>
            Contact
          </h5>
          <ul className="flex flex-col gap-[.4rem]">
            {contactLinks.map((l) => (
              <li key={l.label}>
                {l.modal ? (
                  <button
                    onClick={onOpenModal}
                    className="text-[.84rem] bg-transparent border-none cursor-pointer p-0 transition-colors duration-250 hover:text-[#1B5EFF] text-left"
                    style={{ color: 'rgba(255,255,255,.38)', fontFamily: 'inherit' }}
                  >
                    {l.label}
                  </button>
                ) : (
                  <a
                    href={l.href!}
                    className="text-[.84rem] transition-colors duration-250 hover:text-[#1B5EFF]"
                    style={{ color: 'rgba(255,255,255,.38)' }}
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between flex-wrap gap-2 pt-[1.6rem] text-[.76rem]"
        style={{ borderTop: '1px solid rgba(255,255,255,.05)', color: 'rgba(255,255,255,.44)' }}
      >
        <span>© 2025 DZ Viral Medical. All rights reserved.</span>
        <span>Built for Algerian Healthcare Professionals</span>
      </div>
    </footer>
  )
}