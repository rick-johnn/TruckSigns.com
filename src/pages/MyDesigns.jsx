import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { Button, Modal } from '../components/ui';
import { InquiryModal } from '../components/design-tool';
import { useDesign } from '../context/DesignContext';
import { SIGN_SIZES } from '../utils/constants';
import {
  Plus,
  Pencil,
  Trash2,
  Send,
  Calendar,
  Ruler,
  FolderOpen,
} from 'lucide-react';

const MyDesigns = () => {
  const navigate = useNavigate();
  const { designs, loadDesigns, deleteDesign, createNewDesign } = useDesign();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [designToDelete, setDesignToDelete] = useState(null);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);

  useEffect(() => {
    loadDesigns();
  }, [loadDesigns]);

  const handleNewDesign = () => {
    createNewDesign();
    navigate('/design');
  };

  const handleEdit = (designId) => {
    navigate(`/design?id=${designId}`);
  };

  const handleDeleteClick = (design) => {
    setDesignToDelete(design);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (designToDelete) {
      deleteDesign(designToDelete.id);
      setDeleteModalOpen(false);
      setDesignToDelete(null);
    }
  };

  const handleInquiry = (design) => {
    setSelectedDesign(design);
    setInquiryModalOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout fullWidth>
      {/* Hero */}
      <section className="bg-navy py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">My Designs</h1>
              <p className="text-gray-300 mt-1">
                Manage your saved truck sign designs
              </p>
            </div>
            <Button
              variant="primary"
              icon={Plus}
              onClick={handleNewDesign}
            >
              New Design
            </Button>
          </div>
        </div>
      </section>

      {/* Designs Grid */}
      <section className="py-12 bg-gray-50 min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {designs.length === 0 ? (
            <div className="text-center py-16">
              <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No designs yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start creating your first truck sign design!
              </p>
              <Button variant="primary" icon={Plus} onClick={handleNewDesign}>
                Create Your First Design
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {designs.map((design) => {
                const size = SIGN_SIZES[design.signSize] || SIGN_SIZES.medium;
                return (
                  <div
                    key={design.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Preview */}
                    <div className="aspect-[3/1] bg-gray-100 relative">
                      {design.previewImage ? (
                        <img
                          src={design.previewImage}
                          alt={design.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No preview
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 truncate mb-2">
                        {design.name}
                      </h3>

                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Ruler className="h-4 w-4 mr-1.5" />
                        <span>
                          {size.name} ({size.truckBed})
                        </span>
                      </div>

                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        <span>
                          {design.updatedAt
                            ? formatDate(design.updatedAt)
                            : formatDate(design.createdAt)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="flex-1"
                          icon={Pencil}
                          onClick={() => handleEdit(design.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-1"
                          icon={Send}
                          onClick={() => handleInquiry(design)}
                        >
                          Inquiry
                        </Button>
                        <button
                          onClick={() => handleDeleteClick(design)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Design"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to delete "{designToDelete?.name}"? This action
            cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      {/* Inquiry Modal */}
      {selectedDesign && (
        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => {
            setInquiryModalOpen(false);
            setSelectedDesign(null);
          }}
          designPreview={selectedDesign.previewImage}
          signSize={SIGN_SIZES[selectedDesign.signSize] || SIGN_SIZES.medium}
        />
      )}
    </Layout>
  );
};

export default MyDesigns;
