import { SIGN_SIZES } from '../../utils/constants';
import { Check } from 'lucide-react';

const SizeSelector = ({ selectedSize, onSizeChange }) => {
  const sizes = Object.values(SIGN_SIZES);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Sign Size</h3>
      <div className="space-y-2">
        {sizes.map((size) => (
          <button
            key={size.id}
            onClick={() => onSizeChange(size)}
            className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
              selectedSize.id === size.id
                ? 'border-navy bg-navy/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{size.name}</div>
                <div className="text-sm text-gray-500">
                  {size.widthLabel} x {size.heightLabel} ({size.truckBed})
                </div>
              </div>
              {selectedSize.id === size.id && (
                <Check className="h-5 w-5 text-navy" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
