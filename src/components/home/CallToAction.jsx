import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail } from 'lucide-react';
import { Button } from '../ui';

const CallToAction = () => {
  return (
    <section className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-usa-red rounded-full filter blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Turn Your Truck Into a{' '}
            <span className="text-usa-red">Mobile Billboard</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses who are advertising their services every
            mile they drive. Start designing your sign today — it's completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
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

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-usa-red" />
              <span>(555) 123-4567</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-500 rounded-full" />
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-usa-red" />
              <span>info@trucksigns.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
