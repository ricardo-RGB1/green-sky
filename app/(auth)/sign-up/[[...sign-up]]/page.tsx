import Image from 'next/image'
import { Loader2 } from 'lucide-react'
import { SignUp, ClerkLoading, ClerkLoaded } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-3xl font-bold text-[#2E2A47]">Welcome back!</h1>
          <p className="text-base text-[#838383]">Sign in to your account to continue</p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-gradient-to-b from-slate-800 to-zinc-900 hidden lg:flex items-center justify-center">
        <Image src="/GKLogo.svg" alt="Logo" width={100} height={100} />
      </div>
    </div>
  )
}
 