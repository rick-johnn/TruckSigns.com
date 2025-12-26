const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  elevated = false,
  onClick,
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = `
    bg-white dark:bg-navy-900 rounded-xl border border-gray-100 dark:border-navy-800
    ${elevated ? 'shadow-soft-lg dark:shadow-dark-lg' : 'shadow-soft dark:shadow-dark-soft'}
    ${paddings[padding]}
    ${hover ? `
      transition-all duration-300 ease-out-expo cursor-pointer
      hover:shadow-soft-xl dark:hover:shadow-dark-lg hover:-translate-y-1
      hover:border-gray-200 dark:hover:border-navy-700
    ` : 'transition-colors duration-300'}
    ${onClick ? 'cursor-pointer' : ''}
    ${className}
  `;

  return (
    <div className={baseStyles} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-gray-900 dark:text-white tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 dark:text-navy-400 mt-1 text-sm leading-relaxed ${className}`}>
    {children}
  </p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 dark:border-navy-800 ${className}`}>
    {children}
  </div>
);

export default Card;
