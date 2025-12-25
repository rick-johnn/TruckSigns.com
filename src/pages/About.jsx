import { useState } from 'react';
import { Layout } from '../components/layout';
import { Button, Input, Textarea } from '../components/ui';
import { sendContactEmail } from '../utils/emailService';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  ChevronDown,
  Truck,
} from 'lucide-react';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await sendContactEmail(formData);

    if (result.success) {
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }

    setLoading(false);
  };

  const faqs = [
    {
      question: 'How long does it take to make a sign?',
      answer:
        'Production time typically takes 2-3 weeks from approval of your design. Rush orders may be available for an additional fee. We\'ll provide a specific timeline when you submit your inquiry.',
    },
    {
      question: 'How do the signs attach to my truck?',
      answer:
        'Our signs use a quick-release mounting system similar to a truck topper. No permanent modifications are required. They can be easily attached and removed by one person in just a few minutes.',
    },
    {
      question: 'Are the signs weatherproof?',
      answer:
        'Yes! Our aluminum frames and UV-resistant printing are designed to withstand rain, sun, snow, and all weather conditions. The materials are rated for years of outdoor use.',
    },
    {
      question: 'Can I see what my sign will look like before ordering?',
      answer:
        'Absolutely! Our free design tool lets you create and preview your sign design before submitting an inquiry. You can upload images, add text, and see exactly what your sign will look like.',
    },
    {
      question: 'What file formats can I use for my logo/images?',
      answer:
        'Our design tool accepts PNG images. For best results, use high-resolution images (at least 300 DPI). Transparent PNG files work great for logos.',
    },
    {
      question: 'Do you offer bulk discounts?',
      answer:
        'Yes! We offer discounts for orders of multiple signs. Contact us with your quantity requirements and we\'ll provide a custom quote.',
    },
  ];

  return (
    <Layout fullWidth>
      {/* Hero */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              About <span className="text-usa-red">TruckSigns.com</span>
            </h1>
            <p className="text-xl text-gray-300">
              We're passionate about helping businesses stand out on the road.
              Our custom truck bed signs turn every mile into advertising.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  TruckSigns.com was born from a simple observation: trucks are
                  everywhere, and their owners are often small business owners who
                  could benefit from mobile advertising.
                </p>
                <p className="text-gray-600 mb-4">
                  We designed our signs to be easy to install and remove, just
                  like a truck topper. No permanent modifications, no
                  complicated hardware — just attach and go.
                </p>
                <p className="text-gray-600">
                  Every sign is proudly made in the USA using premium materials
                  built to last. We take pride in helping American businesses
                  grow, one sign at a time.
                </p>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8 text-center">
                <div className="bg-usa-red rounded-xl p-6 inline-block mb-4">
                  <Truck className="h-16 w-16 text-white" />
                </div>
                <div className="text-4xl font-bold text-navy mb-2">500+</div>
                <div className="text-gray-600">Signs Delivered</div>
                <div className="flex items-center justify-center mt-4 text-usa-red">
                  <span className="text-2xl mr-2">🇺🇸</span>
                  <span className="font-semibold">Made in USA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Get in Touch
            </h2>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Phone</div>
                      <div className="text-gray-600">(555) 123-4567</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email</div>
                      <div className="text-gray-600">info@trucksigns.com</div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Address</div>
                      <div className="text-gray-600">
                        123 Main Street
                        <br />
                        Anytown, USA 12345
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Business Hours
                      </div>
                      <div className="text-gray-600">
                        Monday - Friday: 8am - 5pm EST
                        <br />
                        Saturday - Sunday: Closed
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Send Us a Message
                </h3>

                {success ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                    <Button
                      variant="secondary"
                      className="mt-4"
                      onClick={() => setSuccess(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                    <Input
                      label="Phone (Optional)"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(555) 123-4567"
                    />
                    <Textarea
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={4}
                      required
                    />
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      loading={loading}
                      icon={Send}
                    >
                      Send Message
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
