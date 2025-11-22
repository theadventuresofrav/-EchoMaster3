
export type LearningStyle = 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic';
export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
export type ChineseZodiac = 'Rat' | 'Ox' | 'Tiger' | 'Rabbit' | 'Dragon' | 'Snake' | 'Horse' | 'Goat' | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';

export type Subject = 'SPI: Physics' | 'SPI: Hemodynamics' | 'SPI: Artifacts' | 'Vascular Technology' | 'Abdominal Sonography' | 'Ob/Gyn';

export interface UserProfile {
    name: string;
    dob: string; // YYYY-MM-DD
    learningStyle: LearningStyle;
    interests: string;
}

export interface NumerologyProfile {
    lifePath: number;
    destiny: number;
    soulUrge: number;
    chineseZodiac: ChineseZodiac;
    zodiacSign: ZodiacSign;
    personalYear: number;
}

export interface LessonPlan {
    subject: Subject;
    topic: string;
    teachingStyle: string;
    format: string;
    activities: string[];
    numerologyInsight: string;
    learningStyleInsight: string;
}

// --- GG33 Engine: Numerology & Astrology Calculations ---

const LETTER_MAP: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

function reduceNumber(num: number): number {
    if (num === 11 || num === 22 || num === 33) return num; // Master numbers
    if (num < 10) return num;
    return reduceNumber(num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0));
}

function calculateNameNumber(name: string, onlyVowels: boolean = false): number {
    const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
    let sum = 0;
    for (const char of cleanName) {
        if (onlyVowels && !VOWELS.includes(char)) continue;
        sum += LETTER_MAP[char] || 0;
    }
    return reduceNumber(sum);
}

function calculateLifePath(dob: string): number {
    const [year, month, day] = dob.split('-').map(Number);
    const rYear = reduceNumber(year);
    const rMonth = reduceNumber(month);
    const rDay = reduceNumber(day);
    return reduceNumber(rYear + rMonth + rDay);
}

function calculatePersonalYear(dob: string): number {
    const [_, month, day] = dob.split('-').map(Number);
    const currentYear = new Date().getFullYear();
    return reduceNumber(reduceNumber(day) + reduceNumber(month) + reduceNumber(currentYear));
}

function getZodiacSign(dob: string): ZodiacSign {
    const [_, month, day] = dob.split('-').map(Number);
    if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) return 'Capricorn';
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'Aquarius';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'Pisces';
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'Aries';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'Taurus';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'Gemini';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'Cancer';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'Leo';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'Virgo';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'Libra';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'Scorpio';
    return 'Sagittarius';
}

function getChineseZodiac(dob: string): ChineseZodiac {
    const year = parseInt(dob.split('-')[0]);
    const animals: ChineseZodiac[] = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    return animals[(year - 4) % 12];
}

export function calculateProfile(user: UserProfile): NumerologyProfile {
    return {
        lifePath: calculateLifePath(user.dob),
        destiny: calculateNameNumber(user.name),
        soulUrge: calculateNameNumber(user.name, true),
        chineseZodiac: getChineseZodiac(user.dob),
        zodiacSign: getZodiacSign(user.dob),
        personalYear: calculatePersonalYear(user.dob)
    };
}

// --- Lesson Logic Matrix ---

const LP_TEACHING_STYLE: Record<number, { style: string, desc: string }> = {
    1: { style: "Challenge-Based", desc: "Independent, fast-paced tasks with clear leadership opportunities." },
    2: { style: "Collaborative", desc: "Partner work, discussion-based learning, and empathetic connection." },
    3: { style: "Creative & Expressive", desc: "Artistic projects, presentations, and fun, dynamic storytelling." },
    4: { style: "Structured & Detailed", desc: "Step-by-step logical progression, checklists, and practical application." },
    5: { style: "Dynamic & Varied", desc: "Gamified learning, short modules, and freedom to explore multiple angles." },
    6: { style: "Service-Oriented", desc: "Learning through helping others, community projects, and nurturing themes." },
    7: { style: "Analytical & Deep", desc: "Independent research, deep-dive investigations, and answering 'why'." },
    8: { style: "Goal-Oriented", desc: "High-level strategy, business simulations, and results-driven projects." },
    9: { style: "Humanitarian", desc: "Big-picture concepts, history/culture focus, and emotional resonance." },
    11: { style: "Inspirational", desc: "Intuitive leaps, connecting disparate concepts, and spiritual/philosophical depth." },
    22: { style: "Master Builder", desc: "Large-scale systems thinking, practical implementation of big dreams." },
    33: { style: "Master Teacher", desc: "Mentoring others, joyful expression, and selfless service." }
};

