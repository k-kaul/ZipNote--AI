import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

function HeaderSkeleton(){
    return <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
            <Skeleton className="h-8 w-32 rounded-full bg-white/80" />
            <Skeleton className="h-5 w-40 rounded-full bg-white/80" />
        </div>
            <Skeleton className="h-12 w-3/4 rounded-full bg-white/80" />
    </div>
}


export default function LoadingSummary() {
  return (
    <div className="min-h-screen relative isolate bg-linear-to-b from-rose-50/40 to-white">
        <BgGradient className="from-rose-400 via-rose-300 to-orange-200"/>
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-24">
            <div className="flex flex-col gap-8">
                <HeaderSkeleton />
            </div>
            <div className="relative overflow-hidden">
                <div className="relative p-8 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-rose-100/30">
                    <div className="absolute top-4 right-4 text-rose-300/20">
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-rose-400"/>                        
                    </div>
                    <div className="relative">
                        <LoadingSkeleton />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
