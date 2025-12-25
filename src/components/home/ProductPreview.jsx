import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SIGN_SIZES } from '../../utils/constants';
import { Button } from '../ui';

const ProductPreview = () => {
  const sizes = Object.values(SIGN_SIZES);

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Choose Your <span className="text-usa-red">Sign Size</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            We offer three standard sizes to fit the most popular truck beds.
            All signs are 24" tall for maximum visibility.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {sizes.map((size) => (
            <div
              key={size.id}
              className={`relative bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all hover:shadow-lg ${
                size.popular ? 'border-usa-red' : 'border-gray-100'
              }`}
            >
              {/* Popular Badge */}
              {size.popular && (
                <div className="absolute top-0 right-0 bg-usa-red text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                  Most Popular
                </div>
              )}

              {/* Sign Visual */}
              <div className="p-6 bg-gray-50 border-b border-gray-100">
                <div
                  className="mx-auto bg-usa-red rounded-lg flex items-center justify-center shadow-md"
                  style={{
                    width: `${(size.width / 96) * 100}%`,
                    height: '60px',
                    minWidth: '150px',
                  }}
                >
                  <span className="text-white text-sm font-bold">
                    {size.widthLabel} x {size.heightLabel}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {size.name}
                </h3>
                <p className="text-navy font-semibold mb-4">
                  {size.truckBed} Truck Bed
                </p>
                <p className="text-gray-600 text-sm mb-6">{size.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Single-sided with clear backing
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Aluminum frame construction
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    Easy detachable mounting
                  </li>
                </ul>

                {/* Price */}
                <div className="text-center py-4 bg-gray-50 rounded-lg mb-6">
                  <span className="text-gray-600 text-sm">Starting at</span>
                  <div className="text-navy font-bold text-lg">
                    Contact for Quote
                  </div>
                </div>

                <Link to="/design" className="block">
                  <Button
                    variant={size.popular ? 'primary' : 'secondary'}
                    className="w-full"
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
            className="text-navy font-semibold hover:text-usa-red transition-colors inline-flex items-center"
          >
            View Full Product Details
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
