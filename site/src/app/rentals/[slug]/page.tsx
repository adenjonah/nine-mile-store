import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { formatCurrency } from '@/lib/utils'
import { notFound } from 'next/navigation'
import Navbar from '@/app/components/Navbar'
import { urlForImage } from '@/lib/sanity-image'

const getRentalItem = groq`
  *[_type == "rentalItem" && slug.current == $slug][0] {
    _id,
    name,
    "mainImage": image.image,
    "additionalImages": additionalImages[].image,
    description,
    specifications,
    dailyRate,
    weeklyRate,
    category
  }
`

interface RentalItemPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function RentalItemPage({ params }: RentalItemPageProps) {
  const { slug } = await params
  
  let item = null
  try {
    item = await client.fetch(getRentalItem, { slug })
  } catch (error) {
    console.error('Error fetching rental item:', error)
    notFound()
  }

  if (!item) {
    notFound()
  }

  // Generate properly cropped image URLs using hotspot data with error handling
  let mainImageUrl = null
  try {
    if (item.mainImage && item.mainImage.asset) {
      mainImageUrl = urlForImage(item.mainImage).width(800).height(400).fit('crop').url()
    }
  } catch (error) {
    console.warn('Error generating main image URL:', error)
  }

  // Process additional images with error handling
  let validAdditionalImages = []
  try {
    validAdditionalImages = item.additionalImages?.filter(img => {
      try {
        return img && img.asset
      } catch {
        return false
      }
    }) || []
  } catch (error) {
    console.warn('Error processing additional images:', error)
  }

  // Safely get rates with defaults
  const dailyRate = typeof item.dailyRate === 'number' ? item.dailyRate : 0
  const weeklyRate = typeof item.weeklyRate === 'number' ? item.weeklyRate : null

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {mainImageUrl && (
              <div className="relative h-96">
                <Image
                  src={mainImageUrl}
                  alt={item.name || 'Rental item'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {validAdditionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
                {validAdditionalImages.map((img, index) => {
                  try {
                    return (
                      <div key={index} className="relative h-32">
                        <Image
                          src={urlForImage(img).width(300).height(200).fit('crop').url()}
                          alt={`${item.name} - Image ${index + 2}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    )
                  } catch (error) {
                    console.warn(`Error rendering additional image ${index}:`, error)
                    return null
                  }
                })}
              </div>
            )}

            <div className="p-6">
              <h1 className="text-3xl font-bold mb-6">{item.name || 'Rental Item'}</h1>
              
              {/* Pricing Section with Site Colors */}
              <div className="bg-background-alternate rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Rental Rates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-primary border-opacity-30 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Daily Rate</p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          {formatCurrency(dailyRate)}
                        </p>
                      </div>
                      <div className="bg-primary bg-opacity-10 rounded-full p-3">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {weeklyRate && (
                    <div className="bg-white border-2 border-secondary border-opacity-30 rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">Weekly Rate</p>
                          <p className="text-2xl font-bold text-secondary mt-1">
                            {formatCurrency(weeklyRate)}
                          </p>
                          {dailyRate > 0 && weeklyRate > 0 && (dailyRate * 7) > weeklyRate && (
                            <p className="text-xs text-gray-500 mt-1">
                              Save {formatCurrency((dailyRate * 7) - weeklyRate)}
                            </p>
                          )}
                        </div>
                        <div className="bg-secondary bg-opacity-10 rounded-full p-3">
                          <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 mb-6">{item.description || 'No description available.'}</p>
                
                {item.specifications && Array.isArray(item.specifications) && item.specifications.length > 0 && (
                  <>
                    <h2 className="text-xl font-semibold mb-2">Specifications</h2>
                    <ul className="list-disc list-inside text-gray-600 mb-6">
                      {item.specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <div className="mt-8">
                <span className="inline-block bg-gray-100 rounded-full px-4 py-2 text-sm font-medium text-gray-700">
                  Category: {item.category || 'Uncategorized'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 