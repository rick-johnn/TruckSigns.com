import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SIGN_SIZES } from '../../utils/constants';
import { Button } from '../ui';

const ProductPreview = () => {
  const sizes = Object.values(SIGN_SIZES);

  return (
    <section className="py-20 lg:py-28 bg-porcelain-50 dark:bg-navy-950 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            Choose Your <span className="text-usa-red">Sign Size</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-navy-300 leading-relaxed">
            We offer three standard sizes to fit the most popular truck beds.
            All signs are 24&quot; tall for maximum visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {sizes.map((size, index) => (
            <div
              key={size.id}
              className={`
                group relative bg-white dark:bg-navy-900 rounded-2xl shadow-soft dark:shadow-dark-soft overflow-hidden
                transition-all duration-300 ease-out-expo hover:shadow-soft-xl dark:hover:shadow-dark-lg hover:-translate-y-1
                border-2
                ${size.popular
                  ? 'border-usa-red ring-4 ring-usa-red/10'
                  : 'border-gray-100 dark:border-navy-800 hover:border-gray-200 dark:hover:border-navy-700'
                }
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge - as top banner for consistent spacing */}
              {size.popular ? (
                <div className="bg-gradient-to-r from-usa-red to-usa-red-600 text-white text-center py-2 text-xs font-bold tracking-wide">
                  Most Popular
                </div>
              ) : (
                <div className="h-0" />
              )}

              {/* Sign Visual - refined with better gradients */}
              <div className="p-6 bg-gradient-to-b from-porcelain-100 to-porcelain-50 dark:from-navy-800 dark:to-navy-900 border-b border-gray-100 dark:border-navy-800">
                <div
                  className="mx-auto bg-gradient-to-r from-usa-red-600 to-usa-red rounded-lg flex items-center justify-center shadow-glow-red transition-all duration-300 group-hover:shadow-soft-lg group-hover:scale-[1.02]"
                  style={{
                    width: `${(size.width / 96) * 100}%`,
                    height: '60px',
                    minWidth: '150px',
                  }}
                >
                  <span className="text-white text-sm font-bold tracking-wide">
                    {size.widthLabel} x {size.heightLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
                  {size.name}
                </h3>
                <p className="text-navy dark:text-navy-300 font-semibold mb-4 text-sm">
                  {size.truckBed} Truck Bed
                </p>
                <p className="text-gray-600 dark:text-navy-400 text-sm mb-6 leading-relaxed">
                  {size.description}
                </p>

                {/* Features - refined with better spacing */}
                <ul className="space-y-2.5 mb-6">
                  {[
                    'Single-sided with clear backing',
                    'Aluminum frame construction',
                    'Easy detachable mounting',
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600 dark:text-navy-400">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center mr-2.5 flex-shrink-0">
                        <Check className="h-3 w-3 text-emerald-500" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Price - refined styling */}
                <div className="text-center py-4 bg-porcelain-50 dark:bg-navy-800 rounded-xl mb-6 border border-gray-100 dark:border-navy-700">
                  <span className="text-gray-500 dark:text-navy-400 text-xs uppercase tracking-wider font-medium">Starting at</span>
                  <div className="text-navy dark:text-white font-bold text-lg mt-0.5">
                    Contact for Quote
                  </div>
                </div>

                <Link to="/design" className="block">
                  <Button
                    variant={size.popular ? 'primary' : 'secondary'}
                    className="w-full group/btn"
                    icon={ArrowRight}
                    iconPosition="right"
                  >
                    Design This Size
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/products"
            className="inline-flex items-center text-navy dark:text-navy-300 font-semibold hover:text-usa-red dark:hover:text-usa-red transition-colors duration-200 group"
          >
            View Full Product Details
            <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
