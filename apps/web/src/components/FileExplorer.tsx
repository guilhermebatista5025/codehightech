"use client";

import { useState } from 'react';
import { useEditorStore } from '../store/useEditorStore';
import { FileCode, FilePlus, Trash2, FolderCode } from 'lucide-react';

export default function FileExplorer() {
  const { files, activeFile, setActiveFile, addFile, deleteFile } = useEditorStore();
  const [newFileName, setNewFileName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newFileName.trim()) {
      let name = newFileName.trim();
      if (!name.includes('.')) name += '.ts';
      addFile(name);
      setNewFileName('');
      setIsCreating(false);
    } else if (e.key === 'Escape') {
      setIsCreating(false);
      setNewFileName('');
    }
  };

  return (
    <div className="w-56 glass-panel-heavy border-r border-white/5 flex flex-col h-full shrink-0 font-sans">
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-2 text-slate-200 font-bold text-xs uppercase tracking-widest text-gradient">
          <FolderCode size={16} className="text-primary" /> WORKSPACE
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="text-slate-400 hover:text-primary transition-colors hover:scale-110 transform"
          title="Novo Arquivo"
        >
          <FilePlus size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {isCreating && (
          <div className="px-2 mb-2">
            <input
              autoFocus
              type="text"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              onKeyDown={handleCreate}
              onBlur={() => setIsCreating(false)}
              placeholder="nome.ts"
              className="w-full bg-black/40 text-xs text-white px-3 py-1.5 outline-none border border-primary/50 rounded-md focus:shadow-[0_0_10px_rgba(14,165,233,0.3)] transition-shadow"
            />
          </div>
        )}
        
        {Object.keys(files).map((fileName) => (
          <div 
            key={fileName}
            onClick={() => setActiveFile(fileName)}
            className={`group flex items-center justify-between px-3 py-2 rounded-md text-sm cursor-pointer transition-all duration-200 ${
              activeFile === fileName 
                ? 'bg-primary/20 text-white border border-primary/30 shadow-[0_0_15px_rgba(14,165,233,0.15)]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <FileCode size={14} className={activeFile === fileName ? 'text-primary' : 'text-slate-500 group-hover:text-slate-300 transition-colors'} />
              <span className="truncate">{fileName}</span>
            </div>
            
            {fileName !== 'index.js' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFile(fileName);
                }}
                className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-danger transition-all hover:scale-110"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
