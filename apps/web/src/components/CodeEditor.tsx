"use client";

import Editor from '@monaco-editor/react';
import { useEditorStore } from '../store/useEditorStore';
import { useGameStore } from '../store/useGameStore';
import { usePlayerStore } from '../store/usePlayerStore';
import { missions } from '../data/missions';
import { useEffect, useRef, useState } from 'react';
import { Play, Save, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import FileExplorer from './FileExplorer';

export default function CodeEditor() {
  const { files, activeFile, setFileCode, loadState } = useEditorStore();
  const { currentPhase, completePhase } = useGameStore();
  const { addXp } = usePlayerStore();
  
  const headerRef = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    loadState();
    gsap.from(headerRef.current, { opacity: 0, y: -10, duration: 0.5, delay: 0.3 });
  }, [loadState]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined && activeFile) {
      setFileCode(activeFile, value);
    }
  };

  const executeCode = () => {
    const run = (window as any).executeCode;
    if (run) {
      setIsRunning(true);
      run(files, activeFile).finally(() => setIsRunning(false));
    } else {
      alert("Terminal/WebContainer ainda está inicializando.");
    }
  };

  const submitCode = async () => {
    const validator = (window as any).validateMissionCode;
    if (!validator) {
      alert("A engine de validação ainda está subindo. Aguarde.");
      return;
    }

    setIsRunning(true);
    
    const mission = missions.find(m => m.id === currentPhase);
    
    if (!mission) {
      alert("Você concluiu todas as missões disponíveis!");
      setIsRunning(false);
      return;
    }

    const success = await validator(files, mission.testCode, activeFile);
    
    if (success) {
      gsap.fromTo(".btn-submit", { scale: 1.1, backgroundColor: "#10b981", boxShadow: "0 0 20px #10b981" }, { scale: 1, boxShadow: "none", duration: 0.5 });
      
      addXp(mission.xpReward);
      completePhase(currentPhase);
      
      const nextMission = missions.find(m => m.id === currentPhase + 1);
      if (nextMission) {
        setTimeout(() => setFileCode('index.js', nextMission.initialCode), 1500);
      }
    }
    
    setIsRunning(false);
  };

  const currentCode = files[activeFile] || '';

  return (
    <div className="flex h-full w-full bg-transparent">
      <FileExplorer />
      
      <div className="flex flex-col flex-1 h-full min-w-0">
        {/* Editor Header / Tabs */}
        <div ref={headerRef} className="h-14 bg-black/20 border-b border-white/5 flex items-center justify-between px-4 backdrop-blur-sm">
          <div className="flex items-center">
            {activeFile && (
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 border-b-2 border-primary text-sm font-medium text-slate-200 rounded-t-lg backdrop-blur-md">
                {activeFile}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-all hover:scale-110" title="Salvar (Automático)">
              <Save size={18} />
            </button>
            
            <button 
              onClick={executeCode}
              disabled={isRunning || !activeFile}
              className="glow-effect flex items-center gap-2 px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg text-sm font-medium transition-all disabled:opacity-50"
            >
              <Play size={14} className={isRunning ? "animate-pulse text-primary" : ""} /> 
              {isRunning ? 'Rodando...' : 'Executar'}
            </button>

            <button 
              onClick={submitCode}
              disabled={isRunning}
              className="btn-submit glow-effect flex items-center gap-2 px-4 py-1.5 bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 hover:text-white rounded-lg text-sm font-bold transition-all disabled:opacity-50"
            >
              <CheckCircle2 size={16} /> Submeter PR
            </button>
          </div>
        </div>
        
        {/* Monaco Editor */}
        <div className="flex-1 bg-black/40">
          {activeFile ? (
            <Editor
              height="100%"
              defaultLanguage={activeFile.endsWith('.json') ? 'json' : activeFile.endsWith('.prisma') ? 'graphql' : 'javascript'}
              theme="vs-dark"
              value={currentCode}
              onChange={handleEditorChange}
              path={activeFile}
              options={{
                minimap: { enabled: false },
                fontSize: 15,
                fontFamily: 'JetBrains Mono, Consolas, "Courier New", monospace',
                padding: { top: 24, bottom: 24 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                renderLineHighlight: "all",
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm font-mono">
              Nenhum arquivo aberto.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
