import { client, blogQueries, urlFor } from '../../../lib/sanity'
import { USE_MOCK_DATA } from '../../../lib/blogConfig'
import { mockPosts, mockUrlFor } from '../../../lib/mockData'
import type { Post } from '../../../types/sanity'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Navigation from "@/components/layout/Navigation"
import Footer from "@/components/layout/Footer"
import ClientMotionWrapper from './ClientMotionWrapper'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Type for image blocks in portable text
interface ImageBlock {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

// Type for handling both Sanity and mock image formats
type ImageType = {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
} | string | null | undefined

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post: Post | null = null

  if (USE_MOCK_DATA) {
    const foundPost = mockPosts.find(p => p.slug?.current === params.slug)
    post = foundPost as unknown as Post || null
  } else {
    post = await client.fetch(blogQueries.getPostBySlug, {
      slug: params.slug
    })
  }

  if (!post) {
    notFound()
  }

  const getImageUrl = (image: ImageType, width = 800, height = 450): string => {
    if (!image) return '/placeholder-image.jpg'
    
    try {
      if (USE_MOCK_DATA) {
        return mockUrlFor(image as Parameters<typeof mockUrlFor>[0]).url()
      } else {
        return urlFor(image as Parameters<typeof urlFor>[0]).width(width).height(height).url()
      }
    } catch (error) {
      console.warn('Error generating image URL:', error)
      return '/placeholder-image.jpg'
    }
  }

