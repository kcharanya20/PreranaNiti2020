import { GoogleGenAI, Type, Schema } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
});

const quoteSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    quote: { type: Type.STRING },
    author: { type: Type.STRING },
    englishTranslation: { type: Type.STRING },
  },
  required: ["quote", "author"],
};

export const handler = async (event: any) => {
  try {
    const { language, mood } = JSON.parse(event.body);

    const prompt = `Generate a powerful, short, and inspiring motivational quote in ${language} language specifically for someone who is feeling ${mood}. 
    If the language is Kannada or Hindi, provide the script correctly. 
    Also provide the author name. 
    If the language is not English, provide a clear English translation.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quoteSchema,
        temperature: 1.2,
      },
    });

    const text = response.text;

    return {
      statusCode: 200,
      body: text,
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
