'use client'

import { z } from "zod";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner"
import { generatePdfSummary, generatePdfText, storePdfSummaryAction } from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSkeleton from "./loading-skeleton";
import { formatFileNameAsTitle } from "@/utils/format-utils";

const schema = z.object({
    file: z.instanceof(File, {message: 'Invalid file'})
    .refine((file)=>file.size <= 20 * 1024 *1024, {
        message: 'File size must be less than 20 MB'
    })
    .refine((file)=>file.type.startsWith('application/pdf'), {
        message: 'File must be a pdf'
    })
})

export default function UploadForm() {
  const [isLoading,setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const { startUpload, routeConfig } = useUploadThing("pdfuploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully!");
      toast("File Uploaded Successfully")
    },
    onUploadError: (err) => {
      console.error("error occurred while uploading",err);
      toast("Error while Uploadig File", {
        description: err.message
      })
    },
    onUploadBegin: ({ file }:any) => {
      console.log("upload has begun for", file);
    },
  });

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    console.log("submitted");

    try {
      setIsLoading(true);      

      const formData = new FormData(e.currentTarget);
      const file = formData.get('file') as File;

      //field validation
      const validatedFields = schema.safeParse({file});

      if(!validatedFields.success){
          toast('Something Went wrong', {
            description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? 'Invalid File'
          })
          setIsLoading(false);
          return;
      }

      toast("Hang Tight! We are uploading your PDF")
      
      //upload file to uploadThing
      const response = await startUpload([file]);
      
      if(!response){
      toast('Something Went Wrong. Use a different file.')
        setIsLoading(false);
      return;
      }
      
      const fileUrl = response[0].serverData.fileUrl;
        
      const formattedFileName = formatFileNameAsTitle(file.name);
      
      const result = await generatePdfText({
        fileUrl,
      })

      toast("Generating PDF Summary")

      // call openAI and Gemini here
      //parse the pdf using Lang Chain

      const summaryResult = await generatePdfSummary({
        pdfText: result.data?.pdfText ?? ''
      });

       toast('Saving the PDF Summary');

      const {data = null, message = null} = summaryResult || {};

      if(data?.summary){
        
        let storeResult:any;
        //save the summary to db
        storeResult = await storePdfSummaryAction({
          summary: data.summary, 
          fileUrl,
          title: formattedFileName, 
          fileName: file.name,
        });
        
        toast('Your Summary has been successfully summarized & saved!');
        
        setIsLoading(false);
        //resetting the form 
        formRef.current?.reset();

        //redirect to the [id] summary page
        router.push(`/summaries/${storeResult.data.id}`)
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error Occured',error)
      
      formRef.current?.reset(); 
    }   
  }  
    
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden='true'>
          <div className="w-full border-t border-gray-200 dark:border-gray-800"/>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white/40 px-3 text-muted-foreground text-sm">Upload PDF</span>

        </div>
      </div>
        <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>

        {
          isLoading && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden='true'>
                  <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white/60 px-3 text-muted-foreground text-sm">
                    Processing
                  </span>
                </div>
              </div>
              <LoadingSkeleton />
            </>
          )
        }

    </div>
  )
}
