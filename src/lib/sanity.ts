import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8gcp0vv5',
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03'
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: SanityImageSource) => builder.image(source)

export const blogQueries = {
  getAllPosts: `*[_type == "post"] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt, mainImage,
    author->{name, slug, image}, categories[]->{title, slug},
    tags, readingTime, featured, "sectionsCount": length(sections)
  }`,
  
  getPostBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id, title, slug, excerpt, publishedAt, mainImage,
    author->{name, slug, image, bio}, categories[]->{title, slug},
    tags, readingTime, featured, sections[]{ title, content }
  }`,
  
  searchPosts: `*[_type == "post" && (
    title match $searchTerm + "*" || excerpt match $searchTerm + "*" ||
    author->name match $searchTerm + "*" || $searchTerm in tags[]
  )] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt, mainImage,
    author->{name, slug, image}, categories[]->{title, slug},
    tags, readingTime, featured
  }`
}