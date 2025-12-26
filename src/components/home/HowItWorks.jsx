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
    <section className="py-20 lg:py-28 bg-white dark:bg-navy-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            How It <span className="text-usa-red">Works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-navy-300 leading-relaxed">
            Getting your custom truck sign is simple. Three easy steps to turn
            your truck into a mobile billboard.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line (Desktop) - spans full width behind icons */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-px">
            {/* The actual line between the first and last dot */}
            <div className="absolute left-[16.67%] right-[16.67%] top-0 h-px bg-gradient-to-r from-gray-200 via-gray-200 dark:via-navy-700 to-gray-200 dark:to-navy-700" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center group">
                {/* Step Icon Container - refined with hover effects */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-navy to-navy-800 dark:from-navy-700 dark:to-navy-800 rounded-2xl mb-6 shadow-soft-lg transition-all duration-300 group-hover:shadow-glow-navy group-hover:scale-105">
                  <step.icon className="h-9 w-9 text-white transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Red dot indicator - centered under icon */}
                <div className="hidden lg:block absolute top-[6.5rem] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-usa-red rounded-full shadow-glow-red" />

                {/* Number Badge - refined positioning and styling */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 bg-gradient-to-r from-usa-red to-usa-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-soft">
                  {step.number}
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight lg:mt-6">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-navy-400 max-w-sm mx-auto text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA - refined styling */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-full mb-6 border border-emerald-100 dark:border-emerald-800/30">
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
