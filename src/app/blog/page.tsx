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
          const convertedPosts = mockPosts as unknown as Post[]
          setPosts(convertedPosts)
          setFilteredPosts(convertedPosts)
        } else {
          const fetchedPosts: Post[] = await client.fetch(blogQueries.getAllPosts)
          setPosts(fetchedPosts)
          setFilteredPosts(fetchedPosts)
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
          const searchResults = mockSearch(mockPosts, term) as unknown as Post[]
          setFilteredPosts(searchResults)
        } else {
          const searchResults: Post[] = await client.fetch(blogQueries.searchPosts, {
            searchTerm: term
          })
          setFilteredPosts(searchResults)
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
        const searchResults = mockSearch(mockPosts, tag) as unknown as Post[]
        setFilteredPosts(searchResults)
      } else {
        const searchResults: Post[] = await client.fetch(blogQueries.searchPosts, {
          searchTerm: tag
        })
        setFilteredPosts(searchResults)
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
        return urlFor(image as Parameters<typeof urlFor>[0]).width(400).height(250).url()
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
        return urlFor(image as Parameters<typeof urlFor>[0]).width(32).height(32).url()
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
            {/* Professional loading animation */}
            <div className="relative mb-8">
              <div className="w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-gray-200"> <span className="text-green-600 font-bold text-4xl justify-center item-center ">Finable</span></div>
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
            Educational
            <span className="block text-green-600">Insights</span>
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

        {/* Featured Posts */}
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

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
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

        {/* All Posts */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <AnimatePresence>
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
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

// Featured Post Card Component
interface FeaturedPostCardProps {
  post: Post
  getImageUrl: (image: ImageType) => string
  getAuthorImageUrl: (image: ImageType) => string
}

function FeaturedPostCard({ post, getImageUrl, getAuthorImageUrl }: FeaturedPostCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <article className="group cursor-pointer h-full">
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
          {/* Featured badge */}
          <div className="relative">
            {post.mainImage && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={getImageUrl(post.mainImage)}
                  alt={post.title}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
            )}
            
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                FEATURED
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {post.readingTime && (
                <span className="text-sm text-green-600 font-medium">
                  {post.readingTime} min read
                </span>
              )}
              {post.tags && post.tags[0] && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                  {post.tags[0]}
                </span>
              )}
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h2>
            
            {post.excerpt && (
              <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {post.author?.image && (
                  <Image
                    src={getAuthorImageUrl(post.author.image)}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                )}
                <div>
                  <span className="text-gray-900 font-medium text-sm">{post.author?.name}</span>
                  <time className="block text-gray-500 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </time>
                </div>
              </div>
              
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-emerald-100 transition-colors duration-300">
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

// Regular Post Card Component
interface RegularPostCardProps {
  post: Post
  getImageUrl: (image: ImageType) => string
  getAuthorImageUrl: (image: ImageType) => string
}

function RegularPostCard({ post, getImageUrl, getAuthorImageUrl }: RegularPostCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <article className="group cursor-pointer">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-300 h-full">
          {post.mainImage && (
            <div className="relative h-40 overflow-hidden">
              <Image
                src={getImageUrl(post.mainImage)}
                alt={post.title}
                width={300}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              
              {post.tags && post.tags[0] && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/90 text-gray-700 text-xs rounded-full font-medium">
                    {post.tags[0]}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>
            
            {post.excerpt && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">{post.excerpt}</p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {post.author?.image && (
                  <Image
                    src={getAuthorImageUrl(post.author.image)}
                    alt={post.author.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                )}
                <span className="text-gray-600 text-xs font-medium">{post.author?.name}</span>
              </div>
              
              {post.readingTime && (
                <span className="text-green-600 text-xs font-medium">
                  {post.readingTime}m
                </span>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}