import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Star } from 'lucide-react';
import { Button } from '../ui';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-navy via-navy-700 to-navy-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-usa-red rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-white text-sm font-medium">
                Proudly Made in the USA
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Your Truck,
              <br />
              <span className="text-usa-red">Your Sign</span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
              Transform your truck into a mobile billboard. Custom aluminum signs
              that mount above your truck bed, giving your business maximum
              visibility on every road.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  Design Your Sign Free
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="lg">
                  View Products
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-8">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="ml-2 text-white text-sm">5.0 Rating</span>
              </div>
              <div className="text-gray-400 text-sm">
                <span className="text-white font-semibold">500+</span> Signs
                Delivered
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
              {/* Truck Illustration */}
              <div className="aspect-[4/3] bg-gray-700 rounded-xl overflow-hidden relative">
                {/* Simple Truck Representation */}
                <div className="absolute inset-0 flex items-end justify-center pb-8">
                  {/* Truck Bed */}
                  <div className="relative w-3/4">
                    {/* Sign on top */}
                    <div className="bg-usa-red h-16 rounded-t-lg flex items-center justify-center mb-1 shadow-lg">
                      <div className="text-white text-center">
                        <div className="text-lg font-bold">YOUR BUSINESS</div>
                        <div className="text-xs">(555) 123-4567</div>
                      </div>
                    </div>
                    {/* Truck cab */}
                    <div className="flex">
                      <div className="bg-navy-600 w-1/3 h-12 rounded-l-lg" />
                      <div className="bg-gray-500 w-2/3 h-12 rounded-r-lg" />
                    </div>
                    {/* Wheels */}
                    <div className="flex justify-between mt-1 px-4">
                      <div className="w-8 h-8 bg-gray-800 rounded-full border-4 border-gray-600" />
                      <div className="w-8 h-8 bg-gray-800 rounded-full border-4 border-gray-600" />
                    </div>
                  </div>
                </div>

                {/* Road */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gray-600">
                  <div className="h-1 bg-yellow-400 mt-3 mx-4" />
                </div>
              </div>

              {/* Feature callouts */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <Truck className="h-6 w-6 text-usa-red mx-auto mb-2" />
                  <span className="text-white text-xs font-medium">Cab Height</span>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-usa-red text-lg font-bold mb-1">AL</div>
                  <span className="text-white text-xs font-medium">Aluminum</span>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <div className="text-usa-red text-lg font-bold mb-1">3</div>
                  <span className="text-white text-xs font-medium">Sizes</span>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-usa-red text-white px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-bold">Contact for Quote</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
