'use client';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';
import { Button } from '@/components/ui/button';
import { NewAccountSheet } from '@/features/accounts/components/new-account-sheet';

export default function Home() {
  // this is the hook that opens the new account sheet when the button is clicked
  const { onOpen } = useNewAccount(); 

  return (
    <div>
      <Button onClick={onOpen}>Add account</Button>
      <NewAccountSheet />
    </div>
  )
}