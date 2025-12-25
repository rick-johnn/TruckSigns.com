import { forwardRef } from 'react';

const Input = forwardRef(
  (
    {
      label,
      error,
      helpText,
      className = '',
      containerClassName = '',
      type = 'text',
      required = false,
      ...props
    },
    ref
  ) => {
    const inputStyles = `
      block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-white
      border rounded-lg transition-all duration-200
      focus:outline-none focus:ring-2 focus:border-transparent
      ${error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-navy'
      }
      ${className}
    `;

    return (
      <div className={containerClassName}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-usa-red ml-1">*</span>}
          </label>
        )}
        <input ref={ref} type={type} className={inputStyles} {...props} />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {helpText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef(
  (
    {
      label,
      error,
      helpText,
      className = '',
      containerClassName = '',
      required = false,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const textareaStyles = `
      block w-full px-4 py-3 text-gray-900 placeholder-gray-500 bg-white
      border rounded-lg transition-all duration-200 resize-none
      focus:outline-none focus:ring-2 focus:border-transparent
      ${error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-navy'
      }
      ${className}
    `;

    return (
      <div className={containerClassName}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-usa-red ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          className={textareaStyles}
          {...props}
        />
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {helpText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export const Select = forwardRef(
  (
    {
      label,
      error,
      helpText,
      className = '',
      containerClassName = '',
      required = false,
      options = [],
      placeholder = 'Select an option',
      ...props
    },
    ref
  ) => {
    const selectStyles = `
      block w-full px-4 py-3 text-gray-900 bg-white
      border rounded-lg transition-all duration-200
      focus:outline-none focus:ring-2 focus:border-transparent
      ${error
        ? 'border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:ring-navy'
      }
      ${className}
    `;

    return (
      <div className={containerClassName}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
            {required && <span className="text-usa-red ml-1">*</span>}
          </label>
        )}
        <select ref={ref} className={selectStyles} {...props}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
        {helpText && !error && (
          <p className="mt-1.5 text-sm text-gray-500">{helpText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Input;
