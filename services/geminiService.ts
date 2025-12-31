import { GoogleGenAI } from "@google/genai";

// Ensure API key is available
const apiKey = process.env.API_KEY;
if (!apiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-types' });

export const generateInspiration = async (): Promise<string> => {
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a short, unique, and deeply inspiring quote or a fascinating philosophical fact. Keep it under 30 words. Do not include quotes from famous people, generate something original.",
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Minimize latency for this simple task
        temperature: 1.2, // High creativity
      }
    });

    return response.text || "Creativity is currently sleeping. Try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};