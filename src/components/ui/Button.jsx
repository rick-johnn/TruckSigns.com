import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-usa-red text-white hover:bg-usa-red-800 focus:ring-usa-red',
  secondary:
    'bg-white text-navy border-2 border-navy hover:bg-navy hover:text-white focus:ring-navy',
  outline:
    'bg-transparent text-white border-2 border-white hover:bg-white hover:text-navy focus:ring-white focus:ring-offset-navy',
  ghost:
    'bg-transparent text-navy hover:bg-gray-100 focus:ring-navy',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
};

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      disabled = false,
      loading = false,
      icon: Icon,
      iconPosition = 'left',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className="w-5 h-5 mr-2" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon className="w-5 h-5 ml-2" />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
