import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as fabric from 'fabric';
import { Layout } from '../components/layout';
import { Button } from '../components/ui';
import {
  Canvas,
  Toolbar,
  ImageUploader,
  TextEditor,
  ShapeEditor,
  SizeSelector,
  TemplateGallery,
  InquiryModal,
  SaveDesignModal,
} from '../components/design-tool';
import { useDesign } from '../context/DesignContext';
import { SIGN_SIZES } from '../utils/constants';
import { Save, Send, FolderOpen } from 'lucide-react';

const DesignTool = () => {
  const [searchParams] = useSearchParams();
  const designId = searchParams.get('id');

  const {
    currentDesign,
    selectedSize,
    createNewDesign,
    loadDesign,
    saveDesign,
    changeSignSize,
  } = useDesign();

  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [imageUploaderOpen, setImageUploaderOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [designPreview, setDesignPreview] = useState(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 291 });

  // Track which design ID has been loaded to prevent re-loading
  const loadedDesignIdRef = useRef(null);
  const canvasLoadedForDesignRef = useRef(null);
  const currentDesignRef = useRef(currentDesign);

  // Keep currentDesignRef up to date
  useEffect(() => {
    currentDesignRef.current = currentDesign;
  }, [currentDesign]);

  // Initialize or load design when designId changes
  useEffect(() => {
    // If we have a designId and it's different from what we've loaded
    if (designId) {
      if (loadedDesignIdRef.current !== designId) {
        loadedDesignIdRef.current = designId;
        canvasLoadedForDesignRef.current = null; // Reset canvas loaded flag for new design
        loadDesign(designId);
      }
    } else {
      // No designId - create new design if needed
      if (loadedDesignIdRef.current !== 'new') {
        loadedDesignIdRef.current = 'new';
        canvasLoadedForDesignRef.current = null;
        createNewDesign(SIGN_SIZES.medium);
      }
    }
  }, [designId, loadDesign, createNewDesign]);

  // Load canvas data when canvas is ready and we have design data
  useEffect(() => {
    if (!canvas || !currentDesign?.canvasData) return;

    const designIdToLoad = currentDesign.id;
    if (canvasLoadedForDesignRef.current !== designIdToLoad) {
      canvasLoadedForDesignRef.current = designIdToLoad;

      // Fabric.js v6 loadFromJSON returns a Promise
      const loadDesignData = async () => {
        // Clear existing objects before loading
        canvas.clear();
        canvas.backgroundColor = '#ffffff';

        try {
          await canvas.loadFromJSON(currentDesign.canvasData);
          // Mark all objects as dirty to force re-render
          canvas.getObjects().forEach(obj => {
            obj.setCoords();
            obj.dirty = true;
          });
          canvas.requestRenderAll();
        } catch (err) {
          console.error('Error loading design:', err);
        }
      };

      loadDesignData();
    }
  }, [canvas, currentDesign]);

  // Canvas ready callback - uses ref to get latest currentDesign
  const handleCanvasReady = useCallback((fabricCanvas) => {
    setCanvas(fabricCanvas);
    setCanvasDimensions({
      width: fabricCanvas.width,
      height: fabricCanvas.height,
    });

    // Use ref to get latest design data (callback may have stale closure)
    const design = currentDesignRef.current;
    if (design?.canvasData && canvasLoadedForDesignRef.current !== design.id) {
      canvasLoadedForDesignRef.current = design.id;
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#ffffff';

      // Fabric.js v6 loadFromJSON returns a Promise
      fabricCanvas.loadFromJSON(design.canvasData).then(() => {
        // Mark all objects as dirty to force re-render
        fabricCanvas.getObjects().forEach(obj => {
          obj.setCoords();
          obj.dirty = true;
        });
        fabricCanvas.requestRenderAll();
      }).catch(err => {
        console.error('Error loading design on canvas ready:', err);
      });
    }
  }, []);

  // Object selection
  const handleObjectSelected = useCallback((obj) => {
    setSelectedObject(obj);
  }, []);

  const handleObjectDeselected = useCallback(() => {
    setSelectedObject(null);
  }, []);

  // Add image to canvas
  const handleImageUpload = useCallback(
    (dataUrl) => {
      if (!canvas) return;

      fabric.FabricImage.fromURL(dataUrl).then((img) => {
        // Scale image to fit canvas
        const maxWidth = canvas.width * 0.5;
        const maxHeight = canvas.height * 0.8;
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);

        img.scale(scale);
        img.set({
          left: canvas.width / 2,
          top: canvas.height / 2,
          originX: 'center',
          originY: 'center',
        });

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
      });
    },
    [canvas]
  );

  // Add text to canvas
  const handleAddText = useCallback(() => {
    if (!canvas) return;

    const text = new fabric.Textbox('Your Text Here', {
      left: canvas.width / 2,
      top: canvas.height / 2,
      originX: 'center',
      originY: 'center',
      width: canvas.width * 0.4,
      fontSize: 32,
      fontFamily: 'Arial, sans-serif',
      fill: '#000000',
      textAlign: 'center',
      selectable: true,
      hasControls: true,
      hasBorders: true,
      lockUniScaling: false,
    });

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  }, [canvas]);

  // Add shape to canvas
  const handleAddShape = useCallback(
    (shapeType) => {
      if (!canvas) return;

      let shape;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const commonProps = {
        selectable: true,
        hasControls: true,
        hasBorders: true,
      };

      switch (shapeType) {
        case 'rect':
          shape = new fabric.Rect({
            left: centerX,
            top: centerY,
            originX: 'center',
            originY: 'center',
            width: 150,
            height: 100,
            fill: '#1e3a5f',
            stroke: '#000000',
            strokeWidth: 0,
            ...commonProps,
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            left: centerX,
            top: centerY,
            originX: 'center',
            originY: 'center',
            radius: 50,
            fill: '#b91c1c',
            stroke: '#000000',
            strokeWidth: 0,
            ...commonProps,
          });
          break;
        case 'line':
          shape = new fabric.Line([centerX - 75, centerY, centerX + 75, centerY], {
            stroke: '#000000',
            strokeWidth: 3,
            ...commonProps,
          });
          break;
        default:
          return;
      }

      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    },
    [canvas]
  );

  // Object manipulation
  const handleDelete = useCallback(() => {
    if (!canvas || !selectedObject) return;
    canvas.remove(selectedObject);
    setSelectedObject(null);
    canvas.renderAll();
  }, [canvas, selectedObject]);

  const handleDuplicate = useCallback(() => {
    if (!canvas || !selectedObject) return;
    selectedObject.clone().then((cloned) => {
      cloned.set({
        left: cloned.left + 20,
        top: cloned.top + 20,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      canvas.renderAll();
    });
  }, [canvas, selectedObject]);

  const handleFlipH = useCallback(() => {
    if (!selectedObject) return;
    selectedObject.set('flipX', !selectedObject.flipX);
    canvas.renderAll();
  }, [canvas, selectedObject]);

  const handleFlipV = useCallback(() => {
    if (!selectedObject) return;
    selectedObject.set('flipY', !selectedObject.flipY);
    canvas.renderAll();
  }, [canvas, selectedObject]);

  const handleBringForward = useCallback(() => {
    if (!canvas || !selectedObject) return;
    canvas.bringObjectForward(selectedObject);
    canvas.renderAll();
  }, [canvas, selectedObject]);

  const handleSendBackward = useCallback(() => {
    if (!canvas || !selectedObject) return;
    canvas.sendObjectBackwards(selectedObject);
    canvas.renderAll();
  }, [canvas, selectedObject]);

  const handleResetCanvas = useCallback(() => {
    if (!canvas) return;
    if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
      canvas.renderAll();
    }
  }, [canvas]);

  // Size change
  const handleSizeChange = useCallback(
    (newSize) => {
      changeSignSize(newSize);
    },
    [changeSignSize]
  );

  // Save design
  const handleSaveDesign = useCallback(
    (name) => {
      if (!canvas) return;

      const canvasJson = canvas.toJSON();
      const preview = canvas.toDataURL({
        format: 'png',
        quality: 0.8,
      });

      saveDesign(name, canvasJson, preview);
    },
    [canvas, saveDesign]
  );

  // Open inquiry modal
  const handleOpenInquiry = useCallback(() => {
    if (!canvas) return;

    const preview = canvas.toDataURL({
      format: 'png',
      quality: 0.8,
    });
    setDesignPreview(preview);
    setInquiryModalOpen(true);
  }, [canvas]);

  return (
    <Layout fullWidth noFooter>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-navy-950">
        {/* Left Sidebar */}
        <div className="w-full lg:w-72 bg-gray-50 dark:bg-navy-900 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-navy-700 p-4 overflow-y-auto">
          <div className="space-y-4">
            <SizeSelector
              selectedSize={selectedSize}
              onSizeChange={handleSizeChange}
            />
            <TemplateGallery
              canvas={canvas}
              canvasWidth={canvasDimensions.width}
              canvasHeight={canvasDimensions.height}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Actions */}
          <div className="bg-white dark:bg-navy-900 border-b border-gray-200 dark:border-navy-700 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Design Tool</h1>
                <p className="text-sm text-gray-500 dark:text-navy-400">
                  {currentDesign?.name || 'New Design'} • {selectedSize.name}
                </p>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={FolderOpen}
                  onClick={() => (window.location.href = '/my-designs')}
                >
                  My Designs
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Save}
                  onClick={() => setSaveModalOpen(true)}
                >
                  Save
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={Send}
                  onClick={handleOpenInquiry}
                >
                  Send Inquiry
                </Button>
              </div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="p-4 bg-gray-50 dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
            <Toolbar
              onAddImage={() => setImageUploaderOpen(true)}
              onAddText={handleAddText}
              onAddShape={handleAddShape}
              selectedObject={selectedObject}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onFlipH={handleFlipH}
              onFlipV={handleFlipV}
              onBringForward={handleBringForward}
              onSendBackward={handleSendBackward}
              onResetCanvas={handleResetCanvas}
            />
          </div>

          {/* Canvas Area */}
          <div className="flex-1 p-4 lg:p-8 bg-gray-100 dark:bg-navy-950 overflow-auto">
            <Canvas
              selectedSize={selectedSize}
              onCanvasReady={handleCanvasReady}
              onObjectSelected={handleObjectSelected}
              onObjectDeselected={handleObjectDeselected}
            />
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-full lg:w-72 bg-gray-50 dark:bg-navy-900 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-navy-700 p-4 overflow-y-auto">
          <div className="space-y-4">
            {selectedObject?.type === 'textbox' ? (
              <TextEditor selectedObject={selectedObject} canvas={canvas} />
            ) : selectedObject &&
              ['rect', 'circle', 'line'].includes(selectedObject.type) ? (
              <ShapeEditor selectedObject={selectedObject} canvas={canvas} />
            ) : (
              <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-700 p-4">
                <p className="text-gray-500 dark:text-navy-400 text-sm text-center">
                  Select an element to edit its properties
                </p>
              </div>
            )}

            {/* Tips */}
            <div className="bg-blue-50 dark:bg-navy-800 rounded-xl p-4 border border-blue-100 dark:border-navy-700">
              <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Tips</h4>
              <ul className="text-sm text-blue-800 dark:text-navy-300 space-y-1">
                <li>• Use PNG with transparency for logos</li>
                <li>• Click an element to select it</li>
                <li>• Drag corners to resize</li>
                <li>• Use templates to get started quickly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ImageUploader
        isOpen={imageUploaderOpen}
        onClose={() => setImageUploaderOpen(false)}
        onImageUpload={handleImageUpload}
      />

      <SaveDesignModal
        isOpen={saveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSaveDesign}
        currentName={currentDesign?.name}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        designPreview={designPreview}
        signSize={selectedSize}
      />
    </Layout>
  );
};

export default DesignTool;
