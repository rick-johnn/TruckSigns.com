import { SIGN_SIZES } from '../../utils/constants';
import { Check } from 'lucide-react';

const SizeSelector = ({ selectedSize, onSizeChange }) => {
  const sizes = Object.values(SIGN_SIZES);

  return (
    <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-700 p-4">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sign Size</h3>
      <div className="space-y-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size)}
            className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
              selectedSize.id === size.id
                ? 'border-navy dark:border-navy-400 bg-navy/5 dark:bg-navy-700'
                : 'border-gray-200 dark:border-navy-600 hover:border-gray-300 dark:hover:border-navy-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{size.name}</div>
                <div className="text-sm text-gray-500 dark:text-navy-400">
                  {size.widthLabel} x {size.heightLabel} ({size.truckBed})
                </div>
              </div>
              {selectedSize.id === size.id && (
                <Check className="h-5 w-5 text-navy dark:text-navy-300" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
