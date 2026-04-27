const API_URL = "http://localhost:3000/api/v1/";

export async function api<T>(url: string, data?: object, options?: RequestInit) {
    const response = await fetch(API_URL + url, {
        ...options,
        method: options?.method ?? (data ? "POST" : "GET"),
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        body: data ? JSON.stringify(data) : undefined,
    });
    const result = await response.json();
    return result.data as T;
}
