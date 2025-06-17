'use client'

import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity-image'
import Navbar from '@/app/components/Navbar'

const query = groq`
  *[_type == "rentalItem"] {
    _id,
    name,
    slug,
    "mainImage": image.image,
    description,
    dailyRate,
    weeklyRate,
    category
  }
`

interface RentalItem {
  _id: string
  name: string
  slug: { current: string }
  mainImage: any
  description: string
  dailyRate: number
  weeklyRate?: number
  category: string
}

export default function RentalsPage() {
  const [rentalItems, setRentalItems] = useState<RentalItem[]>([])
  const [filteredItems, setFilteredItems] = useState<RentalItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(true)

  // Fetch rental items
  useEffect(() => {
    async function fetchItems() {
      try {
        const items = await client.fetch(query)
        const safeItems = Array.isArray(items) ? items : []
        setRentalItems(safeItems)
        setFilteredItems(safeItems)
      } catch (error) {
        console.error('Error fetching rental items:', error)
        setRentalItems([])
        setFilteredItems([])
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  // Get unique categories
  const categories = ['all', ...new Set(rentalItems.map(item => item.category).filter(Boolean))]

  // Filter and sort items
  useEffect(() => {
    let filtered = rentalItems

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    // Sort items
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price-low':
          return (a.dailyRate || 0) - (b.dailyRate || 0)
        case 'price-high':
          return (b.dailyRate || 0) - (a.dailyRate || 0)
        default:
          return 0
      }
    })

    setFilteredItems(filtered)
  }, [rentalItems, selectedCategory, sortBy])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-20">
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading rental items...</p>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Equipment Rentals</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our selection of professional-grade tools and equipment available for rent.
              Daily and weekly rates available.
            </p>
          </div>
          
          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize
                    ${selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  {category === 'all' ? 'All Items' : category.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>
            
            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredItems.length} of {rentalItems.length} items
              {selectedCategory !== 'all' && ` in "${selectedCategory.replace(/([A-Z])/g, ' $1').trim()}"`}
            </p>
          </div>
          
          {/* Rental Items Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => {
                // Generate image URL safely
                let imageUrl = null
                try {
                  if (item.mainImage) {
                    imageUrl = urlForImage(item.mainImage).width(400).height(300).fit('crop').url()
                  }
                } catch (error) {
                  console.warn('Error generating image URL:', error)
                }

                const dailyRate = typeof item.dailyRate === 'number' ? item.dailyRate : 0
                const weeklyRate = typeof item.weeklyRate === 'number' ? item.weeklyRate : null

                return (
                  <Link
                    key={item._id}
                    href={`/rentals/${item.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {item.description || 'No description available.'}
                        </p>
                        
                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-primary">
                                {formatCurrency(dailyRate)}
                              </span>
                              <span className="text-sm text-gray-500">/day</span>
                            </div>
                            {weeklyRate && (
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-secondary">
                                  {formatCurrency(weeklyRate)}
                                </span>
                                <span className="text-xs text-gray-500">/week</span>
                              </div>
                            )}
                          </div>
                          <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700 capitalize">
                            {item.category?.replace(/([A-Z])/g, ' $1').trim() || 'Other'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {selectedCategory === 'all' 
                  ? 'No rental items available at this time.' 
                  : `No items found in "${selectedCategory.replace(/([A-Z])/g, ' $1').trim()}" category.`
                }
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
} 