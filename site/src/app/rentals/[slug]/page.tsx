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
    "mainImage": coalesce(image, image),
    "additionalImages": coalesce(additionalImages, additionalImages),
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
  const item = await client.fetch(getRentalItem, { slug })

  if (!item) {
    notFound()
  }

  // Generate properly cropped image URLs using hotspot data
  const mainImageUrl = item.mainImage ? urlForImage(item.mainImage).width(800).height(400).fit('crop').url() : null
  const validAdditionalImages = item.additionalImages?.filter(img => img && img.asset) || []

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
                  alt={item.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
            
            {validAdditionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50">
                {validAdditionalImages.map((img, index) => (
                  <div key={index} className="relative h-32">
                    <Image
                      src={urlForImage(img).width(300).height(200).fit('crop').url()}
                      alt={`${item.name} - Image ${index + 2}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{item.name}</h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-primary bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Daily Rate</p>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(item.dailyRate)}
                  </p>
                </div>
                {item.weeklyRate && (
                  <div className="bg-primary bg-opacity-10 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Weekly Rate</p>
                    <p className="text-xl font-bold text-primary">
                      {formatCurrency(item.weeklyRate)}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600 mb-6">{item.description}</p>
                
                {item.specifications && item.specifications.length > 0 && (
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
                  Category: {item.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
} 