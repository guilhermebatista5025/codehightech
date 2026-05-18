"use client";

import { Terminal } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { bootWebContainer } from '../lib/webcontainer';

export default function WebTerminal() {
  const [logs, setLogs] = useState<string[]>([
    "Booting CodeHighTech environment...",
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  const addLog = (log: string) => setLogs((prev) => [...prev, log]);

  useEffect(() => {
    let isInit = true;

    const init = async () => {
      try {
        const container = await bootWebContainer();
        if (!isInit) return;
        addLog("Node.js virtualizado ativado.");
        addLog("Sincronizando dependências... (npm install)");
        
        const installProcess = await container.spawn('npm', ['install']);
        
        installProcess.output.pipeTo(new WritableStream({
          write(data) {
            addLog(data.replace(/\r?\n/g, ''));
          }
        }));

        await installProcess.exit;
        addLog("Ambiente pronto. Aguardando execução.");

        const syncFiles = async (files: Record<string, string>) => {
          addLog(`> Sincronizando arquivos para o container...`);
          for (const [filename, content] of Object.entries(files)) {
            try {
              const parts = filename.split('/');
              let currentPath = '';
              for(let i = 0; i < parts.length - 1; i++){
                currentPath += (currentPath ? '/' : '') + parts[i];
                try { await container.fs.mkdir(currentPath); } catch(e){}
              }
              await container.fs.writeFile(filename, content);
            } catch (e: any) {
              addLog(`Erro ao escrever ${filename}: ${e.message}`);
            }
          }
        };

        (window as any).executeCode = async (files: Record<string, string>, activeFilename: string) => {
          await syncFiles(files);
          addLog(`> Executando ${activeFilename}...`);
          
          const runProcess = await container.spawn('node', [activeFilename]);

          runProcess.output.pipeTo(new WritableStream({
            write(data) {
              addLog(data.replace(/\r?\n/g, ''));
            }
          }));
        };

        (window as any).validateMissionCode = async (files: Record<string, string>, testCode: string, activeFilename: string) => {
          addLog(`> Iniciando CI/CD pipeline de Validação...`);
          await syncFiles(files);
          await container.fs.writeFile('test_runner.js', testCode);
          
          const runProcess = await container.spawn('node', ['test_runner.js']);
          
          let output = "";
          runProcess.output.pipeTo(new WritableStream({
            write(data) {
              const text = data.replace(/\r?\n/g, '');
              output += text;
              addLog(text);
            }
          }));

          await runProcess.exit;
          
          if (output.includes("SUCESSO_VALIDACAO")) {
            return true;
          }
          return false;
        };

      } catch (err: any) {
        addLog(`Error: ${err.message}`);
      }
    };

    init();

    return () => {
      isInit = false;
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-black/50 font-mono text-sm backdrop-blur-md">
      <div className="flex items-center gap-2 px-4 py-3 bg-black/60 border-b border-white/5 shadow-md">
        <Terminal size={16} className="text-primary animate-pulse" />
        <span className="text-slate-200 font-bold uppercase tracking-widest text-xs text-gradient">Console / Output</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 text-slate-300 space-y-1.5 scroll-smooth">
        {logs.map((log, i) => (
          <div key={i} className="flex">
            <span className={log.includes("SUCESSO_VALIDACAO") ? "text-secondary mr-3 shrink-0" : log.includes("FALHA") ? "text-danger mr-3 shrink-0" : "text-slate-600 mr-3 shrink-0"}>~</span>
            <span className={`break-all whitespace-pre-wrap ${log.includes("SUCESSO_VALIDACAO") ? "text-secondary font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" : log.includes("FALHA") ? "text-danger font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "text-slate-300"}`}>
              {log}
            </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