  const components = {
    types: {
      image: ({ value }: { value: ImageBlock }) => (
        <div className="my-12 group">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200">
            <Image
              src={getImageUrl(value, 1000, 600)}
              alt={value.alt || ''}
              width={1000}
              height={600}
              className="w-full transition-transform duration-500 group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, 1000px"
            />
          </div>
          {value.alt && (
            <p className="text-center text-gray-500 text-sm mt-4 font-medium italic">{value.alt}</p>
          )}
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle background elements */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-32 right-32 w-32 h-32 border border-gray-100 rounded-full"></div>
        <div className="absolute bottom-48 left-24 w-24 h-24 bg-emerald-50 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-16 h-16 border-2 border-emerald-100 rotate-45"></div>
      </div>

      <div className="relative z-10">
        <Navigation />
      </div>

      <ClientMotionWrapper>
        <article className="relative z-10 flex-1">
          {/* Hero Section */}
          <div className="relative">
            {/* Back navigation */}
            <div className="absolute top-8 left-8 z-30">
              <Link 
                href="/blog" 
                className="group inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 shadow-sm"
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Back to Articles</span>
              </Link>
            </div>

            {/* Mock data indicator */}
            {USE_MOCK_DATA && (
              <div className="absolute top-8 right-8 z-30">
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
                  <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  Demo Content
                </div>
              </div>
            )}

            {/* Hero Image */}
            {post.mainImage && (
              <div className="relative h-[60vh] overflow-hidden">
                <Image
                  src={getImageUrl(post.mainImage, 1920, 1080)}
                  alt={post.title}
                  width={1920}
                  height={1080}
                  className="w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                
                {/* Hero Content Overlay */}
                <div className="absolute inset-0 flex items-end">
                  <div className="max-w-4xl mx-auto px-8 pb-16 text-white">
                    <div className="mb-6">
                      {post.tags && post.tags[0] && (
                        <span className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full mb-4">
                          {post.tags[0]}
                        </span>
                      )}
                    </div>
                    
                    <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight">
                      {post.title}
                    </h1>
                    
                    {post.excerpt && (
                      <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-4">
                      {post.author?.image && (
                        <Image
                          src={getImageUrl(post.author.image, 48, 48)}
                          alt={post.author.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full border-2 border-white/30"
                        />
                      )}
                      <div>
                        <p className="font-bold text-white">{post.author?.name}</p>
                        <div className="flex items-center gap-3 text-gray-300">
                          <time className="font-medium">
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </time>
                          {post.readingTime && (
                            <>
                              <span>•</span>
                              <span>{post.readingTime} min read</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Alternative header for posts without main image */}
            {!post.mainImage && (
              <div className="px-8 pt-32 pb-16 text-center max-w-4xl mx-auto">
                <div className="mb-6">
                  {post.tags && post.tags[0] && (
                    <span className="inline-block px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full mb-6">
                      {post.tags[0]}
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-tight text-gray-900">
                  {post.title}
                </h1>
                
                {post.excerpt && (
                  <p className="text-xl lg:text-2xl text-gray-600 mb-12 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-center gap-4 mb-8">
                  {post.author?.image && (
                    <Image
                      src={getImageUrl(post.author.image, 48, 48)}
                      alt={post.author.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-bold text-gray-900">{post.author?.name}</p>
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                      <time>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      {post.readingTime && (
                        <>
                          <span>•</span>
                          <span>{post.readingTime} min read</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-8 py-16">
            {/* Post Sections */}
            {post.sections && post.sections.length > 0 ? (
              <div className="space-y-12">
                {post.sections.map((section, index) => (
                  <section 
                    key={index} 
                    className="group"
                  >
                    <div className="relative bg-gray-50 border border-gray-200 rounded-2xl p-8 lg:p-12 hover:bg-gray-100/50 hover:border-gray-300 transition-all duration-300">
                      {/* Section decoration */}
                      <div className="absolute top-0 left-8 w-12 h-1 bg-emerald-600 rounded-full transform -translate-y-1/2"></div>
                      
                      {section.title && (
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 group-hover:text-emerald-600 transition-colors duration-300">
                          {section.title}
                        </h2>
                      )}
                      
                      <div className="prose prose-lg max-w-none">
                        <div className="text-gray-700 leading-relaxed text-lg [&>p]:mb-6 [&>p]:leading-relaxed [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-4 [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-emerald-600 [&>h4]:mt-8 [&>h4]:mb-4 [&>ul]:space-y-2 [&>ul>li]:relative [&>ul>li]:pl-6 [&>ul>li]:before:content-['•'] [&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:text-emerald-600 [&>ul>li]:before:font-bold [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-600 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-gray-600 [&>blockquote]:my-6 [&>blockquote]:bg-emerald-50 [&>blockquote]:py-4 [&>blockquote]:rounded-r-xl">
                          <PortableText value={section.content} components={components} />
                        </div>
                      </div>
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-12">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Content Coming Soon</h3>
                  <p className="text-gray-600">This article is still being written.</p>
                </div>
              </div>
            )}

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-12 border-t border-gray-200">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Related Topics</h3>
                  <div className="w-12 h-1 bg-emerald-600 mx-auto rounded-full"></div>
                </div>
                
                <div className="flex flex-wrap justify-center gap-3">
                  {post.tags.map(tag => (
                    <Link 
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="px-4 py-2 bg-gray-100 border border-gray-200 text-gray-700 rounded-full hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all duration-300 font-medium"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="mt-20 pt-12 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <Link 
                  href="/blog"
                  className="group flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-full hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="font-medium">All Articles</span>
                </Link>

                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-medium">Share this article</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </ClientMotionWrapper>

      <Footer />
    </div>
  )
}

// Generate static params - handle both mock and Sanity data
export async function generateStaticParams() {
  if (USE_MOCK_DATA) {
    return mockPosts
      .filter(post => post.slug?.current)
      .map(post => ({
        slug: post.slug.current,
      }))
  } else {
    const posts = await client.fetch(`*[_type == "post" && defined(slug.current)][].slug.current`)
    return posts.map((slug: string) => ({
      slug: slug,
    }))
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps) {
  let post: Post | null = null

  if (USE_MOCK_DATA) {
    const foundPost = mockPosts.find(p => p.slug?.current === params.slug)
    post = foundPost as unknown as Post || null
  } else {
    post = await client.fetch(blogQueries.getPostBySlug, {
      slug: params.slug
    })
  }

  if (!post) {
    return {
      title: 'Post Not Found'
    }
  }

  return {
    title: `${post.title} - Finable Stories`,
    description: post.excerpt,
  }
}