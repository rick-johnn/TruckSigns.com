import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Building, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input } from '../ui';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    contactName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    const result = await signup(formData);

    if (result.success) {
      navigate('/design');
    } else {
      setErrors({ general: result.error });
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Your Account</h1>
        <p className="text-gray-600 mt-2">
          Sign up for free and start designing your truck sign today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
            <span className="text-sm text-red-700">{errors.general}</span>
          </div>
        )}

        <div className="relative">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
            required
          />
          <User className="absolute right-4 top-9 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
            required
          />
          <Mail className="absolute right-4 top-9 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            error={errors.phone}
            required
          />
          <Phone className="absolute right-4 top-9 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            label="Company Name"
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Your Company LLC"
            error={errors.companyName}
            required
          />
          <Building className="absolute right-4 top-9 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            label="Contact Name (if different)"
            type="text"
            name="contactName"
            value={formData.contactName}
            onChange={handleChange}
            placeholder="Contact person name"
            helpText="Leave blank if same as your name"
          />
          <User className="absolute right-4 top-9 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            error={errors.password}
            required
          />
          <Lock className="absolute right-4 top-9 h-5 w-5 text-gray-400" />
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            error={errors.confirmPassword}
            required
          />
          <Lock className="absolute right-4 top-9 h-5 w-5 text-gray-400" />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          loading={loading}
        >
          Create Free Account
        </Button>

        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-usa-red font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
