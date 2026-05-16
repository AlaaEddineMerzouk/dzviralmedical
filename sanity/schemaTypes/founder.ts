import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'founder',
  title: 'Founder Info',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'role', title: 'Role Title', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text' }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'chips',
      title: 'Specialty Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})