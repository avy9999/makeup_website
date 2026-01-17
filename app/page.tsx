import Link from 'next/link'
import { FiArrowRight, FiCheck } from 'react-icons/fi'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-primary-50 text-gray-900">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
              Transform Your Beauty
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-gray-600 font-light max-w-2xl mx-auto">
              Professional makeup services that bring out your natural radiance. 
              Experience the artistry of beauty transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/appointment" className="btn-primary inline-flex items-center justify-center">
                Book Appointment
                <FiArrowRight className="ml-2" />
              </Link>
              <Link href="/services" className="btn-secondary">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">Why Choose Us</h2>
            <p className="text-lg text-gray-500 font-light">Excellence in every brushstroke</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-10 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Expert Artists</h3>
              <p className="text-gray-600 leading-relaxed">
                Our certified makeup artists bring years of experience and creativity to every session.
              </p>
            </div>

            <div className="card p-10 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💄</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Premium Products</h3>
              <p className="text-gray-600 leading-relaxed">
                We use only the finest, high-quality makeup brands to ensure stunning, long-lasting results.
              </p>
            </div>

            <div className="card p-10 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎨</span>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Custom Looks</h3>
              <p className="text-gray-600 leading-relaxed">
                Every look is tailored to your unique features, style, and the occasion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">Our Services</h2>
            <p className="text-lg text-gray-500 font-light">Comprehensive beauty solutions for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Bridal Makeup', description: 'Your perfect wedding day look' },
              { title: 'Special Events', description: 'Makeup for parties and celebrations' },
              { title: 'Photoshoot Makeup', description: 'Camera-ready professional looks' },
              { title: 'Makeup Lessons', description: 'Learn the art of makeup application' },
              { title: 'Hair & Makeup', description: 'Complete beauty package' },
              { title: 'Touch-ups', description: 'Quick refresh and maintenance' },
            ].map((service, index) => (
              <div key={index} className="card p-8 hover:border-primary-200">
                <h3 className="text-xl font-medium mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <Link href="/services" className="text-primary-600 font-medium hover:text-primary-700 inline-flex items-center text-sm">
                  Learn More <FiArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/services" className="btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Ready to Transform Your Look?</h2>
          <p className="text-xl mb-10 text-primary-50 font-light">
            Book your appointment today and experience the magic of professional makeup artistry.
          </p>
          <Link href="/appointment" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
            Schedule Your Appointment
          </Link>
        </div>
      </section>
    </div>
  )
}

