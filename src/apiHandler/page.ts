import axios, { AxiosResponse, Method } from "axios";

// Define the base URL for your API
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

// Define the type for ApiData (if needed)
interface ApiData {
  title: string;
  message: string;
}

// Define the common headers with the token (Authorization)
const getHeaders = (): Record<string, string> => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Universal API request handler with generics for different response types
const request = async <T>(
  method: Method,
  endpoint: string,
  data: ApiData | null = null
): Promise<T> => {
  console.log("token",getHeaders());
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: getHeaders(),
      ...(data && { data }), // Include data if provided
    });

    return response.data;
  } catch (error) {
    console.error(`Error in ${method.toUpperCase()} ${endpoint}:`, error);
    throw error;
  }
};

// **CRUD Operations** with proper types for URL and data
export const createApi = <T>(url: string, data: any): Promise<T> =>
  request<T>("post", url, data);

export const fetchApi = <T>(url: string): Promise<T> => request<T>("get", url);
