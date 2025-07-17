import { SUMMARY_SYSTEM_PROMPT } from '@/utils/prompts';
import OpenAI from 'openai';
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function generateSummaryFromOpenAI(pdfText:string) {
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system', 
                    content: SUMMARY_SYSTEM_PROMPT
                },
                {
                    role:"user",
                    content:`Transform this documents into and engaing, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
                },
            ],
            temperature: 0.7,
            max_completion_tokens: 1500,
        })
        return completion.choices[0].message.content;
    } catch (error:any) {
        // console.error("OpenAI error:", error?.status, error?.message, error?.response?.data);
        if(error?.status === 429){
            throw new Error("RATE_LIMIT_EXCEEDED")
        }
        throw error;
    }
}
