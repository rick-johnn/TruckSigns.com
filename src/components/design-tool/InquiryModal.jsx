import { useState } from 'react';
import { Modal, Button, Input, Textarea, Select } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { sendInquiryEmail } from '../../utils/emailService';
import {
  TIMELINE_OPTIONS,
  QUANTITY_OPTIONS,
  CONTACT_PREFERENCES,
} from '../../utils/constants';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const InquiryModal = ({ isOpen, onClose, designPreview, signSize }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    quantity: '',
    timeline: '',
    contactPreference: 'email',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const inquiryData = {
      designPreview,
      signSize: signSize?.name || 'Not specified',
      quantity: formData.quantity,
      timeline: TIMELINE_OPTIONS.find((t) => t.value === formData.timeline)?.label || formData.timeline,
      notes: formData.notes,
      contactPreference: formData.contactPreference,
      userName: user?.name,
      userEmail: user?.email,
      userPhone: user?.phone,
      companyName: user?.companyName,
    };

    const result = await sendInquiryEmail(inquiryData);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    setFormData({
      quantity: '',
      timeline: '',
      contactPreference: 'email',
      notes: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Send Inquiry" size="lg">
      {success ? (
        <div className="text-center py-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Inquiry Sent Successfully!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest! We'll review your design and get back to
            you within 1-2 business days with a quote.
          </p>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-sm text-red-700">{error}</span>
            </div>
          )}

          {/* Design Preview */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Design
            </label>
            <div className="bg-gray-100 rounded-lg p-4 flex justify-center">
              {designPreview ? (
                <img
                  src={designPreview}
                  alt="Design Preview"
                  className="max-w-full max-h-48 rounded border border-gray-200"
                />
              ) : (
                <div className="text-gray-500 py-8">No preview available</div>
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Sign Size: {signSize?.name} ({signSize?.widthLabel} x {signSize?.heightLabel})
            </p>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Name:</span>
                <span className="ml-2 text-gray-900">{user?.name}</span>
              </div>
              <div>
                <span className="text-gray-500">Company:</span>
                <span className="ml-2 text-gray-900">{user?.companyName}</span>
              </div>
              <div>
                <span className="text-gray-500">Email:</span>
                <span className="ml-2 text-gray-900">{user?.email}</span>
              </div>
              <div>
                <span className="text-gray-500">Phone:</span>
                <span className="ml-2 text-gray-900">{user?.phone}</span>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <Select
            label="How many signs do you need?"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            options={QUANTITY_OPTIONS}
            placeholder="Select quantity"
            required
          />

          {/* Timeline */}
          <Select
            label="When do you need them?"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            options={TIMELINE_OPTIONS}
            placeholder="Select timeline"
            required
          />

          {/* Contact Preference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred contact method
            </label>
            <div className="flex gap-4">
              {CONTACT_PREFERENCES.map((pref) => (
                <label key={pref.value} className="flex items-center">
                  <input
                    type="radio"
                    name="contactPreference"
                    value={pref.value}
                    checked={formData.contactPreference === pref.value}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{pref.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes */}
          <Textarea
            label="Additional notes or questions"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Any specific requirements, questions, or details you'd like us to know..."
            rows={3}
          />

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="secondary" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              loading={loading}
              icon={Send}
            >
              Send Inquiry
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default InquiryModal;
