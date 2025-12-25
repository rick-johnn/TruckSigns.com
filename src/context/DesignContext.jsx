import { createContext, useContext, useState, useCallback } from 'react';
import {
  getUserDesigns,
  saveDesign as saveDesignStorage,
  deleteDesign as deleteDesignStorage,
  getDesignById,
  generateId,
} from '../utils/storage';
import { useAuth } from './AuthContext';
import { SIGN_SIZES } from '../utils/constants';

const DesignContext = createContext(null);

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};

export const DesignProvider = ({ children }) => {
  const { user } = useAuth();
  const [currentDesign, setCurrentDesign] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [selectedSize, setSelectedSize] = useState(SIGN_SIZES.medium);
  const [canvasData, setCanvasData] = useState(null);

  // Load user's designs
  const loadDesigns = useCallback(() => {
    if (user?.email) {
      const userDesigns = getUserDesigns(user.email);
      setDesigns(userDesigns);
      return userDesigns;
    }
    return [];
  }, [user?.email]);

  // Create a new design
  const createNewDesign = useCallback(
    (signSize = SIGN_SIZES.medium) => {
      const newDesign = {
        id: generateId(),
        userEmail: user?.email,
        name: `Design ${new Date().toLocaleDateString()}`,
        signSize: signSize.id,
        canvasData: null,
        previewImage: null,
      };
      setCurrentDesign(newDesign);
      setSelectedSize(signSize);
      setCanvasData(null);
      return newDesign;
    },
    [user?.email]
  );

  // Load an existing design
  const loadDesign = useCallback((designId) => {
    const design = getDesignById(designId);
    if (design) {
      setCurrentDesign(design);
      setSelectedSize(SIGN_SIZES[design.signSize] || SIGN_SIZES.medium);
      setCanvasData(design.canvasData);
      return design;
    }
    return null;
  }, []);

  // Save current design
  const saveDesign = useCallback(
    (name, canvasJson, previewImage) => {
      if (!currentDesign || !user?.email) return null;

      const designToSave = {
        ...currentDesign,
        name: name || currentDesign.name,
        signSize: selectedSize.id,
        canvasData: canvasJson,
        previewImage: previewImage,
        userEmail: user.email,
      };

      const savedDesign = saveDesignStorage(designToSave);
      setCurrentDesign(savedDesign);
      loadDesigns(); // Refresh the designs list
      return savedDesign;
    },
    [currentDesign, selectedSize, user?.email, loadDesigns]
  );

  // Delete a design
  const deleteDesign = useCallback(
    (designId) => {
      deleteDesignStorage(designId);
      if (currentDesign?.id === designId) {
        setCurrentDesign(null);
        setCanvasData(null);
      }
      loadDesigns(); // Refresh the designs list
    },
    [currentDesign?.id, loadDesigns]
  );

  // Update canvas data (for auto-save or preview)
  const updateCanvasData = useCallback((data) => {
    setCanvasData(data);
  }, []);

  // Change sign size
  const changeSignSize = useCallback((size) => {
    setSelectedSize(size);
  }, []);

  const value = {
    currentDesign,
    designs,
    selectedSize,
    canvasData,
    loadDesigns,
    createNewDesign,
    loadDesign,
    saveDesign,
    deleteDesign,
    updateCanvasData,
    changeSignSize,
  };

  return (
    <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
  );
};

export default DesignContext;
