import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '../ui';

const CallToAction = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-navy-800 via-navy to-navy-900 relative overflow-hidden">
      {/* Background Pattern - refined with subtle animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-usa-red/15 rounded-full filter blur-[100px] translate-x-1/3 -translate-y-1/3 animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy-400/10 rounded-full filter blur-[120px] -translate-x-1/3 translate-y-1/3" />
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            Ready to Turn Your Truck Into a{' '}
            <span className="text-usa-red relative">
              Mobile Billboard
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-usa-red/60 via-usa-red/40 to-transparent rounded-full" />
            </span>
            ?
          </h2>
          <p className="text-xl text-navy-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of businesses who are advertising their services every
            mile they drive. Start designing your sign today — it&apos;s completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup" className="group">
              <Button
                variant="primary"
                size="xl"
                icon={ArrowRight}
                iconPosition="right"
              >
                Start Designing Free
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Contact Options - refined with better styling */}
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 bg-white/5 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10">
            <a
              href="tel:+15551234567"
              className="flex items-center space-x-2 text-navy-200 hover:text-white transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-usa-red/20 flex items-center justify-center">
                <Phone className="h-4 w-4 text-usa-red" />
              </div>
              <span className="font-medium">(555) 123-4567</span>
            </a>
            <div className="hidden sm:block w-px h-6 bg-white/20" />
            <a
              href="mailto:info@trucksigns.com"
              className="flex items-center space-x-2 text-navy-200 hover:text-white transition-colors duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-usa-red/20 flex items-center justify-center">
                <Mail className="h-4 w-4 text-usa-red" />
              </div>
              <span className="font-medium">info@trucksigns.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
