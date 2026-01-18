'use client'

import { useState } from 'react'
import { FiCalendar, FiClock, FiUser, FiMail, FiPhone, FiCheck } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import ReCAPTCHA from 'react-google-recaptcha'

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    customService: '',
    date: '',
    time: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const services = [
    'Bridal Makeup',
    'Special Events Makeup',
    'Photoshoot Makeup',
    'Makeup Lessons',
    'Hair & Makeup Package',
    'Touch-ups & Refreshes',
    'External',
  ]

  const timeSlots = [
    '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM',
  ]

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

    const serviceName = formData.service === 'External' ? formData.customService : formData.service

    // Check reCAPTCHA
    if (!recaptchaToken) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
      return
    }

    try {
      // Send to API route for business notification (Resend)
      const response = await fetch('/api/appointment', {
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
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_APPOINTMENT_CUSTOMER!,
        {
          to_name: formData.name,
          to_email: formData.email,
          phone: formData.phone,
          service: serviceName,
          date: formData.date,
          time: formData.time,
          message: formData.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        customService: '',
        date: '',
        time: '',
        message: '',
      })
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Error submitting appointment:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-white to-primary-50 section-padding">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light mb-6 tracking-tight text-gray-900">Book Your Appointment</h1>
          <p className="text-xl text-gray-600 font-light">
            Schedule your beauty transformation today
          </p>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="card p-10 md:p-14">
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 text-center tracking-tight">
                Appointment Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      <FiUser className="inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      <FiMail className="inline mr-2" />
                      Email Address *
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
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    <FiPhone className="inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {formData.service === 'External' && (
                    <div className="mt-4">
                      <label htmlFor="customService" className="block text-sm font-medium text-gray-700 mb-2">
                        Please specify the service you need *
                      </label>
                      <input
                        type="text"
                        id="customService"
                        name="customService"
                        required={formData.service === 'External'}
                        value={formData.customService}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="Describe the service you're looking for..."
                      />
                    </div>
                  )}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      <FiCalendar className="inline mr-2" />
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      min={today}
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      <FiClock className="inline mr-2" />
                      Preferred Time *
                    </label>
                    <select
                      id="time"
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes or Special Requests
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                    placeholder="Any special requests, allergies, or additional information we should know..."
                  />
                </div>

                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <FiCheck className="text-green-600" size={20} />
                      <div>
                        <p className="font-semibold">Appointment Request Submitted!</p>
                        <p className="text-sm">We'll contact you shortly to confirm your appointment.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    Something went wrong. Please try again or contact us directly.
                  </div>
                )}

                <div className="mb-6">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    onChange={(token) => setRecaptchaToken(token)}
                    onExpired={() => setRecaptchaToken(null)}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Appointment'}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-10 p-8 bg-primary-50 rounded-lg border border-primary-100">
                <h3 className="font-medium text-gray-900 mb-4">What happens next?</h3>
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li className="flex items-start gap-3">
                    <FiCheck className="text-primary-600 mt-0.5 flex-shrink-0" size={18} />
                    <span>We'll review your request and check availability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheck className="text-primary-600 mt-0.5 flex-shrink-0" size={18} />
                    <span>You'll receive a confirmation email or phone call within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FiCheck className="text-primary-600 mt-0.5 flex-shrink-0" size={18} />
                    <span>We'll work with you to finalize the details</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

