import { API_URL } from "@/config/api";
import { FetcherProps } from "@/types/general";

export const fetcher = async ({ url, method, ...rest }: FetcherProps) => {
  try {
    const headers = rest.headers || {};
    const body = rest.body || undefined;

    const response = await fetch(API_URL + url, {
      method: method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body && JSON.stringify(body),
      ...rest,
    });

    if (!response.ok)
      throw new Error({
        status: response.status,
        message: response.data,
      });

    const data = await response.json();

    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export async function get<T>(url: string, options?: any) {
  return (await fetcher({
    url,
    ...options,
    method: "GET",
  })) as {
    data: T | null;
    error: string | null;
  };
}

export async function post<T>(url: string, body: any, options?: any) {
  return (await fetcher({
    url,
    method: "POST",
    body: body,
    ...options,
  })) as {
    data: T | null;
    error: string | null;
  };
}
