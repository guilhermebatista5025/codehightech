"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, BrainCircuit } from "lucide-react";

export default function MentorChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Olá. Eu sou o Lucas, seu Mentor Técnico Sênior. Estou aqui para te guiar, mas não vou escrever código por você. Qual é o problema?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      
      setMessages([...newMessages, { role: 'assistant', content: data.reply || data.error }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Erro de conexão com o meu cérebro (API)." }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-transparent font-sans">
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-lg ${
              msg.role === 'user' 
                ? 'bg-primary/20 border-primary/50 text-primary shadow-[0_0_10px_rgba(14,165,233,0.3)]' 
                : 'bg-slate-800 border-slate-600 text-slate-300 shadow-[0_0_10px_rgba(255,255,255,0.05)]'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <BrainCircuit size={14} className="text-primary" />}
            </div>

            {/* Bubble */}
            <div className={`p-3 rounded-2xl text-xs leading-relaxed shadow-md border backdrop-blur-sm ${
              msg.role === 'user'
                ? 'bg-primary/10 border-primary/20 text-slate-200 rounded-tr-none'
                : 'bg-white/5 border-white/10 text-slate-300 rounded-tl-none'
            }`}>
              {msg.content}
            </div>

          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-[85%]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-slate-800 border border-slate-600 text-primary shadow-[0_0_10px_rgba(14,165,233,0.3)]">
              <BrainCircuit size={14} className="animate-pulse" />
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 rounded-tl-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-md">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Pergunte ao Sênior..."
            className="flex-1 bg-white/5 border border-white/10 text-slate-200 text-xs px-4 py-2.5 rounded-full outline-none focus:border-primary/50 focus:shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all placeholder:text-slate-500"
          />
          <button 
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(14,165,233,0.4)] hover:shadow-[0_0_20px_rgba(14,165,233,0.6)] shrink-0"
          >
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
