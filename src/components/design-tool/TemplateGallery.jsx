import { Layout, Type, Image, SplitSquareHorizontal } from 'lucide-react';
import * as fabric from 'fabric';

const templates = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start from scratch',
    icon: Layout,
    create: () => [], // Return empty array for blank
  },
  {
    id: 'business-card',
    name: 'Business Card',
    description: 'Logo + contact info layout',
    icon: Layout,
    create: (width, height) => [
      new fabric.Textbox('YOUR COMPANY', {
        left: width * 0.05,
        top: height * 0.15,
        width: width * 0.5,
        fontSize: Math.min(height * 0.25, 48),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fill: '#1e3a5f',
      }),
      new fabric.Textbox('(555) 123-4567', {
        left: width * 0.05,
        top: height * 0.55,
        width: width * 0.4,
        fontSize: Math.min(height * 0.15, 24),
        fontFamily: 'Arial, sans-serif',
        fill: '#333333',
      }),
      new fabric.Textbox('www.yoursite.com', {
        left: width * 0.05,
        top: height * 0.75,
        width: width * 0.4,
        fontSize: Math.min(height * 0.12, 20),
        fontFamily: 'Arial, sans-serif',
        fill: '#666666',
      }),
      new fabric.Rect({
        left: width * 0.65,
        top: height * 0.1,
        width: width * 0.3,
        height: height * 0.8,
        fill: '#f3f4f6',
        stroke: '#d1d5db',
        strokeWidth: 1,
        rx: 5,
        ry: 5,
      }),
      new fabric.Textbox('LOGO\nHERE', {
        left: width * 0.7,
        top: height * 0.35,
        width: width * 0.2,
        fontSize: Math.min(height * 0.12, 18),
        fontFamily: 'Arial, sans-serif',
        fill: '#9ca3af',
        textAlign: 'center',
      }),
    ],
  },
  {
    id: 'bold-text',
    name: 'Bold Text',
    description: 'Large company name',
    icon: Type,
    create: (width, height) => [
      new fabric.Rect({
        left: 0,
        top: 0,
        width: width,
        height: height,
        fill: '#1e3a5f',
      }),
      new fabric.Textbox('YOUR COMPANY NAME', {
        left: width * 0.05,
        top: height * 0.25,
        width: width * 0.9,
        fontSize: Math.min(height * 0.35, 60),
        fontFamily: 'Impact, Charcoal, sans-serif',
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
      }),
      new fabric.Textbox('CALL: (555) 123-4567', {
        left: width * 0.05,
        top: height * 0.7,
        width: width * 0.9,
        fontSize: Math.min(height * 0.15, 28),
        fontFamily: 'Arial, sans-serif',
        fill: '#fbbf24',
        textAlign: 'center',
      }),
    ],
  },
  {
    id: 'image-focused',
    name: 'Image Focused',
    description: 'Large image area',
    icon: Image,
    create: (width, height) => [
      new fabric.Rect({
        left: width * 0.02,
        top: height * 0.05,
        width: width * 0.6,
        height: height * 0.9,
        fill: '#f3f4f6',
        stroke: '#d1d5db',
        strokeWidth: 2,
        rx: 5,
        ry: 5,
      }),
      new fabric.Textbox('DROP\nIMAGE\nHERE', {
        left: width * 0.15,
        top: height * 0.3,
        width: width * 0.35,
        fontSize: Math.min(height * 0.15, 24),
        fontFamily: 'Arial, sans-serif',
        fill: '#9ca3af',
        textAlign: 'center',
      }),
      new fabric.Textbox('Your Business', {
        left: width * 0.65,
        top: height * 0.15,
        width: width * 0.32,
        fontSize: Math.min(height * 0.18, 28),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fill: '#1e3a5f',
      }),
      new fabric.Textbox('Quality Service Since 2020', {
        left: width * 0.65,
        top: height * 0.4,
        width: width * 0.32,
        fontSize: Math.min(height * 0.1, 16),
        fontFamily: 'Arial, sans-serif',
        fill: '#666666',
      }),
      new fabric.Textbox('(555) 123-4567', {
        left: width * 0.65,
        top: height * 0.65,
        width: width * 0.32,
        fontSize: Math.min(height * 0.12, 20),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fill: '#b91c1c',
      }),
    ],
  },
  {
    id: 'split-layout',
    name: 'Split Layout',
    description: 'Image left, text right',
    icon: SplitSquareHorizontal,
    create: (width, height) => [
      new fabric.Rect({
        left: 0,
        top: 0,
        width: width * 0.5,
        height: height,
        fill: '#b91c1c',
      }),
      new fabric.Textbox('ADD\nYOUR\nLOGO', {
        left: width * 0.1,
        top: height * 0.25,
        width: width * 0.3,
        fontSize: Math.min(height * 0.15, 24),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
      }),
      new fabric.Textbox('YOUR COMPANY', {
        left: width * 0.55,
        top: height * 0.15,
        width: width * 0.4,
        fontSize: Math.min(height * 0.2, 32),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fill: '#1e3a5f',
      }),
      new fabric.Textbox('Professional Services\nFree Estimates\nLicensed & Insured', {
        left: width * 0.55,
        top: height * 0.45,
        width: width * 0.4,
        fontSize: Math.min(height * 0.1, 16),
        fontFamily: 'Arial, sans-serif',
        fill: '#666666',
        lineHeight: 1.4,
      }),
      new fabric.Textbox('(555) 123-4567', {
        left: width * 0.55,
        top: height * 0.8,
        width: width * 0.4,
        fontSize: Math.min(height * 0.12, 20),
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold',
        fill: '#b91c1c',
      }),
    ],
  },
];

const TemplateGallery = ({ canvas, canvasWidth, canvasHeight, onApply }) => {
  const applyTemplate = (template) => {
    if (!canvas) return;

    // Clear canvas
    canvas.clear();
    canvas.backgroundColor = '#ffffff';

    // Create template objects
    const objects = template.create(canvasWidth, canvasHeight);

    // Add objects to canvas
    objects.forEach((obj) => {
      canvas.add(obj);
    });

    canvas.renderAll();

    if (onApply) {
      onApply(template);
    }
  };

  return (
    <div className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-gray-200 dark:border-navy-700 p-4">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Templates</h3>
      <div className="grid grid-cols-2 gap-2">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => applyTemplate(template)}
            className="p-3 border border-gray-200 dark:border-navy-600 rounded-lg hover:border-navy dark:hover:border-navy-400 hover:bg-navy/5 dark:hover:bg-navy-700 transition-colors text-left group"
          >
            <div className="w-8 h-8 bg-gray-100 dark:bg-navy-700 rounded-lg flex items-center justify-center mb-2 group-hover:bg-navy/10 dark:group-hover:bg-navy-600">
              <template.icon className="h-4 w-4 text-gray-600 dark:text-navy-300 group-hover:text-navy dark:group-hover:text-white" />
            </div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{template.name}</div>
            <div className="text-xs text-gray-500 dark:text-navy-400">{template.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
