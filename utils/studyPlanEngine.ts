
export type LearningStyle = 'Visual' | 'Auditory' | 'Reading/Writing' | 'Kinesthetic';
export type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' | 'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';
export type ChineseZodiac = 'Rat' | 'Ox' | 'Tiger' | 'Rabbit' | 'Dragon' | 'Snake' | 'Horse' | 'Goat' | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';
export type Subject = 'Science' | 'Math' | 'History' | 'English' | 'Philosophy';

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

// Pythagorean Letter Mapping
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
    // Reduce Year, Month, Day separately then sum
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

// --- Lesson Content Bank (Mock Templates) ---

const TEMPLATES: Record<Subject, Record<LearningStyle, string[]>> = {
    Science: {
        Visual: ["Create a detailed diagram of the system", "Watch a documentary and map the key events"],
        Auditory: ["Listen to a science podcast and debate the findings", "Explain the process verbally to a peer"],
        'Reading/Writing': ["Read the case study and write a summary report", "Create a glossary of key terms"],
        Kinesthetic: ["Build a physical model of the concept", "Conduct an experiment and log real-time data"]
    },
    Math: {
        Visual: ["Draw geometric representations of the problem", "Use color-coded graphs to analyze data"],
        Auditory: ["Talk through the logic of the solution step-by-step", "Use rhythm or song to memorize formulas"],
        'Reading/Writing': ["Write out the proof in sentence form", "Create a 'how-to' guide for this problem type"],
        Kinesthetic: ["Use manipulatives to solve the equation", "Walk through the geometry in a physical space"]
    },
    History: {
        Visual: ["Create a timeline with drawings of key events", "Analyze historical maps and art"],
        Auditory: ["Listen to speeches from the era", "Participate in a historical debate"],
        'Reading/Writing': ["Write a diary entry from a historical figure's perspective", "Read primary source documents"],
        Kinesthetic: ["Re-enact a historical event", "Build a diorama of the historical setting"]
    },
    English: {
        Visual: ["Storyboard a scene from the book", "Create a mind map of character relationships"],
        Auditory: ["Perform a dramatic reading of the text", "Discuss themes in a Socratic seminar"],
        'Reading/Writing': ["Write a literary analysis essay", "Journal about personal connections to the text"],
        Kinesthetic: ["Act out a scene", "Arrange plot points physically on a wall"]
    },
    Philosophy: {
        Visual: ["Map out the logical argument flow visually", "Create symbols for key philosophical concepts"],
        Auditory: ["Debate the ethical dilemma", "Listen to lectures by modern philosophers"],
        'Reading/Writing': ["Write a manifesto based on the theory", "Critique a philosophical text"],
        Kinesthetic: ["Roleplay a thought experiment", "Meditation/reflection exercises"]
    }
};

// --- Generator ---

export function generateLessonPlan(user: UserProfile, numProfile: NumerologyProfile, subject: Subject): LessonPlan {
    const lpStyle = LP_TEACHING_STYLE[numProfile.lifePath] || LP_TEACHING_STYLE[1];
    const lsFormat = LEARNING_STYLE_FORMAT[user.learningStyle];
    
    // Select activities based on Subject + Learning Style
    // In a real app, this would query a database. Here we pick from the mock templates.
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
