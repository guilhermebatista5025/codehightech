import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        reply: "[MOCK MODE] Variável GEMINI_API_KEY não configurada no seu arquivo .env.local. Não posso te ajudar com inteligência real até a API estar conectada." 
      });
    }

    // Carrega o prompt base que definimos no GDD e na doc
    let systemInstruction = "Você é um mentor técnico sênior rigoroso. Nunca dê código pronto. Faça perguntas socráticas. Foque em engenharia de software real.";
    try {
      const promptPath = path.join(process.cwd(), '../../docs/AI_MENTOR_PROMPT.md');
      systemInstruction = fs.readFileSync(promptPath, 'utf8');
    } catch (e) {
      console.error("Prompt de instrução não encontrado, usando fallback.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemInstruction 
    });

    // O Gemini exige que a primeira mensagem do histórico seja sempre do 'user'.
    // Removemos o greeting inicial da IA do histórico se for a primeira.
    let filteredMessages = messages.slice(0, -1);
    if (filteredMessages.length > 0 && filteredMessages[0].role !== 'user') {
      filteredMessages = filteredMessages.slice(1);
    }

    const history = filteredMessages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(lastMessage);
    const reply = result.response.text();

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Erro no endpoint do chat:", error);
    return NextResponse.json({ error: "Falha na comunicação com a IA: " + error.message }, { status: 500 });
  }
}
