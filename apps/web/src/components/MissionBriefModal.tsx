"use client";

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { BriefingStep } from '../data/missions';

interface Props {
  missionTitle: string;
  steps: BriefingStep[];
  onClose: () => void;
}

export default function MissionBriefModal({ missionTitle, steps, onClose }: Props) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const isFirst = current === 0;
  const isLast = current === steps.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(145deg, #0a1628 0%, #060b14 100%)',
          border: '1px solid rgba(14,165,233,0.25)',
          boxShadow: '0 0 60px rgba(14,165,233,0.2), 0 40px 80px rgba(0,0,0,0.6)',
          maxHeight: '90vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(14,165,233,0.06)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(14,165,233,0.2)', border: '1px solid rgba(14,165,233,0.4)' }}>
              <BookOpen size={18} className="text-sky-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Mission Brief</p>
              <h2 className="text-white font-bold text-sm">{missionTitle}</h2>
            </div>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all">
            <X size={18} />
          </button>
        </div>

        {/* Step Progress */}
        <div className="flex items-center gap-2 px-6 pt-5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="flex-1 h-1.5 rounded-full transition-all duration-300"
              style={{
                background: i <= current ? '#0ea5e9' : 'rgba(255,255,255,0.08)',
                boxShadow: i === current ? '0 0 8px rgba(14,165,233,0.6)' : 'none',
              }}
            />
          ))}
          <span className="text-xs text-slate-500 ml-2 whitespace-nowrap font-mono">
            {current + 1}/{steps.length}
          </span>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">{step.explanation}</p>

          {/* Code Block */}
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="flex items-center justify-between px-4 py-2"
              style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ef4444' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#f59e0b' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#10b981' }} />
              </div>
              <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">
                {step.language ?? 'typescript'}
              </span>
            </div>
            <pre className="p-5 overflow-x-auto text-sm leading-relaxed" style={{ background: 'rgba(0,0,0,0.6)', fontFamily: "'JetBrains Mono', monospace" }}>
              <code dangerouslySetInnerHTML={{
                __html: step.code
                  // Escape HTML first
                  .replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  // Then colorize: comments
                  .replace(/(\/\/[^\n]*)/g, '<span style="color:#475569;font-style:italic">$1</span>')
                  // Keywords
                  .replace(/\b(import|export|from|const|let|var|async|await|return|function|type|interface|class|new|if|else|throw|try|catch)\b/g, '<span style="color:#93c5fd">$1</span>')
                  // Boolean / null
                  .replace(/\b(true|false|null|undefined)\b/g, '<span style="color:#f472b6">$1</span>')
                  // Strings
                  .replace(/('[^']*'|"[^"]*")/g, '<span style="color:#86efac">$1</span>')
                  // Template literals
                  .replace(/(`[^`]*`)/g, '<span style="color:#86efac">$1</span>')
                  // Numbers
                  .replace(/\b(\d+)\b/g, '<span style="color:#fdba74">$1</span>')
              }} />
            </pre>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between px-6 py-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <button
            onClick={() => setCurrent(c => c - 1)}
            disabled={isFirst}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <ChevronLeft size={16} /> Anterior
          </button>

          {isLast ? (
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 0 20px rgba(16,185,129,0.4)',
              }}
            >
              <CheckCircle2 size={16} /> Entendi! Começar a Codar
            </button>
          ) : (
            <button
              onClick={() => setCurrent(c => c + 1)}
              className="flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold text-white transition-all"
              style={{
                background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                boxShadow: '0 0 20px rgba(14,165,233,0.4)',
              }}
            >
              Próximo <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
