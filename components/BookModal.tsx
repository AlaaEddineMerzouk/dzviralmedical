'use client'

import { useState, useEffect } from 'react'

interface BookModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookModal({ isOpen, onClose }: BookModalProps) {
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialty, setSpecialty] = useState('')
  const [city, setCity] = useState('')
  const [challenge, setChallenge] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (!isOpen) setTimeout(() => {
      setSuccess(false)
      setError('')
      setFirstName('')
      setLastName('')
      setEmail('')
      setPhone('')
      setSpecialty('')
      setCity('')
      setChallenge('')
    }, 500)
  }, [isOpen])

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !phone) {
      setError('Please fill in all required fields.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, specialty, city, challenge })
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError('Something went wrong. Please try again.')
      } else {
        setSuccess(true)
        setTimeout(() => onClose(), 3500)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "bg-[var(--bg2)] border-[1.5px] border-[var(--border)] rounded-[10px] px-[14px] py-[11px] text-[.9rem] text-[var(--text)] font-body outline-none transition-all duration-250 focus:border-blue focus:shadow-[0_0_0_3px_rgba(27,94,255,.11)]"
  const labelClass = "text-[.72rem] font-bold text-[var(--muted)] tracking-[.06em] uppercase font-heading"

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      className={`fixed inset-0 z-[500] flex items-center justify-center p-4 transition-all duration-400 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ background: 'rgba(6,8,15,.75)', backdropFilter: 'blur(8px)' }}
    >
      <div
        className={`bg-[var(--card)] rounded-[24px] p-[42px_38px] w-full max-w-[540px] border border-[var(--border)] relative max-h-[92vh] overflow-y-auto transition-all duration-450 ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-5 scale-[.97]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(.34,1.56,.64,1)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-[8px] border border-[var(--border)] bg-[var(--bg2)] flex items-center justify-center text-[var(--muted)] text-sm font-bold transition-all duration-300 hover:border-blue hover:scale-110"
        >
          ✕
        </button>

        {!success ? (
          <>
            <h2 className="font-heading font-extrabold text-[1.65rem] tracking-[-0.04em] mb-[6px]">
              Book a <span className="text-blue">Strategy</span> Call
            </h2>
            <p className="text-[var(--muted)] text-[.86rem] leading-[1.64] mb-7">
              Fill in your details and we&apos;ll reach out within 24 hours to schedule your free 20-minute strategy session.
            </p>

            <div className="grid grid-cols-2 gap-[.9rem] mb-[.9rem]">
              <div className="flex flex-col gap-[.38rem]">
                <label className={labelClass}>First Name *</label>
                <input type="text" placeholder="Karim" value={firstName} onChange={e => setFirstName(e.target.value)} className={inputClass} />
              </div>
              <div className="flex flex-col gap-[.38rem]">
                <label className={labelClass}>Last Name *</label>
                <input type="text" placeholder="Belkheir" value={lastName} onChange={e => setLastName(e.target.value)} className={inputClass} />
              </div>
            </div>

            <div className="flex flex-col gap-[.38rem] mb-[.9rem]">
              <label className={labelClass}>Email Address *</label>
              <input type="email" placeholder="karim@clinic.dz" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
            </div>

            <div className="flex flex-col gap-[.38rem] mb-[.9rem]">
              <label className={labelClass}>Phone / WhatsApp *</label>
              <input type="tel" placeholder="+213 6XX XXX XXX" value={phone} onChange={e => setPhone(e.target.value)} className={inputClass} />
            </div>

            <div className="flex flex-col gap-[.38rem] mb-[.9rem]">
              <label className={labelClass}>Clinic / Practice Type</label>
              <select value={specialty} onChange={e => setSpecialty(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                <option value="">Select your specialty…</option>
                <option>Dental Clinic</option>
                <option>Aesthetic Center</option>
                <option>General Practitioner</option>
                <option>Dermatology</option>
                <option>Ophthalmology</option>
                <option>Pediatrics</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-[.38rem] mb-[.9rem]">
              <label className={labelClass}>City</label>
              <select value={city} onChange={e => setCity(e.target.value)} className={inputClass + " appearance-none cursor-pointer"}>
                <option value="">Select your city…</option>
                <option>Algiers</option>
                <option>Oran</option>
                <option>Constantine</option>
                <option>Annaba</option>
                <option>Blida</option>
                <option>Sétif</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-[.38rem] mb-[.9rem]">
              <label className={labelClass}>Your Biggest Challenge (Optional)</label>
              <textarea
                placeholder="e.g. No social media presence, patients don't find us online…"
                rows={3}
                value={challenge}
                onChange={e => setChallenge(e.target.value)}
                className={inputClass + " resize-none"}
              />
            </div>

            {error && (
              <p className="text-red-500 text-[.82rem] mb-3">{error}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue text-white py-[14px] rounded-[10px] text-[.97rem] font-bold mt-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(27,94,255,.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? 'Sending…' : 'Book My Free Strategy Call →'}
            </button>
          </>
        ) : (
          <div className="text-center py-5">
            <div className="w-[58px] h-[58px] rounded-full bg-[rgba(27,94,255,.1)] flex items-center justify-center mx-auto mb-4">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 14L11 19L22 9" stroke="#1B5EFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-heading font-extrabold text-[1.35rem] tracking-tight mb-2">Request Received!</h3>
            <p className="text-[var(--muted)] text-[.88rem]">
              We&apos;ll reach out within 24 hours to confirm your strategy call. Check your WhatsApp &amp; email.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}