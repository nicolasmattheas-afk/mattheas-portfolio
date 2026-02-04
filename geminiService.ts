import { GoogleGenAI } from "@google/genai";
import { Tone } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to prevent immediate crashes, handle checks later
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const refineText = async (currentText: string, tone: Tone): Promise<string> => {
  if (!ai) {
    throw new Error("API Key is missing.");
  }

  try {
    const prompt = `Agis comme un expert senior en marketing et communication. 
    Réécris le texte suivant pour un portfolio professionnel.
    
    Ton : ${tone}
    Texte original : "${currentText}"
    
    Règles :
    1. Sois concis et impactant.
    2. Mets en valeur les résultats et la valeur ajoutée.
    3. Garde le texte en français.
    4. Ne retourne QUE le texte réécrit, sans guillemets ni introduction.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || currentText;
  } catch (error) {
    console.error("Error refining text with Gemini:", error);
    throw error;
  }
};