import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insight',
  title: 'Insight / Article',
  type: 'document',
  fields: [
    defineField({ name: 'category', title: 'Category', type: 'string' }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'description', title: 'Short Description', type: 'text' }),
    defineField({ name: 'readTime', title: 'Read Time (e.g. 5 min read)', type: 'string' }),
    defineField({ name: 'thumbnail', title: 'Thumbnail Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
})