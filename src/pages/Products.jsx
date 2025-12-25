import { Link } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Button } from '../components/ui';
import { SIGN_SIZES } from '../utils/constants';
import {
  Check,
  ArrowRight,
  Truck,
  Ruler,
  Shield,
  Eye,
  Wrench,
} from 'lucide-react';

const Products = () => {
  const sizes = Object.values(SIGN_SIZES);

  const specifications = [
    { label: 'Material', value: 'Lightweight Aluminum' },
    { label: 'Height', value: '24 inches (cab height)' },
    { label: 'Display', value: 'Single-sided with clear backing' },
    { label: 'Mounting', value: 'Easy detach system (like a topper)' },
    { label: 'Weather Resistance', value: 'All-weather durability' },
    { label: 'Customization', value: 'Full color printing' },
  ];

  const benefits = [
    {
      icon: Eye,
      title: 'Maximum Visibility',
      description: 'Your message is at eye level with other drivers, ensuring your business gets noticed.',
    },
    {
      icon: Shield,
      title: 'Built to Last',
      description: 'Aluminum construction resists rust, corrosion, and the elements.',
    },
    {
      icon: Wrench,
      title: 'Easy Installation',
      description: 'Attach and remove in minutes. No permanent modifications to your truck.',
    },
    {
      icon: Truck,
      title: 'Clear Backing',
      description: 'Maintains rear visibility while advertising. Safe and legal in all states.',
    },
  ];

  return (
    <Layout fullWidth>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Our <span className="text-usa-red">Truck Sign</span> Products
            </h1>
            <p className="text-xl text-gray-300">
              Premium aluminum truck bed advertising signs built to fit standard
              US truck beds. Choose your size and start designing today.
            </p>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {sizes.map((size) => (
              <div
                key={size.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-transform hover:-translate-y-1 ${
                  size.popular ? 'border-usa-red' : 'border-transparent'
                }`}
              >
                {/* Popular Badge */}
                {size.popular && (
                  <div className="bg-usa-red text-white text-center py-2 text-sm font-semibold">
                    Most Popular Choice
                  </div>
                )}

                {/* Visual Representation */}
                <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-50">
                  <div className="relative">
                    {/* Sign */}
                    <div
                      className="mx-auto bg-gradient-to-r from-usa-red to-usa-red-700 rounded-lg shadow-lg flex flex-col items-center justify-center py-8"
                      style={{
                        width: `${(size.width / 96) * 100}%`,
                        minWidth: '180px',
                      }}
                    >
                      <div className="text-white text-3xl font-bold">
                        {size.widthLabel}
                      </div>
                      <div className="text-white/80 text-sm">
                        x {size.heightLabel}
                      </div>
                    </div>
                    {/* Dimension Lines */}
                    <div className="flex justify-center mt-4">
                      <div className="flex items-center text-gray-500 text-sm">
                        <Ruler className="h-4 w-4 mr-1" />
                        {size.truckBed} Truck Bed
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {size.name}
                  </h2>
                  <p className="text-gray-600 mb-6">{size.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Fits {size.truckBed} truck beds
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        {size.width}&quot; wide x {size.height}&quot; tall
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Aluminum frame with clear backing
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Quick-release mounting system
                      </span>
                    </li>
                  </ul>

                  {/* Price */}
                  <div className="bg-gray-50 rounded-xl p-4 text-center mb-6">
                    <span className="text-gray-600">Pricing</span>
                    <div className="text-2xl font-bold text-navy">
                      Contact for Quote
                    </div>
                  </div>

                  <Link to="/design">
                    <Button
                      variant={size.popular ? 'primary' : 'secondary'}
                      size="lg"
                      className="w-full"
                      icon={ArrowRight}
                      iconPosition="right"
                    >
                      Design This Sign
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Product Specifications
            </h2>

            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <table className="w-full">
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {spec.label}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Our Signs Stand Out
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-navy rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-navy">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create your free account and start designing your custom truck sign
            today. No commitment, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Start Designing Free
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
