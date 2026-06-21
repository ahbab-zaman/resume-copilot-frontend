import { authClient } from "@/lib/auth-client";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  if (!backendUrl) {
    return {
      success: false,
      error: "NEXT_PUBLIC_BACKEND_URL is not configured.",
    };
  }

  try {
    const authTokenClient = authClient as {
      token?: () => Promise<{ data?: { token?: string } }>;
      getToken?: () => Promise<{ data?: { token?: string } }>;
    };
    const tokenResult = authTokenClient.token
      ? await authTokenClient.token()
      : authTokenClient.getToken
        ? await authTokenClient.getToken()
        : { data: undefined };
    const token = tokenResult.data?.token;
    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (options.body && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const response = await fetch(`${backendUrl}${path}`, {
      ...options,
      headers,
    });

    return (await response.json()) as ApiResponse<T>;
  } catch {
    return {
      success: false,
      error: "Could not reach the server. Please try again.",
    };
  }
}
