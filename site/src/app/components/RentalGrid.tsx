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
      {items.map((item) => (
        <Link
          key={item._id}
          href={`/rentals/${item.slug.current}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              {item.mainImage && (
                <Image
                  src={urlForImage(item.mainImage).width(400).height(300).fit('crop').url()}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              <p className="text-gray-600 line-clamp-2 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-primary">
                    {formatCurrency(item.dailyRate)}/day
                  </p>
                  {item.weeklyRate && (
                    <p className="text-sm text-gray-500">
                      {formatCurrency(item.weeklyRate)}/week
                    </p>
                  )}
                </div>
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
} 