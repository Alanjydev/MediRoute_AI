import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { startConsultation, clarifyConsultation } from '../services/api';
import EmergencyCard from './EmergencyCard';
import DoctorCard from './DoctorCard';

const Chat = ({ coordinates, locationError, manualCity }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hello! I am your AI Healthcare Navigation Assistant. Please describe your symptoms in detail so I can guide you to the right medical specialist.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isClarifying, setIsClarifying] = useState(false);
  const [initialSymptoms, setInitialSymptoms] = useState('');
  const [hasEnded, setHasEnded] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, hospitals, doctors]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading || hasEnded) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      // Prioritize manual city if provided, otherwise use coordinates. If neither, pass null.
      let response;

      if (!isClarifying) {
        setInitialSymptoms(userMessage);
        response = await startConsultation(userMessage, manualCity || null, coordinates);
      } else {
        response = await clarifyConsultation(initialSymptoms, userMessage, manualCity || null, coordinates);
      }

      if (response.more_info_needed) {
        setIsClarifying(true);
        const questions = response.follow_up_questions.join('\n- ');
        setMessages(prev => [...prev, { role: 'ai', content: `Could you please provide a bit more information?\n- ${questions}` }]);
      } else if (response.is_emergency) {
        setIsEmergency(true);
        setHospitals(response.doctor_list || []);
        setHasEnded(true);
      } else {
        setDoctors(response.doctor_list || []);
        setMessages(prev => [...prev, { role: 'ai', content: response.ai_response }]);
        setHasEnded(true);
      }

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: 'I encountered an error connecting to the service. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto w-full glass rounded-3xl shadow-2xl overflow-hidden border border-white/40">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-600 to-accent-600 p-5 text-white shadow-md z-10 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white/10 mix-blend-overlay"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-sm shadow-inner">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h2 className="font-bold text-xl drop-shadow-md">AI Navigation Assistant</h2>
            <p className="text-brand-100 text-xs font-semibold uppercase tracking-wider">Intelligent Guidance</p>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="relative z-10 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm transition-all hover:scale-105 active:scale-95 shadow-sm">
          Restart
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 chat-scroll bg-slate-50/50 backdrop-blur-xl">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fade-in-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-md ${msg.role === 'user' ? 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-700' : 'bg-gradient-to-br from-brand-400 to-brand-600 text-white'}`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.role === 'user' ? 'bg-gradient-to-br from-brand-600 to-brand-700 text-white rounded-tr-sm shadow-brand-500/20' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-sm shadow-slate-200/50'}`}>
              <div className="whitespace-pre-wrap leading-relaxed font-medium">{msg.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 animate-fade-in-up">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-5 h-5" />
            </div>
            <div className="glass border border-slate-100 rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-3 text-brand-700 font-medium">
              <Loader2 className="w-5 h-5 animate-spin text-brand-600" />
              <span>Analyzing symptoms & ranking doctors...</span>
            </div>
          </div>
        )}

        {isEmergency && <EmergencyCard hospitals={hospitals} />}
        
        {doctors.length > 0 && !isEmergency && (
          <div className="animate-fade-in-up mt-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6 px-2 flex items-center gap-2">
              <span className="bg-brand-100 text-brand-700 p-1.5 rounded-lg"><Sparkles className="w-5 h-5" /></span>
              Top Ranked Specialists 
              {manualCity ? ` in ${manualCity}` : " Near You"}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {doctors.map((doctor, index) => (
                <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 0.15}s` }}>
                   <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-5 bg-white/80 backdrop-blur-md border-t border-white/40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)]">
        <form onSubmit={handleSend} className="relative flex items-center max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || hasEnded}
            placeholder={hasEnded ? "Consultation ended. Restart to begin again." : "Describe your symptoms..."}
            className="w-full pl-6 pr-16 py-4 bg-slate-100/80 border border-slate-200 rounded-full focus:bg-white focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-slate-700 shadow-inner"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || hasEnded}
            className="absolute right-2 p-3 bg-gradient-to-r from-brand-600 to-accent-600 text-white rounded-full hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
