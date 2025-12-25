import { useState } from 'react';
import { Modal, Button, Input } from '../ui';
import { Save, CheckCircle } from 'lucide-react';

const SaveDesignModal = ({ isOpen, onClose, onSave, currentName }) => {
  const [name, setName] = useState(currentName || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await onSave(name);

    setLoading(false);
    setSuccess(true);

    // Auto close after success
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  const handleClose = () => {
    setSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Save Design" size="sm">
      {success ? (
        <div className="text-center py-6">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-900 font-medium">Design saved successfully!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Design Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Company Logo Design v1"
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              loading={loading}
              icon={Save}
            >
              Save Design
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default SaveDesignModal;
