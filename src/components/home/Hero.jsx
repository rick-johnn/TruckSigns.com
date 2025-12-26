import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Star } from 'lucide-react';
import { Button } from '../ui';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-navy-800 via-navy to-navy-900 overflow-hidden">
      {/* Background Pattern - refined with subtle movement */}
      <div className="absolute inset-0">
        {/* Primary glow - usa-red accent */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-usa-red/20 rounded-full filter blur-[120px] -translate-x-1/3 -translate-y-1/3 animate-pulse-soft" />
        {/* Secondary glow - white/blue accent */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-navy-400/15 rounded-full filter blur-[120px] translate-x-1/3 translate-y-1/3" />
        {/* Subtle grid overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge - refined with better contrast */}
            <div
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-8 opacity-0 animate-fade-in-down"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              <span className="text-xl" role="img" aria-label="USA flag">🇺🇸</span>
              <span className="text-white/90 text-sm font-medium tracking-wide">
                Proudly Made in the USA
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              Your Truck,
              <br />
              <span className="text-usa-red relative">
                Your Sign
                {/* Subtle underline accent */}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-usa-red/60 to-transparent rounded-full" />
              </span>
            </h1>

            <p
              className="mt-8 text-lg lg:text-xl text-navy-200 max-w-xl mx-auto lg:mx-0 leading-relaxed opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              Transform your truck into a mobile billboard. Custom aluminum signs
              that mount above your truck bed, giving your business maximum
              visibility on every road.
            </p>

            <div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <Link to="/signup" className="group">
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

            {/* Trust Indicators - refined spacing and styling */}
            <div
              className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 sm:gap-8 opacity-0 animate-fade-in-up"
              style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-amber-400 fill-amber-400"
                    style={{ animationDelay: `${0.6 + i * 0.05}s` }}
                  />
                ))}
                <span className="ml-2 text-white text-sm font-medium">5.0 Rating</span>
              </div>
              <div className="hidden sm:block w-px h-4 bg-white/20" />
              <div className="text-navy-300 text-sm">
                <span className="text-white font-semibold">500+</span> Signs Delivered
              </div>
            </div>
          </div>

          {/* Visual - Product showcase with real photo */}
          <div
            className="relative hidden lg:block opacity-0 animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
          >
            {/* Main product image container */}
            <div className="relative">
              {/* Product photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <img
                  src="/images/truck-sign-placeholder.png"
                  alt="Blue pickup truck with custom advertising sign mounted on truck bed"
                  className="w-full h-auto object-cover"
                />
                {/* Subtle overlay gradient for better text contrast if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/20 via-transparent to-transparent" />
              </div>

              {/* Feature badges overlaid on image */}
              <div className="absolute -bottom-4 left-4 right-4 flex justify-center gap-3">
                {[
                  { icon: Truck, label: 'Cab Height' },
                  { value: 'AL', label: 'Aluminum' },
                  { value: '3', label: 'Sizes' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-navy-800 rounded-xl px-4 py-3 shadow-soft-lg border border-gray-100 dark:border-navy-700 text-center min-w-[90px]"
                  >
                    {item.icon ? (
                      <item.icon className="h-5 w-5 text-usa-red mx-auto mb-1" />
                    ) : (
                      <div className="text-usa-red text-base font-bold">{item.value}</div>
                    )}
                    <span className="text-gray-600 dark:text-navy-300 text-xs font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-usa-red/10 rounded-full blur-3xl" />
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-navy-400/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>

      {/* Bottom fade for smooth section transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-porcelain-50 to-transparent dark:from-navy-950" />
    </section>
  );
};

export default Hero;
