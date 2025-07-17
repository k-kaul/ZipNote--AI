import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateSummaryFromGemini = async (pdfText: string) => {
    try {
        // const model = ai.getGenerativeModel({ model:'gemini-2.0-flash-001' });
        
        const response = await ai.models.generateContent({
            model:'gemini-2.0-flash-001',
            contents: {
                role: 'user',
                parts: [{
                    text: SUMMARY_SYSTEM_PROMPT
                }, {
                    text: `Transform this documents into and engaing, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`
                }]
            },
            config: {
                temperature: 0.7,
                maxOutputTokens: 1500,
            },
        });
        // const result = response.data;
        // console.log(response.candidates?.[0]?.content?.parts?.[0]?.text)
        if(!response){
            throw new Error('empty response from Gemini')
        }

        return response;
    } catch (error:any) {
        console.error('Gemini API Error',error);
        throw error;
    }
}