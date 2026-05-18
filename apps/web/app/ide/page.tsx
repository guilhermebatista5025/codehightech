"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Sidebar from '../../src/components/Sidebar';
import CodeEditor from '../../src/components/CodeEditor';
import WebTerminal from '../../src/components/WebTerminal';

export default function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(containerRef.current, { opacity: 0, scale: 0.98, duration: 0.8, ease: "power3.out" });
  }, []);

  return (
    <div className="flex h-screen w-full bg-transparent p-3 gap-3 overflow-hidden font-sans" style={{ background: '#050505' }}>
      {/* Sidebar - NPC & Missions */}
      <div className="w-[360px] shrink-0 glass-panel rounded-2xl overflow-hidden flex flex-col shadow-2xl relative z-10 border border-white/5">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div ref={containerRef} className="flex-1 flex flex-col gap-3 relative z-10 overflow-hidden">
        
        {/* Code Editor */}
        <div className="flex-1 glass-panel rounded-2xl overflow-hidden relative border border-white/5 shadow-2xl">
          <CodeEditor />
        </div>

        {/* Web Terminal */}
        <div className="h-[280px] shrink-0 glass-panel rounded-2xl overflow-hidden border border-white/5 relative z-10 shadow-2xl">
          <WebTerminal />
        </div>
        
      </div>
    </div>
  );
}
