"use client";

import { usePlayerStore } from '../store/usePlayerStore';
import { useGameStore } from '../store/useGameStore';
import { missions } from '../data/missions';
import { MessageSquare, TerminalSquare, BrainCircuit, CheckSquare, BookOpen, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import MentorChat from './MentorChat';
import MissionBriefModal from './MissionBriefModal';

export default function Sidebar() {
  const { profile, xp, loadState: loadPlayer } = usePlayerStore();
  const { currentPhase, loadState: loadGame } = useGameStore();
  const [activeTab, setActiveTab] = useState<'missao' | 'mentor'>('missao');
  const [showBrief, setShowBrief] = useState(false);

  useEffect(() => {
    loadPlayer(); // restaura XP e perfil
    loadGame();   // restaura fase atual ← esse estava faltando!
  }, [loadPlayer, loadGame]);

  const currentMission = missions.find(m => m.id === currentPhase) || missions[missions.length - 1];

  return (
    <>
      {/* Mission Brief Modal */}
      {showBrief && (
        <MissionBriefModal
          missionTitle={currentMission.title}
          steps={currentMission.briefing}
          onClose={() => setShowBrief(false)}
        />
      )}

      <div className="flex flex-col h-full bg-transparent overflow-hidden w-full font-sans">
        {/* Header Profile */}
        <div className="p-5 border-b border-white/5 bg-black/40 flex items-center gap-4 backdrop-blur-md relative">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary opacity-50"></div>
          <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary/50 flex items-center justify-center text-primary font-bold text-xl shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            {profile?.name?.charAt(0) || 'D'}
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-100 uppercase tracking-wide">{profile?.name || 'Dev'}</h2>
            <p className="text-xs text-primary font-semibold tracking-widest">{profile?.role || 'ESTAGIÁRIO'}</p>
          </div>
          <div className="ml-auto text-right">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">XP Total</p>
            <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-secondary to-teal-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{xp || 0}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5 bg-black/20">
          <button
            onClick={() => setActiveTab('missao')}
            className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'missao' ? 'text-white border-b-2 border-primary bg-primary/10 shadow-[inset_0_-20px_20px_-20px_rgba(14,165,233,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <TerminalSquare size={16} className={activeTab === 'missao' ? 'text-primary' : ''} /> Missões
          </button>
          <button
            onClick={() => setActiveTab('mentor')}
            className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${activeTab === 'mentor' ? 'text-white border-b-2 border-primary bg-primary/10 shadow-[inset_0_-20px_20px_-20px_rgba(14,165,233,0.3)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <BrainCircuit size={16} className={activeTab === 'mentor' ? 'text-primary' : ''} /> Lucas (IA)
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 bg-black/10">
          {activeTab === 'missao' ? (
            <div className="space-y-5">

              {/* Mission Card */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Fase {currentMission.id}</h3>
                <div className="bg-white/5 p-5 rounded-xl border border-white/10 relative overflow-hidden backdrop-blur-sm group hover:border-primary/30 transition-colors">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-transparent group-hover:shadow-[0_0_10px_rgba(14,165,233,0.8)] transition-all"></div>
                  <h4 className="text-sm font-bold text-white mb-2 text-gradient">{currentMission.title}</h4>
                  <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                    {currentMission.description}
                  </p>

                  {/* Mission Brief Button */}
                  <button
                    onClick={() => setShowBrief(true)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest mb-4 transition-all hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, rgba(14,165,233,0.15), rgba(14,165,233,0.05))',
                      border: '1px solid rgba(14,165,233,0.3)',
                      color: '#38bdf8',
                      boxShadow: '0 0 15px rgba(14,165,233,0.1)',
                    }}
                  >
                    <BookOpen size={14} />
                    Ver Briefing da Missão
                    <Zap size={12} className="opacity-60" />
                  </button>

                  <h5 className="text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-wider">Requisitos do PR:</h5>
                  <ul className="space-y-2">
                    {currentMission.objectives.map((obj, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-3 bg-black/20 p-2 rounded-md border border-white/5">
                        <CheckSquare size={14} className="text-primary mt-0.5 shrink-0 drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]" />
                        <span className="leading-snug">{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* NPC Messages */}
              <div>
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <MessageSquare size={14} /> Inbox da Equipe
                </h3>
                <div className="space-y-4">
                  {currentMission.npcMessages.map((msg, i) => (
                    <div key={i} className="flex gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-${msg.type}/20 text-${msg.type} border border-${msg.type}/30`}>
                        {msg.npc}
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl rounded-tl-none text-xs text-slate-200 border border-white/5 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full bg-${msg.type}`}></div>
                        <span className={`font-bold text-${msg.type} block mb-1 uppercase tracking-wider text-[10px]`}>{msg.role}</span>
                        <p className="leading-relaxed">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full">
              <MentorChat />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
