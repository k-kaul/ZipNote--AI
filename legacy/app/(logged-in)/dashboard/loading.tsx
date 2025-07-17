import BgGradient from "@/components/common/bg-gradient"
import { MotionDiv, MotionH1, MotionP } from "@/components/common/motion-wrapper"
import { Skeleton } from "@/components/ui/skeleton"
import { itemVariants } from "@/utils/contants"

function HeaderSkeleton(){
    return <div>
        <div className="flex flex-col gap-2">
            <MotionH1 
                variants={itemVariants} 
                initial='hidden'
                whileInView='visible'
                className="text-4xl font-bold tracking-tight">
                    <Skeleton className="h-10 w-48"/>
            </MotionH1>
            <MotionDiv
                variants={itemVariants} 
                initial='hidden'
                animate='visible'
                className="text-gray-600">
                    <Skeleton className="h-6 w-96" />
            </MotionDiv>
        </div>
        <MotionDiv
            variants={itemVariants}
            initial='hidden'
            animate='visible'
            className="self-start">
                <Skeleton className="h-10 w-32"/>
        </MotionDiv>
    </div>
}

function SummaryCardSkeleton(){
    return (
        <MotionDiv 
            variants={itemVariants}
            initial='hidden'
            animate='visible'
            className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <Skeleton className="h-48 w-full rounded-lg"/>
        </MotionDiv>
    )
}

export default function LoadingSummaries(){
    return <div className="min-h-screen relative">
        <section className="container px-10 py-24 mx-auto flex flex-col gap-4">
            <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200"/>
            <HeaderSkeleton />
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-8">
                {Array.from({length: 3}).map((_, index) => (
                    <SummaryCardSkeleton key={index} />
                ))}
            </div>
        </section>
    </div>
}