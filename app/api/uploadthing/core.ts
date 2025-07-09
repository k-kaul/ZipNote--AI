import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
    pdfuploader : f({pdf: {maxFileSize: '32MB'}}).middleware(
        async({req}) => {
        //get user info
            const user = await currentUser();

            if(!user) throw new UploadThingError('Unauthorized');

            return {userId: user.id};
        }
    ).onUploadComplete(async({metadata,file}) => {
        // console.log("upload complete for userId:",metadata.userId);
        //    console.log("file url", file.ufsUrl);
        return {
            userId: metadata.userId, 
            fileUrl: file.ufsUrl,
            fileName: file.name   
        }
    })

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;