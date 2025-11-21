
import React, { useState, useEffect, useRef } from 'react';
import { LockClosedIcon, InstrumentationIcon, ArtifactsIcon, BioeffectsIcon } from '../icons';

const INITIAL_TIME = 300; // 5 minutes

const ESCAPE_ROOM_DATA = [
    {
        id: 1,
        title: "SECURITY CHECKPOINT ALPHA",
        type: "KEYPAD",
        icon: LockClosedIcon,
        logs: [
            "SYSTEM ALERT: LAB LOCKDOWN INITIATED.",
            "BIOMETRIC SCANNER: DISABLED.",
            "MANUAL OVERRIDE REQUIRED."
        ],
        riddle: "CALCULATE WAVELENGTH (mm)\nFREQUENCY: 5 MHz\nMEDIUM: SOFT TISSUE (1.54 mm/µs)",
        hint: "Formula: λ = Propagation Speed / Frequency",
        answer: "0.308", // Accepts 0.31, .308
        successMsg: "OVERRIDE SUCCESSFUL. DOOR UNLOCKED."
    },
    {
        id: 2,
        title: "MAIN CONTROL CONSOLE",
        type: "TERMINAL",
        icon: InstrumentationIcon,
        logs: [
            "CONNECTING TO IMAGING SERVER...",
            "ERROR: SIGNAL ATTENUATION DETECTED.",
            "DEEP STRUCTURES NOT VISIBLE."
        ],
        riddle: "INPUT RECEIVER FUNCTION TO COMPENSATE FOR DEPTH ATTENUATION:",
        hint: "Acronym: Time Gain Compensation",
        answer: "TGC",
        successMsg: "SIGNAL AMPLIFIED. IMAGE RESTORED."
    },
    {
        id: 3,
        title: "IMAGE ANALYSIS SECTOR",
        type: "DIAGNOSTIC",
        icon: ArtifactsIcon,
        logs: [
            "SCANNING LIVER MODULE...",
            "ANOMALY DETECTED: DUPLICATE STRUCTURE DEEP TO DIAPHRAGM.",
            "IDENTIFY ARTIFACT SIGNATURE."
        ],
        riddle: "IDENTIFY THE ARTIFACT:",
        hint: "Commonly seen with strong reflectors like the diaphragm.",
        answer: "MIRROR IMAGE",
        successMsg: "ARTIFACT ISOLATED. DIAGNOSTIC CLEAR."
    },
    {
        id: 4,
        title: "BIO-SAFETY AIRLOCK",
        type: "SECURITY",
        icon: BioeffectsIcon,
        logs: [
            "FINAL EXIT GATE LOCKED.",
            "VOICE RECOGNITION ACTIVE.",
            "SAFETY PROTOCOL VERIFICATION REQUIRED."
        ],
        riddle: "STATE THE GOLDEN RULE OF ULTRASOUND SAFETY:",
        hint: "As Low As Reasonably Achievable.",
        answer: "ALARA",
        successMsg: "PROTOCOL VERIFIED. LOCKDOWN LIFTED."
    }
];

const TypewriterText: React.FC<{ text: string; delay?: number }> = ({ text, delay = 20 }) => {
    const [displayed, setDisplayed] = useState('');
    
    useEffect(() => {
        let i = 0;
        setDisplayed('');
        const timer = setInterval(() => {
            setDisplayed(text.substring(0, i + 1));
            i++;
            if (i === text.length) clearInterval(timer);
        }, delay);
        return () => clearInterval(timer);
    }, [text, delay]);

    return <span>{displayed}</span>;
};

