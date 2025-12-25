// Sign dimensions based on standard US truck bed sizes
export const SIGN_SIZES = {
  small: {
    id: 'small',
    name: 'Short Bed',
    truckBed: '5.5 ft',
    width: 66,
    height: 24,
    widthLabel: '66"',
    heightLabel: '24"',
    description: 'Perfect for compact and mid-size trucks like Ford F-150, RAM 1500, Chevy Silverado 1500',
    popular: false,
  },
  medium: {
    id: 'medium',
    name: 'Standard Bed',
    truckBed: '6.5 ft',
    width: 78,
    height: 24,
    widthLabel: '78"',
    heightLabel: '24"',
    description: 'Our most popular size - fits most full-size trucks including Ford F-150, RAM 1500, GMC Sierra',
    popular: true,
  },
  large: {
    id: 'large',
    name: 'Long Bed',
    truckBed: '8 ft',
    width: 96,
    height: 24,
    widthLabel: '96"',
    heightLabel: '24"',
    description: 'Maximum visibility for heavy-duty trucks like Ford F-250/350, RAM 2500/3500, Chevy Silverado HD',
    popular: false,
  },
};

// Template presets for the design tool
export const DESIGN_TEMPLATES = [
  {
    id: 'business-card',
    name: 'Business Card Style',
    description: 'Logo with contact information',
    thumbnail: '/templates/business-card.png',
  },
  {
    id: 'bold-text',
    name: 'Bold Text',
    description: 'Large company name for maximum impact',
    thumbnail: '/templates/bold-text.png',
  },
  {
    id: 'image-focused',
    name: 'Image Focused',
    description: 'Showcase your work with a large photo',
    thumbnail: '/templates/image-focused.png',
  },
  {
    id: 'split-layout',
    name: 'Split Layout',
    description: 'Image on one side, text on the other',
    thumbnail: '/templates/split-layout.png',
  },
];

// Available fonts for the design tool
export const AVAILABLE_FONTS = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Times New Roman', value: '"Times New Roman", Times, serif' },
  { name: 'Verdana', value: 'Verdana, Geneva, sans-serif' },
  { name: 'Impact', value: 'Impact, Charcoal, sans-serif' },
  { name: 'Comic Sans MS', value: '"Comic Sans MS", cursive' },
  { name: 'Trebuchet MS', value: '"Trebuchet MS", Helvetica, sans-serif' },
  { name: 'Courier New', value: '"Courier New", Courier, monospace' },
];

// Available colors for the design tool
export const PRESET_COLORS = [
  '#000000', // Black
  '#FFFFFF', // White
  '#1e3a5f', // Navy
  '#b91c1c', // Red
  '#f59e0b', // Amber
  '#10b981', // Emerald
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#6b7280', // Gray
];

// Email configuration (to be replaced with actual values)
export const EMAIL_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
  toEmail: 'inquiries@trucksigns.com',
};

// Timeline options for inquiry
export const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-2-weeks', label: '1-2 weeks' },
  { value: '2-4-weeks', label: '2-4 weeks' },
  { value: '1-month-plus', label: '1 month or more' },
  { value: 'flexible', label: 'Flexible / No rush' },
];

// Quantity options for inquiry
export const QUANTITY_OPTIONS = [
  { value: '1', label: '1 sign' },
  { value: '2-5', label: '2-5 signs' },
  { value: '6-10', label: '6-10 signs' },
  { value: '11-25', label: '11-25 signs' },
  { value: '25+', label: '25+ signs' },
];

// Contact preference options
export const CONTACT_PREFERENCES = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'either', label: 'Either is fine' },
];