const LEARNING_STYLE_FORMAT: Record<LearningStyle, { format: string, tools: string[] }> = {
    'Visual': { format: "Visual/Graphic", tools: ["Diagrams", "Flowcharts", "Video Essays", "Color-coding"] },
    'Auditory': { format: "Aural/Verbal", tools: ["Podcasts", "Discussion", "Mnemonics", "Recorded Summaries"] },
    'Reading/Writing': { format: "Textual/Reflective", tools: ["Essays", "Reports", "Detailed Notes", "Lists"] },
    'Kinesthetic': { format: "Tactile/Active", tools: ["Models", "Experiments", "Roleplay", "Field Work"] }
};

// --- Lesson Content Bank (Ultrasound Focused) ---

const TEMPLATES: Record<Subject, Record<LearningStyle, string[]>> = {
    'SPI: Physics': {
        Visual: ["Draw the sound beam shape including near/far zones", "Create a diagram of transducer components"],
        Auditory: ["Listen to a lecture on the piezoelectric effect", "Explain the range equation out loud"],
        'Reading/Writing': ["Write definitions for key wave parameters", "Create a cheat sheet for resolution acronyms (LARRD, LATA)"],
        Kinesthetic: ["Use a slinky to demonstrate longitudinal waves", "Manipulate TGC controls on a machine (or simulator)"]
    },
    'SPI: Hemodynamics': {
        Visual: ["Map out the circulatory system flow", "Draw laminar vs turbulent flow profiles"],
        Auditory: ["Discuss the Doppler effect pitch changes", "Listen to different Doppler audio signals"],
        'Reading/Writing': ["Write a summary of Bernoulli's Principle", "List the factors affecting resistance"],
        Kinesthetic: ["Use a water hose analogy to feel pressure/resistance", "Practice adjusting Doppler angle on a phantom"]
    },
    'SPI: Artifacts': {
        Visual: ["Identify artifacts in sample images", "Draw the path of sound for mirror image"],
        Auditory: ["Describe how reverberation is created", "Quiz a partner on artifact causes"],
        'Reading/Writing': ["Catalog artifacts by their cause (attenuation vs propagation)", "Write case studies involving artifacts"],
        Kinesthetic: ["Create shadow artifacts using different materials", "Adjust gain to create/eliminate noise"]
    },
    'Vascular Technology': {
        Visual: ["Trace the Circle of Willis", "Color-code venous vs arterial flow diagrams"],
        Auditory: ["Listen to triphasic vs monophasic waveforms", "Verbalize the path of blood from heart to toe"],
        'Reading/Writing': ["Write a protocol for a DVT study", "Summarize diagnostic criteria for stenosis"],
        Kinesthetic: ["Practice probe positioning for carotid artery", "Simulate augmentation techniques"]
    },
    'Abdominal Sonography': {
        Visual: ["Draw the segmental anatomy of the liver", "Label a cross-section of the kidney"],
        Auditory: ["Listen to a case review of gallstones", "Describe the sonographic appearance of the pancreas"],
        'Reading/Writing': ["Write a report for a normal abdomen scan", "Create flashcards for organ echogenicity"],
        Kinesthetic: ["Practice breath-hold instructions", "Roleplay patient positioning"]
    },
    'Ob/Gyn': {
        Visual: ["Chart the menstrual cycle hormones", "Draw fetal lie and presentation"],
        Auditory: ["Listen to fetal heart tones", "Discuss biometric measurement techniques"],
        'Reading/Writing': ["Write a summary of first-trimester milestones", "List indications for transvaginal exams"],
        Kinesthetic: ["Practice biometric measurements on a phantom", "Simulate transducer orientation for uterus"]
    }
};

// --- Generator ---

export function generateLessonPlan(user: UserProfile, numProfile: NumerologyProfile, subject: Subject): LessonPlan {
    const lpStyle = LP_TEACHING_STYLE[numProfile.lifePath] || LP_TEACHING_STYLE[1];
    const lsFormat = LEARNING_STYLE_FORMAT[user.learningStyle];
    
    // Select activities based on Subject + Learning Style
    const subjectTemplates = TEMPLATES[subject][user.learningStyle];
    
    return {
        subject: subject,
        topic: user.interests ? `${user.interests} in ${subject}` : `Core Concepts of ${subject}`,
        teachingStyle: lpStyle.style,
        format: lsFormat.format,
        activities: subjectTemplates,
        numerologyInsight: `As a Life Path ${numProfile.lifePath}, you thrive with ${lpStyle.desc.toLowerCase()} This lesson leverages your natural strengths.`,
        learningStyleInsight: `Since you are a ${user.learningStyle} learner, we've focused on ${lsFormat.tools.join(', ')} to maximize retention.`
    };
}
