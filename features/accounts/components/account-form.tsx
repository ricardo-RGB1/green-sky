import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { insertAccountSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

// Pick the name field from the insertAccountSchema
// This form is only required to collect the name of the account
const formSchema = insertAccountSchema.pick({
  name: true,
});

// This type is used to define the shape of the form values
type FormValues = z.infer<typeof formSchema>;

// Props for the account form component, handling both creation and editing of accounts
type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

/**
 * AccountForm component for creating and editing financial accounts
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.id] - Account ID when editing an existing account
 * @param {FormValues} [props.defaultValues] - Default form values for the account
 * @param {function} props.onSubmit - Handler function called when form is submitted
 * @param {function} [props.onDelete] - Handler function called when delete button is clicked
 * @param {boolean} [props.disabled] - Whether the form inputs should be disabled
 * 
 * @example
 * // Creating a new account
 * <AccountForm
 *   onSubmit={handleSubmit}
 *   defaultValues={{ name: "" }}
 * />
 * 
 * @example
 * // Editing an existing account
 * <AccountForm
 *   id="acc_123"
 *   defaultValues={{ name: "Bank Account" }}
 *   onSubmit={handleSubmit}
 *   onDelete={handleDelete}
 * />
 */
export const AccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
    
  // Initialize form with schema validation and default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema), 
    defaultValues,
  });

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4 pt-4"
      >
        <FormField
          name="name" 
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Name</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  {...field}
                  placeholder="e.g., Cash, Bank, Credit Card"
                  {...field} // Spread the field props to the input (e.g., onChange, onBlur, value)
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={disabled} className="w-full">
          {id ? "Save changes" : "Create account"}
        </Button>
        {id && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={disabled}
            className="w-full"
          >
            <Trash className="size-4 mr-2" />
            Delete account
          </Button>
        )}
      </form>
    </Form>
  );
};
