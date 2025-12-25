import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image, AlertCircle } from 'lucide-react';

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

const ImageUploader = ({ onImageUpload, isOpen, onClose }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (file.size > MAX_FILE_SIZE) {
          alert('File size exceeds 100MB limit. Please choose a smaller file.');
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          if (onImageUpload) {
            onImageUpload(e.target.result);
          }
          if (onClose) {
            onClose();
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageUpload, onClose]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        'image/png': ['.png'],
      },
      maxFiles: 1,
      maxSize: MAX_FILE_SIZE,
    });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Upload Image</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-navy bg-navy/5'
              : 'border-gray-300 hover:border-navy hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            {isDragActive ? (
              <>
                <Image className="h-12 w-12 text-navy mb-4" />
                <p className="text-navy font-semibold">Drop the image here</p>
              </>
            ) : (
              <>
                <Upload className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-700 font-semibold mb-2">
                  Drag & drop an image here
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  or click to select a file
                </p>
                <div className="text-xs text-gray-400">
                  <p>Accepted format: PNG</p>
                  <p>Maximum size: 100MB</p>
                  <p className="mt-2 text-usa-red">
                    Tip: Use transparent PNGs for logos!
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {fileRejections.length > 0 && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-700 font-medium">Upload failed</p>
              <p className="text-red-600 text-sm">
                {fileRejections[0].errors[0]?.message ||
                  'Please use a valid PNG file under 100MB.'}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
