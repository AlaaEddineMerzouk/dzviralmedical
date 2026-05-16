import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text' }),
    defineField({ name: 'name', title: 'Doctor Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role & City', type: 'string' }),
    defineField({ name: 'initials', title: 'Initials (e.g. DK)', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo (optional)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})