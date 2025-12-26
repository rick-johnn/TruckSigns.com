import { useState, useEffect } from 'react';
import { AVAILABLE_FONTS, PRESET_COLORS } from '../../utils/constants';
import { ColorPicker } from '../ui';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

const TextEditor = ({ selectedObject, canvas }) => {
  const [textProps, setTextProps] = useState({
    text: '',
    fontFamily: 'Arial, sans-serif',
    fontSize: 32,
    fill: '#000000',
    fontWeight: 'normal',
    fontStyle: 'normal',
    underline: false,
    textAlign: 'left',
  });

  // Update state when object is selected
  useEffect(() => {
    if (selectedObject && selectedObject.type === 'textbox') {
      setTextProps({
        text: selectedObject.text || '',
        fontFamily: selectedObject.fontFamily || 'Arial, sans-serif',
        fontSize: selectedObject.fontSize || 32,
        fill: selectedObject.fill || '#000000',
        fontWeight: selectedObject.fontWeight || 'normal',
        fontStyle: selectedObject.fontStyle || 'normal',
        underline: selectedObject.underline || false,
        textAlign: selectedObject.textAlign || 'left',
      });
    }
  }, [selectedObject]);

  const updateObject = (props) => {
    if (selectedObject && canvas) {
      selectedObject.set(props);
      canvas.renderAll();
      setTextProps((prev) => ({ ...prev, ...props }));
    }
  };

  if (!selectedObject || selectedObject.type !== 'textbox') {
    return (
      <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-700 p-4">
        <p className="text-gray-500 dark:text-navy-400 text-sm text-center">
          Select a text element to edit its properties
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-700 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">Text Properties</h3>

      {/* Font Family */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-navy-300 mb-1">
          Font
        </label>
        <select
          value={textProps.fontFamily}
          onChange={(e) => updateObject({ fontFamily: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-navy-600 rounded-lg focus:ring-2 focus:ring-navy focus:border-transparent bg-white dark:bg-navy-700 text-gray-900 dark:text-white"
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
              {font.name}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-navy-300 mb-1">
          Size: {textProps.fontSize}px
        </label>
        <input
          type="range"
          min="12"
          max="120"
          value={textProps.fontSize}
          onChange={(e) => updateObject({ fontSize: parseInt(e.target.value) })}
          className="w-full accent-navy"
        />
      </div>

      {/* Style Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-navy-300 mb-2">
          Style
        </label>
        <div className="flex gap-2">
          <button
            onClick={() =>
              updateObject({
                fontWeight: textProps.fontWeight === 'bold' ? 'normal' : 'bold',
              })
            }
            className={`p-2 rounded-lg border transition-colors ${
              textProps.fontWeight === 'bold'
                ? 'bg-navy text-white border-navy'
                : 'border-gray-300 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 text-gray-700 dark:text-navy-300'
            }`}
          >
            <Bold className="h-4 w-4" />
          </button>
          <button
            onClick={() =>
              updateObject({
                fontStyle: textProps.fontStyle === 'italic' ? 'normal' : 'italic',
              })
            }
            className={`p-2 rounded-lg border transition-colors ${
              textProps.fontStyle === 'italic'
                ? 'bg-navy text-white border-navy'
                : 'border-gray-300 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 text-gray-700 dark:text-navy-300'
            }`}
          >
            <Italic className="h-4 w-4" />
          </button>
          <button
            onClick={() => updateObject({ underline: !textProps.underline })}
            className={`p-2 rounded-lg border transition-colors ${
              textProps.underline
                ? 'bg-navy text-white border-navy'
                : 'border-gray-300 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 text-gray-700 dark:text-navy-300'
            }`}
          >
            <Underline className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Alignment */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-navy-300 mb-2">
          Alignment
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => updateObject({ textAlign: 'left' })}
            className={`p-2 rounded-lg border transition-colors ${
              textProps.textAlign === 'left'
                ? 'bg-navy text-white border-navy'
                : 'border-gray-300 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 text-gray-700 dark:text-navy-300'
            }`}
          >
            <AlignLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => updateObject({ textAlign: 'center' })}
            className={`p-2 rounded-lg border transition-colors ${
              textProps.textAlign === 'center'
                ? 'bg-navy text-white border-navy'
                : 'border-gray-300 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 text-gray-700 dark:text-navy-300'
            }`}
          >
            <AlignCenter className="h-4 w-4" />
          </button>
          <button
            onClick={() => updateObject({ textAlign: 'right' })}
            className={`p-2 rounded-lg border transition-colors ${
              textProps.textAlign === 'right'
                ? 'bg-navy text-white border-navy'
                : 'border-gray-300 dark:border-navy-600 hover:bg-gray-50 dark:hover:bg-navy-700 text-gray-700 dark:text-navy-300'
            }`}
          >
            <AlignRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Color */}
      <ColorPicker
        label="Color"
        color={textProps.fill}
        onChange={(color) => updateObject({ fill: color })}
        presetColors={PRESET_COLORS}
      />
    </div>
  );
};

export default TextEditor;
