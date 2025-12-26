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
    <footer className="bg-gradient-to-b from-navy-900 to-navy-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-5 group">
              <div className="bg-usa-red p-2 rounded-lg shadow-soft transition-all duration-300 group-hover:shadow-glow-red group-hover:scale-105">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-lg font-bold tracking-tight">TruckSigns.com</div>
                <div className="text-xs text-navy-400 font-medium">Your truck, your sign</div>
              </div>
            </Link>
            <p className="text-navy-400 text-sm mb-6 leading-relaxed">
              Custom aluminum truck bed advertising signs that help your business
              stand out on the road. Proudly made in the USA.
            </p>
            <div className="inline-flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-lg" role="img" aria-label="USA flag">🇺🇸</span>
              <span className="text-sm font-medium text-usa-red">Made in USA</span>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-navy-300 mb-5">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-navy-400 hover:text-white transition-colors duration-200 text-sm inline-block hover:translate-x-0.5 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-navy-300 mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-navy-400 hover:text-white transition-colors duration-200 text-sm inline-block hover:translate-x-0.5 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-navy-300 mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:info@trucksigns.com"
                  className="flex items-center space-x-3 text-navy-400 hover:text-white transition-colors duration-200 text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-usa-red/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-usa-red/20">
                    <Mail className="h-4 w-4 text-usa-red" />
                  </div>
                  <span>info@trucksigns.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="flex items-center space-x-3 text-navy-400 hover:text-white transition-colors duration-200 text-sm group"
                >
                  <div className="w-8 h-8 rounded-lg bg-usa-red/10 flex items-center justify-center transition-colors duration-200 group-hover:bg-usa-red/20">
                    <Phone className="h-4 w-4 text-usa-red" />
                  </div>
                  <span>(555) 123-4567</span>
                </a>
              </li>
              <li className="flex items-start space-x-3 text-navy-400 text-sm">
                <div className="w-8 h-8 rounded-lg bg-usa-red/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-4 w-4 text-usa-red" />
                </div>
                <span className="pt-1.5">123 Main Street<br />Anytown, USA 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-navy-500 text-sm">
              &copy; {currentYear} TruckSigns.com. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-navy-500 hover:text-navy-300 transition-colors duration-200 text-sm"
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
