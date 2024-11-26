import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono"; 



// Custom hook that fetches and returns all accounts data using React Query
export const useGetAccounts = () => { 
    const query = useQuery({
        queryKey: ["accounts"], 
        queryFn: async () => {
            const response = await client.api.accounts.$get(); 

            if (!response.ok) { // 
                throw new Error("Failed to fetch accounts");
            }
            const { data } = await response.json(); // Parse the response as JSON
            return data;
        }
    })

    return query; // Return the query object
}

 