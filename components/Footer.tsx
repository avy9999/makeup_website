import Link from 'next/link'
import { FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-primary-400 mb-4">JSS Makeup Studio</h3>
            <p className="text-gray-400">
              Your trusted destination for professional makeup services and beauty transformations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-400 transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary-400 transition-colors">Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary-400" />
                <span>+91 8445498029</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-primary-400" />
                <span>jssmakeupstudio@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-primary-400" />
                <span>Pakadiya Chauraha, Main Market, Nearby Bansal Book Depo, Puranpur (262122), Uttar Pradesh</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/jss_makeup.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JSS Makeup Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

