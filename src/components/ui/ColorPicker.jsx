import { useState, useRef, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Pipette } from 'lucide-react';

const ColorPicker = ({
  color,
  onChange,
  presetColors = [],
  label,
  showTransparent = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isTransparent = color === 'transparent';
  const displayColor = isTransparent ? '#ffffff' : color;

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        {/* Transparent option */}
        {showTransparent && (
          <button
            type="button"
            onClick={() => onChange('transparent')}
            className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 relative overflow-hidden ${
              isTransparent ? 'border-navy scale-110 ring-2 ring-navy ring-offset-1' : 'border-gray-200'
            }`}
            title="Transparent"
          >
            <div className="absolute inset-0 bg-white" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                backgroundSize: '8px 8px',
                backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
              }}
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-red-500 transform rotate-45" />
            </div>
          </button>
        )}

        {/* Preset colors */}
        {presetColors.map((presetColor) => (
          <button
            key={presetColor}
            type="button"
            onClick={() => onChange(presetColor)}
            className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${
              color === presetColor && !isTransparent
                ? 'border-navy scale-110 ring-2 ring-navy ring-offset-1'
                : 'border-gray-200'
            }`}
            style={{ backgroundColor: presetColor }}
            title={presetColor}
          />
        ))}

        {/* Custom color picker button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 flex items-center justify-center ${
            isOpen ? 'border-navy ring-2 ring-navy ring-offset-1' : 'border-gray-300'
          }`}
          style={{
            background: !isTransparent && !presetColors.includes(color)
              ? color
              : 'linear-gradient(135deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #8000ff)',
          }}
          title="Custom color"
        >
          {(isTransparent || presetColors.includes(color)) && (
            <Pipette className="h-4 w-4 text-white drop-shadow-md" />
          )}
        </button>

        {/* Current color display */}
        {!isTransparent && (
          <span className="text-xs text-gray-500 font-mono uppercase">
            {color}
          </span>
        )}
      </div>

      {/* Color picker popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          className="absolute z-50 mt-2 p-3 bg-white rounded-xl shadow-xl border border-gray-200"
          style={{ left: 0 }}
        >
          <HexColorPicker
            color={displayColor}
            onChange={onChange}
            style={{ width: '200px', height: '160px' }}
          />

          {/* Hex input */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-gray-500 text-sm">#</span>
            <HexColorInput
              color={displayColor}
              onChange={onChange}
              prefixed={false}
              className="flex-1 px-2 py-1 text-sm font-mono uppercase border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent"
            />
          </div>

          {/* Quick colors in popover */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map(
              (quickColor) => (
                <button
                  key={quickColor}
                  type="button"
                  onClick={() => onChange(quickColor)}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: quickColor }}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
