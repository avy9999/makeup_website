'use client'

import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Check reCAPTCHA
    if (!recaptchaToken) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
      return
    }

    try {
      // Send to API route for business notification (Resend)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit to business')
      }

      // Send confirmation email to customer via EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_CUSTOMER!,
        {
          to_name: formData.name,
          to_email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 section-padding">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-gray-900">Contact Us</h1>
          <p className="text-xl text-gray-600 font-light">
            Get in touch with us - we'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight">Get in Touch</h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
                Have questions or want to learn more about our services? We're here to help!
                Reach out to us through any of the following ways.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiPhone className="text-primary-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1.5">Phone</h3>
                    <p className="text-gray-600 mb-1">+91 8445498029</p>
                    <p className="text-sm text-gray-500">Tue-Sun: 10am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMail className="text-primary-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1.5">Email</h3>
                    <p className="text-gray-600 mb-1">jssmakeupstudio@gmail.com</p>
                    <p className="text-sm text-gray-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="text-primary-600" size={22} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1.5">Address</h3>
                    <p className="text-gray-600 mb-1">Pakadiya Chauraha, Main Market</p>
                    <p className="text-gray-600 mb-1">Nearby Bansal Book Depo</p>
                    <p className="text-gray-600 mb-1">Puranpur (262122), Uttar Pradesh</p>
                    <p className="text-sm text-gray-500">By appointment only</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-8 bg-primary-50 rounded-lg border border-primary-100">
                <h3 className="font-medium text-gray-900 mb-4">Business Hours</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Tuesday - Sunday: 10:00 AM - 6:00 PM</li>
                  <li>Monday: By appointment only</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="+91 99999 99999"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="appointment">Appointment Booking</option>
                    <option value="services">Services Information</option>
                    <option value="pricing">Pricing Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Something went wrong. Please try again later.
                  </div>
                )}

                <div className="mb-6">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token) => setRecaptchaToken(token)}
                    onExpired={() => setRecaptchaToken(null)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

