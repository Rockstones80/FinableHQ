'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { client, urlFor } from '../../lib/sanity'
import { blogQueries } from '../../lib/sanity/queries'
import { USE_MOCK_DATA } from '../../lib/blogConfig'
import { mockPosts, mockSearch, mockUrlFor } from '../../lib/mockData'
import type { Post } from '../../types/sanity'
import Link from 'next/link'
import Image from 'next/image'
import Footer from "@/components/layout/Footer"

// Type for handling both Sanity and mock image formats
type ImageType = {
  _type?: string;
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
  };
} | string | null | undefined

// Data normalization function for consistency
const normalizePost = (post: Post): Post => {
  return {
    ...post,
    title: post.title || 'Untitled',
    excerpt: post.excerpt || '',
    publishedAt: post.publishedAt || new Date().toISOString(),
    readingTime: post.readingTime || 5,
    tags: post.tags || [],
    featured: post.featured || false,
    author: {
      _id: post.author?._id || 'unknown-author',
      name: post.author?.name || 'Anonymous',
      image: post.author?.image || undefined,
      slug: post.author?.slug || { current: 'unknown' },
      bio: post.author?.bio || undefined,
      ...post.author
    },
    slug: post.slug || { current: '' },
    mainImage: post.mainImage || undefined
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeTag, setActiveTag] = useState<string>('')

  useEffect(() => {
    async function fetchPosts() {
      try {
        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 1200))
          const convertedPosts = mockPosts.map(normalizePost) as Post[]
          setPosts(convertedPosts)
          setFilteredPosts(convertedPosts)
        } else {
          const fetchedPosts: Post[] = await client.fetch(blogQueries.getAllPosts)
          const normalizedPosts = fetchedPosts.map(normalizePost)
          setPosts(normalizedPosts)
          setFilteredPosts(normalizedPosts)
        }
        setLoading(false)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    setActiveTag('')

    if (term.length > 0) {
      try {
        if (USE_MOCK_DATA) {
          const searchResults = mockSearch(mockPosts, term).map(normalizePost) as Post[]
          setFilteredPosts(searchResults)
        } else {
          const searchResults: Post[] = await client.fetch(blogQueries.searchPosts, {
            searchTerm: term
          })
          setFilteredPosts(searchResults.map(normalizePost))
        }
      } catch (error) {
        console.error('Search error:', error)
        const filtered = posts.filter(post => 
          post.title.toLowerCase().includes(term.toLowerCase()) ||
          post.excerpt?.toLowerCase().includes(term.toLowerCase()) ||
          post.author?.name.toLowerCase().includes(term.toLowerCase())
        )
        setFilteredPosts(filtered)
      }
    } else {
      setFilteredPosts(posts)
    }
  }

  const handleTagClick = async (tag: string) => {
    setActiveTag(tag)
    setSearchTerm('')
    try {
      if (USE_MOCK_DATA) {
        const searchResults = mockSearch(mockPosts, tag).map(normalizePost) as Post[]
        setFilteredPosts(searchResults)
      } else {
        const searchResults: Post[] = await client.fetch(blogQueries.searchPosts, {
          searchTerm: tag
        })
        setFilteredPosts(searchResults.map(normalizePost))
      }
    } catch (error) {
      console.error('Tag search error:', error)
      const filtered = posts.filter(post => 
        post.tags?.some(postTag => postTag.toLowerCase().includes(tag.toLowerCase())) ||
        post.title.toLowerCase().includes(tag.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(tag.toLowerCase())
      )
      setFilteredPosts(filtered)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
    setActiveTag('')
    setFilteredPosts(posts)
  }

  const getPopularTags = (posts: Post[]): string[] => {
    const tagCounts: { [key: string]: number } = {}
    
    posts.forEach(post => {
      post.tags?.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    })
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8)
      .map(([tag]) => tag)
  }

  const getImageUrl = (image: ImageType): string => {
    if (!image) return '/placeholder-image.jpg'
    
    try {
      if (USE_MOCK_DATA) {
        return mockUrlFor(image as Parameters<typeof mockUrlFor>[0]).url()
      } else {
        return urlFor(image as Parameters<typeof urlFor>[0])
          .width(500)
          .height(280)
          .fit('crop')
          .auto('format')
          .quality(85)
          .url()
      }
    } catch (error) {
      console.warn('Error generating image URL:', error)
      return '/placeholder-image.jpg'
    }
  }

  const getAuthorImageUrl = (image: ImageType): string => {
    if (!image) return '/placeholder-avatar.jpg'
    
    try {
      if (USE_MOCK_DATA) {
        return mockUrlFor(image as Parameters<typeof mockUrlFor>[0]).url()
      } else {
        return urlFor(image as Parameters<typeof urlFor>[0])
          .width(64)
          .height(64)
          .fit('crop')
          .auto('format')
          .quality(90)
          .url()
      }
    } catch (error) {
      console.warn('Error generating author image URL:', error)
      return '/placeholder-avatar.jpg'
    }
  }

  const featuredPosts = posts.filter(post => post.featured).slice(0, 3)
  const regularPosts = searchTerm || activeTag ? filteredPosts : posts.filter(post => !post.featured)

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Subtle geometric background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-32 h-32 border border-gray-100 rounded-full opacity-40"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-emerald-50 rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 border-2 border-emerald-100 rotate-45 opacity-50"></div>
        </div>
        
        <div className="flex items-center justify-center min-h-screen">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative mb-8">
              <div className="w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-gray-200"> 
                  <span className="text-green-600 font-bold text-4xl justify-center item-center ">Finable</span>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
              </div>
            </div>
            
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Loading Stories
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Curating educational insights...
            </motion.p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-40 h-40 border border-gray-100 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-32 h-32 bg-emerald-50 rounded-full"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 border-2 border-emerald-100 rotate-45"></div>
        <div className="absolute top-1/4 left-1/2 w-20 h-20 bg-gray-50 rounded-full"></div>
      </div>

      <main className="relative z-10 px-6 lg:px-12 py-16">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl lg:text-6xl font-black mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block text-green-600">Insightful</span>
            stories
          </motion.h1>
          
          <motion.p 
            className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover stories, tips, and insights to help you succeed in your educational journey
          </motion.p>

          {USE_MOCK_DATA && (
            <motion.div 
              className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              Demo Content
            </motion.div>
          )}
        </motion.div>

        {/* Search Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Search Input */}
          <div className="relative mb-8 group">
            <div className="relative bg-white border-2 border-gray-200 rounded-2xl shadow-sm hover:border-emerald-300 focus-within:border-emerald-500 transition-colors duration-300">
              <input
                type="text"
                placeholder="Search articles and stories..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-6 py-4 pl-14 text-gray-900 placeholder-gray-500 bg-transparent rounded-2xl focus:outline-none text-lg"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-5">
                <svg className="w-5 h-5 text-gray-400 group-focus-within:text-emerald-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              {(searchTerm || activeTag) && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Tag Pills */}
          <div className="text-center">
            <p className="text-gray-600 mb-6 text-lg font-medium">Popular Topics</p>
            <div className="flex flex-wrap justify-center gap-3">
              {getPopularTags(posts).map(tag => (
                <motion.button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeTag === tag
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results count */}
        <AnimatePresence>
          {(searchTerm || activeTag) && (
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                  {activeTag && ` in "${activeTag}"`}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Posts - Larger and uniform */}
        {!searchTerm && !activeTag && featuredPosts.length > 0 && (
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Featured Stories
              </h2>
              <div className="w-16 h-1 bg-green-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <FeaturedPostCard 
                    post={post} 
                    getImageUrl={getImageUrl}
                    getAuthorImageUrl={getAuthorImageUrl}
                  />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Posts - Larger and uniform */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {!searchTerm && !activeTag && (
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-gray-900 mb-4">Latest Articles</h2>
              <div className="w-16 h-1 bg-gray-400 mx-auto rounded-full"></div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <AnimatePresence>
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                >
                  <RegularPostCard 
                    post={post} 
                    getImageUrl={getImageUrl}
                    getAuthorImageUrl={getAuthorImageUrl}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPosts.length === 0 && (searchTerm || activeTag) && (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-12 max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
                <p className="text-gray-600 mb-6">Try different keywords or explore our topics</p>
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors duration-300"
                >
                  View All Articles
                </button>
              </div>
            </motion.div>
          )}
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}

// Enhanced Featured Post Card Component - LARGER & UNIFORM
interface FeaturedPostCardProps {
  post: Post
  getImageUrl: (image: ImageType) => string
  getAuthorImageUrl: (image: ImageType) => string
}

function FeaturedPostCard({ post, getImageUrl, getAuthorImageUrl }: FeaturedPostCardProps) {
  const normalizedPost = normalizePost(post)
  
  return (
    <Link href={`/blog/${normalizedPost.slug.current}`}>
      <article className="group cursor-pointer h-full">
        <div className="bg-white border-2 border-gray-200 rounded-3xl overflow-hidden hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 h-[520px] flex flex-col">
          {/* Featured badge */}
          <div className="relative flex-shrink-0">
            <div className="relative h-56 overflow-hidden">
              <Image
                src={getImageUrl(normalizedPost.mainImage)}
                alt={normalizedPost.title}
                width={500}
                height={280}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                priority={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>
            
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                FEATURED
              </div>
            </div>
          </div>

          {/* Content - flex-grow to fill remaining space */}
          <div className="p-7 flex flex-col flex-grow">
            <div className="flex items-center gap-3 mb-4">
              {normalizedPost.readingTime && (
                <span className="text-sm text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-full">
                  {normalizedPost.readingTime} min read
                </span>
              )}
              {normalizedPost.tags && normalizedPost.tags[0] && (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full font-medium hover:bg-gray-200 transition-colors">
                  {normalizedPost.tags[0]}
                </span>
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300 line-clamp-2 leading-tight">
              {normalizedPost.title}
            </h2>
            
            {normalizedPost.excerpt && (
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-base flex-grow">
                {normalizedPost.excerpt}
              </p>
            )}
            
            {/* Author section - aligned to bottom */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3 bg-gray-100 flex-shrink-0">
                  <Image
                    src={getAuthorImageUrl(normalizedPost.author?.image)}
                    alt={normalizedPost.author?.name || 'Author'}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-gray-900 font-semibold text-base block">
                    {normalizedPost.author?.name}
                  </span>
                  <time className="text-gray-500 text-sm">
                    {new Date(normalizedPost.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
              
              <div className="flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                <span className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                  Read more
                </span>
                <svg className="w-5 h-5 text-gray-600 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Enhanced Regular Post Card Component - LARGER & UNIFORM
interface RegularPostCardProps {
  post: Post
  getImageUrl: (image: ImageType) => string
  getAuthorImageUrl: (image: ImageType) => string
}

function RegularPostCard({ post, getImageUrl, getAuthorImageUrl }: RegularPostCardProps) {
  const normalizedPost = normalizePost(post)
  
  return (
    <Link href={`/blog/${normalizedPost.slug.current}`}>
      <article className="group cursor-pointer">
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 hover:shadow-xl transition-all duration-300 h-[460px] flex flex-col">
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <Image
              src={getImageUrl(normalizedPost.mainImage)}
              alt={normalizedPost.title}
              width={400}
              height={240}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {normalizedPost.tags && normalizedPost.tags[0] && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-700 text-sm rounded-full font-medium shadow-sm">
                  {normalizedPost.tags[0]}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300 line-clamp-2 leading-tight">
              {normalizedPost.title}
            </h3>
            
            {normalizedPost.excerpt && (
              <p className="text-gray-600 text-base leading-relaxed line-clamp-3 mb-6 flex-grow">
                {normalizedPost.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-100">
                  <Image
                    src={getAuthorImageUrl(normalizedPost.author?.image)}
                    alt={normalizedPost.author?.name || 'Author'}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-700 text-sm font-medium">
                    {normalizedPost.author?.name}
                  </span>
                  <time className="text-gray-500 text-sm">
                    {new Date(normalizedPost.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
              </div>
              
              <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                <span className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                  Read more
                </span>
                <svg className="w-4 h-4 text-gray-600 group-hover:text-green-600 transform group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}