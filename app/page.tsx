import { client } from '@/lib/sanity'
import {
  caseStudiesQuery,
  testimonialsQuery,
  insightsQuery,
  founderQuery,
  trustedByQuery,
} from '@/lib/queries'
import HomeClient from './HomeClient'

export const revalidate = 60

export default async function Home() {
  const [cases, testimonials, insights, founder, trustedBy] = await Promise.all([
    client.fetch(caseStudiesQuery),
    client.fetch(testimonialsQuery),
    client.fetch(insightsQuery),
    client.fetch(founderQuery),
    client.fetch(trustedByQuery),
  ])

  return (
    <HomeClient
      cases={cases}
      testimonials={testimonials}
      insights={insights}
      founder={founder}
      trustedBy={trustedBy}
    />
  )
}