'use client'

import { useState } from 'react'
import { FiX } from 'react-icons/fi'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Gallery images - easily add more images to any category
  const images = [
    // Hairstyle category - images in /public/images/gallery/hairstyle/
    { id: 1, src: '/images/gallery/hairstyle/hairs_1.jpg', category: 'Hairstyle' },
    { id: 2, src: '/images/gallery/hairstyle/hairs_2.jpg', category: 'Hairstyle' },
    // Add more hairstyle images here: hairstyle-5.jpg, hairstyle-6.jpg, etc.

    // Bridal category - images in /public/images/gallery/bridal/
    { id: 101, src: '/images/gallery/bridal/bridal_1.jpg', category: 'Bridal' },
    { id: 102, src: '/images/gallery/bridal/bridal_2.jpg', category: 'Bridal' },
    { id: 103, src: '/images/gallery/bridal/bridal_3.jpg', category: 'Bridal' },
    { id: 104, src: '/images/gallery/bridal/bridal_4.jpg', category: 'Bridal' },
    { id: 105, src: '/images/gallery/bridal/bridal_5.jpg', category: 'Bridal' },
    { id: 106, src: '/images/gallery/bridal/bridal_6.jpg', category: 'Bridal' },
    { id: 107, src: '/images/gallery/bridal/bridal_7.jpg', category: 'Bridal' },
    { id: 108, src: '/images/gallery/bridal/bridal_8.jpg', category: 'Bridal' },
    { id: 109, src: '/images/gallery/bridal/bridal_9.jpg', category: 'Bridal' },
    { id: 110, src: '/images/gallery/bridal/bridal_10.jpg', category: 'Bridal' },
    { id: 111, src: '/images/gallery/bridal/bridal_11.jpg', category: 'Bridal' },
    { id: 112, src: '/images/gallery/bridal/bridal_12.jpg', category: 'Bridal' },
    { id: 113, src: '/images/gallery/bridal/bridal_13.jpg', category: 'Bridal' },
    { id: 114, src: '/images/gallery/bridal/bridal_14.jpg', category: 'Bridal' },
    { id: 115, src: '/images/gallery/bridal/bridal_15.jpg', category: 'Bridal' },
    { id: 116, src: '/images/gallery/bridal/bridal_16.jpg', category: 'Bridal' },

    // Add more bridal images here: bridal-5.jpg, bridal-6.jpg, etc.

    // Makeup category - images in /public/images/gallery/makeup/
    { id: 201, src: '/images/gallery/makeup/makeup_1.jpg', category: 'Makeup' },
    { id: 202, src: '/images/gallery/makeup/makeup_2.jpg', category: 'Makeup' },
    { id: 203, src: '/images/gallery/makeup/makeup_3.jpg', category: 'Makeup' },
    { id: 204, src: '/images/gallery/makeup/makeup_4.jpg', category: 'Makeup' },
    { id: 205, src: '/images/gallery/makeup/makeup_5.jpg', category: 'Makeup' },
    { id: 206, src: '/images/gallery/makeup/makeup_6.jpg', category: 'Makeup' },
    { id: 207, src: '/images/gallery/makeup/makeup_7.jpg', category: 'Makeup' },
    { id: 208, src: '/images/gallery/makeup/makeup_8.jpg', category: 'Makeup' },
    { id: 209, src: '/images/gallery/makeup/makeup_9.jpg', category: 'Makeup' },
    // Add more makeup images here: makeup-5.jpg, makeup-6.jpg, etc.

    // Photoshoot category - images in /public/images/gallery/photoshoot/
    { id: 301, src: '/images/gallery/photoshoot/photoshoot_1.jpg', category: 'Photoshoot' },
    { id: 302, src: '/images/gallery/photoshoot/photoshoot_2.jpg', category: 'Photoshoot' },
    { id: 303, src: '/images/gallery/photoshoot/photoshoot_3.jpg', category: 'Photoshoot' },
    { id: 304, src: '/images/gallery/photoshoot/photoshoot_4.jpg', category: 'Photoshoot' },
    { id: 305, src: '/images/gallery/photoshoot/photoshoot_5.jpg', category: 'Photoshoot' },
    { id: 306, src: '/images/gallery/photoshoot/photoshoot_6.jpg', category: 'Photoshoot' },
    // Add more photoshoot images here: photoshoot-5.jpg, photoshoot-6.jpg, etc.

    // Nails category - images in /public/images/gallery/nails/
    { id: 401, src: '/images/gallery/nails/nails_1.jpg', category: 'Nails' },
    { id: 402, src: '/images/gallery/nails/nails_2.jpg', category: 'Nails' },
    { id: 403, src: '/images/gallery/nails/nails_3.jpg', category: 'Nails' },
    { id: 404, src: '/images/gallery/nails/nails_4.jpg', category: 'Nails' },
    { id: 405, src: '/images/gallery/nails/nails_5.jpg', category: 'Nails' },
    { id: 406, src: '/images/gallery/nails/nails_6.jpg', category: 'Nails' },
    { id: 407, src: '/images/gallery/nails/nails_7.jpg', category: 'Nails' },
    // Add more nail images here: nails-5.jpg, nails-6.jpg, etc.
  ]

  const categories = ['All', 'Hairstyle', 'Bridal', 'Makeup', 'Photoshoot', 'Nails']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter(img => img.category === activeCategory)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 section-padding">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-gray-900">Our Gallery</h1>
          <p className="text-xl text-gray-600 font-light">
            Explore our previous work and see the transformations we've created
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-md font-medium text-sm transition-all ${activeCategory === category
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg card"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="aspect-square overflow-hidden bg-gray-50 flex items-center justify-center p-2">
                  <img
                    src={image.src}
                    alt={image.category}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-center p-4">
                    <p className="text-sm font-medium">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No images found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-6xl h-full max-h-[85vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-primary-400 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
              aria-label="Close"
            >
              <FiX size={32} />
            </button>
            <div className="w-full h-full flex items-center justify-center bg-transparent rounded-lg overflow-auto">
              <img
                src={images.find(img => img.id === selectedImage)?.src}
                alt={images.find(img => img.id === selectedImage)?.category}
                className="max-w-[95%] max-h-[95%] object-contain"
              />
            </div>
            <div className="mt-4 text-white text-center">
              <p className="text-lg font-medium">
                {images.find(img => img.id === selectedImage)?.category}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Love What You See?</h2>
          <p className="text-xl mb-10 text-primary-50 font-light">
            Book your appointment and let us create a stunning look for you too!
          </p>
          <a href="/appointment" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
            Book Your Appointment
          </a>
        </div>
      </section>
    </div>
  )
}

