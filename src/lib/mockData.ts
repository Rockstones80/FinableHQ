// lib/mockData.ts

// Type definitions that match Sanity's structure
interface Asset {
    _ref: string;
    _type: "reference";
    url: string;
  }
  
  interface Image {
    _type: "image";
    asset: Asset;
  }
  
  interface Slug {
    current: string;
    _type: "slug";
  }
  
  interface Author {
    _id: string;
    _type: "author";
    name: string;
    slug: Slug;
    image: Image;
  }
  
  interface Category {
    _id: string;
    _type: "category";
    title: string;
    slug: Slug;
  }
  
  interface Post {
    _id: string;
    _type: "post";
    title: string;
    slug: Slug;
    excerpt: string;
    publishedAt: string;
    mainImage: Image;
    author: Author;
    categories: Category[];
    tags: string[];
    readingTime: number;
    featured: boolean;
    sectionsCount: number;
  }
  
  export const mockPosts: Post[] = [
      {
        _id: '1',
        _type: 'post',
        title: 'Understanding Crowdfunding: A Complete Guide',
        slug: { current: 'understanding-crowdfunding-guide', _type: 'slug' },
        excerpt: 'Learn the ins and outs of crowdfunding, from choosing the right platform to running a successful campaign.',
        publishedAt: '2025-08-25T10:00:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-1',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author1',
          _type: 'author',
          name: 'Sarah Johnson',
          slug: { current: 'sarah-johnson', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-1',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat1', _type: 'category', title: 'Fundraising', slug: { current: 'fundraising', _type: 'slug' } }
        ],
        tags: ['crowdfunding', 'startups', 'fundraising'],
        readingTime: 8,
        featured: true,
        sectionsCount: 5
      },
      {
        _id: '2',
        _type: 'post',
        title: 'Top 10 Crowdfunding Platforms in 2025',
        slug: { current: 'top-crowdfunding-platforms-2025', _type: 'slug' },
        excerpt: 'Compare the best crowdfunding platforms and find the perfect match for your project.',
        publishedAt: '2025-08-20T14:30:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-2',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author2',
          _type: 'author',
          name: 'Michael Chen',
          slug: { current: 'michael-chen', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-2',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat2', _type: 'category', title: 'Platforms', slug: { current: 'platforms', _type: 'slug' } }
        ],
        tags: ['platforms', 'comparison', 'review'],
        readingTime: 12,
        featured: true,
        sectionsCount: 3
      },
      {
        _id: '3',
        _type: 'post',
        title: 'Success Stories: Million-Dollar Campaigns',
        slug: { current: 'million-dollar-campaigns', _type: 'slug' },
        excerpt: 'Discover what made these crowdfunding campaigns raise over a million dollars.',
        publishedAt: '2025-08-18T09:15:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-3',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author3',
          _type: 'author',
          name: 'Emily Rodriguez',
          slug: { current: 'emily-rodriguez', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-3',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat3', _type: 'category', title: 'Case Studies', slug: { current: 'case-studies', _type: 'slug' } }
        ],
        tags: ['success', 'case-study', 'million'],
        readingTime: 15,
        featured: true,
        sectionsCount: 7
      },
      {
        _id: '4',
        _type: 'post',
        title: 'Legal Considerations for Crowdfunding',
        slug: { current: 'legal-considerations-crowdfunding', _type: 'slug' },
        excerpt: 'Navigate the legal landscape of crowdfunding with expert advice and best practices.',
        publishedAt: '2025-08-15T16:45:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-4',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author4',
          _type: 'author',
          name: 'David Park',
          slug: { current: 'david-park', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-4',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat4', _type: 'category', title: 'Legal', slug: { current: 'legal', _type: 'slug' } }
        ],
        tags: ['legal', 'compliance', 'regulations'],
        readingTime: 10,
        featured: false,
        sectionsCount: 4
      },
      {
        _id: '5',
        _type: 'post',
        title: 'Marketing Your Crowdfunding Campaign',
        slug: { current: 'marketing-crowdfunding-campaign', _type: 'slug' },
        excerpt: 'Effective marketing strategies to reach your funding goals and build a community.',
        publishedAt: '2025-08-12T11:20:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-5',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author5',
          _type: 'author',
          name: 'Lisa Wang',
          slug: { current: 'lisa-wang', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-5',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat5', _type: 'category', title: 'Marketing', slug: { current: 'marketing', _type: 'slug' } }
        ],
        tags: ['marketing', 'social-media', 'promotion'],
        readingTime: 7,
        featured: false,
        sectionsCount: 2
      },
      {
        _id: '6',
        _type: 'post',
        title: 'Building Trust with Your Backers',
        slug: { current: 'building-trust-backers', _type: 'slug' },
        excerpt: 'Learn how to build and maintain trust throughout your crowdfunding journey.',
        publishedAt: '2025-08-10T13:00:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-6',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author1',
          _type: 'author',
          name: 'Sarah Johnson',
          slug: { current: 'sarah-johnson', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-1',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat6', _type: 'category', title: 'Community', slug: { current: 'community', _type: 'slug' } }
        ],
        tags: ['trust', 'communication', 'transparency'],
        readingTime: 6,
        featured: false,
        sectionsCount: 3
      },
      {
        _id: '7',
        _type: 'post',
        title: 'Equity vs Reward-Based Crowdfunding',
        slug: { current: 'equity-vs-reward-crowdfunding', _type: 'slug' },
        excerpt: 'Understanding the differences between equity and reward-based crowdfunding models.',
        publishedAt: '2025-08-08T12:00:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-7',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author2',
          _type: 'author',
          name: 'Michael Chen',
          slug: { current: 'michael-chen', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-2',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat7', _type: 'category', title: 'Education', slug: { current: 'education', _type: 'slug' } }
        ],
        tags: ['equity', 'rewards', 'investment'],
        readingTime: 9,
        featured: false,
        sectionsCount: 4
      },
      {
        _id: '8',
        _type: 'post',
        title: 'Creating Compelling Campaign Videos',
        slug: { current: 'compelling-campaign-videos', _type: 'slug' },
        excerpt: 'Tips and techniques for creating videos that convert viewers into backers.',
        publishedAt: '2025-08-05T15:30:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-8',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author3',
          _type: 'author',
          name: 'Emily Rodriguez',
          slug: { current: 'emily-rodriguez', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-3',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat8', _type: 'category', title: 'Content Creation', slug: { current: 'content-creation', _type: 'slug' } }
        ],
        tags: ['video', 'content', 'conversion'],
        readingTime: 11,
        featured: false,
        sectionsCount: 6
      },
      {
        _id: '9',
        _type: 'post',
        title: 'Crowdfunding for Social Causes',
        slug: { current: 'crowdfunding-social-causes', _type: 'slug' },
        excerpt: 'How to leverage crowdfunding for social impact and community-driven projects.',
        publishedAt: '2025-08-02T08:00:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-9',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author6',
          _type: 'author',
          name: 'James Wilson',
          slug: { current: 'james-wilson', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-6',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat9', _type: 'category', title: 'Social Impact', slug: { current: 'social-impact', _type: 'slug' } }
        ],
        tags: ['social-causes', 'nonprofit', 'community'],
        readingTime: 13,
        featured: false,
        sectionsCount: 5
      },
      {
        _id: '10',
        _type: 'post',
        title: 'Post-Campaign: Fulfilling Your Promises',
        slug: { current: 'post-campaign-fulfilling-promises', _type: 'slug' },
        excerpt: 'What happens after your campaign ends? Learn how to successfully deliver on your commitments.',
        publishedAt: '2025-07-28T16:20:00Z',
        mainImage: {
          _type: 'image',
          asset: {
            _ref: 'image-10',
            _type: 'reference',
            url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=250&fit=crop'
          }
        },
        author: {
          _id: 'author4',
          _type: 'author',
          name: 'David Park',
          slug: { current: 'david-park', _type: 'slug' },
          image: {
            _type: 'image',
            asset: {
              _ref: 'author-image-4',
              _type: 'reference',
              url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
            }
          }
        },
        categories: [
          { _id: 'cat10', _type: 'category', title: 'Post-Campaign', slug: { current: 'post-campaign', _type: 'slug' } }
        ],
        tags: ['fulfillment', 'delivery', 'customer-service'],
        readingTime: 9,
        featured: false,
        sectionsCount: 4
      }
    ]
    
    // Mock search function
    export const mockSearch = (posts: Post[], searchTerm: string): Post[] => {
      if (!searchTerm) return posts
      
      const term = searchTerm.toLowerCase()
      return posts.filter(post => 
        post.title.toLowerCase().includes(term) ||
        post.excerpt?.toLowerCase().includes(term) ||
        post.author?.name.toLowerCase().includes(term) ||
        post.tags?.some(tag => tag.toLowerCase().includes(term)) ||
        post.categories?.some(cat => cat.title.toLowerCase().includes(term))
      )
    }
    
    // Mock urlFor function to match Sanity's urlFor
    export const mockUrlFor = (image: Image | null | undefined) => ({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      width: (_w: number) => ({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        height: (_h: number) => ({
          url: (): string => image?.asset?.url || ''
        })
      }),
      url: (): string => image?.asset?.url || ''
    })