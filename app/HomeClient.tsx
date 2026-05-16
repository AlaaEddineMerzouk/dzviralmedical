'use client'

import { useState, useEffect } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Cases from '@/components/Cases'
import Founder from '@/components/Founder'
import Insights from '@/components/Insights'
import CtaFinal from '@/components/CtaFinal'
import Footer from '@/components/Footer'
import BookModal from '@/components/BookModal'

// ── Types ──────────────────────────────────────────────────────────────────

export interface CaseStudy {
  _id: string
  tag: string
  title: string
  description: string
  image?: string
  metrics: { num: string; label: string }[]
}

export interface Testimonial {
  _id: string
  quote: string
  name: string
  role: string
  initials: string
  photo?: string
}

export interface Insight {
  _id: string
  category: string
  title: string
  description: string
  readTime: string
  thumbnail?: string
}

export interface Founder {
  name: string
  role: string
  bio: string
  photo?: string
  chips: string[]
}

export interface TrustedBy {
  _id: string
  name: string
}

interface Props {
  cases: CaseStudy[]
  testimonials: Testimonial[]
  insights: Insight[]
  founder: Founder | null
  trustedBy: TrustedBy[]
}

// ── Component ──────────────────────────────────────────────────────────────

export default function HomeClient({ cases, testimonials, insights, founder, trustedBy }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  // Cursor halo
  useEffect(() => {
    const halo = document.getElementById('halo')
    if (!halo) return
    const onMove = (e: MouseEvent) => {
      halo.style.left = e.clientX + 'px'
      halo.style.top = e.clientY + 'px'
    }
    document.addEventListener('mousemove', onMove)
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  const openModal = () => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <>
      <div id="halo" />
      <main>
        <Nav onOpenModal={openModal} />
        <Hero onOpenModal={openModal} />
        <Services onOpenModal={openModal} trustedBy={trustedBy} />
        <Process />
        <Cases
          cases={cases}
          testimonials={testimonials}
          onOpenModal={openModal}
        />
        <Founder
          founder={founder}
          onOpenModal={openModal}
        />
        <Insights insights={insights} />
        <CtaFinal onOpenModal={openModal} />
        <Footer onOpenModal={openModal} />
      </main>
      <BookModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}