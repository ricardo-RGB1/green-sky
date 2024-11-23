import Image from "next/image"; 
import Link from "next/link";

export const HeaderLogo = () => {
    return (
        <Link href="/">
            <div className="items-center hidden lg:flex">
                <Image src="/GKLogo.svg" alt="logo" width={32} height={32} />
                <p className="font-semibold text-slate-800 text-2xl ml-2.5">
                    GreenSky
                </p>
            </div>
        </Link>
    )
}