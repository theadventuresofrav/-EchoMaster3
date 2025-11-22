import { GoogleGenAI, Type, Chat, Modality } from "@google/genai";
import type { QuizQuestion, Difficulty, ChatMessage } from '../types';

// --- Audio Utility Functions ---
// These are needed to process the raw audio data from the Gemini API

// Decodes a base64 string into a Uint8Array.
function decode(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

// Decodes raw PCM audio data into an AudioBuffer that the browser can play.
async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
        }
    }
    return buffer;
}


// --- Chat Manager ---
const createChatManager = () => {
  if (!process.env.API_KEY) {
    // Return a mock chat manager if API key is not available
    return {
      startChat: (topic: string) => ({
        sendMessage: async (message: string, history: ChatMessage[]): Promise<string> => {
          await new Promise(resolve => setTimeout(resolve, 800));
          const response = `This is a mock response about "${topic}" to your message: "${message}". Your history has ${history.length} messages.`;
          return response;
        }
      })
    };
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const startChat = (topic: string): Chat => {
    const systemInstruction = `You are an expert sonographer and educator named Echo. You are teaching a student about "${topic}". The student will ask you questions. Provide clear, concise, and easy-to-understand explanations suitable for a learner. Use analogies where helpful, but remain medically accurate. Format your answers using markdown. Keep your responses focused on the user's questions and the topic at hand.`;
    
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
    });
  };

  return { startChat };
};

const chatManager = createChatManager();

// --- Standalone Functions ---
const getGeminiService = () => {
  if (!process.env.API_KEY) {
    // Return mock functions for quiz generation and speech synthesis
    return {
      generateQuiz: async (topic: string, difficulty: Difficulty): Promise<QuizQuestion[]> => {
        console.warn("API_KEY not found. Using mock quiz data.");
        await new Promise(resolve => setTimeout(resolve, 1000));
        return [
          {
            question: `What is a basic concept of ${topic}? (${difficulty} Mock Question)`,
            options: ['Option A', 'Option B', 'Correct Mock Answer', 'Option D'],
            correctAnswer: 'Correct Mock Answer',
            explanation: 'This is the correct answer because this is a mock quiz.'
          }
        ];
      },
      generateSpeech: async (text: string): Promise<string> => {
        console.warn("API_KEY not found. Speech generation is disabled.");
        return '';
      },
      guessDrawing: async (imageBase64: string, targetWord: string): Promise<string> => {
          console.warn("API_KEY not found. Guessing is disabled.");
          return "I can't see the drawing without an API Key, but it looks great!";
      }
    };
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const generateQuiz = async (topic: string, difficulty: Difficulty): Promise<QuizQuestion[]> => {
    try {
      const prompt = `Generate a 3-question multiple-choice quiz about "${topic}" in ultrasound technology at a ${difficulty} difficulty level. For 'Easy', focus on definitions. For 'Medium', focus on applications and concepts. For 'Hard', focus on complex scenarios, artifacts, or nuanced principles. Ensure the options are plausible and the explanations are clear and concise.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { 
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                correctAnswer: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ['question', 'options', 'correctAnswer', 'explanation']
            }
          }
        }
      });

      const jsonText = response.text.trim();
      return JSON.parse(jsonText) as QuizQuestion[];

    } catch (error) {
      console.error("Error generating quiz from Gemini:", error);
      throw new Error("Failed to generate quiz. Please try again later.");
    }
  };

  const generateSpeech = async (text: string): Promise<string> => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Read this educational content clearly and professionally: ${text}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
        },
      });
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return base64Audio || '';
    } catch (error) {
      console.error("Error generating speech from Gemini:", error);
      throw new Error("Failed to generate audio narration.");
    }
  };

  const guessDrawing = async (imageBase64: string, targetWord: string): Promise<string> => {
      try {
          // Remove header if present
          const base64Data = imageBase64.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
          
          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: {
                  parts: [
                      {
                          inlineData: {
                              mimeType: 'image/png',
                              data: base64Data
                          }
                      },
                      {
                          text: `I am playing Pictionary. The secret word is "${targetWord}". Does this drawing look like "${targetWord}"? If it is clearly recognizable as "${targetWord}", start your response with "CORRECT!". If it is close but missing details, give a helpful hint. If it looks like something else, describe what you see. Keep it brief.`
                      }
                  ]
              }
          });
          return response.text || "I couldn't make out the drawing.";
      } catch (error) {
          console.error("Error guessing drawing:", error);
          return "Error analyzing the image.";
      }
  };

  return { generateQuiz, generateSpeech, guessDrawing };
};

export const geminiService = {
  ...getGeminiService(),
  chatManager,
  decode,
  decodeAudioData,
};