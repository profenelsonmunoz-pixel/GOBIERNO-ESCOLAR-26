
import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, MessageSquare, PenTool, Mic, Send, CheckCircle2 
} from '../constants';
import { Message, CampaignData } from '../types';
import { 
  generateAIResponse, 
  generateCampaignStrategy, 
  generateDebateAnalysis 
} from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [activeAiTab, setActiveAiTab] = useState<'chat' | 'campaign' | 'debate'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: '👋 ¡Hola! Soy el Asistente Democrático de la IENSECAN. Pregúntame sobre fechas, funciones de los cargos o cómo participar.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [campaignData, setCampaignData] = useState<CampaignData>({ name: '', role: 'Personero', focus: '' });
  const [generatedCampaign, setGeneratedCampaign] = useState<string | null>(null);

  const [debateTopic, setDebateTopic] = useState('');
  const [debateResult, setDebateResult] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await generateAIResponse(input);
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setIsLoading(false);
  };

  const handleCampaignGenerate = async () => {
    if (!campaignData.name || !campaignData.focus || isLoading) return;
    setIsLoading(true);
    const result = await generateCampaignStrategy(campaignData.name, campaignData.role, campaignData.focus);
    setGeneratedCampaign(result);
    setIsLoading(false);
  };

  const handleDebateGenerate = async () => {
    if (!debateTopic || isLoading) return;
    setIsLoading(true);
    const result = await generateDebateAnalysis(debateTopic);
    setDebateResult(result);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-[#1E3A8A] px-4 py-1.5 rounded-full border border-blue-100">
          <Sparkles size={18} className="text-[#F59E0B]" />
          <span className="font-bold text-xs tracking-widest uppercase">Inteligencia Artificial IENSECAN</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#1E3A8A]">¿En qué te puedo ayudar hoy?</h2>
        <p className="text-slate-500 max-w-xl mx-auto">Potencia tu liderazgo estudiantil con nuestras herramientas inteligentes diseñadas para la democracia escolar.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row min-h-[550px]">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 bg-slate-50 border-r border-slate-100 p-4 space-y-2">
           <button 
             onClick={() => setActiveAiTab('chat')}
             className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeAiTab === 'chat' ? 'bg-[#1E3A8A] text-white shadow-lg shadow-blue-900/20' : 'text-slate-600 hover:bg-white'}`}
           >
             <MessageSquare size={20} /> Asistente 24/7
           </button>
           <button 
             onClick={() => setActiveAiTab('campaign')}
             className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeAiTab === 'campaign' ? 'bg-[#F59E0B] text-[#1E3A8A] shadow-lg shadow-yellow-600/20' : 'text-slate-600 hover:bg-white'}`}
           >
             <PenTool size={20} /> Estrategia Campaña
           </button>
           <button 
             onClick={() => setActiveAiTab('debate')}
             className={`w-full flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${activeAiTab === 'debate' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'text-slate-600 hover:bg-white'}`}
           >
             <Mic size={20} /> Entrenador Debate
           </button>
           
           <div className="mt-auto pt-8 px-4 hidden md:block">
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
               Uso Pedagógico.<br/>Powered by Google Gemini.
             </p>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative bg-white overflow-hidden">
          {activeAiTab === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-5 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#1E3A8A] text-white rounded-tr-none' 
                        : msg.role === 'system' 
                        ? 'bg-blue-50 text-[#1E3A8A] border border-blue-100 text-center w-full font-medium' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-50 px-4 py-2 rounded-2xl rounded-tl-none border border-slate-100 flex items-center gap-2 text-slate-400 text-xs italic">
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      Analizando...
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleChatSubmit} className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <input 
                  type="text" 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  placeholder="Ej: ¿Cuáles son las funciones del personero?" 
                  className="flex-1 px-6 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:border-[#1E3A8A] focus:ring-2 focus:ring-[#1E3A8A]/10 bg-white text-sm"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()} 
                  className="w-12 h-12 bg-[#1E3A8A] text-white rounded-2xl flex items-center justify-center hover:bg-blue-800 disabled:opacity-50 transition-all shadow-md active:scale-95"
                >
                  <Send size={20} />
                </button>
              </form>
            </>
          )}

          {activeAiTab === 'campaign' && (
            <div className="p-8 overflow-y-auto no-scrollbar">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center space-y-2 mb-4">
                  <h3 className="font-black text-xl text-[#1E3A8A]">Crea tu Estrategia</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Generador de Propuestas</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Tu Nombre Completo</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F59E0B] focus:outline-none text-sm transition-all" 
                      placeholder="Ej: Juan Pérez" 
                      value={campaignData.name} 
                      onChange={e => setCampaignData({...campaignData, name: e.target.value})} 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Cargo de Elección</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F59E0B] focus:outline-none text-sm appearance-none transition-all"
                      value={campaignData.role}
                      onChange={e => setCampaignData({...campaignData, role: e.target.value})}
                    >
                      <option value="Personero">Personero (Grado 11°)</option>
                      <option value="Contralor">Contralor (Grado 10°)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Enfoque de Campaña</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#F59E0B] focus:outline-none text-sm transition-all" 
                      placeholder="Ej: Deportes, Medio Ambiente, Bienestar..." 
                      value={campaignData.focus} 
                      onChange={e => setCampaignData({...campaignData, focus: e.target.value})} 
                    />
                  </div>
                  <button 
                    onClick={handleCampaignGenerate} 
                    disabled={isLoading || !campaignData.focus || !campaignData.name} 
                    className="w-full bg-[#F59E0B] text-[#1E3A8A] font-black py-4 rounded-xl hover:bg-yellow-400 shadow-xl shadow-yellow-600/20 flex justify-center items-center gap-2 disabled:opacity-50 text-sm transition-all active:scale-95 mt-4"
                  >
                    {isLoading ? "PROCESANDO..." : <><Sparkles size={18}/> GENERAR CAMPAÑA</>}
                  </button>
                </div>
                {generatedCampaign && (
                  <div className="mt-10 p-6 bg-yellow-50 rounded-3xl border border-yellow-100 animate-in slide-in-from-bottom-4 duration-500">
                    <h4 className="font-black text-[#B45309] mb-4 text-xs uppercase flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-600" /> Estrategia Propuesta:
                    </h4>
                    <div className="prose prose-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                      {generatedCampaign}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeAiTab === 'debate' && (
            <div className="p-8 overflow-y-auto no-scrollbar">
              <div className="max-w-md mx-auto space-y-6">
                <div className="text-center space-y-2 mb-4">
                  <h3 className="font-black text-xl text-purple-800">Entrenador de Debate</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Prepárate para defender tus ideas</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1 ml-1">Propuesta o Tema Polémico</label>
                    <textarea 
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:outline-none text-sm transition-all resize-none" 
                      placeholder="Ej: Implementar buzón de quejas digital para todos los grados..." 
                      value={debateTopic} 
                      onChange={e => setDebateTopic(e.target.value)} 
                    />
                  </div>
                  <button 
                    onClick={handleDebateGenerate} 
                    disabled={isLoading || !debateTopic} 
                    className="w-full bg-purple-600 text-white font-black py-4 rounded-xl hover:bg-purple-700 shadow-xl shadow-purple-600/20 flex justify-center items-center gap-2 disabled:opacity-50 text-sm transition-all active:scale-95"
                  >
                    {isLoading ? "ANALIZANDO..." : <><Mic size={18}/> PREPARAR ARGUMENTOS</>}
                  </button>
                </div>
                {debateResult && (
                  <div className="mt-10 p-6 bg-purple-50 rounded-3xl border border-purple-100 animate-in slide-in-from-bottom-4 duration-500">
                    <h4 className="font-black text-purple-800 mb-4 text-xs uppercase flex items-center gap-2">
                      <CheckCircle2 size={16} /> Análisis del Entrenador:
                    </h4>
                    <div className="prose prose-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                      {debateResult}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
