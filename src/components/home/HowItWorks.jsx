import { UserPlus, Palette, Send, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Free Account',
    description:
      'Sign up in seconds. No credit card required, no commitments. Start designing immediately.',
  },
  {
    icon: Palette,
    number: '02',
    title: 'Design Your Sign',
    description:
      'Use our intuitive design tool to create your perfect sign. Upload images, add text, and customize to your heart\'s content.',
  },
  {
    icon: Send,
    number: '03',
    title: 'Request a Quote',
    description:
      'When you\'re happy with your design, send us an inquiry. We\'ll get back to you with pricing and production timeline.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            How It <span className="text-usa-red">Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Getting your custom truck sign is simple. Three easy steps to turn
            your truck into a mobile billboard.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gray-200">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-usa-red rounded-full" />
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-usa-red rounded-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-usa-red rounded-full" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-navy rounded-2xl mb-6 shadow-lg">
                  <step.icon className="h-10 w-10 text-white" />
                </div>

                {/* Number Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 bg-usa-red text-white text-sm font-bold px-3 py-1 rounded-full">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
            <Check className="h-5 w-5" />
            <span className="text-sm font-medium">Free to design, no obligation</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="primary" size="lg">
                Get Started Now
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="secondary" size="lg">
                View Sign Sizes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
