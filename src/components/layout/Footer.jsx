import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Products', href: '/products' },
      { name: 'Contact', href: '/about#contact' },
    ],
    resources: [
      { name: 'Design Tool', href: '/design' },
      { name: 'My Designs', href: '/my-designs' },
      { name: 'FAQ', href: '/about#faq' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
    ],
  };

  return (
    <footer className="bg-navy-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-usa-red p-2 rounded-lg">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold">TruckSigns.com</div>
                <div className="text-xs text-gray-400">Your truck, your sign</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Custom aluminum truck bed advertising signs that help your business
              stand out on the road. Proudly made in the USA.
            </p>
            <div className="flex items-center space-x-2 text-usa-red">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm font-medium">Made in USA</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail className="h-5 w-5 text-usa-red" />
                <span>info@trucksigns.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone className="h-5 w-5 text-usa-red" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin className="h-5 w-5 text-usa-red flex-shrink-0" />
                <span>123 Main Street<br />Anytown, USA 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} TruckSigns.com. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
