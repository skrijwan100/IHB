import React from 'react';
import { 
  MapPin, 
  Shield, 
  Star, 
  Users, 
  QrCode,
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ChevronRight,
  Globe
} from 'lucide-react';

const TouristPlatformFooter = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Explore Places', href: '#' },
    { name: 'Reviews', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'Contact Us', href: '#' }
  ];

  const resources = [
    { name: 'FAQs', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Support', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', name: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Instagram, href: '#', name: 'Instagram', color: 'hover:text-pink-400' },
    { icon: Linkedin, href: '#', name: 'LinkedIn', color: 'hover:text-blue-500' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Globe className="mr-2 text-blue-400" size={24} />
              About Us
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              TouristConnect is your ultimate travel companion, providing secure Tourist IDs, 
              QR code verification, safety features, authentic reviews, and direct connections 
              to certified local guides for unforgettable travel experiences.
            </p>
            
            {/* Key Features */}
            <div className="space-y-2 mt-4">
              <div className="flex items-center text-sm text-gray-300">
                <QrCode size={16} className="mr-2 text-green-400" />
                <span>QR Code Verification</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Shield size={16} className="mr-2 text-blue-400" />
                <span>Advanced Safety Features</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Star size={16} className="mr-2 text-yellow-400" />
                <span>Authentic Reviews</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Users size={16} className="mr-2 text-purple-400" />
                <span>Certified Guide Network</span>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <ChevronRight className="mr-2 text-blue-400" size={24} />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group text-sm"
                  >
                    <ChevronRight 
                      size={14} 
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                    />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2 text-blue-400" size={24} />
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <a 
                    href={resource.href}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group text-sm"
                  >
                    <ChevronRight 
                      size={14} 
                      className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
                    />
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Phone className="mr-2 text-blue-400" size={24} />
              Contact Info
            </h3>
            
            {/* Contact Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-green-400 flex-shrink-0" />
                <a 
                  href="mailto:support@touristconnect.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  support@touristconnect.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-blue-400 flex-shrink-0" />
                <a 
                  href="tel:+1-800-TOURIST"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +1 (800) TOURIST
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-400 mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`text-gray-400 ${social.color} transition-all duration-200 transform hover:scale-110 p-2 rounded-full hover:bg-gray-800`}
                      aria-label={social.name}
                    >
                      <IconComponent size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Globe size={16} className="text-white" />
              </div>
              <span className="text-sm text-gray-400">
                © 2025 TouristConnect. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TouristPlatformFooter;