
import React, { useState, useEffect } from 'react';
import { EyeIcon, WavesIcon, TransducerIcon, DopplerIcon, ArtifactsIcon, InstrumentationIcon } from './icons';
import LongitudinalWaveVisual from './demos/spi/LongitudinalWaveVisual';
import TransducerAnatomyVisual from './demos/spi/TransducerAnatomyVisual';
import DopplerPrincipleVisual from './demos/spi/DopplerPrincipleVisual';
import PropagationArtifactsVisual from './demos/spi/PropagationArtifactsVisual';
import DisplayModesVisual from './demos/spi/DisplayModesVisual';
import WaveParametersVisual from './demos/spi/WaveParametersVisual';
import BeamFocusingVisual from './demos/spi/BeamFocusingVisual';
import DopplerModesVisual from './demos/spi/DopplerModesVisual';

interface VisualDemo {
    id: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    component: React.ComponentType;
}

const DEMOS: VisualDemo[] = [
    {
        id: 'waves',
        title: 'Wave Propagation',
        description: 'Visualize how sound waves compress and rarify through a medium.',
        icon: WavesIcon,
        component: LongitudinalWaveVisual
    },
    {
        id: 'params',
        title: 'Wave Parameters',
        description: 'Interact with frequency and amplitude to see their effect on the wave.',
        icon: WavesIcon,
        component: WaveParametersVisual
    },
    {
        id: 'transducer',
        title: 'Transducer Anatomy',
        description: 'Explore the components of a transducer and the piezoelectric effect.',
        icon: TransducerIcon,
        component: TransducerAnatomyVisual
    },
    {
        id: 'focusing',
        title: 'Beam Focusing',
        description: 'See how electronic focusing creates a narrow beam for better resolution.',
        icon: TransducerIcon,
        component: BeamFocusingVisual
    },
    {
        id: 'doppler',
        title: 'Doppler Principle',
        description: 'Understand how motion creates frequency shifts.',
        icon: DopplerIcon,
        component: DopplerPrincipleVisual
    },
    {
        id: 'modes',
        title: 'Doppler Modes',
        description: 'Compare CW, PW, Color, and Power Doppler visualization.',
        icon: DopplerIcon,
        component: DopplerModesVisual
    },
    {
        id: 'artifacts',
        title: 'Common Artifacts',
        description: 'Visualize Mirror Image, Reverberation, and more.',
        icon: ArtifactsIcon,
        component: PropagationArtifactsVisual
    },
    {
        id: 'display',
        title: 'Display Modes',
        description: 'Compare A-Mode, B-Mode, and M-Mode representations.',
        icon: InstrumentationIcon,
        component: DisplayModesVisual
    }
];

const DemosDashboard: React.FC = () => {
    const [activeDemoId, setActiveDemoId] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [activeDemoId]);

    const activeDemo = DEMOS.find(d => d.id === activeDemoId);

    if (activeDemo) {
        const DemoComponent = activeDemo.component;
        return (
            <main className="md:ml-64 pt-20 px-4 md:px-8 pb-8 h-full animate-section-enter">
                 <button 
                    onClick={() => setActiveDemoId(null)} 
                    className="mb-6 text-sm text-[var(--color-text-muted)] hover:text-white flex items-center gap-2 group"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to Visual Lab
                </button>
                <div className="max-w-4xl mx-auto">
                     <h1 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-text-heading)] mb-4">{activeDemo.title}</h1>
                     <p className="text-lg text-[var(--color-text-muted)] mb-8">{activeDemo.description}</p>
                     <div 
                        className="bg-[var(--color-bg-surface)] bg-opacity-60 border border-[var(--color-border-base)] rounded-2xl shadow-lg backdrop-blur-md p-6 md:p-8"
                        style={{ boxShadow: `0 8px 30px var(--color-primary-accent-glow)` }}
                    >
                        <DemoComponent />
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="md:ml-64 pt-20 px-4 md:px-8 pb-8 h-full">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8 animate-section-enter">
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-[var(--color-text-heading)] tracking-tight flex items-center gap-4">
                        <EyeIcon className="w-10 h-10 text-[var(--color-primary-accent)]" />
                        Visual Lab
                    </h1>
                    <p className="mt-2 text-lg text-[var(--color-text-muted)]">
                        Interactive visualizations to master core ultrasound physics concepts.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-section-enter" style={{ animationDelay: '100ms' }}>
                    {DEMOS.map((demo) => (
                        <button 
                            key={demo.id}
                            onClick={() => setActiveDemoId(demo.id)}
                            className="group relative overflow-hidden rounded-2xl bg-[var(--color-bg-surface)] border border-[var(--color-border-base)] p-6 text-left transition-all hover:border-[var(--color-primary-accent)] hover:shadow-[0_0_30px_-5px_var(--color-primary-accent-glow)] hover:-translate-y-1"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-bg-surface-light)] text-[var(--color-primary-accent)] group-hover:scale-110 transition-transform">
                                <demo.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-white">{demo.title}</h3>
                            <p className="text-sm text-[var(--color-text-muted)]">{demo.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default DemosDashboard;
