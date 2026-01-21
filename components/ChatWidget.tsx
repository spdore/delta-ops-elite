
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, Send, X, Terminal, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';

// Typewriter effect component for terminal style output
const Typewriter = ({ text, onComplete, shouldAnimate }: { text: string; onComplete?: () => void; shouldAnimate: boolean }) => {
  const [display, setDisplay] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset if window is closed
    if (!shouldAnimate) {
        setDisplay('');
        setIsTyping(false);
        return;
    }

    // Start typing animation
    setIsTyping(true);
    setDisplay(''); // Ensure we start from scratch
    
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplay(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        if (onComplete) onComplete();
      }
    }, 20); // Fast typing speed

    return () => clearInterval(timer);
  }, [shouldAnimate, text]); // Re-run when opened or text changes

  return (
    <span>
      {display}
      {isTyping && <span className="animate-pulse text-delta-green">_</span>}
    </span>
  );
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '> SYSTEM READY.\n> CONNECTED TO TACTICAL SUPPORT.\n> WAITING FOR INPUT...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Memoize scrollToBottom to prevent unnecessary effect triggers in children
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
        // Slight delay to allow layout to settle before scrolling
        setTimeout(scrollToBottom, 100);
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [messages, isOpen, scrollToBottom]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', text: `> ${userMessage}` }]);
    setIsLoading(true);

    // Simulate network delay then response
    setTimeout(() => {
        setIsLoading(false);
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "> 系统调试中... [SYSTEM DEBUGGING]\n> PLEASE TRY AGAIN LATER." 
        }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Backdrop Blur Overlay */}
      <div 
        className={`fixed inset-0 z-[55] bg-black/40 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="fixed bottom-28 md:bottom-8 right-4 md:right-8 z-[60] font-mono flex flex-col items-end">
        {/* Launcher Button */}
        <div className={`transition-all duration-300 ${isOpen ? 'opacity-0 scale-75 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
          <button 
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-black border border-delta-green/50 hover:bg-delta-green transition-all duration-300 shadow-[0_0_20px_rgba(0,255,157,0.2)]"
          >
            <div className="absolute inset-0 bg-delta-green/20 animate-ping rounded-sm"></div>
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-delta-green group-hover:text-black transition-colors" />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-delta-green"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-delta-green"></div>
          </button>
        </div>

        {/* Chat Window - Kept mounted but hidden to preserve Typewriter state */}
        <div className={`transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none absolute'}`}>
          <div className="w-[90vw] md:w-[400px] bg-[#050505] border border-delta-green/30 shadow-[0_0_50px_rgba(0,255,148,0.1)] flex flex-col h-[60vh] md:h-[500px]">
            
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-50 opacity-20"></div>

            {/* Header */}
            <div className="bg-delta-green/10 p-3 border-b border-delta-green/20 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-delta-green animate-pulse"></div>
                  <span className="text-delta-green text-xs font-bold tracking-widest">CMD_LINE_INTERFACE</span>
              </div>
              <div className="flex space-x-2">
                  <Minimize2 className="w-4 h-4 text-gray-500 hover:text-white cursor-pointer" onClick={() => setIsOpen(false)} />
                  <X className="w-4 h-4 text-gray-500 hover:text-red-500 cursor-pointer" onClick={() => setIsOpen(false)} />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin font-mono text-xs md:text-sm">
              {messages.map((msg, idx) => (
                <div key={idx} className={`${msg.role === 'user' ? 'text-white' : 'text-delta-green'}`}>
                  <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString('en-US', {hour12: false, hour:'2-digit', minute:'2-digit'})}]</span>
                  <span className="whitespace-pre-wrap leading-relaxed">
                    {msg.role === 'model' ? (
                      <Typewriter text={msg.text} onComplete={scrollToBottom} shouldAnimate={isOpen} />
                    ) : (
                      msg.text
                    )}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="text-delta-green animate-pulse">
                  > PROCESSING...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-black border-t border-delta-green/20">
              <div className="flex items-center bg-gray-900/50 border border-gray-800 focus-within:border-delta-green/50 transition-colors px-3 py-2">
                <span className="text-delta-green mr-2">{'>'}</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="flex-1 bg-transparent text-white text-sm focus:outline-none font-mono placeholder-gray-700"
                  placeholder="ENTER_COMMAND..."
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="text-gray-500 hover:text-delta-green transition-colors disabled:opacity-30"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;
