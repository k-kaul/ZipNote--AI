import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

export default function NavLink({className,href,children}:{
    href: string;
    children: ReactNode;
    className?: string;
}){
    return <Link href={href} className={cn("transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500",className)}>{children}</Link>
}