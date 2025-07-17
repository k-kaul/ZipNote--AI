'use server'

import { getDbConnection } from "@/lib/db";
import { generateSummaryFromGemini } from "@/lib/gemini-ai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { formatFileNameAsTitle } from "@/utils/format-utils";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface PdfSummaryType{
    userId?:string;
    fileUrl:string; 
    summary:string; 
    title?:string;
    fileName:string;
}

export async function generatePdfText({
    fileUrl,
}: {
    fileUrl: string;
}){
    if(!fileUrl){
        return {
            success: false,
            message: 'File Upload Failed',
            data: null,
        }
    }

    try {
        // using langchain to parse pdf
        const pdfText = await fetchAndExtractPdfText(fileUrl);

        if(!pdfText){
            return {
            success: false,
            message: 'Failed to fetch and Extract PDF Text',
            data: null,
            }; 
        }

        return {
            success: true, 
            messsage: 'PDF Text Generated Successfully',
            data: {
                pdfText,                                
            }
        }

    } catch (error) {
        return {
            success: false,
            message: 'Failed to Fetch and Extract PDF Text',
            data: null,
        }        
    }
}

// export async function generatePdfSummary(uploadResponse: [{
//     serverData : {
//         userId:string;
//         file: {
//             url: string;
//             name: string;
//         }
//     }
// }]) {
//     if(!uploadResponse){
//         return {
//             success: false,
//             message: 'File Upload Failed',
//             data: null,
//         }
//     }

//     const {serverData : {userId, file : {url: pdfUrl, name: fileName}}} = uploadResponse[0]

export async function generatePdfSummary({
    pdfText
}: {
    pdfText: string;
}){
    try {
        // using langchain to parse pdf       

        let summary;

        try {
            summary = await generateSummaryFromOpenAI(pdfText);            
            console.log({summary});

        } catch (error) {
            console.log(error);

            if(error instanceof Error && error.message === 'RATE_LIMIT_EXCEEDED'){
                try {
                    let notsummary = await generateSummaryFromGemini(pdfText);
                    summary = notsummary.candidates?.[0]?.content?.parts?.[0]?.text

                } catch (geminiError) {
                    console.error('Gemini AI failed after OpenAI quota exceeded')
                    throw new Error('Failed to generate summary with available AI providers')
                }                
            }
        }

        if(!summary){
            return {
            success: false,
            message: 'Failed to Generate Summary',
            data: null,
            }; 
        }

        // const formattedFileName = formatFileNameAsTitle(fileName);
        // console.log(summary)

        return {
            success: true, 
            messsage: 'Summary generated Successfully',
            data: {
                summary,
                // title: fileName,
                                
            }
        }

    } catch (error) {
        return {
            success: false,
            message: 'File to Generate Summary',
            data: null,
        }        
    }
}

async function savePdfSummary({userId, fileUrl, summary, title, fileName}: PdfSummaryType) {
    // sql inserting pdf summary

    try {
        const sql = await getDbConnection();
        const [savedSummary] = await sql`INSERT INTO pdf_summaries(
            user_id,
            original_file_url,
            summary_text,
            title,
            file_name
            ) VALUES (
                ${userId}, 
                ${fileUrl},
                ${summary},
                ${title},
                ${fileName}
            ) RETURNING id, summary_text`;

            return savedSummary;
            
    } catch (error) {
        console.error('Error saving pdf summary',error);
        throw error;
    }
}

export async function storePdfSummaryAction({userId, fileUrl, summary, title,   fileName}: PdfSummaryType){

    let savedSummary: any;

    try {
        //check if user is logged in and has a userId

        //get userId from clerk
        const { userId } = await auth()
        if(!userId){
            return {
                success: false,
                message: 'User not found'
            }
        }

        //save pdf summary savePdfSummary()
        savedSummary = await savePdfSummary({userId, fileUrl, summary, title, fileName});

        if(!savedSummary){
            return {
            success:false,
            message: 'Failed to Save Pdf Summary. Try Again.'
        }
        }

    } catch (error) {
        return {
            success:false,
            message: error instanceof Error ? error.message : 'Error Saving Pdf summary'
        }
    }

    //revalidate cache
    revalidatePath(`/summaries/${savedSummary.id}`);

    return {
        success:true,
        message: 'Pdf Summary saved successfully.',
        data: {
            id: savedSummary.id
        }
    }

}