import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Truck, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, ThemeToggle } from '../ui';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Design Tool', href: '/design', requiresAuth: true },
    { name: 'My Designs', href: '/my-designs', requiresAuth: true },
    { name: 'About', href: '/about' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const filteredNavigation = navigation.filter(
    (item) => !item.requiresAuth || isAuthenticated
  );

  return (
    <header
      className={`
        sticky top-0 z-40 transition-all duration-300 ease-out-expo
        ${scrolled
          ? 'bg-navy/95 backdrop-blur-md shadow-soft-lg'
          : 'bg-navy shadow-soft'
        }
      `}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 group"
          >
            <div className="bg-usa-red p-2 rounded-lg shadow-soft transition-all duration-300 group-hover:shadow-glow-red group-hover:scale-105">
              <Truck className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </div>
            <div className="text-white">
              <div className="text-lg lg:text-xl font-bold tracking-tight">
                TruckSigns.com
              </div>
              <div className="text-xs text-navy-300 hidden sm:block font-medium">
                Your truck, your sign
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  relative px-4 py-2 text-sm font-medium rounded-lg
                  transition-all duration-200 ease-out
                  ${isActive(item.href)
                    ? 'text-white bg-white/10'
                    : 'text-navy-200 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {item.name}
                {/* Active indicator */}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-usa-red rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white bg-white/5 px-3 py-1.5 rounded-lg">
                  <User className="h-4 w-4 mr-2 text-navy-300" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  icon={LogOut}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-navy-200 hover:text-white hover:bg-white/10"
                  >
                    Log In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm">
                    Sign Up Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile: Theme Toggle & Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-out-expo
            ${mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="py-4 border-t border-white/10">
            <div className="flex flex-col space-y-1">
              {filteredNavigation.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive(item.href)
                      ? 'bg-white/10 text-white'
                      : 'text-navy-200 hover:bg-white/5 hover:text-white'
                    }
                  `}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-white flex items-center bg-white/5 rounded-lg mx-2">
                      <User className="h-5 w-5 mr-2 text-navy-300" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm font-medium text-navy-200 hover:bg-white/5 hover:text-white rounded-lg flex items-center transition-colors duration-200"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 px-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="secondary" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="primary" className="w-full">
                        Sign Up Free
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
