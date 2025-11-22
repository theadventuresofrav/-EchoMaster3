import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../../services/geminiService';
import { PencilIcon, TrashIcon, CheckCircleIcon, EyeIcon } from '../icons';

const WORDS = [
    "Transducer", "Kidney", "Liver", "Gallbladder", "Aorta", 
    "Wave", "Shadowing", "Cyst", "Heart", "Monitor"
];

const PictionaryGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [targetWord, setTargetWord] = useState('');
    const [guessResult, setGuessResult] = useState('');
    const [isDrawing, setIsDrawing] = useState(false);
    const [isGuessing, setIsGuessing] = useState(false);
    const [activeTool, setActiveTool] = useState<'pen' | 'eraser'>('pen');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);

    useEffect(() => {
        startNewRound();
    }, []);

    const startNewRound = () => {
        const word = WORDS[Math.floor(Math.random() * WORDS.length)];
        setTargetWord(word);
        setGuessResult('');
        clearCanvas();
        setActiveTool('pen');
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        // Set up high DPI canvas
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.scale(dpr, dpr);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.strokeStyle = '#38bdf8'; // Sky blue neon default
            ctx.lineWidth = 4;
            ctx.shadowBlur = 2;
            ctx.shadowColor = '#38bdf8';
            contextRef.current = ctx;
        }
    }, []);

    useEffect(() => {
        if (contextRef.current) {
            if (activeTool === 'pen') {
                contextRef.current.globalCompositeOperation = 'source-over';
                contextRef.current.strokeStyle = '#38bdf8';
                contextRef.current.lineWidth = 4;
                contextRef.current.shadowBlur = 4;
            } else {
                // Eraser mode essentially
                contextRef.current.globalCompositeOperation = 'destination-out';
                contextRef.current.lineWidth = 20;
                contextRef.current.shadowBlur = 0;
            }
        }
    }, [activeTool]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = contextRef.current;
        if (canvas && ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const startDrawing = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        const { offsetX, offsetY } = getCoordinates(nativeEvent);
        contextRef.current?.beginPath();
        contextRef.current?.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = getCoordinates(nativeEvent);
        contextRef.current?.lineTo(offsetX, offsetY);
        contextRef.current?.stroke();
    };

    const stopDrawing = () => {
        contextRef.current?.closePath();
        setIsDrawing(false);
    };

    const getCoordinates = (event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { offsetX: 0, offsetY: 0 };
        
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;

        if ('touches' in event) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        } else {
            clientX = (event as React.MouseEvent).clientX;
            clientY = (event as React.MouseEvent).clientY;
        }

        return {
            offsetX: clientX - rect.left,
            offsetY: clientY - rect.top
        };
    };

    const handleGuess = async () => {
        if (!canvasRef.current) return;
        setIsGuessing(true);
        setGuessResult('');
        
        try {
            const imageBase64 = canvasRef.current.toDataURL('image/png');
            const response = await geminiService.guessDrawing(imageBase64, targetWord);
            setGuessResult(response);
        } catch (error) {
            setGuessResult("Error connecting to AI.");
        } finally {
            setIsGuessing(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-4 animate-section-enter">
            {/* Header */}
            <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <button onClick={onExit} className="text-sm text-[var(--color-text-muted)] hover:text-white flex items-center gap-2 group self-start sm:self-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Exit
                </button>
                
                <div className="flex items-center gap-4 bg-gray-800/50 px-6 py-2 rounded-full border border-white/10">
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest font-bold">Subject:</p>
                    <h2 className="text-2xl font-black text-[var(--color-primary-accent)] tracking-wide">{targetWord}</h2>
                </div>

                 <button onClick={startNewRound} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary-accent)] border-b border-transparent hover:border-[var(--color-primary-accent)] transition-colors self-end sm:self-auto">
                    Skip Word
                </button>
            </div>

            {/* Drawing Area */}
            <div className="relative w-full max-w-3xl aspect-[4/3] bg-[#1a1a1a] rounded-2xl border-[3px] border-gray-700 shadow-2xl mb-8 touch-none overflow-hidden group">
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#555 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                
                <canvas
                    ref={canvasRef}
                    className={`w-full h-full relative z-10 ${activeTool === 'pen' ? 'cursor-crosshair' : 'cursor-cell'}`}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                />

                {/* Floating Toolbar */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 shadow-lg">
                    <button 
                        onClick={() => setActiveTool('pen')}
                        className={`p-2 rounded-md transition-all ${activeTool === 'pen' ? 'bg-[var(--color-primary-accent)] text-black' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        title="Pen Tool"
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button 
                        onClick={() => setActiveTool('eraser')}
                        className={`p-2 rounded-md transition-all ${activeTool === 'eraser' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                        title="Eraser"
                    >
                       <div className="w-5 h-5 border-2 border-current rounded-sm transform rotate-45"></div>
                    </button>
                     <button 
                        onClick={clearCanvas}
                        className="p-2 rounded-md text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-colors border-t border-white/10 mt-1"
                        title="Clear All"
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
                
                {/* AI Guessing Overlay */}
                {isGuessing && (
                    <div className="absolute inset-0 bg-black/80 z-30 flex flex-col items-center justify-center backdrop-blur-sm">
                         {/* Scanning Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-primary-accent)]/20 to-transparent h-[20%] w-full animate-[scan_2s_linear_infinite]"></div>
                        <style>{`@keyframes scan { 0% { top: -20%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }`}</style>

                        <div className="w-20 h-20 relative mb-6">
                            <div className="absolute inset-0 border-4 border-white/10 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-[var(--color-primary-accent)] border-t-transparent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <EyeIcon className="w-8 h-8 text-[var(--color-primary-accent)] animate-pulse" />
                            </div>
                        </div>
                        <p className="text-white font-bold text-xl tracking-widest animate-pulse">ANALYZING...</p>
                    </div>
                )}
            </div>

            {/* Controls & Feedback */}
            <div className="w-full max-w-3xl flex flex-col items-center gap-6">
                {guessResult && (
                    <div className={`w-full p-6 rounded-xl border-2 animate-pop-in shadow-lg flex items-center gap-4 ${
                        guessResult.startsWith("CORRECT") 
                        ? 'bg-green-900/20 border-green-500 text-green-100' 
                        : 'bg-blue-900/20 border-blue-500 text-blue-100'
                    }`}>
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                             guessResult.startsWith("CORRECT") ? 'bg-green-500 text-black' : 'bg-blue-500 text-white'
                        }`}>
                             {guessResult.startsWith("CORRECT") ? <CheckCircleIcon className="w-7 h-7" /> : <EyeIcon className="w-7 h-7" />}
                        </div>
                        <div className="flex-grow text-left">
                            <h4 className="font-bold text-sm uppercase tracking-wider opacity-70 mb-1">
                                {guessResult.startsWith("CORRECT") ? "Target Identified!" : "AI Analysis"}
                            </h4>
                            <p className="text-lg md:text-xl font-medium leading-tight">{guessResult}</p>
                        </div>
                        {guessResult.startsWith("CORRECT") && (
                             <button onClick={startNewRound} className="px-4 py-2 bg-green-500 text-black font-bold rounded-lg hover:bg-green-400 transition-colors shadow-lg">
                                 Next Round
                             </button>
                        )}
                    </div>
                )}
                
                <button
                    onClick={handleGuess}
                    disabled={isGuessing}
                    className={`
                        relative overflow-hidden group px-10 py-4 rounded-full font-black text-lg tracking-widest transition-all shadow-2xl
                        ${isGuessing 
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                            : 'bg-[var(--color-primary-accent)] text-black hover:scale-105 hover:shadow-[0_0_40px_var(--color-primary-accent-glow)]'
                        }
                    `}
                >
                    <span className="relative z-10 flex items-center gap-3">
                        {isGuessing ? "THINKING..." : "SUBMIT DRAWING"}
                    </span>
                    {!isGuessing && <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
                </button>
            </div>
        </div>
    );
};

export default PictionaryGame;