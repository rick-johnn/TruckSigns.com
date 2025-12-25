const Card = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  onClick,
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = `
    bg-white rounded-xl shadow-sm border border-gray-100
    ${paddings[padding]}
    ${hover ? 'transition-all duration-200 hover:shadow-md hover:border-gray-200' : ''}
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
  <h3 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }) => (
  <p className={`text-gray-600 mt-1 ${className}`}>{children}</p>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>
    {children}
  </div>
);

export default Card;
