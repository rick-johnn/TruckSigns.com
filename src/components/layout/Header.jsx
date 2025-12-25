import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Truck, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
    <header className="bg-navy shadow-lg sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-usa-red p-2 rounded-lg">
              <Truck className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
            </div>
            <div className="text-white">
              <div className="text-lg lg:text-xl font-bold">TruckSigns.com</div>
              <div className="text-xs text-gray-300 hidden sm:block">
                Your truck, your sign
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {filteredNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-white">
                  <User className="h-5 w-5 mr-2" />
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
                  <Button variant="ghost" size="sm" className="text-white hover:bg-navy-600">
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

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-navy-600">
            <div className="flex flex-col space-y-2">
              {filteredNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-navy-600 text-white'
                      : 'text-gray-300 hover:bg-navy-600 hover:text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 mt-4 border-t border-navy-600">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-white flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      <span className="font-medium">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-gray-300 hover:bg-navy-600 hover:text-white rounded-lg flex items-center"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 px-4">
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
        )}
      </nav>
    </header>
  );
};

export default Header;
