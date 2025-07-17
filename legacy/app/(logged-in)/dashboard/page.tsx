import BgGradient from "@/components/common/bg-gradient";
import { MotionDiv, MotionH1, MotionP } from "@/components/common/motion-wrapper";
import EmptySummary from "@/components/summaries/empty-summary";
import SummaryCard from "@/components/summaries/summary-card";
import { Button } from "@/components/ui/button";
import { getSummaries } from "@/lib/summaries";
import reachedUploadLimit from "@/lib/upload-limit";
import { itemVariants } from "@/utils/contants";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  
  const user = await currentUser();
  const userId = user?.emailAddresses[0].emailAddress;

  if(!userId){
    return redirect('/sign-in')
  }

  const {hasReachedUploadLimit, uploadLimit} = await reachedUploadLimit(userId)

  const summaries = await getSummaries(userId);  
    return (
    <main className="min-h-screen">
      <BgGradient className="from-amber-400 via-red-400 to-amber-400"/>
      <MotionDiv 
        initial={{opacity:0, y:20}}
        animate={{opacity:1, y:0}}
        transition={{duration:0.5}}
        className="container mx-auto flex flex-col gap-4">
       <div className="px-2 py-12 sm:py-24">
            <div className="flex gap-4 mb-8 justify-between">
                <div className="flex flex-col gap-2">
                    <MotionH1 
                        variants={itemVariants} 
                        initial='hidden'
                        whileInView='visible'
                        className="text-4xl font-bold tracking-tight">Your Summaries</MotionH1>
                    <MotionP 
                        variants={itemVariants} 
                        initial='hidden'
                        animate='visible'
                        className="text-gray-600">Transfrom Your PDFs into concise, actionable insights.
                    </MotionP>
                </div>
                {!hasReachedUploadLimit && 
                <MotionDiv 
                    variants={itemVariants} 
                    initial='hidden'
                    animate='visible'
                    whileHover={{scale: 1.05}}
                    className="self-start">
                    <Button variant={'link'} className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 hover:scale-105 transition-all duration-300 group hover:no-underline">
                        <Link href='/upload' className="flex text-white items-center "><Plus className="w-5 h-5 mr-2"/>New Summary</Link>
                    </Button>
                </MotionDiv>
                }
            </div>
            {hasReachedUploadLimit && 
                <MotionDiv 
                    variants={itemVariants} 
                    initial='hidden'
                    animate='visible'
                    whileHover={{scale: 1.05}}
                    className="self-start mb-6">
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 text-rose-800 ">
                        <p className="text-sm">You've reached the limit of {uploadLimit} uploads on the Basic Plan {'  '}
                            <Link href="/#pricing" className="text-rose-800 font-medium underline underline-offset-4 inline-flex items-center">
                                Click here to upgrade to Pro{' '}<ArrowRight className="w-4 h-4 inline-block"/>
                            </Link> for unlimited uploads.
                        </p>
                    </div>
                </MotionDiv>
            }            
            {summaries.length === 0 ? <EmptySummary/> : 
                <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2  lg:grid-cols-3">
                    {
                        summaries.map((summary,index)=> (
                            <SummaryCard key={index} summary={summary}/>
                        ))
                    }
                </div>
            }
        </div>
      </MotionDiv>
    </main>
  )
}
