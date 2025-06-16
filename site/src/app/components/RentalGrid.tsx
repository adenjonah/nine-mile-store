'use client'

import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'
import { urlForImage } from '@/lib/sanity-image'

interface RentalItem {
  _id: string
  name: string
  slug: { current: string }
  mainImage: any
  description: string
  specifications: string[]
  dailyRate: number
  weeklyRate?: number
  category: string
}

interface RentalGridProps {
  items: RentalItem[]
}

export default function RentalGrid({ items }: RentalGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => {
        // Safely generate image URL with error handling
        let imageUrl = null
        try {
          if (item.mainImage && (item.mainImage.asset || item.mainImage._ref)) {
            imageUrl = urlForImage(item.mainImage).width(400).height(300).fit('crop').url()
          }
        } catch (error) {
          console.warn('Error generating image URL for rental item:', item.name, error)
        }

        return (
          <Link
            key={item._id}
            href={`/rentals/${item.slug.current}`}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-gray-200">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-4">{item.description}</p>
                
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-blue-600">
                        {formatCurrency(item.dailyRate)}
                      </span>
                      <span className="text-sm text-gray-500">/day</span>
                    </div>
                    {item.weeklyRate && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-green-600">
                          {formatCurrency(item.weeklyRate)}
                        </span>
                        <span className="text-xs text-gray-500">/week</span>
                      </div>
                    )}
                  </div>
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
} 