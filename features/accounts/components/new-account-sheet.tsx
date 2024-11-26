import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "./account-form";
import { z } from "zod";
import { insertAccountSchema } from "@/db/schema";
import { useCreateAccount } from "../api/use-create-accounts";


// This type is used to define the shape of the form values
type FormValues = z.infer<typeof formSchema>;

// This schema is used to validate the data before inserting it into the database
const formSchema = insertAccountSchema.pick({ name: true });



export const NewAccountSheet = () => {
    const { isOpen, onClose } = useNewAccount();

    // This is the mutation function for creating a new account
    const { mutate: createAccount } = useCreateAccount();

    // This is the function that is called when the form is submitted
    // It takes the form values and passes them to the createAccount mutation function
    // The onSuccess callback is used to close the sheet after the account is created
    const onSubmit = (values: FormValues) => {
        createAccount(values, {
            onSuccess: () => {
                onClose();
            }
        });
    };

    return (

        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                    <SheetDescription>
                        Create a new account to track your finances. 
                    </SheetDescription>
                </SheetHeader>
                <AccountForm 
                    onSubmit={onSubmit} 
                    disabled={false} 
                    defaultValues={{ name: "" }}
                />
            </SheetContent>
        </Sheet>
    )
}   