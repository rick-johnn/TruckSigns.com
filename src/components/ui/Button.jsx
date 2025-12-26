import { forwardRef } from 'react';

const variants = {
  primary: `
    bg-usa-red text-white shadow-soft
    hover:bg-usa-red-600 hover:shadow-soft-lg hover:-translate-y-0.5
    active:translate-y-0 active:shadow-soft active:bg-usa-red-700
    focus-visible:ring-usa-red/50
  `,
  secondary: `
    bg-white text-navy border-2 border-navy/20 shadow-soft
    hover:border-navy hover:bg-navy-50 hover:shadow-soft-lg hover:-translate-y-0.5
    active:translate-y-0 active:shadow-soft active:bg-navy-100
    focus-visible:ring-navy/30
    dark:bg-navy-800 dark:text-white dark:border-navy-600
    dark:hover:bg-navy-700 dark:hover:border-navy-500
  `,
  outline: `
    bg-white/5 backdrop-blur-sm text-white border-2 border-white/30
    hover:bg-white hover:text-navy hover:border-white hover:-translate-y-0.5
    active:translate-y-0 active:bg-gray-100
    focus-visible:ring-white/50 focus-visible:ring-offset-navy
  `,
  ghost: `
    bg-transparent text-navy
    hover:bg-navy-50 hover:text-navy-800
    active:bg-navy-100
    focus-visible:ring-navy/30
    dark:text-white dark:hover:bg-navy-800 dark:hover:text-white
  `,
  danger: `
    bg-red-600 text-white shadow-soft
    hover:bg-red-500 hover:shadow-soft-lg hover:-translate-y-0.5
    active:translate-y-0 active:shadow-soft active:bg-red-700
    focus-visible:ring-red-500/50
  `,
};

const sizes = {
  sm: 'px-3.5 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-6 py-3 text-lg gap-2',
  xl: 'px-8 py-4 text-xl gap-2.5',
};

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-5 h-5',
  xl: 'w-6 h-6',
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
    const baseStyles = `
      inline-flex items-center justify-center font-semibold rounded-lg
      transition-all duration-250 ease-out-expo
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
      select-none
    `;

    const iconClass = `${iconSizes[size]} transition-transform duration-200`;

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
              className={`animate-spin ${iconSizes[size]}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            <span>Loading...</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === 'left' && (
              <Icon className={iconClass} aria-hidden="true" />
            )}
            {children}
            {Icon && iconPosition === 'right' && (
              <Icon
                className={`${iconClass} group-hover:translate-x-0.5`}
                aria-hidden="true"
              />
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
