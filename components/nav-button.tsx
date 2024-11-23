import { cn } from "@/lib/utils";
import Link from "next/link";



import { Button } from "./ui/button";

type Props = {
  href: string;
  label: string;  
  active: boolean;
};

export const NavButton = ({ href, label, active }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-black/10 hover:text-black border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-black focus:bg-black/30 transition",
        active ? "bg-black/10 text-black" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
   