import type { SignupClient } from "./types";
import mockClient from "./mock";
import { goClient } from "./go";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const client: SignupClient = 
  apiUrl === "local" ? goClient("") :
  apiUrl ? goClient(apiUrl) :
  mockClient;

// Just for testing purposes
// I'm logging which client we're using to be sure go server is working properly
const clientType = apiUrl === "local" ? "local server (proxy)" : apiUrl ? `Minimal Go server remote (${apiUrl})` : "mock API";
console.log(`[API] using ${clientType}`);

export default client;

