'use client'

import { useUser } from "@clerk/nextjs";

export const WelcomeMessage = () => {
  const { user, isLoaded } = useUser(); // Clerk hook

  return (
    <div className="space-y-2 mb-4">
        <h2 className="text-2xl font-medium text-slate-800">
            Welcome back{isLoaded ? ", " + user?.firstName : ""}!
        </h2>
        <p className="text-sm lg:text-base text-[#6f806f]">
            Here you can find an overview of your account and recent transactions
        </p>
    </div>
  )
};
