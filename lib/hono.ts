import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";

// Create a client to interact with the API
export const client = hc<AppType>(process.env.NEXT_PUBLIC_API_URL!);