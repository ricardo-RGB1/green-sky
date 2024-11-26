 import { InferRequestType, InferResponseType } from "hono";
 import { useMutation, useQueryClient } from "@tanstack/react-query"; 
 import { client } from "@/lib/hono"; 
 import { toast } from "sonner";

 // This type is used to define the shape of the response from the API
 // meaning the data that is returned from the API after the mutation is complete
 type ResponseType = InferResponseType<typeof client.api.accounts.$post>;  
 type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"]; // This type is used to define the shape of the request body



 /**
  * Hook for creating a new account
  * 
  * Uses React Query's useMutation to handle the API call and cache invalidation
  * 
  * @returns {Object} mutation - The mutation object from React Query
  * @returns {Function} mutation.mutate - Function to trigger the mutation
  * @returns {boolean} mutation.isLoading - Whether the mutation is in progress
  * @returns {Error} mutation.error - Any error that occurred during the mutation
  * @returns {ResponseType} mutation.data - The response data from the API
  */
 export const useCreateAccount = () => {
    const queryClient = useQueryClient(); 

    const mutation = useMutation<ResponseType, Error, RequestType>({ 
        // Makes a POST request to create a new account
        mutationFn: async (json) => {
            const response = await client.api.accounts.$post({ json });  // Makes a POST request to create a new account
            return await response.json();  // Returns the response from the API
        },
        // After successful creation, invalidate the accounts query to refetch the list
        onSuccess: () => {
            toast.success("Account created successfully");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });  // Invalidates the accounts query to refetch the list   
        }, 
        onError: () => {
            toast.error("Failed to create account");
        }
    }); 

    return mutation; 
 }
 