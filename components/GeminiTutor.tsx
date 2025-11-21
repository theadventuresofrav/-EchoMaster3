// FIX: Complete the component implementation and add a default export.
import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { geminiService } from '../services/geminiService';
import type { ChatMessage } from '../types';

interface GeminiTutorProps {
  topicTitle: string;
}

// A simple markdown renderer that handles bold, italics, inline code, and lists.
const SimpleMarkdown: React.FC<{ text: string }> = ({ text }) => {
    // Escape HTML to prevent XSS, then apply formatting
    const escapedText = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    const styledText = escapedText
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-primary-black/50 border border-rich-gold/30 text-rich-gold rounded px-1.5 py-0.5 font-mono text-sm">$1</code>');

    const lines = styledText.split('\n');
    let html = '';
    let inList = false;

    lines.forEach(line => {
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            if (!inList) {
                html += '<ul class="list-disc pl-5 space-y-1">';
                inList = true;
            }
            html += `<li>${line.trim().substring(2)}</li>`;
        } else {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            if (line.trim()) { // Avoid creating empty <p> tags
                html += `<p>${line}</p>`;
            }
        }
    });

    if (inList) {
        html += '</ul>';
    }

    return <div className="prose prose-sm max-w-none prose-invert text-[var(--color-text-muted)]" dangerouslySetInnerHTML={{ __html: html }} />;
};

const GeminiTutor: React.FC<GeminiTutorProps> = ({ topicTitle }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatInstanceRef = useRef<Chat | { sendMessage: (message: string, history: ChatMessage[]) => Promise<string> } | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatInstanceRef.current = geminiService.chatManager.startChat(topicTitle);
        setMessages([
            { role: 'model', content: `Hello! I'm Echo, your AI tutor. Ask me anything about **${topicTitle}**.` }
        ]);
        setInput('');
    }, [topicTitle]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chatInstanceRef.current) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        const currentInput = input;
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        
        try {
            let responseText = '';
            // The return type of startChat is different for mock and real.
            // A simple check on sendMessage's length property can differentiate them.
            // Real: sendMessage({message: string}) -> 1 argument
            // Mock: sendMessage(message: string, history: ChatMessage[]) -> 2 arguments
            if (chatInstanceRef.current.sendMessage.length > 1) { // This is the mock
                const mockChat = chatInstanceRef.current as { sendMessage: (message: string, history: ChatMessage[]) => Promise<string> };
                responseText = await mockChat.sendMessage(currentInput, messages);
            } else { // This is the real Chat object
                const chat = chatInstanceRef.current as Chat;
                const response = await chat.sendMessage({ message: currentInput });
                responseText = response.text;
            }

            const modelMessage: ChatMessage = { role: 'model', content: responseText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error communicating with Gemini Tutor:", error);
            const errorMessage: ChatMessage = { role: 'model', content: "I'm sorry, I seem to be having trouble connecting. Please try again in a moment." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className="bg-[var(--color-bg-surface)] bg-opacity-60 border border-[var(--color-border-base)] rounded-2xl shadow-lg backdrop-blur-md p-4 sm:p-6"
            style={{ boxShadow: `0 8px 30px var(--color-primary-accent-glow)` }}
        >
            <h2 className="font-serif text-3xl font-bold mb-4 text-[var(--color-text-heading)]">Ask Echo, your AI Tutor</h2>
            
            <div className="h-80 bg-primary-black/30 rounded-lg p-4 overflow-y-auto flex flex-col space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${msg.role === 'user' ? 'bg-[var(--color-primary-accent)] text-black' : 'bg-[var(--color-bg-surface-light)] text-[var(--color-text-base)]'}`}>
                           {msg.role === 'model' ? <SimpleMarkdown text={msg.content} /> : <p>{msg.content}</p>}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="max-w-lg p-3 rounded-lg bg-[var(--color-bg-surface-light)]">
                            <div className="flex items-center space-x-2">
                                <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-pulse-fast"></span>
                                <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-pulse-fast" style={{animationDelay: '0.2s'}}></span>
                                <span className="w-2 h-2 bg-[var(--color-text-muted)] rounded-full animate-pulse-fast" style={{animationDelay: '0.4s'}}></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="mt-4 flex items-center space-x-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={`Ask about ${topicTitle}...`}
                    disabled={isLoading}
                    className="flex-grow bg-primary-black/50 border border-rich-gold/30 rounded-full px-4 py-2 text-sm text-pure-white placeholder:text-silver focus:outline-none focus:ring-2 focus:ring-rich-gold"
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2.5 rounded-full bg-[var(--color-primary-accent)] text-black disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-opacity-90 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default GeminiTutor;
