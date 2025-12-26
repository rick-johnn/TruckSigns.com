import { useEffect, useRef, useCallback, useState } from 'react';
import * as fabric from 'fabric';

const Canvas = ({
  selectedSize,
  onCanvasReady,
  onObjectSelected,
  onObjectDeselected,
}) => {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const containerRef = useRef(null);
  const initializedRef = useRef(false);
  const callbacksRef = useRef({ onCanvasReady, onObjectSelected, onObjectDeselected });
  const [dimensions, setDimensions] = useState({ width: 800, height: 291 });

  // Keep callbacks ref up to date without triggering re-renders
  useEffect(() => {
    callbacksRef.current = { onCanvasReady, onObjectSelected, onObjectDeselected };
  }, [onCanvasReady, onObjectSelected, onObjectDeselected]);

  // Calculate canvas dimensions based on sign size
  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return { width: 800, height: 291 };

    const containerWidth = containerRef.current.offsetWidth - 48; // padding
    const aspectRatio = selectedSize.width / selectedSize.height; // e.g., 78/24 = 3.25
    const maxHeight = 400;

    let width = containerWidth;
    let height = width / aspectRatio;

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return { width: Math.floor(width), height: Math.floor(height) };
  }, [selectedSize]);

  // Initialize canvas only once
  useEffect(() => {
    if (!canvasRef.current || initializedRef.current) return;

    initializedRef.current = true;

    const dims = calculateDimensions();
    setDimensions(dims);

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: dims.width,
      height: dims.height,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
    });

    fabricRef.current = canvas;

    // Event handlers - use refs to avoid stale closures
    canvas.on('selection:created', (e) => {
      callbacksRef.current.onObjectSelected?.(e.selected[0]);
    });

    canvas.on('selection:updated', (e) => {
      callbacksRef.current.onObjectSelected?.(e.selected[0]);
    });

    canvas.on('selection:cleared', () => {
      callbacksRef.current.onObjectDeselected?.();
    });

    // Notify parent that canvas is ready
    callbacksRef.current.onCanvasReady?.(canvas);

    // Handle resize
    const handleResize = () => {
      if (!fabricRef.current) return;
      const newDims = calculateDimensions();
      setDimensions(newDims);
      fabricRef.current.setDimensions({ width: newDims.width, height: newDims.height });
      fabricRef.current.renderAll();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.dispose();
      initializedRef.current = false;
    };
  }, []); // Empty dependency array - initialize only once

  // Update dimensions when size changes
  useEffect(() => {
    if (!fabricRef.current) return;

    const dims = calculateDimensions();
    setDimensions(dims);
    fabricRef.current.setDimensions({ width: dims.width, height: dims.height });
    fabricRef.current.renderAll();
  }, [selectedSize, calculateDimensions]);

  return (
    <div ref={containerRef} className="w-full">
      <div
        className="relative bg-gray-200 dark:bg-navy-800 rounded-xl p-6 pb-10 overflow-hidden"
        style={{ minHeight: dimensions.height + 72 }}
      >
        {/* Size indicator */}
        <div className="absolute top-2 left-2 bg-navy dark:bg-navy-600 text-white text-xs px-2 py-1 rounded z-10">
          {selectedSize.widthLabel} x {selectedSize.heightLabel} ({selectedSize.truckBed})
        </div>

        {/* Canvas wrapper with shadow */}
        <div
          className="mx-auto shadow-lg border-2 border-gray-300 dark:border-navy-600"
          style={{ width: dimensions.width, height: dimensions.height }}
        >
          <canvas ref={canvasRef} />
        </div>

        {/* Frame indicator */}
        <div className="absolute bottom-4 right-4 text-gray-500 dark:text-navy-400 text-xs">
          Aluminum Frame Preview
        </div>
      </div>
    </div>
  );
};

export default Canvas;
