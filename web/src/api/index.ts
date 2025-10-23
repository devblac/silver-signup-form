import type { SignupClient } from "./types";
import mockClient from "./mock";
import { goClient } from "./go";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

// "local" uses vite proxy, otherwise direct connection or mock
const client: SignupClient = 
  apiUrl === "local" ? goClient("") :
  apiUrl ? goClient(apiUrl) :
  mockClient;

export default client;

