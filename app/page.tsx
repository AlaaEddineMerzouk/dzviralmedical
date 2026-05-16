import { client } from '@/lib/sanity'
import {
  caseStudiesQuery,
  testimonialsQuery,
  insightsQuery,
  founderQuery,
  trustedClientsQuery,
} from '@/lib/queries'
import HomeClient from './HomeClient'

export const revalidate = 60

export default async function Home() {
  const [cases, testimonials, insights, founder, clients] = await Promise.all([
    client.fetch(caseStudiesQuery),
    client.fetch(testimonialsQuery),
    client.fetch(insightsQuery),
    client.fetch(founderQuery),
    client.fetch(trustedClientsQuery),
  ])

  return (
    <HomeClient
      cases={cases}
      testimonials={testimonials}
      insights={insights}
      founder={founder}
      clients={clients}
    />
  )
}