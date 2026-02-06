import { Language, Mood, GenerateQuoteResponse } from "../types";

export const generateQuoteFromGemini = async (
  language: Language,
  mood: Mood
): Promise<GenerateQuoteResponse> => {
  const response = await fetch("/.netlify/functions/generate-quote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ language, mood }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }

  return await response.json();
};
