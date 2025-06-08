import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { KnowledgeItem } from '@/types/chatbotTypes';
import { GEMINI_MODEL_NAME } from '@/lib/chatbotConstants';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" });

export const generateAnswer = async (
  question: string,
  knowledgeBase: KnowledgeItem[]
): Promise<{ text: string; sources?: { uri: string; title: string }[] }> => {
  if (!API_KEY) {
    return { text: "API Key is not configured. Please set the API_KEY environment variable." };
  }

  const knowledgeText = knowledgeBase.length > 0
    ? knowledgeBase.map(item => `- ${item.text}`).join('\n')
    : "No personal information has been provided yet.";

  const systemInstruction = `You are a highly advanced AI assistant, specifically programmed to be a personal chatbot. Your primary goal is to answer questions based *exclusively* on the information provided in the "MY INFORMATION" section.

You must adhere to the following rules:
1.  **Strictly Confidential:** Only use information from the "MY INFORMATION" section. Do not use any external knowledge or make assumptions.
2.  **Acknowledge Limitations:** If a question cannot be answered using the provided information, clearly state that you don't have the specific information. For example, say "I don't have that information in my knowledge base." or "I can only answer based on what I've been told about the user."
3.  **Be Conversational:** Maintain a friendly, helpful, and natural tone.
4.  **No Hallucinations:** Do not invent facts or details.
5.  **Conciseness:** Provide direct answers to the questions.

MY INFORMATION:
---
${knowledgeText}
---
`;

  try {
    const contents: Part[] = [{ text: question }];
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5, // Lower temperature for more factual, less creative responses
        topP: 0.9,
        topK: 40,
        // thinkingConfig: { thinkingBudget: 0 } // Disable thinking for faster, more direct factual retrieval
      }
    });

    const text = response.text;
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    let sources;
    if (groundingMetadata?.groundingChunks && groundingMetadata.groundingChunks.length > 0) {
        sources = groundingMetadata.groundingChunks
            .filter(chunk => chunk.web)
            .map(chunk => ({
                uri: chunk.web?.uri || '',
                title: chunk.web?.title || 'Unknown Source'
            }));
    }

    return { text, sources };

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes("API key not valid")) {
             return { text: "The API key is invalid. Please check your configuration." };
        }
         return { text: `An error occurred while contacting the AI: ${error.message}` };
    }
    return { text: "An unknown error occurred while contacting the AI." };
  }
};
