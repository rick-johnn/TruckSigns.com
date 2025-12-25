import { useState, useEffect } from 'react';
import { PRESET_COLORS } from '../../utils/constants';
import { ColorPicker } from '../ui';

const ShapeEditor = ({ selectedObject, canvas }) => {
  const [shapeProps, setShapeProps] = useState({
    fill: '#1e3a5f',
    stroke: '#000000',
    strokeWidth: 0,
    opacity: 1,
  });

  // Update state when object is selected
  useEffect(() => {
    if (selectedObject && (selectedObject.type === 'rect' || selectedObject.type === 'circle' || selectedObject.type === 'line')) {
      setShapeProps({
        fill: selectedObject.fill || '#1e3a5f',
        stroke: selectedObject.stroke || '#000000',
        strokeWidth: selectedObject.strokeWidth || 0,
        opacity: selectedObject.opacity || 1,
      });
    }
  }, [selectedObject]);

  const updateObject = (props) => {
    if (selectedObject && canvas) {
      selectedObject.set(props);
      canvas.renderAll();
      setShapeProps((prev) => ({ ...prev, ...props }));
    }
  };

  if (!selectedObject || !['rect', 'circle', 'line'].includes(selectedObject.type)) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <p className="text-gray-500 text-sm text-center">
          Select a shape to edit its properties
        </p>
      </div>
    );
  }

  const isLine = selectedObject.type === 'line';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-4">
      <h3 className="font-semibold text-gray-900">Shape Properties</h3>

      {/* Fill Color (not for lines) */}
      {!isLine && (
        <ColorPicker
          label="Fill Color"
          color={shapeProps.fill}
          onChange={(color) => updateObject({ fill: color })}
          presetColors={PRESET_COLORS}
          showTransparent
        />
      )}

      {/* Stroke Color */}
      <ColorPicker
        label={isLine ? 'Line Color' : 'Border Color'}
        color={shapeProps.stroke}
        onChange={(color) => updateObject({ stroke: color })}
        presetColors={PRESET_COLORS}
      />

      {/* Stroke Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isLine ? 'Line Width' : 'Border Width'}: {shapeProps.strokeWidth}px
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={shapeProps.strokeWidth}
          onChange={(e) => updateObject({ strokeWidth: parseInt(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Opacity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Opacity: {Math.round(shapeProps.opacity * 100)}%
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={shapeProps.opacity}
          onChange={(e) => updateObject({ opacity: parseFloat(e.target.value) })}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ShapeEditor;
