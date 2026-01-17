import Link from 'next/link'
import { FiClock, FiDollarSign, FiCheck } from 'react-icons/fi'

export default function Services() {
  const services = [
    {
      title: 'Bridal Makeup',
      description: 'Complete bridal makeup package for your special day. Includes trial session, consultation, and full wedding day service.',
      duration: '3-4 hours',
      price: 'Starting at $300',
      features: [
        'Pre-wedding trial session',
        'Full face makeup application',
        'Long-lasting, photo-ready finish',
        'Touch-up kit included',
        'Hair styling consultation',
      ],
      popular: true,
    },
    {
      title: 'Special Events Makeup',
      description: 'Perfect for parties, galas, proms, and any special occasion. Look stunning and camera-ready.',
      duration: '1-2 hours',
      price: 'Starting at $150',
      features: [
        'Custom look consultation',
        'Full face makeup',
        'False lashes included',
        'Long-wear products',
        'Touch-up tips',
      ],
    },
    {
      title: 'Photoshoot Makeup',
      description: 'Professional makeup designed for photography and videography. Camera-ready looks that pop on screen.',
      duration: '2-3 hours',
      price: 'Starting at $200',
      features: [
        'HD-ready makeup',
        'Color correction',
        'Contouring & highlighting',
        'Multiple look changes',
        'On-set touch-ups',
      ],
    },
    {
      title: 'Makeup Lessons',
      description: 'Learn professional techniques from our expert artists. Perfect for beginners or those wanting to improve their skills.',
      duration: '2 hours',
      price: 'Starting at $120',
      features: [
        'One-on-one instruction',
        'Product recommendations',
        'Step-by-step guidance',
        'Take-home notes',
        'Product samples',
      ],
    },
    {
      title: 'Hair & Makeup Package',
      description: 'Complete beauty transformation with both hair styling and professional makeup application.',
      duration: '3-4 hours',
      price: 'Starting at $250',
      features: [
        'Hair styling',
        'Full makeup application',
        'Hair accessories consultation',
        'Long-lasting hold',
        'Complete look coordination',
      ],
    },
    {
      title: 'Touch-ups & Refreshes',
      description: 'Quick touch-ups for existing makeup or a fresh look refresh. Perfect for mid-day or evening events.',
      duration: '30-45 mins',
      price: 'Starting at $75',
      features: [
        'Quick refresh',
        'Foundation touch-up',
        'Lip color refresh',
        'Eye makeup enhancement',
        'Powder & setting',
      ],
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 section-padding">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-gray-900">Our Services</h1>
          <p className="text-xl text-gray-600 font-light">
            Comprehensive beauty solutions tailored to your needs
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`card overflow-hidden relative ${
                  service.popular ? 'border-primary-300' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute top-6 right-6 bg-primary-600 text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-wide">
                    Most Popular
                  </div>
                )}
                <div className="p-10">
                  <h2 className="text-2xl font-medium text-gray-900 mb-4">{service.title}</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>

                  <div className="flex items-center gap-8 mb-8 text-gray-700 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <FiClock className="text-primary-600" size={18} />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiDollarSign className="text-primary-600" size={18} />
                      <span className="font-medium text-sm">{service.price}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <FiCheck className="text-primary-600 mt-0.5 flex-shrink-0" size={18} />
                        <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/appointment"
                    className="btn-primary w-full text-center block"
                  >
                    Book This Service
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 tracking-tight">
              Custom Packages Available
            </h2>
            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
              Need something specific? We offer custom packages tailored to your unique requirements. 
              Whether it's a group booking, multiple events, or a special combination of services, 
              we're here to create the perfect package for you.
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us for Custom Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

