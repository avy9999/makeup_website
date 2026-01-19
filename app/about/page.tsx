import { FiAward, FiUsers, FiHeart } from 'react-icons/fi'

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 section-padding">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-gray-900">About Us</h1>
          <p className="text-xl text-gray-600 font-light">
            Passionate about bringing out your natural beauty
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 tracking-tight">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                JSS Makeup Studio was founded with a simple yet powerful vision: to help every client
                discover and enhance their unique beauty. What started as a small studio has grown
                into a trusted name in professional makeup artistry.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our team of skilled artists combines technical expertise with creative flair,
                ensuring that each client receives a personalized experience tailored to their
                individual style and needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that makeup is more than just cosmetics—it's a form of self-expression
                and confidence-building. Every brushstroke is applied with care, precision, and
                passion for the art of beauty.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/images/gallery/makeup/makeup_1.jpg"
                alt="JSS Makeup Studio workspace"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">Our Values</h2>
            <p className="text-lg text-gray-500 font-light">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-10 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiAward className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We strive for perfection in every service, continuously learning and improving our craft.
              </p>
            </div>

            <div className="card p-10 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUsers className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Client Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Your satisfaction and comfort are our top priorities. We listen, understand, and deliver.
              </p>
            </div>

            <div className="card p-10 text-center">
              <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiHeart className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Passion</h3>
              <p className="text-gray-600 leading-relaxed">
                We love what we do, and it shows in every detail of our work and service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">Meet Our Team</h2>
            <p className="text-lg text-gray-500 font-light">The talented artists behind the magic</p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="card overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src="/images/team/sapna-gupta.jpg"
                  alt="Sapna Gupta - Lead Makeup Artist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-center">
                <h3 className="text-xl font-medium mb-2 text-gray-900">Sapna Gupta</h3>
                <p className="text-primary-600 mb-3 font-medium">Lead Makeup Artist</p>
                <p className="text-gray-500 text-sm">12+ years of experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