const EscapeRoomGame: React.FC<{ onExit: () => void }> = ({ onExit }) => {
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start');
    const [currentStage, setCurrentStage] = useState(0);
    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [input, setInput] = useState('');
    const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
    const [showHint, setShowHint] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const stage = ESCAPE_ROOM_DATA[currentStage];
    const StageIcon = stage.icon;

    // Timer Logic
    useEffect(() => {
        if (gameState !== 'playing') return;
        
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('lost');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState]);

    // Focus input on stage change
    useEffect(() => {
        if (gameState === 'playing') {
            inputRef.current?.focus();
        }
    }, [currentStage, gameState]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (status !== 'idle') return;

        const userAnswer = input.trim().toUpperCase();
        const validAnswers = [stage.answer.toUpperCase()];
        
        // Specific variations
        if (currentStage === 0) { validAnswers.push("0.31", ".308"); }
        if (currentStage === 1) { validAnswers.push("TIME GAIN COMPENSATION"); }

        if (validAnswers.includes(userAnswer)) {
            setStatus('success');
            setTimeout(() => {
                if (currentStage < ESCAPE_ROOM_DATA.length - 1) {
                    setCurrentStage(prev => prev + 1);
                    setInput('');
                    setStatus('idle');
                    setShowHint(false);
                } else {
                    setGameState('won');
                }
            }, 2000);
        } else {
            setStatus('error');
            // Penalty for wrong answer?
            setTimeLeft(prev => Math.max(0, prev - 10));
            setTimeout(() => setStatus('idle'), 1000);
        }
    };

    const renderScreenContent = () => {
        if (gameState === 'start') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-section-enter">
                    <div className="w-20 h-20 border-4 border-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <LockClosedIcon className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-mono font-bold text-red-500 tracking-widest">LAB LOCKDOWN</h1>
                    <p className="text-green-400 font-mono max-w-md">
                        SYSTEM FAILURE DETECTED.<br/>
                        EMERGENCY PROTOCOLS ENGAGED.<br/>
                        RESOLVE PHYSICS ANOMALIES TO ESCAPE.
                    </p>
                    <button 
                        onClick={() => setGameState('playing')}
                        className="px-8 py-3 bg-red-900/30 border border-red-500 text-red-400 font-mono hover:bg-red-500 hover:text-black transition-all uppercase tracking-wider"
                    >
                        INITIATE OVERRIDE
                    </button>
                </div>
            );
        }

        if (gameState === 'won') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-pop-in">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center border-4 border-green-500">
                        <LockClosedIcon className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-4xl font-mono font-bold text-green-400">ACCESS GRANTED</h2>
                    <p className="text-white font-mono">LABORATORY SYSTEMS RESTORED.<br/>TIME REMAINING: {formatTime(timeLeft)}</p>
                    <button onClick={onExit} className="px-8 py-3 bg-green-900/30 border border-green-500 text-green-400 font-mono hover:bg-green-500 hover:text-black transition-all">
                        EXIT TERMINAL
                    </button>
                </div>
            );
        }

        if (gameState === 'lost') {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-shake">
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center border-4 border-red-500">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <h2 className="text-4xl font-mono font-bold text-red-500">CRITICAL FAILURE</h2>
                    <p className="text-white font-mono">OXYGEN DEPLETED. LOCKDOWN PERMANENT.</p>
                    <button 
                        onClick={() => {
                            setTimeLeft(INITIAL_TIME);
                            setCurrentStage(0);
                            setGameState('start');
                        }} 
                        className="px-8 py-3 bg-red-900/30 border border-red-500 text-red-400 font-mono hover:bg-red-500 hover:text-black transition-all"
                    >
                        REBOOT SYSTEM
                    </button>
                </div>
            );
        }

        return (
            <div className="flex flex-col h-full max-w-4xl mx-auto w-full">
                {/* Terminal Header */}
                <div className="flex justify-between items-center border-b border-green-500/30 pb-4 mb-4 font-mono">
                    <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${timeLeft < 60 ? 'bg-red-500 animate-ping' : 'bg-green-500 animate-pulse'}`}></div>
                        <span className={timeLeft < 60 ? "text-red-500" : "text-green-400"}>
                            TIME REMAINING: {formatTime(timeLeft)}
                        </span>
                    </div>
                    <div className="text-green-600 text-xs md:text-sm">
                        SECURE CONNECTION // LEVEL {currentStage + 1}
                    </div>
                </div>

                {/* Main Terminal Area */}
                <div className="flex-grow bg-black/40 border border-green-500/30 rounded-lg p-6 font-mono relative overflow-hidden flex flex-col">
                    {/* Scanline effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 opacity-20"></div>
                    
                    {/* Content */}
                    <div className="relative z-20 flex-grow flex flex-col md:flex-row gap-8">
                        {/* Visual/Status Column */}
                        <div className="md:w-1/3 border-b md:border-b-0 md:border-r border-green-500/30 pb-4 md:pr-4 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 rounded-full border-2 border-green-500/50 flex items-center justify-center mb-4 bg-green-900/10 relative">
                                <StageIcon className={`w-12 h-12 text-green-400 ${status === 'idle' ? 'animate-pulse' : ''}`} />
                                {status === 'success' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-full">
                                        <svg className="w-16 h-16 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-red-500/20 rounded-full animate-ping">
                                        <svg className="w-16 h-16 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-green-600 uppercase tracking-widest mb-1">TARGET SYSTEM</div>
                            <div className="text-green-400 font-bold text-lg">{stage.title}</div>
                            <div className="mt-4 text-xs text-green-700 w-full text-left font-mono">
                                <p>{">"} SYSTEM_ID: {stage.type}_{stage.id}</p>
                                <p>{">"} STATUS: <span className="text-red-500 blink">LOCKED</span></p>
                            </div>
                        </div>

                        {/* Data/Log Column */}
                        <div className="md:w-2/3 flex flex-col">
                            <div className="mb-6 space-y-1 text-sm md:text-base">
                                {stage.logs.map((log, i) => (
                                    <div key={i} className="text-green-300">
                                        <span className="text-green-600 mr-2">{">"}</span>
                                        <TypewriterText text={log} delay={10} />
                                    </div>
                                ))}
                            </div>

                            <div className="bg-green-900/10 border border-green-500/30 p-4 rounded mb-4 flex-grow">
                                <div className="text-xs text-green-600 mb-2 uppercase">CHALLENGE QUERY</div>
                                <div className="text-green-200 whitespace-pre-wrap font-bold">{stage.riddle}</div>
                            </div>

                            {/* Input Line */}
                            <form onSubmit={handleSubmit} className="mt-auto">
                                {showHint && (
                                    <div className="mb-2 text-xs text-yellow-500 font-mono border border-yellow-500/30 p-2 bg-yellow-900/10">
                                        [HINT]: {stage.hint}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500 animate-pulse">{">"}</span>
                                    <input 
                                        ref={inputRef}
                                        type="text" 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        className={`flex-grow bg-transparent border-b-2 ${status === 'error' ? 'border-red-500 text-red-400' : 'border-green-500 text-green-400'} focus:outline-none py-2 font-mono uppercase`}
                                        placeholder="ENTER COMMAND..."
                                        disabled={status !== 'idle'}
                                        autoComplete="off"
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowHint(!showHint)}
                                        className="text-xs text-green-700 hover:text-green-400 border border-green-700 px-2 py-1 rounded"
                                    >
                                        ?
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Status Overlay */}
                    {status === 'success' && (
                         <div className="absolute inset-0 flex items-center justify-center bg-green-900/80 z-30 backdrop-blur-sm animate-section-enter">
                             <div className="text-center">
                                 <h3 className="text-3xl font-bold text-green-400 mb-2 tracking-widest">ACCESS GRANTED</h3>
                                 <p className="text-green-200 font-mono">{stage.successMsg}</p>
                             </div>
                         </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full flex flex-col bg-gray-950 p-4 md:p-8 rounded-xl border-2 border-gray-800 shadow-2xl relative overflow-hidden">
            {/* Background grid decoration */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            <div className="relative z-10 h-full flex flex-col">
                {gameState !== 'start' && (
                    <button onClick={onExit} className="absolute top-0 right-0 text-xs text-gray-600 hover:text-red-400 z-50 font-mono">
                        ABORT MISSION [X]
                    </button>
                )}
                {renderScreenContent()}
            </div>
        </div>
    );
};

export default EscapeRoomGame;
