import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare,
  X,
  Send,
  Download,
  Sparkles,
  Loader2,
  Bot,
  User,
  ChevronDown,
  ArrowRight
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatService } from '../services/dataService';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'model',
      text: "Hello! 👋 We design and build robust, reliable, and production-grade web systems.\n\nWe focus on scalable architecture, secure backend data isolation, and pixel-perfect interactive frontends. How can we help you today?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const quickReplies = [
    { label: '💻 Capabilities', query: 'What are your core capabilities?' },
    { label: '📁 Show Systems', query: 'Show systems' },
    { label: '✉️ Get In Touch', query: 'Contact' },
    { label: '📅 Schedule Consultation', query: 'Schedule' }
  ];


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      // Map history for backend: [{"role": "user"|"model", "text": "..."}]
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const response = await chatService.sendMessage(text, history);

      setMessages(prev => [...prev, {
        role: 'model',
        text: response.text
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        text: "I apologize, but I ran into a connection issue. I'd love to chat more—please check that the backend is running, or feel free to reach out via the Contact Form!"
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputText);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-[360px] md:w-[400px] h-[550px] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-slate-900 font-bold text-sm leading-none">Silvora Labs AI Assistant</h3>
                    <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role !== 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                      <Bot className="w-3.5 h-3.5 text-cyan-600" />
                    </div>
                  )}
                  <div
                    className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm ${msg.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-md shadow-cyan-500/10'
                        : 'bg-slate-50 border border-slate-200 text-slate-700 rounded-tl-none'
                      }`}
                  >
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none text-slate-700">
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                    <Bot className="w-3.5 h-3.5 text-cyan-600" />
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-3 flex flex-wrap gap-2">
                {quickReplies.map((qr, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(qr.query)}
                    className="text-[11px] bg-white hover:bg-slate-50 text-slate-600 hover:text-cyan-600 border border-slate-200 hover:border-cyan-400 rounded-full px-3 py-1.5 transition-all cursor-pointer font-medium"
                  >
                    {qr.label}
                  </button>
                ))}
              </div>
            )}

            {/* Footer Input */}
            <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask us about our web systems capabilities..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 focus:border-cyan-500 rounded-full py-2.5 px-4 text-slate-900 text-sm outline-none transition-all placeholder-slate-400 disabled:opacity-50"
              />
              <button
                onClick={() => handleSendMessage(inputText)}
                disabled={isLoading || !inputText.trim()}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/35 hover:shadow-cyan-500/50 cursor-pointer border border-cyan-400/20 relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <MessageSquare className="w-6 h-6 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full border border-cyan-400/30 group-hover:scale-110 transition-transform duration-300"></span>
      </motion.button>
    </div>
  );
};

export default ChatWidget;
