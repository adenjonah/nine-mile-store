import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import RentalGrid from '@/app/components/RentalGrid'
import RentalFilters from '@/app/components/RentalFilters'
import Navbar from '@/app/components/Navbar'

const getRentalItems = groq`
  *[_type == "rentalItem"] {
    _id,
    name,
    slug,
    "mainImage": image,
    description,
    specifications,
    dailyRate,
    weeklyRate,
    category
  }
`

export default async function RentalsPage() {
  const rentalItems = await client.fetch(getRentalItems)

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
          
          <RentalFilters />
          <RentalGrid items={rentalItems} />
        </div>
      </main>
    </>
  )
} 