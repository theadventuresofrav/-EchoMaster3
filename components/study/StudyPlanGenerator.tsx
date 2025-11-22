
import React, { useState, useEffect } from 'react';
import { calculateProfile, generateLessonPlan, UserProfile, NumerologyProfile, LessonPlan, LearningStyle, Subject } from '../../utils/studyPlanEngine';
import { BookOpenIcon } from '../icons';

const StudyPlanGenerator: React.FC = () => {
    const [step, setStep] = useState<'intake' | 'results'>('intake');
    const [formData, setFormData] = useState<UserProfile>({
        name: '',
        dob: '',
        learningStyle: 'Visual',
        interests: ''
    });
    const [subject, setSubject] = useState<Subject>('SPI: Physics');
    
    const [profile, setProfile] = useState<NumerologyProfile | null>(null);
    const [plan, setPlan] = useState<LessonPlan | null>(null);
    
    // Loading State
    const [isLoading, setIsLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [loadingProgress, setLoadingProgress] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setLoadingProgress(0);

        // Simulation sequence
        const sequence = [
            { msg: "Analyzing Numerology Profile...", progress: 25, delay: 800 },
            { msg: "Calculating Learning Vectors...", progress: 50, delay: 800 },
            { msg: "Consulting Astrological Charts...", progress: 75, delay: 800 },
            { msg: "Synthesizing Personalized Curriculum...", progress: 90, delay: 800 },
        ];

        for (const step of sequence) {
            setLoadingMessage(step.msg);
            setLoadingProgress(step.progress);
            await new Promise(r => setTimeout(r, step.delay));
        }

        const numProfile = calculateProfile(formData);
        const lessonPlan = generateLessonPlan(formData, numProfile, subject);
        
        setProfile(numProfile);
        setPlan(lessonPlan);
        
        setLoadingProgress(100);
        await new Promise(r => setTimeout(r, 400)); // Final pause at 100%

        setIsLoading(false);
        setStep('results');
    };

    const reset = () => {
        setStep('intake');
        setProfile(null);
        setPlan(null);
        setIsLoading(false);
    };

    // Loading View
    if (isLoading) {
        return (
            <div className="w-full max-w-3xl mx-auto p-6 min-h-[60vh] flex flex-col items-center justify-center animate-section-enter">
                <div className="w-full max-w-md bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] rounded-2xl p-8 shadow-2xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 mb-6 relative">
                        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-bg-surface-light)]"></div>
                        <div 
                            className="absolute inset-0 rounded-full border-4 border-[var(--color-primary-accent)] border-t-transparent animate-spin"
                        ></div>
                        <BookOpenIcon className="absolute inset-0 m-auto w-6 h-6 text-[var(--color-primary-accent)] animate-pulse" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[var(--color-text-heading)] mb-2">
                        AI Engine Active
                    </h3>
                    <p className="text-[var(--color-text-muted)] mb-6 min-h-[1.5rem]">
                        {loadingMessage}
                    </p>

                    <div className="w-full h-2 bg-[var(--color-bg-surface-light)] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[var(--color-primary-accent)] transition-all duration-500 ease-out"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'intake') {
        return (
            <div className="w-full max-w-3xl mx-auto p-6 animate-section-enter">
                <header className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-[var(--color-text-heading)] flex items-center justify-center gap-3">
                        <BookOpenIcon className="w-10 h-10 text-[var(--color-primary-accent)]" />
                        AI Lesson Planner
                    </h1>
                    <p className="mt-2 text-[var(--color-text-muted)]">
                        Generate a personalized curriculum based on Numerology, Astrology, and Learning Style.
                    </p>
                </header>

                <form onSubmit={handleGenerate} className="bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] rounded-2xl p-8 shadow-lg space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Full Name</label>
                            <input 
                                required
                                type="text" 
                                value={formData.name}
                                onChange={e => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary-accent)]"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Date of Birth</label>
                            <input 
                                required
                                type="date" 
                                value={formData.dob}
                                onChange={e => setFormData({...formData, dob: e.target.value})}
                                className="w-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary-accent)]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Primary Learning Style</label>
                            <select 
                                value={formData.learningStyle}
                                onChange={e => setFormData({...formData, learningStyle: e.target.value as LearningStyle})}
                                className="w-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary-accent)]"
                            >
                                <option value="Visual">Visual (Images, Spatial)</option>
                                <option value="Auditory">Auditory (Listening, Sound)</option>
                                <option value="Reading/Writing">Reading/Writing (Text, Lists)</option>
                                <option value="Kinesthetic">Kinesthetic (Touch, Movement)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Target Subject</label>
                            <select 
                                value={subject}
                                onChange={e => setSubject(e.target.value as Subject)}
                                className="w-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary-accent)]"
                            >
                                <option value="SPI: Physics">SPI: Physics</option>
                                <option value="SPI: Hemodynamics">SPI: Hemodynamics</option>
                                <option value="SPI: Artifacts">SPI: Artifacts</option>
                                <option value="Vascular Technology">Vascular Technology</option>
                                <option value="Abdominal Sonography">Abdominal Sonography</option>
                                <option value="Ob/Gyn">Ob/Gyn</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Specific Interests / Goals (Optional)</label>
                        <input 
                            type="text" 
                            value={formData.interests}
                            onChange={e => setFormData({...formData, interests: e.target.value})}
                            className="w-full bg-[var(--color-bg-surface-light)] border border-[var(--color-border-base)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-primary-accent)]"
                            placeholder="e.g. Hemodynamics, Artifacts, Board Prep..."
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-[var(--color-primary-accent)] text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform shadow-[0_0_20px_-5px_var(--color-primary-accent-glow)] flex items-center justify-center gap-2"
                    >
                       <BookOpenIcon className="w-5 h-5" />
                       Generate Study Plan
                    </button>
                </form>
            </div>
        );
    }

    if (step === 'results' && profile && plan) {
        return (
            <div className="w-full max-w-5xl mx-auto p-6">
                <div className="flex justify-between items-center mb-8 animate-section-enter">
                    <button 
                        onClick={reset}
                        className="text-sm text-[var(--color-text-muted)] hover:text-white flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        New Plan
                    </button>
                    <h1 className="text-2xl font-serif font-bold text-[var(--color-text-heading)]">Personalized Plan</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar: Profile Data */}
                    <div className="lg:col-span-1 space-y-6 animate-section-enter" style={{ animationDelay: '100ms' }}>
                        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-[var(--color-primary-accent)] mb-4 border-b border-[var(--color-border-base)] pb-2">
                                Student Profile
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Name:</span>
                                    <span className="font-semibold text-white">{formData.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Life Path:</span>
                                    <span className="font-mono font-bold text-[var(--color-primary-accent)]">{profile.lifePath}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Destiny Num:</span>
                                    <span className="font-mono font-bold text-white">{profile.destiny}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Soul Urge:</span>
                                    <span className="font-mono font-bold text-white">{profile.soulUrge}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Zodiac:</span>
                                    <span className="font-semibold text-white">{profile.zodiacSign}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Chinese Zodiac:</span>
                                    <span className="font-semibold text-white">{profile.chineseZodiac}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[var(--color-text-muted)]">Personal Year:</span>
                                    <span className="font-mono font-bold text-white">{profile.personalYear}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] rounded-xl p-6">
                            <h3 className="text-lg font-bold text-blue-400 mb-4 border-b border-[var(--color-border-base)] pb-2">
                                Learning Stats
                            </h3>
                            <div className="space-y-2">
                                <div className="text-sm text-[var(--color-text-muted)]">Primary Style</div>
                                <div className="text-xl font-bold text-white">{formData.learningStyle}</div>
                                <div className="text-xs text-[var(--color-text-muted)] mt-2">
                                    Optimized for {plan.format} formats.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main: Lesson Plan */}
                    <div className="lg:col-span-2 space-y-6 animate-section-enter" style={{ animationDelay: '200ms' }}>
                        <div className="bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] rounded-xl p-8 relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary-accent)] opacity-5 rounded-bl-full pointer-events-none"></div>

                            <div className="mb-6">
                                <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary-accent)]/10 text-[var(--color-primary-accent)] text-xs font-bold tracking-wider mb-2">
                                    GENERATED CURRICULUM
                                </span>
                                <h2 className="text-3xl font-serif font-bold text-white mb-2">{plan.subject}</h2>
                                <p className="text-xl text-[var(--color-text-muted)]">{plan.topic}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-[var(--color-bg-surface-light)] rounded-lg border border-[var(--color-border-base)]">
                                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Teaching Style</div>
                                    <div className="font-semibold text-white">{plan.teachingStyle}</div>
                                </div>
                                <div className="p-4 bg-[var(--color-bg-surface-light)] rounded-lg border border-[var(--color-border-base)]">
                                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider mb-1">Format</div>
                                    <div className="font-semibold text-white">{plan.format}</div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-[var(--color-primary-accent)] rounded-full"></span>
                                        Strategy Logic
                                    </h4>
                                    <div className="bg-black/20 rounded-lg p-4 text-sm text-[var(--color-text-muted)] italic leading-relaxed">
                                        <p className="mb-2">"{plan.numerologyInsight}"</p>
                                        <p>"{plan.learningStyleInsight}"</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                                        Lesson Activities
                                    </h4>
                                    <ul className="space-y-3">
                                        {plan.activities.map((activity, idx) => (
                                            <li key={idx} className="flex items-start gap-3 p-3 bg-[var(--color-bg-surface-light)] rounded-lg border border-[var(--color-border-base)]">
                                                <div className="w-6 h-6 rounded-full bg-[var(--color-primary-accent)]/20 text-[var(--color-primary-accent)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-white/90">{activity}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end">
                            <button className="px-6 py-3 bg-[var(--color-bg-surface-light)] text-white rounded-lg hover:bg-[var(--color-border-base)] transition-colors text-sm font-semibold border border-[var(--color-border-base)]">
                                Download Plan (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default StudyPlanGenerator;
