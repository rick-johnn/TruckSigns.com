import {
  Image,
  Type,
  Square,
  Circle,
  Minus,
  Trash2,
  Copy,
  FlipHorizontal,
  FlipVertical,
  ArrowUp,
  ArrowDown,
  RotateCcw,
} from 'lucide-react';

const Toolbar = ({
  onAddImage,
  onAddText,
  onAddShape,
  selectedObject,
  onDelete,
  onDuplicate,
  onFlipH,
  onFlipV,
  onBringForward,
  onSendBackward,
  onResetCanvas,
}) => {
  const tools = [
    { icon: Image, label: 'Add Image', action: onAddImage },
    { icon: Type, label: 'Add Text', action: onAddText },
    {
      icon: Square,
      label: 'Rectangle',
      action: () => onAddShape && onAddShape('rect'),
    },
    {
      icon: Circle,
      label: 'Circle',
      action: () => onAddShape && onAddShape('circle'),
    },
    {
      icon: Minus,
      label: 'Line',
      action: () => onAddShape && onAddShape('line'),
    },
  ];

  const objectActions = [
    { icon: Copy, label: 'Duplicate', action: onDuplicate },
    { icon: FlipHorizontal, label: 'Flip H', action: onFlipH },
    { icon: FlipVertical, label: 'Flip V', action: onFlipV },
    { icon: ArrowUp, label: 'Forward', action: onBringForward },
    { icon: ArrowDown, label: 'Backward', action: onSendBackward },
    { icon: Trash2, label: 'Delete', action: onDelete, danger: true },
  ];

  return (
    <div className="bg-white dark:bg-navy-900 rounded-xl shadow-sm border border-gray-200 dark:border-navy-700 p-4">
      <div className="flex flex-wrap gap-4">
        {/* Add Tools */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-navy-400 uppercase mb-3">
            Add Elements
          </h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, index) => (
              <button
                key={index}
                onClick={tool.action}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-navy-200 bg-gray-50 dark:bg-navy-800 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-navy dark:hover:text-white transition-colors"
                title={tool.label}
              >
                <tool.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Object Actions */}
        {selectedObject && (
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-navy-400 uppercase mb-3">
              Selected Object
            </h3>
            <div className="flex flex-wrap gap-2">
              {objectActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    action.danger
                      ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50'
                      : 'text-gray-700 dark:text-navy-200 bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-navy dark:hover:text-white'
                  }`}
                  title={action.label}
                >
                  <action.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Canvas Actions */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 dark:text-navy-400 uppercase mb-3">
            Canvas
          </h3>
          <button
            onClick={onResetCanvas}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-navy-200 bg-gray-50 dark:bg-navy-800 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700 hover:text-navy dark:hover:text-white transition-colors"
            title="Clear Canvas"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Clear All</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
