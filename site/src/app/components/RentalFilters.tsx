'use client'

import { useState } from 'react'

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'powerTools', name: 'Power Tools' },
  { id: 'handTools', name: 'Hand Tools' },
  { id: 'constructionEquipment', name: 'Construction Equipment' },
  { id: 'lawnGarden', name: 'Lawn & Garden' },
  { id: 'other', name: 'Other' }
]

const sortOptions = [
  { id: 'priceLowToHigh', name: 'Price: Low to High' },
  { id: 'priceHighToLow', name: 'Price: High to Low' },
  { id: 'nameAZ', name: 'Name: A-Z' },
  { id: 'nameZA', name: 'Name: Z-A' }
]

export default function RentalFilters() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('nameAZ')

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      <div className="relative">
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {sortOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  )
} 