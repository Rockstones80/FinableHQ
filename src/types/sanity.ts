// Sanity image type
export interface SanityImage {
    _type: 'image'
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    caption?: string
    crop?: {
      _type: 'sanity.imageCrop'
      bottom: number
      left: number
      right: number
      top: number
    }
    hotspot?: {
      _type: 'sanity.imageHotspot'
      height: number
      width: number
      x: number
      y: number
    }
  }
  
  // Sanity block content (rich text)
  export interface SanityBlock {
    _key: string
    _type: 'block'
    children: Array<{
      _key: string
      _type: 'span'
      marks: string[]
      text: string
    }>
    markDefs: Array<{
      _key: string
      _type: string
      [key: string]: unknown
    }>
    style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote'
    level?: number
    listItem?: 'bullet' | 'number'
  }
  
  // Generic type for portable text content
  export type PortableTextBlock = SanityBlock | {
    _key: string
    _type: string
    [key: string]: unknown
  }
  
  export interface Author {
    _id: string
    name: string
    slug: { current: string }
    image?: SanityImage
    bio?: PortableTextBlock[]
  }
  
  export interface Category {
    _id: string
    title: string
    slug: { current: string }
    description?: string
  }
  
  export interface PostSection {
    title?: string
    content: PortableTextBlock[]
  }
  
  export interface Post {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    publishedAt: string
    mainImage?: SanityImage
    author?: Author
    categories?: Category[]
    tags?: string[]
    readingTime?: number
    featured?: boolean
    sections?: PostSection[]
    sectionsCount?: number
  }