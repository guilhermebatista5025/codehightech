import { create } from 'zustand';
import { StorageManager } from '../lib/StorageManager';

interface EditorState {
  files: Record<string, string>;
  activeFile: string;
  setFileCode: (fileName: string, code: string) => void;
  setActiveFile: (fileName: string) => void;
  addFile: (fileName: string, initialCode?: string) => void;
  deleteFile: (fileName: string) => void;
  loadState: () => void;
}

const defaultFiles = {
  'index.js': '// Bem-vindo ao primeiro dia na CodeHighTech!\n// Configure o projeto base da empresa.\n\n'
};

export const useEditorStore = create<EditorState>((set, get) => ({
  files: defaultFiles,
  activeFile: 'index.js',

  setFileCode: (fileName, code) => {
    set((state) => ({
      files: { ...state.files, [fileName]: code }
    }));
    StorageManager.save('editor:state', { files: get().files, activeFile: get().activeFile });
  },

  setActiveFile: (fileName) => {
    set({ activeFile: fileName });
    StorageManager.save('editor:state', { files: get().files, activeFile: fileName });
  },

  addFile: (fileName, initialCode = '') => {
    set((state) => {
      if (state.files[fileName]) return state; // Já existe
      return {
        files: { ...state.files, [fileName]: initialCode },
        activeFile: fileName
      };
    });
    StorageManager.save('editor:state', { files: get().files, activeFile: get().activeFile });
  },

  deleteFile: (fileName) => {
    if (fileName === 'index.js') return; // protege o arquivo principal
    set((state) => {
      const newFiles = { ...state.files };
      delete newFiles[fileName];
      const newActiveFile = state.activeFile === fileName 
        ? Object.keys(newFiles)[0] || '' 
        : state.activeFile;
      
      return {
        files: newFiles,
        activeFile: newActiveFile
      };
    });
    StorageManager.save('editor:state', { files: get().files, activeFile: get().activeFile });
  },

  loadState: () => {
    const state = StorageManager.load('editor:state');
    if (state && state.files) {
      set({ files: state.files, activeFile: state.activeFile || 'index.js' });
    } else if (state && state.code) {
      set({ files: { 'index.js': state.code }, activeFile: 'index.js' });
    }
  }
}));
