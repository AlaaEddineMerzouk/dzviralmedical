// sanity/schemaTypes/trustedClient.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'trustedClient',
  title: 'Trusted Client',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Clinic / Doctor Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first in the scrolling strip.',
      initialValue: 99,
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Order: ${subtitle}` }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})