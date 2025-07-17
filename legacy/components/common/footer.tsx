import Link from "next/link";

export default function Footer(){
    return(
        <div className="bg-gray-100 text-md sm:text-xl">
            <div className="flex md:gap-5 items-center m-5 mx-auto max-w-5xl p-5">
                <div className="flex flex-col ml-5">
                    <span className="font-extrabold lg:text-xl text-gray-900">ZipNote AI</span>
                    <div className="font-light text-sm">
                        © 2025 ZipNote AI. All rights reserved.
                    </div>
                </div>
                <div className="mx-auto">
                    <div className="grid grid-cols-2 sm:flex gap-15 justify-items-start sm:text-lg font-light">
                        <div className="flex flex-col">
                            <label className="font-bold">Pages</label>
                            <Link href={'/'}>Home</Link>
                            <Link href={'/upload'}>Upload a PDF</Link>
                            <Link href={'/dashboard'}>Summaries</Link>
                            <Link href={'/#pricing'}>Pricing</Link>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold">Socials</label>
                            <Link href={'https://linkedin.com/in/kartik-kaul-219b95129'}>LinkedIn</Link>
                            <Link href={'https://github.com/k-kaul/ZipNote--AI'}>GitHub</Link>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-bold">Legal</label>
                            <Link href={'/'}>Privacy Policy</Link>
                            <Link href={'/'}>Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}