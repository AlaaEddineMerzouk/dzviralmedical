import { groq } from 'next-sanity'

export const caseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(order asc) {
    _id, tag, title, description,
    "image": image.asset->url,
    metrics
  }
`

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    _id, quote, name, role, initials,
    "photo": photo.asset->url
  }
`

export const insightsQuery = groq`
  *[_type == "insight"] | order(order asc) {
    _id, category, title, description, readTime,
    "thumbnail": thumbnail.asset->url
  }
`

export const founderQuery = groq`
  *[_type == "founder"][0] {
    name, role, bio, chips,
    "photo": photo.asset->url
  }
`

export const trustedByQuery = groq`
  *[_type == "trustedBy"] | order(order asc) {
    _id, name
  }
`