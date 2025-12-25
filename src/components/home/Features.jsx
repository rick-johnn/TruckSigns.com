import { Shield, Wrench, Eye, Truck, Palette, DollarSign } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Durable Aluminum',
    description:
      'Built with lightweight, rust-resistant aluminum that withstands weather and road conditions.',
  },
  {
    icon: Wrench,
    title: 'Easy Installation',
    description:
      'Designed for quick attach and detach, just like a truck topper. No permanent modifications needed.',
  },
  {
    icon: Eye,
    title: 'Maximum Visibility',
    description:
      'Cab-height design ensures your message is seen by everyone on the road, day or night.',
  },
  {
    icon: Truck,
    title: 'Multiple Sizes',
    description:
      'Available in 5.5ft, 6.5ft, and 8ft options to fit standard short, standard, and long bed trucks.',
  },
  {
    icon: Palette,
    title: 'Full Customization',
    description:
      'Design your own sign with our free online tool. Upload images, add text, and see it come to life.',
  },
  {
    icon: DollarSign,
    title: 'Cost Effective',
    description:
      'One-time investment for 24/7 advertising. No monthly fees, no recurring costs.',
  },
];

const Features = () => {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-usa-red">TruckSigns.com</span>?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our truck bed signs are engineered for durability, visibility, and
            ease of use. Here&apos;s what sets us apart.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-navy" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
