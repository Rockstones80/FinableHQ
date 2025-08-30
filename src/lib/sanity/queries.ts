// src/lib/sanity/queries.ts

// Base post fields that we'll reuse
const postFields = `
  _id,
  title,
  slug,
  excerpt,
  mainImage,
  tags,
  publishedAt,
  readingTime,
  sectionsCount,
  featured,
  author->{
    name,
    image
  }
`

export const blogQueries = {
  // Get all published posts
  getAllPosts: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }`,

  // Get a single post by slug
  getPostBySlug: `*[_type == "post" && slug.current == $slug][0] {
    ${postFields},
    body,
    "headings": body[length(style) == 2 && string::startsWith(style, "h")]
  }`,

  // Search posts by term
  searchPosts: `*[_type == "post" && defined(slug.current) && (
    title match $searchTerm + "*" ||
    excerpt match $searchTerm + "*" ||
    author->name match $searchTerm + "*" ||
    $searchTerm in tags[]
  )] | order(publishedAt desc) {
    ${postFields}
  }`,

  // Get featured posts
  getFeaturedPosts: `*[_type == "post" && defined(slug.current) && featured == true] | order(publishedAt desc) {
    ${postFields}
  }`,

  // Get posts by tag
  getPostsByTag: `*[_type == "post" && defined(slug.current) && $tag in tags[]] | order(publishedAt desc) {
    ${postFields}
  }`,

  // Get recent posts (limit)
  getRecentPosts: `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...$limit] {
    ${postFields}
  }`
}