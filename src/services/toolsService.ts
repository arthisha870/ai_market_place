import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';
import { Tool } from '../types';

// Collections
const TOOLS_COLLECTION = 'tools';
const CATEGORIES_COLLECTION = 'categories';

// Default placeholder image URLs
export const DEFAULT_LOGO_PLACEHOLDER = "https://placehold.co/100x100/e2e8f0/64748b?text=No+Logo";
export const DEFAULT_SCREENSHOT_PLACEHOLDER = "https://placehold.co/600x400/e2e8f0/64748b?text=No+Screenshot";

// Get all tools
export const getAllTools = async (): Promise<Tool[]> => {
  try {
    const toolsSnapshot = await getDocs(collection(db, TOOLS_COLLECTION));
    return toolsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Tool[];
  } catch (error) {
    console.error('Error getting tools:', error);
    throw error;
  }
};

// Get tool by ID
export const getToolById = async (id: string): Promise<Tool | null> => {
  try {
    const toolDoc = await getDoc(doc(db, TOOLS_COLLECTION, id));
    if (toolDoc.exists()) {
      return {
        id: toolDoc.id,
        ...toolDoc.data()
      } as Tool;
    }
    return null;
  } catch (error) {
    console.error('Error getting tool:', error);
    throw error;
  }
};

// Get tool by slug
export const getToolBySlug = async (slug: string): Promise<Tool | null> => {
  try {
    const toolsRef = collection(db, TOOLS_COLLECTION);
    const q = query(toolsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const toolDoc = querySnapshot.docs[0];
      return {
        id: toolDoc.id,
        ...toolDoc.data()
      } as Tool;
    }
    return null;
  } catch (error) {
    console.error('Error getting tool by slug:', error);
    throw error;
  }
};

// Add new tool
export const addTool = async (tool: Omit<Tool, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, TOOLS_COLLECTION), {
      ...tool,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding tool:', error);
    throw error;
  }
};

// Update tool
export const updateTool = async (id: string, tool: Partial<Tool>): Promise<void> => {
  try {
    await updateDoc(doc(db, TOOLS_COLLECTION, id), {
      ...tool,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating tool:', error);
    throw error;
  }
};

// Delete tool
export const deleteTool = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, TOOLS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting tool:', error);
    throw error;
  }
};

// Upload tool logo
export const uploadToolLogo = async (file: File, toolId: string): Promise<string> => {
  try {
    const logoRef = ref(storage, `tools/${toolId}/logo`);
    await uploadBytes(logoRef, file);
    return getDownloadURL(logoRef);
  } catch (error) {
    console.error('Error uploading logo:', error);
    throw error;
  }
};

// Upload tool screenshot
export const uploadToolScreenshot = async (file: File, toolId: string, index: number): Promise<string> => {
  try {
    const screenshotRef = ref(storage, `tools/${toolId}/screenshot-${index}`);
    await uploadBytes(screenshotRef, file);
    return getDownloadURL(screenshotRef);
  } catch (error) {
    console.error('Error uploading screenshot:', error);
    throw error;
  }
};

// Get all categories
export const getAllCategories = async (): Promise<string[]> => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return categoriesSnapshot.docs.map(doc => doc.data().name as string);
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
};

// Add new category
export const addCategory = async (name: string): Promise<void> => {
  try {
    await addDoc(collection(db, CATEGORIES_COLLECTION), {
      name,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

// Delete category
export const deleteCategory = async (name: string): Promise<void> => {
  try {
    const q = query(collection(db, CATEGORIES_COLLECTION), where("name", "==", name));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const docToDelete = querySnapshot.docs[0];
      await deleteDoc(doc(db, CATEGORIES_COLLECTION, docToDelete.id));
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

// Initialize default categories if none exist
export const initializeDefaultCategories = async (): Promise<void> => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    
    if (categoriesSnapshot.empty) {
      const defaultCategories = [
        'content',
        'productivity',
        'data',
        'marketing',
        'design',
        'development'
      ];
      
      for (const category of defaultCategories) {
        await addCategory(category);
      }
    }
  } catch (error) {
    console.error('Error initializing default categories:', error);
    throw error;
  }
};

// Check if slug already exists
export const checkSlugExists = async (slug: string, excludeToolId?: string): Promise<boolean> => {
  try {
    const toolsRef = collection(db, TOOLS_COLLECTION);
    const q = query(toolsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return false;
    }
    
    // If we're updating a tool, we should exclude it from the check
    if (excludeToolId) {
      const existingTool = querySnapshot.docs[0];
      return existingTool.id !== excludeToolId;
    }
    
    return true;
  } catch (error) {
    console.error('Error checking slug existence:', error);
    throw error;
  }
}; 